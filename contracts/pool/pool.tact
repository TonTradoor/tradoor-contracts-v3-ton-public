import "@stdlib/deploy";
import "@stdlib/ownable";
import "@stdlib/stoppable";
import "./upgrade";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract Pool with Deployable, Resumable, Upgradable{

    owner: Address;
    stopped: Bool = false;
    
    // config
    orderLockTime: Int as uint32 = 3 * 60;
    maxLpNetCap: Int as coins = 0;
    lpRolloverFeeRate: Int as uint32 = 0;
    liquidatedPositionShareRate: Int as uint32 = 0;
    normalPositionShareRate: Int as uint32 = 0;

    mintJettonGas: Int as coins = 0;
    burnJettonGas: Int as coins = 0;
    transferJettonGas: Int as coins = 0;
    createPerpOrderGas: Int as coins = 0;
    cancelPerpOrderGas: Int as coins = 0;
    executePerpOrderGas: Int as coins = 0;
    createLiquidityOrderGas: Int as coins = 0;
    cancelLiquidityOrderGas: Int as coins = 0;
    executeLiquidityOrderGas: Int as coins = 0;

    lpMinExecutionFee: Int as coins = ton("0.05"); 
    perpMinExecutionFee: Int as coins = ton("0.1");
    minStorageReserve: Int as coins = ton("0.01");

    tlpSupply: Int as coins = 0;
    tlpJetton: Address = newAddress(0, 0);
    tlpWallet: Address = newAddress(0, 0);

    compensator: Address = newAddress(0, 0);
    claimer: Address = newAddress(0, 0);
    executors: map<Address, Bool>; 

    tokenConfigs: map<Int as uint16, TokenConfig>; 

    // data
    liquidityOrders: map<Int as uint64, LiquidityOrder>; // orderId => order
    liquidityOrderIndexNext: Int as uint64 = 1;

    perpOrders: map<Int as uint64, PerpOrder>; // orderId => order
    perpOrderExs: map<Int as uint64, PerpOrderEx>; // orderId => orderEx
    perpOrderIndexNext: Int as uint64 = 1;

    compensates: map<Int as uint64, Compensate>; // id => compensate
    compensateIndexNext: Int as uint64 = 1;

    positionIndexNext: Int as uint64 = 1;
    positions: map<Int as uint16, AccountPerpPosition>; // tokenId => user => direction => position

    globalLPPositions: map<Int as uint16, GlobalLPPosition>; // tokenId => globalLP
    globalPositions: map<Int as uint16, GlobalPosition>; // tokenId => globalPosition

    // ton reserve
    feeReserve: Int as coins = 0; 
    orderAmountReserve: Int as coins = 0; 
    executionFeeReserve: Int as coins = 0; 

    globalLPFund: Int as int128 = 0;
    globalLPUnrealizedPnl: Int as int128 = 0;

    globalLpFundingFeeGrowth: Int as coins = 0;
    globalRolloverFeeGrowth: Int as coins = 0;

   
    init(deployId: Int) {
        self.owner = sender();
    }

    receive(msg: UpdateConfig) {
        self.requireOwner();
        self.orderLockTime = msg.orderLockTime;
        self.maxLpNetCap = msg.maxLpNetCap;
        self.lpRolloverFeeRate = msg.lpRolloverFeeRate;
        self.liquidatedPositionShareRate = msg.liquidatedPositionShareRate;
        self.normalPositionShareRate = msg.normalPositionShareRate;

        // contract
        let contractConfig: ContractConfig? = msg.contractConfig;
        if (contractConfig != null) {
            self.tlpJetton = contractConfig!!.tlpJetton; 
            self.tlpWallet = contractConfig!!.tlpWallet;
        }

        // executors
        let executorConfig: ExecutorConfig? = msg.executorConfig;
        if (executorConfig != null) {
            let executors: map<Address, Bool> = executorConfig!!.executors;
            foreach (executor,enable in executors) {
                self.executors.set(executor, enable? true : null);
            }
            self.compensator = executorConfig!!.compensator;
            self.claimer = executorConfig!!.claimer;
        }

        // gas
        let gasConfig: GasConfig? = msg.gasConfig;
        if (gasConfig != null) {
            self.minStorageReserve = gasConfig!!.minStorageReserve;
            self.lpMinExecutionFee = gasConfig!!.lpMinExecutionFee;
            self.perpMinExecutionFee = gasConfig!!.perpMinExecutionFee;
    
            self.mintJettonGas = gasConfig!!.mintJettonGas;
            self.burnJettonGas = gasConfig!!.burnJettonGas;
            self.transferJettonGas = gasConfig!!.transferJettonGas;
            self.createPerpOrderGas = gasConfig!!.createPerpOrderGas;
            self.cancelPerpOrderGas = gasConfig!!.cancelPerpOrderGas;
            self.executePerpOrderGas = gasConfig!!.executePerpOrderGas;
            self.createLiquidityOrderGas = gasConfig!!.createLiquidityOrderGas;
            self.cancelLiquidityOrderGas = gasConfig!!.cancelLiquidityOrderGas;
            self.executeLiquidityOrderGas = gasConfig!!.executeLiquidityOrderGas;
        }

        self.reply("config updated".asComment());
    }

    receive(msg: JettonUpdateContent) {
        self.requireOwner();
        self.forward(self.tlpJetton, msg.toCell(), true, null);
    }

    receive(msg: ListToken) {
        self.requireOwner();
        self.tokenConfigs.set(msg.tokenId, msg.config);
        self.reply("token listed".asComment());
    }

    receive(msg: DelistToken) {
        self.requireOwner();
        let position: GlobalPosition? = self.globalPositions.get(msg.tokenId);
        if (position != null) {
            require(position!!.longSize + position!!.shortSize == 0, "token cannot be delisted");
        }
        self.tokenConfigs.del(msg.tokenId);
        self.globalPositions.del(msg.tokenId);
        self.globalLPPositions.del(msg.tokenId);
        self.positions.del(msg.tokenId);
        self.reply("token delisted".asComment());
    }

    receive(msg: WithdrawFee) {
        require(sender() == self.claimer, "invalid sender");
        require(self.feeReserve > 0, "insufficient fee reserve");
        let feeReceiver = msg.feeReceiver != null ? msg.feeReceiver!! : sender();
        send(SendParameters{to: feeReceiver, value: self.feeReserve, mode: SendIgnoreErrors | SendRemainingValue});
        self.feeReserve = 0;
    }

    receive() {}

    receive(msg: JettonTransferNotification) {
        let ctx: Context = context();
        if (ctx.sender != self.tlpWallet) {
            self.refundJetton(msg.query_id, msg.amount, msg.sender, msg.sender);
            return;
        }
        if (self.stopped) {
            self.refundJetton(msg.query_id, msg.amount, msg.sender, msg.sender);
            return;
        }

        let executionFee: Int = msg.forward_payload.loadCoins();
        if (executionFee < self.lpMinExecutionFee || ctx.value < self.createLiquidityOrderGas + executionFee) {
            self.refundJetton( msg.query_id, msg.amount, msg.sender, msg.sender);
            return;
        }
        
        self.createLiquidityOrder(msg.query_id, msg.sender, false, msg.amount, executionFee);
    }

    receive(msg: CreateAddLiquidityOrder){
        let ctx: Context = context();
        require(msg.executionFee >= self.lpMinExecutionFee, "insufficient execution fee");
        require(ctx.value >= self.createLiquidityOrderGas + msg.amount + msg.executionFee, "incorrect value transferred");
        self.createLiquidityOrder(msg.trxId, ctx.sender, true, msg.amount, msg.executionFee);
    }

    fun createLiquidityOrder(trxId: Int, account: Address, isIncrease: Bool, amount: Int,  executionFee: Int) {
        let orderId: Int = self.liquidityOrderIndexNext;
        self.liquidityOrderIndexNext += 1;
        self.liquidityOrders.set(orderId, LiquidityOrder{isIncrease, account, amount, executionFee, blockTime: now()});

        let orderAmountReserveDelta: Int = 0;
        if (isIncrease) {
            self.orderAmountReserve += amount;
            orderAmountReserveDelta = amount;
        }
        self.executionFeeReserve += executionFee;

        emit(LiquidityOrderCreatedEvent{
            opType: isIncrease ? OP_TYPE_LP_INCREASE : OP_TYPE_LP_DECREASE,
            account: account,
            amount: amount,
            executionFee: executionFee,
            orderId: orderId,
            trxId: trxId
        }.toCell());

        self.transferEstimatedRemainValue(self.createLiquidityOrderGas, account, executionFee + orderAmountReserveDelta);
    }

    receive(msg: CancelLiquidityOrder) {
        let ctx: Context = context();
        require(ctx.value >= self.cancelLiquidityOrderGas + self.transferJettonGas, "insufficient value transferred");

        let orderOpt: LiquidityOrder? = self.liquidityOrders.get(msg.orderId);
        require(orderOpt != null, "non-existent order");
        let order: LiquidityOrder = orderOpt!!;

        require(!order.isPending, "order is pending");

        require(self.executors.exists(ctx.sender) || ctx.sender == order.account, "invalid sender");

        self.liquidityOrders.del(msg.orderId);

        let orderAmountReserveDelta = 0;
        if (order.isIncrease) {
            send(SendParameters{ to: order.account, value: order.amount, mode: SendIgnoreErrors| SendPayGasSeparately });
            self.orderAmountReserve -= order.amount;
            orderAmountReserveDelta = order.amount
        } else {
            self.transferJetton(msg.trxId, order.amount, order.account, ctx.sender);
        }

        if (order.executionFee > 0) {
            send(SendParameters{ to: ctx.sender, value: order.executionFee, mode: SendIgnoreErrors| SendPayGasSeparately });
            self.executionFeeReserve -= order.executionFee;
        }

        emit(LiquidityOrderCancelledEvent{
            opType: order.isIncrease ? OP_TYPE_LP_INCREASE : OP_TYPE_LP_DECREASE,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        self.transferEstimatedRemainValue(self.cancelLiquidityOrderGas, ctx.sender, -order.executionFee - orderAmountReserveDelta);
    }

    receive(msg: ExecuteLiquidityOrder) {
        let ctx: Context = context();
        require(ctx.value >= self.executeLiquidityOrderGas + max(self.mintJettonGas, self.burnJettonGas), "insufficient value transferred");

        require(self.executors.exists(ctx.sender), "invalid sender");

        let orderOpt: LiquidityOrder? = self.liquidityOrders.get(msg.orderId);
        require(orderOpt != null, "non-existent order");

        let order: LiquidityOrder = orderOpt!!;
        require(!order.isPending, "order is pending");

        self.liquidityOrders.del(msg.orderId);

        let prices: map<Int as uint16, Int as uint128> = msg.prices;
        let globalLPUnrealizedPnl: Int = 0;
        foreach ( tokenId,price in prices) {
            let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
            if (globalLPPositionOpt != null) {
                let globalLPPosition: GlobalLPPosition = globalLPPositionOpt!!;
                globalLPUnrealizedPnl += globalLPPosition.netSize * (price - globalLPPosition.entryPrice) * (globalLPPosition.isLong ? 1 : -1) / PRICE_DECIMAL_FACTOR;
            }
        }
        self.globalLPUnrealizedPnl = globalLPUnrealizedPnl;

        // charge funding fee
        let lpFundingFeeGrowthDelta: Int = msg.lpFundingFeeGrowth - self.globalLpFundingFeeGrowth;
        self.globalLpFundingFeeGrowth = msg.lpFundingFeeGrowth;

        // charge rollover fee
        let rolloverFeeGrowthDelta: Int = msg.rolloverFeeGrowth - self.globalRolloverFeeGrowth;
        let lpRolloverFeeGrowthDelta: Int = rolloverFeeGrowthDelta * self.lpRolloverFeeRate / PERCENTAGE_BASIS_POINT;
        self.globalRolloverFeeGrowth = msg.rolloverFeeGrowth;

        self.globalLPFund += lpFundingFeeGrowthDelta + lpRolloverFeeGrowthDelta;
        
        let feeReserveDelta: Int = (rolloverFeeGrowthDelta - lpRolloverFeeGrowthDelta);
        self.feeReserve += feeReserveDelta;

        let globalNetLP: Int = self.globalLPFund + self.globalLPUnrealizedPnl;
        let tlpPrice: Int = 0;
        let amount: Int = 0;
        let tlpDelta: Int = 0;
        let orderAmountReserveDelta: Int = 0;
        let gas: Int = self.executeLiquidityOrderGas;
        if (order.isIncrease) {
            gas += self.mintJettonGas;
            amount = order.amount;
            let remainingCap: Int = max(0, (self.maxLpNetCap - globalNetLP));
            require(amount <= remainingCap, "insufficient capacity");

            tlpPrice = self.tlpSupply == 0 ? PRICE_DECIMAL_FACTOR : (globalNetLP * JETTON_PRICE_DECIMAL_FACTOR / self.tlpSupply);
            tlpDelta = amount  * JETTON_PRICE_DECIMAL_FACTOR / tlpPrice; 

            send(SendParameters{
                to: self.tlpJetton, 
                value: self.mintJettonGas,
                body: JettonMint{ origin: ctx.sender, receiver: order.account, amount: tlpDelta, custom_payload: null, forward_ton_amount: 0, forward_payload: emptySlice() }.toCell()
            });
            self.globalLPFund += amount;
            self.tlpSupply += tlpDelta;
        } else {
            gas += self.burnJettonGas;
            tlpDelta = order.amount;
            tlpPrice = globalNetLP  * JETTON_PRICE_DECIMAL_FACTOR / self.tlpSupply;
            amount = tlpPrice * tlpDelta / JETTON_PRICE_DECIMAL_FACTOR;

            send(SendParameters{
                to: self.tlpWallet,
                value: self.burnJettonGas,
                body: JettonBurn{ query_id: msg.trxId, amount: tlpDelta, response_destination: ctx.sender, custom_payload: null }.toCell()
            });
            self.globalLPFund -= amount;
            self.tlpSupply -= tlpDelta;

            send(SendParameters{to: order.account, value: amount, mode: SendIgnoreErrors | SendPayGasSeparately});
            self.orderAmountReserve -= amount;
            orderAmountReserveDelta = amount
        }

        if (order.executionFee > 0) {
            send(SendParameters{ to: ctx.sender, value: order.executionFee, mode: SendIgnoreErrors});
            self.executionFeeReserve -= order.executionFee;
        }

        emit(LiquidityPoolUpdatedEvent{
            trxId: msg.trxId,
            orderId: msg.orderId,
            opType: order.isIncrease ? OP_TYPE_LP_INCREASE : OP_TYPE_LP_DECREASE,
            account: order.account,
            amount: amount,
            tlpPrice: tlpPrice,
            tlpDelta: tlpDelta,
            tlpSupply: self.tlpSupply,
            lpFundAfter: self.globalLPFund,
            realizedLpFundingFeeDelta: lpFundingFeeGrowthDelta,
            realizedLpRolloverFeeDelta: lpRolloverFeeGrowthDelta,
            entryLpFundingFeeGrowth: self.globalLpFundingFeeGrowth,
            entryRolloverFeeGrowth: self.globalRolloverFeeGrowth
        }.toCell());

        self.transferEstimatedRemainValue(gas, ctx.sender, -order.executionFee - orderAmountReserveDelta - feeReserveDelta);
    }

    receive(msg: CreateIncreasePerpOrder){
        self.requireNotStopped();
        let ctx: Context = context();
        let executionFee = msg.executionFee;
        require(executionFee >= self.perpMinExecutionFee, "OrderBook: insufficient execution fee");

        let totalExecutionFee  = executionFee;
        if (msg.tpSize > 0 && msg.tpPrice > 0) {
            totalExecutionFee += executionFee;
        }
        if (msg.slSize > 0 && msg.slPrice > 0) {
            totalExecutionFee += executionFee;
        }
        require(ctx.value >= self.createPerpOrderGas + totalExecutionFee +  msg.marginDelta, "OrderBook: incorrect value transferred");
        
        let opType: Int = msg.isMarket ? OP_TYPE_PERP_INCREASE_MARKET : OP_TYPE_PERP_INCREASE_LIMIT;
        let orderId = self.createPerpOrder(msg.trxId, opType, ctx.sender, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, msg.triggerPrice, executionFee, msg.requestTime);

        if (totalExecutionFee > executionFee) {
            self.perpOrderExs.set(orderId, PerpOrderEx{ tpSize: msg.tpSize, tpPrice: msg.tpPrice, slSize: msg.slSize, slPrice: msg.slPrice, executionFee });
        }
        self.orderAmountReserve += msg.marginDelta;
        self.executionFeeReserve += executionFee;

        self.transferEstimatedRemainValue(self.createPerpOrderGas, ctx.sender, totalExecutionFee + msg.marginDelta);
    }

    receive(msg: CreateDecreasePerpOrder) {
        self.requireNotStopped();
        let ctx: Context = context();
        require(msg.executionFee >= self.perpMinExecutionFee, "insufficient execution fee");
        require(ctx.value >= self.createPerpOrderGas + msg.executionFee, "insufficient transfered value");

        self.createPerpOrder(msg.trxId, OP_TYPE_PERP_DECREASE_MARKET, ctx.sender, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, msg.triggerPrice, msg.executionFee, msg.requestTime);

        self.executionFeeReserve += msg.executionFee;

        self.transferEstimatedRemainValue(self.createPerpOrderGas, ctx.sender, msg.executionFee);
    }

    receive(msg: CreateTpSlPerpOrder) {
        self.requireNotStopped();
        
        let ctx: Context = context();

        let executionFeeMultiple: Int = 0;
        if (msg.tpSize > 0 && msg.tpPrice > 0) {
            executionFeeMultiple += 1;
        }
        if (msg.slSize > 0 && msg.slPrice > 0) {
            executionFeeMultiple += 1;
        }

        require(msg.executionFee >= self.perpMinExecutionFee, "execution fee not enough");
        require(ctx.value >= (self.createPerpOrderGas + msg.executionFee) * executionFeeMultiple, "gas not enough");

        if (msg.tpSize > 0 && msg.tpPrice > 0) {
            self.createPerpOrder(msg.trxId, OP_TYPE_PERP_DECREASE_TP, ctx.sender, msg.tokenId, msg.isLong, 0, msg.tpSize, msg.tpPrice, 
                msg.executionFee, msg.requestTime);
        }

        if (msg.slSize > 0 && msg.slPrice > 0) {
            self.createPerpOrder(msg.trxId, OP_TYPE_PERP_DECREASE_SL, ctx.sender, msg.tokenId, msg.isLong, 0, msg.slSize, msg.slPrice, 
                msg.executionFee, msg.requestTime);
        }

        self.executionFeeReserve += msg.executionFee * executionFeeMultiple;
        self.transferEstimatedRemainValue(self.createPerpOrderGas * executionFeeMultiple, ctx.sender, msg.executionFee * executionFeeMultiple);
    }

    fun createPerpOrder(trxId: Int, opType: Int, account: Address, tokenId: Int, isLong: Bool, 
        marginDelta: Int, sizeDelta: Int, triggerPrice: Int, executionFee: Int, requestTime: Int): Int {
        let triggerAbove: Bool = false;

        if (opType == OP_TYPE_PERP_INCREASE_MARKET || opType == OP_TYPE_PERP_INCREASE_LIMIT) {
            // increase for long order, must trigger below the price
            triggerAbove = !isLong;
        } else {
            if (opType == OP_TYPE_PERP_DECREASE_MARKET) {
                // decrease for long market order, must trigger above the price
                triggerAbove = isLong;
            } else {
                // tp for long limit order, must trigger above the price
                triggerAbove = (opType == OP_TYPE_PERP_DECREASE_TP ? isLong : !isLong);
            }
        }

        let orderId: Int = self.perpOrderIndexNext;
        self.perpOrderIndexNext += 1;
        self.perpOrders.set(orderId, PerpOrder{ opType, tokenId, account, isLong, marginDelta, sizeDelta, triggerPrice, triggerAbove, executionFee, blockTime: now()});

        emit(PerpOrderCreatedEvent{ opType, tokenId, account, isLong, marginDelta, sizeDelta, executionFee, orderId, triggerPrice, triggerAbove, requestTime, trxId}.toCell());
        return orderId;
    }

    receive(msg: CancelPerpOrder) {
        let ctx: Context = context();
        let orderOpt: PerpOrder? = self.perpOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: PerpOrder = orderOpt!!;

        require(!order.isPending, "order is pending");
        require(ctx.value >= self.cancelPerpOrderGas + self.transferJettonGas, "gas not enough");

        let isExecutor: Bool = self.executors.exists(ctx.sender);
        require(isExecutor || ctx.sender == order.account, "invalid sender");
        
        if (!isExecutor && (order.opType == OP_TYPE_PERP_INCREASE_MARKET || order.opType == OP_TYPE_PERP_DECREASE_MARKET)) {
            require(order.blockTime + self.orderLockTime <= now(), "too early to cancel");
        }

        let executionFeeReserveDelta: Int = 0;
        let orderAmountReserveDelta: Int = 0;
        let increase: Bool = order.opType == OP_TYPE_PERP_INCREASE_MARKET || order.opType == OP_TYPE_PERP_INCREASE_LIMIT;
        if (increase) {
            let orderExOpt: PerpOrderEx? = self.perpOrderExs.get(msg.orderId);
            if (orderExOpt != null) {
                let orderEx: PerpOrderEx = orderExOpt!!;
                // tp/sl
                let tpSlExecutionFee: Int = 0;
                if (orderEx.tpSize > 0 && orderEx.tpPrice > 0) {
                    tpSlExecutionFee += orderEx.executionFee;
                }
                if (orderEx.slSize > 0 && orderEx.slPrice > 0) {
                    tpSlExecutionFee += orderEx.executionFee;
                }
                if (tpSlExecutionFee > 0) {
                    // transfer tpsl execution fee to user
                    send(SendParameters{ to: order.account, value: tpSlExecutionFee, mode: SendIgnoreErrors });
                    executionFeeReserveDelta += tpSlExecutionFee;
                    self.executionFeeReserve -= tpSlExecutionFee;
                }

                self.perpOrderExs.del(msg.orderId);
            }

            send(SendParameters{ to: order.account, value: order.marginDelta, mode: SendIgnoreErrors| SendPayGasSeparately });
            self.orderAmountReserve -= order.marginDelta;
            orderAmountReserveDelta = order.marginDelta;
        }
        self.perpOrders.del(msg.orderId);

        // transfer execution fee
        if (order.executionFee > 0) {
            send(SendParameters{ to: ctx.sender, value: order.executionFee, mode: SendIgnoreErrors });
            executionFeeReserveDelta += order.executionFee;
            self.executionFeeReserve -= order.executionFee;
        }

        emit(PerpOrderCancelledEvent{
            opType: order.opType,
            orderId: msg.orderId,
            trxId: msg.trxId
        }.toCell());

        self.transferEstimatedRemainValue(self.cancelPerpOrderGas, ctx.sender, - executionFeeReserveDelta - orderAmountReserveDelta);
    }

    receive(msg: ExecutePerpOrder) {
        let ctx: Context = context();
        require(ctx.value >= self.executePerpOrderGas + self.transferJettonGas, "gas not enough");

        require(self.executors.exists(ctx.sender), "invalid sender");
        let orderOpt: PerpOrder? = self.perpOrders.get(msg.orderId);
        require(orderOpt != null, "order not exist");
        let order: PerpOrder = orderOpt!!;
        require(!order.isPending, "order is pending");

        order.isPending = true;
        self.perpOrders.set(msg.orderId, order);

        if (!(order.opType == OP_TYPE_PERP_INCREASE_MARKET || order.opType == OP_TYPE_PERP_DECREASE_MARKET)){
            require(order.triggerAbove ? (msg.price >= order.triggerPrice) : (msg.price <= order.triggerPrice), "not reach trigger price");
        }
        let increase: Bool = order.opType == OP_TYPE_PERP_INCREASE_MARKET || order.opType == OP_TYPE_PERP_INCREASE_LIMIT;
        if (increase) {
            self.increasePerpPosition(msg.trxId, msg.orderId, order.opType, order.account, order.tokenId, order.isLong, order.marginDelta, order.sizeDelta, msg.price, msg.fundingFeeGrowth, msg.rolloverFeeGrowth);
        } else {
            self.decreasePerpPosition(msg.trxId, msg.orderId, order.opType, order.account, order.tokenId, order.isLong, order.marginDelta, order.sizeDelta, msg.price, msg.fundingFeeGrowth, msg.rolloverFeeGrowth);
        }    
    }

    fun increasePerpPosition(trxId: Int, orderId: Int, opType: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, tradePrice: Int, fundingFeeGrowth: Int, rolloverFeeGrowth: Int) {
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");

        let order: PerpOrder = self.perpOrders.get(orderId)!!;

        // get position
        let accountPerpPositionOpt: AccountPerpPosition? = self.positions.get(tokenId);
        let accountPerpPosition: AccountPerpPosition = accountPerpPositionOpt != null ? accountPerpPositionOpt!! : AccountPerpPosition{
            positions: emptyMap()
        };

        let directionPerpPositionOpt: DirectionPerpPosition? = accountPerpPosition.positions.get(account);
        let directionPerpPosition: DirectionPerpPosition = directionPerpPositionOpt != null ? directionPerpPositionOpt!! : DirectionPerpPosition{
            longPosition: PerpPosition {}, shortPosition: PerpPosition {}
        };

        let perpPosition: PerpPosition = isLong ? directionPerpPosition.longPosition : directionPerpPosition.shortPosition;

        // check margin
        if (perpPosition.size == 0) {
            perpPosition.positionId = self.positionIndexNext;
            self.positionIndexNext += 1;
        }

        // get global position
        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{};
        if (isLong) {
            globalPosition.longSize += sizeDelta;
        } else {
            globalPosition.shortSize += sizeDelta;
        }
        // update global value
        globalPosition.longValue = globalPosition.longSize * tradePrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * tradePrice / PRICE_DECIMAL_FACTOR;

        // get global lp position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {};

        // lp pnl
        let lpRealizedPnl: Int = 0;
        let sizeRemaining: Int = sizeDelta;
        if (globalLPPosition.netSize > 0 && (isLong == globalLPPosition.isLong)) {
            let sizeUsed: Int = min(globalLPPosition.netSize, sizeDelta);
            if (isLong) {
                lpRealizedPnl = sizeUsed * (tradePrice - globalLPPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLPPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
            }
            sizeRemaining -= sizeUsed;
            globalLPPosition.netSize -= sizeUsed;
            if (globalLPPosition.netSize == 0) {
                globalLPPosition.entryPrice = 0;
            }
        }
        // entry price
        if (sizeRemaining > 0) {
            globalLPPosition.entryPrice = (globalLPPosition.netSize * globalLPPosition.entryPrice + sizeRemaining * tradePrice) / (globalLPPosition.netSize + sizeRemaining);
            globalLPPosition.netSize += sizeRemaining;
            globalLPPosition.isLong = !isLong;
        }

        // trading fee
        let tradingFee: Int = 0;
        let lpTradingFee: Int = 0;
        let feeReserveDelta: Int = 0;
        if (sizeDelta > 0) {
            tradingFee = sizeDelta * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR);
            lpTradingFee = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;
            //todo
            let tradoorProfit: Int = 0;
            if (lpRealizedPnl > 0){
                tradoorProfit = lpRealizedPnl * self.normalPositionShareRate;
            }
            self.feeReserve += tradingFee - lpTradingFee + tradoorProfit;
            self.globalLPFund += lpRealizedPnl - tradoorProfit + lpTradingFee;
        }

        // funding fee
        let fundingFee: Int = (fundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
        let rolloverFee: Int = (rolloverFeeGrowth - perpPosition.entryRolloverFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;

        // update position
        let marginBefore: Int = perpPosition.margin;
        perpPosition.margin += marginDelta + fundingFee - tradingFee - rolloverFee;
        let marginDeltaAfter: Int = perpPosition.margin - marginBefore;

        perpPosition.entryPrice = (perpPosition.size * perpPosition.entryPrice + sizeDelta * tradePrice) / (perpPosition.size + sizeDelta);
        perpPosition.size += sizeDelta;
        perpPosition.entryFundingFeeGrowth = fundingFeeGrowth;
        perpPosition.entryRolloverFeeGrowth = rolloverFeeGrowth;

        // check maintain margin
        let unrealizedPnl: Int = 0;
        if (isLong) {
            unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }
        let maintenanceMargin: Int = perpPosition.size * tradePrice * (tokenConfig.tradingFeeRate + tokenConfig.maintenanceRate) / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
        require(maintenanceMargin < perpPosition.margin + unrealizedPnl, "margin rate too high");

        // check leverage
        require(perpPosition.margin * tokenConfig.maxLeverage >= perpPosition.size * perpPosition.entryPrice / PRICE_DECIMAL_FACTOR, "leverage too high");

        // update position
        if (isLong) {
            directionPerpPosition.longPosition = perpPosition;
            globalPosition.longMargin += marginDeltaAfter;
        } else {
            directionPerpPosition.shortPosition = perpPosition;
            globalPosition.shortMargin += marginDeltaAfter;
        }
        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.positions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLPPosition);

        let executionFeeMultiple: Int = 1;
        // create tp sl
        let orderExOpt: PerpOrderEx? = self.perpOrderExs.get(orderId);
        if (orderExOpt != null) {
            let orderEx: PerpOrderEx = orderExOpt!!;
            // create tp/sl
            if (orderEx.tpSize > 0 && orderEx.tpPrice > 0) {
                executionFeeMultiple += 1;
                self.createPerpOrder(trxId, OP_TYPE_PERP_DECREASE_TP, order.account, order.tokenId, order.isLong, 0, orderEx.tpSize, orderEx.tpPrice, 
                    orderEx.executionFee, now());
            }

            if (orderEx.slSize > 0 && orderEx.slPrice > 0) {
                executionFeeMultiple += 1;
                self.createPerpOrder(trxId, OP_TYPE_PERP_DECREASE_SL, order.account, order.tokenId, order.isLong, 0, orderEx.slSize, orderEx.slPrice, 
                    orderEx.executionFee, now());
            }
            // delete
            self.perpOrderExs.del(orderId);
        }

        self.perpOrders.del(orderId);
        if (order.executionFee > 0) {
            send(SendParameters{ to: sender(), value: order.executionFee, mode: SendIgnoreErrors});
            self.executionFeeReserve -= order.executionFee;
        }

        emit(PerpPositionIncreasedEvent{
            trxId: trxId,
            orderId: orderId,
            opType: opType,
            positionId: perpPosition.positionId,
            account: account,
            tokenId: tokenId,
            isLong: isLong,
            marginDelta: marginDeltaAfter,
            marginAfter: perpPosition.margin,
            sizeDelta: sizeDelta,
            sizeAfter: perpPosition.size,
            tradePrice: tradePrice,
            entryPrice: perpPosition.entryPrice,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            rolloverFee: rolloverFee,

            entryFundingFeeGrowthAfter: fundingFeeGrowth,
            entryRolloverFeeGrowthAfter: rolloverFeeGrowth,
            globalLongMarginAfter: globalPosition.longMargin,
            globalShortMarginAfter: globalPosition.shortMargin,
            globalLongSizeAfter: globalPosition.longSize,
            globalShortSizeAfter: globalPosition.shortSize,
            globalLongValueAfter: globalPosition.longValue,
            globalShortValueAfter: globalPosition.shortValue,

            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl,
        }.toCell());

        self.transferEstimatedRemainValue(self.executePerpOrderGas * executionFeeMultiple, sender(), -order.executionFee);
    }


    fun decreasePerpPosition(trxId: Int, orderId: Int, opType: Int, account: Address, tokenId: Int, isLong: Bool, marginDelta: Int, sizeDelta: Int, tradePrice: Int,
        fundingFeeGrowth: Int, rolloverFeeGrowth: Int) {
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");

        let order: PerpOrder = self.perpOrders.get(orderId)!!;

        let accountPerpPositionOpt: AccountPerpPosition? = self.positions.get(tokenId);
        let accountPerpPosition: AccountPerpPosition = accountPerpPositionOpt != null ? accountPerpPositionOpt!! : AccountPerpPosition{
            positions: emptyMap()
        };

        let directionPerpPositionOpt: DirectionPerpPosition? = accountPerpPosition.positions.get(account);
        let directionPerpPosition: DirectionPerpPosition = directionPerpPositionOpt != null ? directionPerpPositionOpt!! : DirectionPerpPosition{
            longPosition: PerpPosition {},
            shortPosition: PerpPosition {}
        };

        let perpPosition: PerpPosition = isLong ? directionPerpPosition.longPosition : directionPerpPosition.shortPosition;
        require(perpPosition.size > 0, "position not exist");

        if (sizeDelta > perpPosition.size) {
            sizeDelta = perpPosition.size;
        }

        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{};

        // funding fee
        let fundingFee: Int = (fundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
        let rolloverFee: Int = (rolloverFeeGrowth - perpPosition.entryRolloverFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;

        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {};

        let lpRealizedPnl: Int = 0;
        let sizeRemaining: Int = sizeDelta;
        if (globalLPPosition.netSize > 0 && (isLong != globalLPPosition.isLong)) {
            let sizeUsed: Int = min(globalLPPosition.netSize, sizeDelta);
            if (!isLong) {
                lpRealizedPnl = sizeUsed * (tradePrice - globalLPPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLPPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
            }
            sizeRemaining -= sizeUsed;
            globalLPPosition.netSize -= sizeUsed;
            if (globalLPPosition.netSize == 0) {
                globalLPPosition.entryPrice = 0;
            }
        }
        if (sizeRemaining > 0) {
            globalLPPosition.entryPrice = (globalLPPosition.netSize * globalLPPosition.entryPrice + sizeRemaining * tradePrice) / (globalLPPosition.netSize + sizeRemaining);
            globalLPPosition.netSize += sizeRemaining;
            globalLPPosition.isLong = isLong;
        }

        let tradingFee: Int = 0;
        let lpTradingFee: Int = 0;
        if (sizeDelta > 0) {
            tradingFee = sizeDelta * tradePrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR);
            lpTradingFee = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;
            let tradoorProfit: Int = 0;
            if (lpRealizedPnl > 0) {
                tradoorProfit = lpRealizedPnl * self.normalPositionShareRate;
            }
            self.feeReserve += tradingFee - lpTradingFee + tradoorProfit;
            self.globalLPFund += lpRealizedPnl - tradoorProfit + lpTradingFee;
        }
        let positionId: Int = perpPosition.positionId;
        let payout: Int = 0;
        let realizedPnl: Int = 0;
        if (isLong) {
            realizedPnl = sizeDelta * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            realizedPnl = sizeDelta * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }

        let marginBefore: Int = perpPosition.margin;
        perpPosition.margin += realizedPnl + fundingFee - tradingFee - rolloverFee;

        require(perpPosition.margin >= 0, "insufficient margin");
        // partially close position
        if (sizeDelta > 0 && sizeDelta < perpPosition.size && marginDelta == 0) {
            marginDelta = perpPosition.margin * sizeDelta / perpPosition.size;
        }
        if (marginDelta > perpPosition.margin) {
            marginDelta = perpPosition.margin;
        }
        perpPosition.margin -= marginDelta;
        perpPosition.size -= sizeDelta;
        perpPosition.entryFundingFeeGrowth = fundingFeeGrowth;
        perpPosition.entryRolloverFeeGrowth = rolloverFeeGrowth;
        let marginDeltaAfter: Int = marginBefore - perpPosition.margin;

        if (perpPosition.size > 0) {
            // check maintain margin
            let unrealizedPnl: Int = 0;
            if (isLong) {
                unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
            }
            let maintenanceMargin: Int = perpPosition.size * tradePrice * (tokenConfig.tradingFeeRate + tokenConfig.maintenanceRate) / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
            require(maintenanceMargin < perpPosition.margin + unrealizedPnl, "margin rate too high");

            // check leverage
            require(perpPosition.margin * tokenConfig.maxLeverage >= perpPosition.size * perpPosition.entryPrice / PRICE_DECIMAL_FACTOR, "leverage too high");

            payout = marginDelta;
        } else {
            // close position
            // withdraw all margin
            marginDeltaAfter += perpPosition.margin;
            payout = marginDelta + perpPosition.margin;
            perpPosition = PerpPosition {};
        }

        // update position
        if (isLong) {
            directionPerpPosition.longPosition = perpPosition;
            globalPosition.longMargin -= marginDeltaAfter;
            globalPosition.longSize -= sizeDelta;
        } else {
            directionPerpPosition.shortPosition = perpPosition;
            globalPosition.shortMargin -= marginDeltaAfter;
            globalPosition.shortSize -= sizeDelta;
        }
        globalPosition.longValue = globalPosition.longSize * tradePrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * tradePrice / PRICE_DECIMAL_FACTOR;

        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.positions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLPPosition);
        self.perpOrders.del(orderId);

        send(SendParameters{ to: order.account, value: payout, mode: SendIgnoreErrors | SendPayGasSeparately});
        self.orderAmountReserve -= payout;
        if (order.executionFee > 0) {
            send(SendParameters{ to: sender(), value: order.executionFee, mode: SendIgnoreErrors});
            self.executionFeeReserve -= order.executionFee;
        }

        emit(PerpPositionDecreasedEvent{
            trxId: trxId,
            orderId: orderId,
            opType: opType,
            positionId: positionId,
            account: account,
            tokenId: tokenId,
            isLong: isLong,
            marginDelta: marginDeltaAfter,
            marginAfter: perpPosition.margin,
            sizeDelta: sizeDelta,
            sizeAfter: perpPosition.size,
            tradePrice: tradePrice,
            entryPrice: perpPosition.entryPrice,
            realizedPnLDelta: realizedPnl,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            rolloverFee: rolloverFee,
            payout: payout,

            entryFundingFeeGrowthAfter: fundingFeeGrowth,
            entryRolloverFeeGrowthAfter: rolloverFeeGrowth,
            globalLongMarginAfter: globalPosition.longMargin,
            globalShortMarginAfter: globalPosition.shortMargin,
            globalLongSizeAfter: globalPosition.longSize,
            globalShortSizeAfter: globalPosition.shortSize,
            globalLongValueAfter: globalPosition.longValue,
            globalShortValueAfter: globalPosition.shortValue,

            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl
        }.toCell());

        self.transferEstimatedRemainValue(self.executePerpOrderGas, sender(), -order.executionFee - payout);
    }

    
    receive(msg: LiquidatePerpPosition) {
        let ctx: Context = context();
        require(ctx.value >= self.executePerpOrderGas + self.transferJettonGas, "gas not enough");
        require(self.executors.exists(ctx.sender), "invalid sender");

        let orderId: Int = self.perpOrderIndexNext;
        self.perpOrderIndexNext += 1;
        self.perpOrders.set(orderId, PerpOrder{
            opType: OP_TYPE_PERP_LIQUIDATION,
            tokenId: msg.tokenId,
            account: msg.account,
            isLong: msg.isLong,
            marginDelta: 0,
            sizeDelta: 0,
            triggerPrice: 0,
            triggerAbove: false,
            executionFee: 0,
            blockTime: now(),
            isPending: true
        });

        self.liquidatePerpPosition( msg.trxId, orderId, msg.account, msg.tokenId, msg.isLong, msg.price, msg.fundingFeeGrowth, msg.rolloverFeeGrowth);
    }

    fun liquidatePerpPosition(trxId: Int, orderId: Int, account: Address, tokenId: Int, isLong: Bool, tradePrice: Int, fundingFeeGrowth: Int, rolloverFeeGrowth: Int) {
        // get token config
        let tokenConfigOpt: TokenConfig? = self.tokenConfigs.get(tokenId);
        require(tokenConfigOpt != null, "invalid token");
        let tokenConfig: TokenConfig = tokenConfigOpt!!;
        require(tokenConfig.enable, "disabled token");

        let order: PerpOrder = self.perpOrders.get(orderId)!!;

        // get position
        let accountPerpPositionOpt: AccountPerpPosition? = self.positions.get(tokenId);
        let accountPerpPosition: AccountPerpPosition = accountPerpPositionOpt != null ? accountPerpPositionOpt!! : AccountPerpPosition{
            positions: emptyMap()
        };

        let directionPerpPositionOpt: DirectionPerpPosition? = accountPerpPosition.positions.get(account);
        let directionPerpPosition: DirectionPerpPosition = directionPerpPositionOpt != null ? directionPerpPositionOpt!! : DirectionPerpPosition{
            longPosition: PerpPosition {},
            shortPosition: PerpPosition {}
        };

        let perpPosition: PerpPosition = isLong ? directionPerpPosition.longPosition : directionPerpPosition.shortPosition;
        require(perpPosition.size > 0, "position not exist");

        // delta
        let marginDelta: Int = perpPosition.margin;
        let sizeDelta: Int = perpPosition.size;

        // get global position
        let globalPositionOpt: GlobalPosition? = self.globalPositions.get(tokenId);
        let globalPosition: GlobalPosition = globalPositionOpt != null ? globalPositionOpt!! : GlobalPosition{};

        // funding fee
        let fundingFee: Int = (fundingFeeGrowth - perpPosition.entryFundingFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;
        let rolloverFee: Int = (rolloverFeeGrowth - perpPosition.entryRolloverFeeGrowth) * perpPosition.size / PRICE_DECIMAL_FACTOR;

        // check maintain margin
        let unrealizedPnl: Int = 0;
        if (isLong) {
            unrealizedPnl = perpPosition.size * (tradePrice - perpPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
        } else {
            unrealizedPnl = perpPosition.size * (perpPosition.entryPrice - tradePrice) / PRICE_DECIMAL_FACTOR;
        }
        let maintenanceMargin: Int = perpPosition.size * tradePrice * (tokenConfig.tradingFeeRate + tokenConfig.maintenanceRate) / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR) + tokenConfig.liquidationFee;
        require(maintenanceMargin >= perpPosition.margin + fundingFee - rolloverFee + unrealizedPnl, "margin is too high to liquidate");

        let bankruptcyPrice: Int = ((perpPosition.margin + fundingFee - rolloverFee - tokenConfig.liquidationFee) * PRICE_DECIMAL_FACTOR + (isLong ? -perpPosition.entryPrice * perpPosition.size : perpPosition.entryPrice * perpPosition.size))
            / (perpPosition.size * (tokenConfig.tradingFeeRate + (isLong ? - PERCENTAGE_BASIS_POINT : PERCENTAGE_BASIS_POINT)) / PERCENTAGE_BASIS_POINT);

        // get global position
        let globalLPPositionOpt: GlobalLPPosition? = self.globalLPPositions.get(tokenId);
        let globalLPPosition: GlobalLPPosition = globalLPPositionOpt != null ? globalLPPositionOpt!! : GlobalLPPosition {};

        // lp pnl
        let lpRealizedPnl: Int = 0;
        let sizeRemaining: Int = sizeDelta;
        if (globalLPPosition.netSize > 0 && (isLong != globalLPPosition.isLong)) {
            let sizeUsed: Int = min(globalLPPosition.netSize, sizeDelta);
            if (!isLong) {
                lpRealizedPnl = sizeUsed * (bankruptcyPrice - globalLPPosition.entryPrice) / PRICE_DECIMAL_FACTOR;
            } else {
                lpRealizedPnl = sizeUsed * (globalLPPosition.entryPrice - bankruptcyPrice) / PRICE_DECIMAL_FACTOR;
            }
            sizeRemaining -= sizeUsed;
            globalLPPosition.netSize -= sizeUsed;
            if (globalLPPosition.netSize == 0) {
                globalLPPosition.entryPrice = 0;
            }
        }
        // lp entry price
        if (sizeRemaining > 0) {
            globalLPPosition.entryPrice = (globalLPPosition.netSize * globalLPPosition.entryPrice + sizeRemaining * bankruptcyPrice) / (globalLPPosition.netSize + sizeRemaining);
            globalLPPosition.netSize += sizeRemaining;
            globalLPPosition.isLong = isLong;
        }

        // trading fee
        let tradingFee: Int = sizeDelta * bankruptcyPrice * tokenConfig.tradingFeeRate / (PERCENTAGE_BASIS_POINT * PRICE_DECIMAL_FACTOR);
        let lpTradingFee: Int = tradingFee * tokenConfig.lpTradingFeeRate / PERCENTAGE_BASIS_POINT;
        let tradoorProfit: Int = lpRealizedPnl * self.liquidatedPositionShareRate;
        self.feeReserve += tradingFee - lpTradingFee + tradoorProfit;
        self.globalLPFund += lpRealizedPnl - tradoorProfit + lpTradingFee;

        let positionId: Int = perpPosition.positionId;
        let payout: Int = tokenConfig.liquidationFee;
        let realizedPnl: Int = -(marginDelta - tradingFee + fundingFee - rolloverFee);

        // close position
        perpPosition = PerpPosition {};

        // update position
        if (isLong) {
            directionPerpPosition.longPosition = perpPosition;
            globalPosition.longMargin -= marginDelta;
            globalPosition.longSize -= sizeDelta;
        } else {
            directionPerpPosition.shortPosition = perpPosition;
            globalPosition.shortMargin -= marginDelta;
            globalPosition.shortSize -= sizeDelta;
        }

        // update global value
        globalPosition.longValue = globalPosition.longSize * tradePrice / PRICE_DECIMAL_FACTOR;
        globalPosition.shortValue = globalPosition.shortSize * tradePrice / PRICE_DECIMAL_FACTOR;

        accountPerpPosition.positions.set(account, directionPerpPosition);
        self.positions.set(tokenId, accountPerpPosition);
        self.globalPositions.set(tokenId, globalPosition);
        self.globalLPPositions.set(tokenId, globalLPPosition);

        self.perpOrders.del(orderId);
        send(SendParameters{ to: sender(), value: payout, mode: SendIgnoreErrors | SendPayGasSeparately});

        if (order.executionFee > 0) {
            send(SendParameters{ to: sender(), value: order.executionFee, mode: SendIgnoreErrors});
            self.executionFeeReserve -= order.executionFee;
        }
        emit(PerpPositionDecreasedEvent{
            trxId: trxId,
            orderId: orderId,
            opType: OP_TYPE_PERP_LIQUIDATION,
            positionId: positionId,
            account: account,
            tokenId: tokenId,
            isLong: isLong,
            marginDelta: marginDelta,
            marginAfter: perpPosition.margin,
            sizeDelta: sizeDelta,
            sizeAfter: perpPosition.size,
            tradePrice: bankruptcyPrice,
            entryPrice: perpPosition.entryPrice,
            realizedPnLDelta: realizedPnl,
            tradingFee: tradingFee,
            fundingFee: fundingFee,
            rolloverFee: rolloverFee,
            payout: payout,

            entryFundingFeeGrowthAfter: fundingFeeGrowth,
            entryRolloverFeeGrowthAfter: rolloverFeeGrowth,
            globalLongMarginAfter: globalPosition.longMargin,
            globalShortMarginAfter: globalPosition.shortMargin,
            globalLongSizeAfter: globalPosition.longSize,
            globalShortSizeAfter: globalPosition.shortSize,
            globalLongValueAfter: globalPosition.longValue,
            globalShortValueAfter: globalPosition.shortValue,

            lpNetSizeAfter: globalLPPosition.netSize,
            lpIsLong: globalLPPosition.isLong,
            lpEntryPriceAfter: globalLPPosition.entryPrice,
            lpFundAfter: self.globalLPFund,
            lpTradingFee: lpTradingFee,
            lpRealizedPnl: lpRealizedPnl
        }.toCell());

        self.transferEstimatedRemainValue(self.executePerpOrderGas, sender(), -order.executionFee - payout);
    }
    
    receive(msg: ADLPerpPosition) {
        let ctx: Context = context();
        require(ctx.value >= self.executePerpOrderGas + self.transferJettonGas, "gas not enough");
        require(self.executors.get(ctx.sender) != null, "invalid sender");

        let orderId: Int = self.perpOrderIndexNext;
        self.perpOrderIndexNext += 1;
        self.perpOrders.set(orderId, PerpOrder{
            opType: OP_TYPE_PERP_ADL,
            tokenId: msg.tokenId,
            account: msg.account,
            isLong: msg.isLong,
            marginDelta: msg.marginDelta,
            sizeDelta: msg.sizeDelta,
            triggerPrice: 0,
            triggerAbove: false,
            executionFee: 0,
            blockTime: now(),
            isPending: true
        });

        self.decreasePerpPosition( msg.trxId, orderId, OP_TYPE_PERP_ADL, msg.account, msg.tokenId, msg.isLong, msg.marginDelta, msg.sizeDelta, msg.price, msg.fundingFeeGrowth, msg.rolloverFeeGrowth);
    }

    receive(msg: CreateCompensate) {
        require(self.compensator == sender(), "invalid sender");

        let ctx: Context = context();
        require(ctx.value >= self.createPerpOrderGas, "gas not enough");

        let compensateId: Int = self.compensateIndexNext;
        self.compensateIndexNext += 1;
        self.compensates.set(compensateId, Compensate{
            orderType: msg.orderType,
            orderId: msg.orderId,
            trxId: msg.trxId,
            refundReceiver: msg.refundReceiver,
            refundAmount: msg.refundAmount,
            executionFeeReceiver: msg.executionFeeReceiver,
            executionFee: msg.executionFee,
            unlockTime: now() + 1 * DAY
        });

        emit(CompensateCreatedEvent{
            compensateId: compensateId,
            orderType: msg.orderType,
            orderId: msg.orderId,
            trxId: msg.trxId,
            refundReceiver: msg.refundReceiver,
            refundAmount: msg.refundAmount,
            executionFeeReceiver: msg.executionFeeReceiver,
            executionFee: msg.executionFee,
            unlockTime: now() + 1 * DAY
        }.toCell());

        self.transferEstimatedRemainValue(self.createPerpOrderGas, sender(), 0);
    }

    /**
     * @dev This function is the entry point for executing or canceling a compensation.
     * @param msg The ExecuteOrCancelCompensate message containing the necessary information for execution or cancellation.
     */
    receive(msg: ExecuteOrCancelCompensate) {
        require(self.compensator == sender(), "invalid sender");
        require(context().value >= self.executePerpOrderGas, "gas not enough");

        let compensateOpt: Compensate? = self.compensates.get(msg.compensateId);
        require(compensateOpt != null, "compensate not exist");
        let compensate: Compensate = compensateOpt!!;

        if (msg.isCancel) {
            self.compensates.del(msg.compensateId);

            emit(CompensateCancelledEvent{
                compensateId: msg.compensateId,
                trxId: msg.trxId
            }.toCell());

            self.transferEstimatedRemainValue(self.cancelPerpOrderGas, sender(), 0);
            return;
        }

        require(now() >= compensate.unlockTime, "not reach unlock time");        

        if(compensate.orderType != null) {
            if (compensate.orderType == ORDER_TYPE_LP) {
                self.liquidityOrders.del(compensate.orderId);
            } else {
                self.perpOrders.del(compensate.orderId);
                self.perpOrderExs.del(compensate.orderId);
            }
        }
        let orderAmountReserveDelta: Int = 0;
        if (compensate.refundReceiver != null && compensate.refundAmount > 0) {
            send(SendParameters{ to: compensate.refundReceiver!!, value: compensate.refundAmount, mode: SendIgnoreErrors | SendPayGasSeparately });
            self.orderAmountReserve -= compensate.refundAmount;
            orderAmountReserveDelta = compensate.refundAmount;
        }

        let executionFeeReserveDelta: Int = 0;
        if (compensate.executionFeeReceiver != null && compensate.executionFee > 0) {
            send(SendParameters{ to: compensate.executionFeeReceiver!!, bounce: true, value: compensate.executionFee, mode: SendIgnoreErrors });
            self.executionFeeReserve -= compensate.executionFee;
            executionFeeReserveDelta = compensate.executionFee;
        }
        self.compensates.del(msg.compensateId);

        emit(CompensateExecutedEvent{
            compensateId: msg.compensateId,
            trxId: compensate.trxId
        }.toCell());

        self.transferEstimatedRemainValue(self.executePerpOrderGas, sender(), - executionFeeReserveDelta - orderAmountReserveDelta);
    }

    fun refundJetton(query_id: Int, amount: Int, destination: Address, response_destination: Address?) {
        if (amount > 0) {
            send(SendParameters{
                to: sender(),
                value: 0,
                mode: SendIgnoreErrors | SendRemainingValue,
                bounce: false,
                body: JettonTransfer{
                    query_id: query_id,
                    amount: amount,
                    destination: destination,
                    response_destination: response_destination,
                    custom_payload: null,
                    forward_ton_amount: 0,
                    forward_payload: beginCell().storeUint(0, 1).endCell().asSlice()
                }.toCell()
            });
        }
    }

    fun transferJetton(query_id: Int, amount: Int, destination: Address, response_destination: Address?) {
        if (amount > 0) {
            send(SendParameters{
                to: self.tlpWallet, 
                value: self.transferJettonGas,
                mode: SendIgnoreErrors, 
                bounce: false,
                body: JettonTransfer{
                    query_id: query_id,
                    amount: amount,
                    destination: destination,
                    response_destination: response_destination,
                    custom_payload: null,
                    forward_ton_amount: 0,
                    forward_payload: beginCell().storeUint(0, 1).endCell().asSlice()
                }.toCell()
            });
        }
    }

    fun transferEstimatedRemainValue(gasConsumption: Int, to: Address, tonReserveDelta: Int) {
        let ctx: Context = context();
        let tonBalanceBeforeMsg: Int = myBalance() - self.feeReserve - self.executionFeeReserve - self.orderAmountReserve + tonReserveDelta - ctx.value;
        tonBalanceBeforeMsg = max(0, tonBalanceBeforeMsg);
        let storageFee: Int = self.minStorageReserve - min(tonBalanceBeforeMsg, self.minStorageReserve);
        let extraValue: Int = !self.executors.exists(ctx.sender) ? 0 : max(0, tonBalanceBeforeMsg - self.minStorageReserve);

        let refundValue: Int = ctx.value - storageFee - gasConsumption + extraValue -  (tonReserveDelta > 0 ? tonReserveDelta : 0);

        if (refundValue > 0) {
            send(SendParameters{ to: to, value: refundValue, mode: SendIgnoreErrors });
        }
    }

    get fun accountInfo(account: Address): AccountInfo {
        let isExecutor: Bool = self.executors.get(account) != null;
        let isCompensator: Bool = self.compensator == account;
        let isClaimer: Bool = self.claimer == account;
        return AccountInfo{ isExecutor, isCompensator, isClaimer};
    }

    get fun perpPosition(tokenId: Int, account: Address?): PerpPositionData {
        let position: DirectionPerpPosition? = null;
        if (account != null) {
            let accountPerpPositionOpt: AccountPerpPosition? = self.positions.get(tokenId);
            if (accountPerpPositionOpt != null) {
                position = (accountPerpPositionOpt!!).positions.get(account!!);
            }
        }
        return PerpPositionData {
            perpPosition: position,
            globalLPPosition: self.globalLPPositions.get(tokenId),
            globalPosition: self.globalPositions.get(tokenId)
        };
    }

    get fun poolConfig(): PoolConfig {
        return PoolConfig {
            orderLockTime: self.orderLockTime,
            mintJettonGas: self.mintJettonGas,
            burnJettonGas: self.burnJettonGas,
            transferJettonGas: self.transferJettonGas,
            createPerpOrderGas: self.createPerpOrderGas,
            cancelPerpOrderGas: self.cancelPerpOrderGas,
            executePerpOrderGas: self.executePerpOrderGas,
            createLiquidityOrderGas: self.createLiquidityOrderGas,
            cancelLiquidityOrderGas: self.cancelLiquidityOrderGas,
            executeLiquidityOrderGas: self.executeLiquidityOrderGas,

            minStorageReserve: self.minStorageReserve,
            lpMinExecutionFee: self.lpMinExecutionFee,
            perpMinExecutionFee: self.perpMinExecutionFee,

            tlpWallet: self.tlpWallet,
            tlpJetton: self.tlpJetton,
            
            maxLpNetCap: self.maxLpNetCap,
        }
    }

    get fun tokenConfig(tokenId: Int): TokenConfig? {
        return self.tokenConfigs.get(tokenId);
    }

    get fun poolStat(): PoolStat {
        return PoolStat {
            tlpSupply: self.tlpSupply,
            orderAmountReserve: self.orderAmountReserve,
            executionFeeReserve: self.executionFeeReserve,
            feeReserve: self.feeReserve,
            globalLPFund: self.globalLPFund,
            globalLPUnrealizedPnl: self.globalLPUnrealizedPnl,
            globalLpFundingFeeGrowth: self.globalLpFundingFeeGrowth,
            globalRolloverFeeGrowth: self.globalRolloverFeeGrowth,
        };
    }

    get fun liquidityOrder(orderId: Int): LiquidityOrder? {
        return self.liquidityOrders.get(orderId);
    }

    get fun perpOrder(orderId: Int): PerpOrderData {
        return PerpOrderData{
            perpOrder: self.perpOrders.get(orderId),
            perpOrderEx: self.perpOrderExs.get(orderId)
        };
    }

    get fun compensate(compensateId: Int): Compensate? {
        return self.compensates.get(compensateId);
    }

}
