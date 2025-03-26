import {
    Blockchain,
    prettyLogTransactions,
    printTransactionFees,
    SandboxContract,
    TreasuryContract
} from '@ton/sandbox';
import { Dictionary, fromNano, toNano } from '@ton/core';
import { MockJettonWallet } from '../wrappers/MockJettonWallet';
import { MockJettonMaster as MockJetton } from '../wrappers/JettonMock';
import { Pool } from '../wrappers/Pool';
import { TestEnv } from './lib/TestEnv';
import { toPriceUnits } from './lib/TokenHelper';
import { createDecreaseLiquidityOrder, createIncreaseLiquidityOrder, executeLiquidityOrder } from './lib/LPHelper';
import '@ton/test-utils';
import {
    adlPerpPosition,
    cancelPerpOrder,
    claimProtocolFee,
    createDecreasePerpOrder,
    createIncreasePerpOrder,
    createTpSlPerpOrder,
    executePerpOrder,
    liquidatePerpPosition
} from './lib/PerpHelper';
import { ORDER_OP_TYPE_DECREASE_SL, ORDER_OP_TYPE_DECREASE_TP } from '../utils/constants';
import { now } from '../utils/util';

describe('PERP', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pool: SandboxContract<Pool>;
    let jetton: SandboxContract<MockJetton>;
    let executor: SandboxContract<TreasuryContract>;
    let compensator: SandboxContract<TreasuryContract>;
    let user0: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let user2: SandboxContract<TreasuryContract>;
    let user3: SandboxContract<TreasuryContract>;
    let user0JettonWallet: SandboxContract<MockJettonWallet>;
    let poolJettonWallet: SandboxContract<MockJettonWallet>;
    let claimExecutor: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        await TestEnv.resetEnv();

        blockchain = TestEnv.blockchain;
        deployer = TestEnv.deployer;
        pool = TestEnv.pool;
        executor = TestEnv.executor;
        compensator = TestEnv.compensator;
        user0 = TestEnv.user0;
        user1 = TestEnv.user1;
        user2 = TestEnv.user2;
        user3 = TestEnv.user3;
        claimExecutor = TestEnv.claimExecutor;
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    it('should executor cancel market increase perp order', async () => {
        let executionFee = 0.1;
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02;
        let triggerPrice = 51000;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.marginDelta).toEqual(toNano(margin));
        expect(createResult.order?.sizeDelta).toEqual(toNano(size));

        /// cancel order
        const cancelResult = await cancelPerpOrder(executor, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: user0.address,
            success: true
        });

        // check order
        expect(cancelResult.order).toBeNull();

        console.log('cancel order gas used:', fromNano(cancelResult.balanceBefore.executorTonBalance - cancelResult.balanceAfter.executorTonBalance + toNano(executionFee)));
    });

    it('should trader cancel limit increase perp order', async () => {
        let executionFee = 0.1;
        let isMarket = false;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02;
        let triggerPrice = 51000;

        // create order
        const createResult = await createIncreasePerpOrder(user0, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.marginDelta).toEqual(toNano(margin));
        expect(createResult.order?.sizeDelta).toEqual(toNano(size));

        /// cancel order
        const cancelResult = await cancelPerpOrder(user0, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: user0.address,
            success: true
        });

        // check order
        expect(cancelResult.order).toBeNull();

        console.log('cancel order gas used:', fromNano(cancelResult.balanceBefore.executorTonBalance - cancelResult.balanceAfter.executorTonBalance + toNano(executionFee)));
    });

    it('should execute increase perp market order', async () => {

        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // set block time
        const time1 = Math.floor(Date.now() / 1000);
        blockchain.now = time1;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);


        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let indexPrice = 50000;
        let pr = 0.001; // 0.1%

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        /// executor order
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeResult.orderAfter).toBeNull();

        // check position
        let perpPosition = executeResult.positionAfter;
        console.log('postion:', perpPosition);
        expect(perpPosition).not.toBeNull();

        expect(perpPosition?.size).toEqual(toNano(size));
        expect(perpPosition?.entryPrice).toBeGreaterThanOrEqual(toPriceUnits(indexPrice));

        // check global position
        let globalPosition = executeResult.positionDataAfter.globalPosition;
        console.log('globalPosition:', globalPosition);
        expect(globalPosition?.longMargin).toEqual(perpPosition?.margin);
        expect(globalPosition?.longSize).toEqual(perpPosition?.size);

        let globalLPPosition = executeResult.positionDataAfter.globalLPPosition;
        console.log('globalLPPosition:', globalLPPosition);
        expect(globalLPPosition?.netSize).toEqual(perpPosition?.size);
        expect(globalLPPosition?.isLong).toBeFalsy();

    });

    it('should cancel decrease perp order', async () => {
        /// create order
        let executionFee = 0.1;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02;
        let triggerPrice = 51000;

        // set block time
        const time1 = Math.floor(Date.now() / 1000);
        blockchain.now = time1;

        // create order
        const createResult = await createDecreasePerpOrder(user0, executionFee, tokenId, isLong, margin, size, triggerPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.marginDelta).toEqual(toNano(margin));
        expect(createResult.order?.sizeDelta).toEqual(toNano(size));

        /// cancel order
        const cancelResult = await cancelPerpOrder(executor, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(cancelResult.order).toBeNull();

        console.log('create order gas used:', fromNano(cancelResult.balanceBefore.executorTonBalance - cancelResult.balanceAfter.executorTonBalance + toNano(executionFee)));
    });

    it('should execute decrease perp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });
        expect(createResult.orderEx).toBeNull();

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position after increase:', executeResult.positionDataAfter);
        console.log('global pool after increase:', executeResult.poolStatAfter);

        /* =========================== decrease perp ================================ */
        /// create order
        let decreaseMargin = 50;
        let decreaseSize = 0.01;
        let decreaseTriggerPrice = 51000;
        let decreasePrice = 55000;

        // set block time
        blockchain.now = now();

        // create order
        const createDecreaseResult = await createDecreasePerpOrder(user1, executionFee, tokenId, isLong, decreaseMargin, decreaseSize, decreaseTriggerPrice);
        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        /// executor order
        _fundingFeeGrowth = 0;
        _rolloverFeeGrowth = 0;
        const executeDecreaseResult = await executePerpOrder(executor, createDecreaseResult.orderIdBefore, decreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        let perpPositionAfterDecrease = executeDecreaseResult.positionAfter;
        console.log('position after decrease:', executeDecreaseResult.positionDataAfter);
        console.log('global pool after decrease:', executeResult.poolStatAfter);

        // check position
        // let tradingFee = decreaseSize * decreasePrice * TestEnv.tradingFeeRate;
        let realizedPnl = (decreasePrice - increasePrice) * decreaseSize;
        expect(perpPositionAfterDecrease).not.toBeNull();
        expect(perpPositionAfterDecrease?.size).toEqual(perpPositionAfterIncrease?.size - toNano(decreaseSize));

        // check global position
        let globalPosition = executeDecreaseResult.positionDataAfter.globalPosition;
        console.log('globalPosition:', globalPosition);
        expect(globalPosition?.longMargin).toEqual(perpPositionAfterDecrease?.margin);
        expect(globalPosition?.longSize).toEqual(perpPositionAfterDecrease?.size);

        let globalLPPosition = executeDecreaseResult.positionDataAfter.globalLPPosition;
        console.log('globalLPPosition:', globalLPPosition);
        expect(globalLPPosition?.netSize).toEqual(perpPositionAfterDecrease?.size);
        expect(globalLPPosition?.isLong).toBeFalsy();

        /* =========================== close perp position ================================ */
        /// create order
        decreaseSize = size - decreaseSize;

        // create order
        const createDecreaseResult1 = await createDecreasePerpOrder(user1, executionFee, tokenId, isLong, decreaseMargin, decreaseSize, decreaseTriggerPrice);
        expect(createDecreaseResult1.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        /// executor order
        _fundingFeeGrowth = 0;
        _rolloverFeeGrowth = 0;
        const executeDecreaseResult1 = await executePerpOrder(executor, createDecreaseResult1.orderIdBefore, decreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult1.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult1.trxResult.transactions);
        expect(executeDecreaseResult1.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        console.log('position after close:', executeDecreaseResult1.positionDataAfter);
        console.log('global pool after close:', executeDecreaseResult1.poolStatAfter);

        // check position
        expect(executeDecreaseResult1.positionAfter.size).toEqual(0n);
        expect(executeDecreaseResult1.positionAfter.margin).toEqual(0n);

        // check global position
        let globalPositionAfterClose = executeDecreaseResult1.positionDataAfter.globalPosition;
        console.log('globalPositionAfterClose:', globalPositionAfterClose);
        expect(globalPositionAfterClose?.longMargin).toEqual(0n);
        expect(globalPositionAfterClose?.longSize).toEqual(0n);

        let globalLPPositionAfterClose = executeDecreaseResult1.positionDataAfter.globalLPPosition;
        console.log('globalLPPositionAfterClose:', globalLPPositionAfterClose);
        expect(globalLPPositionAfterClose?.netSize).toEqual(0n);
        expect(globalLPPositionAfterClose?.isLong).toBeFalsy();
    });

    it('should execute partial close perp position', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });
        expect(createResult.orderEx).toBeNull();

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position after increase:', executeResult.positionDataAfter);
        console.log('global pool after increase:', executeResult.poolStatAfter);

        /* =========================== decrease perp ================================ */
        /// create order
        let decreaseMargin = 0;
        let decreaseSize = 0.01;
        let decreaseTriggerPrice = 51000;
        let decreasePrice = 55000;

        // set block time
        blockchain.now = now();

        // create order
        const createDecreaseResult = await createDecreasePerpOrder(user1, executionFee, tokenId, isLong, decreaseMargin, decreaseSize, decreaseTriggerPrice);
        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        /// executor order
        _fundingFeeGrowth = 0;
        _rolloverFeeGrowth = 0;
        const executeDecreaseResult = await executePerpOrder(executor, createDecreaseResult.orderIdBefore, decreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        let perpPositionAfterDecrease = executeDecreaseResult.positionAfter;
        console.log('position after decrease:', executeDecreaseResult.positionDataAfter);
        console.log('global pool after decrease:', executeResult.poolStatAfter);

        // check position
        // let tradingFee = decreaseSize * decreasePrice * TestEnv.tradingFeeRate;
        expect(perpPositionAfterDecrease).not.toBeNull();
        expect(perpPositionAfterDecrease?.size).toEqual(perpPositionAfterIncrease?.size - toNano(decreaseSize));

    });

    it('should execute increase perp market order with tp/sl', async () => {
        console.log('should execute increase perp market order with tp/sl');
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // set block time
        blockchain.now = now();

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let indexPrice = 50000;
        let pr = 0.001;

        let tpSize = 0.01;
        let tpPrice = 51000;
        let slSize = 0.01;
        let slPrice = 49000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });
        console.log('pool ton balance after create order', fromNano(createResult.balanceAfter.poolTonBalance));

        /// cancel order
        const cancelResult = await cancelPerpOrder(executor, createResult.orderIdBefore);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        console.log('pool ton balance after cancel order', fromNano(cancelResult.balanceAfter.poolTonBalance));
        console.log('receive execution fee', fromNano(cancelResult.balanceAfter.user1TonBalance - cancelResult.balanceBefore.user1TonBalance));

        // create order
        const createResult1 = await createIncreasePerpOrder(user1, executionFee * 3, isMarket, tokenId, isLong, margin, size, triggerPrice, tpSize, tpPrice, slSize, slPrice);
        expect(createResult1.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });
        expect(createResult1.orderEx?.tpPrice).toEqual(toPriceUnits(tpPrice));
        expect(createResult1.orderEx?.tpSize).toEqual(toNano(tpSize));
        expect(createResult1.orderEx?.slPrice).toEqual(toPriceUnits(slPrice));
        expect(createResult1.orderEx?.slSize).toEqual(toNano(slSize));

        /// executor order
        const executeResult = await executePerpOrder(executor, createResult1.orderIdBefore, indexPrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeResult.orderAfter).toBeNull();
        expect(executeResult.orderExAfter).toBeNull();

        // check position
        let perpPosition = executeResult.positionAfter;
        console.log('postion:', perpPosition);

        expect(perpPosition).not.toBeNull();
        // let tradingFee = size * indexPrice * TestEnv.tradingFeeRate;
        expect(perpPosition?.size).toEqual(toNano(size));
        expect(perpPosition?.entryPrice).toBeGreaterThanOrEqual(toPriceUnits(indexPrice));

        // check tp order
        let tpOrderData = (await TestEnv.pool.getPerpOrder(createResult1.orderIdBefore + 1n));
        console.log('tpOrder after increase:', tpOrderData);

        let tpOrder = tpOrderData.perpOrder;
        expect(tpOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_TP);
        expect(tpOrder?.sizeDelta).toEqual(toNano(tpSize));
        expect(tpOrder?.triggerPrice).toEqual(toPriceUnits(tpPrice));
        expect(tpOrder?.triggerAbove).toEqual(true);
        expect(tpOrderData.perpOrderEx).toBeNull();

        // check sl order
        let slOrderData = (await TestEnv.pool.getPerpOrder(createResult1.orderIdBefore + 2n));
        console.log('slOrder after increase:', slOrderData);

        let slOrder = slOrderData.perpOrder;
        expect(slOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_SL);
        expect(slOrder?.sizeDelta).toEqual(toNano(slSize));
        expect(slOrder?.triggerPrice).toEqual(toPriceUnits(slPrice));
        expect(slOrder?.triggerAbove).toEqual(false);
        expect(slOrderData.perpOrderEx).toBeNull();

    });

    it('should execute tp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('global pool data after increase:', executeResult.poolStatAfter);

        /* =========================== decrease perp ================================ */
        /// create order
        let tpSize = 0.01;
        let tpPrice = 51000;
        let slSize = 0.01;
        let slPrice = 49000;
        let decreasePrice = 52000;

        // set block time
        const time1 = Math.floor(Date.now() / 1000);
        blockchain.now = time1;

        // create order
        const createDecreaseResult = await createTpSlPerpOrder(user1, executionFee, tokenId, isLong, tpSize, tpPrice, slSize, slPrice);
        printTransactionFees(createDecreaseResult.trxResult.transactions);
        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });
        console.log('pool ton balance', fromNano(createDecreaseResult.balanceAfter.poolTonBalance));

        let tpOrder = createDecreaseResult.order0;
        expect(tpOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_TP);
        expect(tpOrder?.sizeDelta).toEqual(toNano(tpSize));
        expect(tpOrder?.triggerPrice).toEqual(toPriceUnits(tpPrice));
        expect(tpOrder?.triggerAbove).toBeTruthy;

        let slOrder = createDecreaseResult.order1;
        expect(slOrder?.opType).toEqual(ORDER_OP_TYPE_DECREASE_SL);
        expect(slOrder?.sizeDelta).toEqual(toNano(slSize));
        expect(slOrder?.triggerPrice).toEqual(toPriceUnits(slPrice));
        expect(slOrder?.triggerAbove).toBeFalsy();

        /// executor order
        const executeDecreaseResult = await executePerpOrder(executor, createDecreaseResult.orderIdBefore, decreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        let perpPositionAfterDecrease = executeDecreaseResult.positionAfter;
        console.log('position data after decrease:', executeDecreaseResult.positionDataAfter);
        console.log('global pool data after decrease:', executeDecreaseResult.poolStatAfter);

        console.log('pool ton balance', fromNano(executeDecreaseResult.balanceAfter.poolTonBalance));

        // check position
        // let tradingFee = tpSize * decreasePrice * TestEnv.tradingFeeRate;
        let realizedPnl = (decreasePrice - increasePrice) * tpSize;
        expect(perpPositionAfterDecrease).not.toBeNull();
        expect(perpPositionAfterDecrease?.size).toEqual(perpPositionAfterIncrease?.size - toNano(tpSize));

        expect(executeDecreaseResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toNano(size - tpSize));
        expect(executeDecreaseResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

    });

    it('should liquidate long perp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('global pool data after increase:', executeResult.poolStatAfter);

        /* =========================== liquidate perp ================================ */
        let liquidatePrice = 45000;
        const liquidateResult = await liquidatePerpPosition(executor, tokenId, user1.address, isLong, liquidatePrice, 0);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        console.log('global position after liquidate:', liquidateResult.globalPositionAfter);

        // check position
        expect(liquidateResult.positionAfter.size).toEqual(0n);
        expect(liquidateResult.positionAfter.margin).toEqual(0n);

        expect(liquidateResult.globalLPPositionAfter?.netSize).toEqual(0n);

    });

    it('should liquidate short perp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = false;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 49000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('global pool data after increase:', executeResult.poolStatAfter);

        /* =========================== liquidate perp ================================ */
        let liquidatePrice = 56000;
        const liquidateResult = await liquidatePerpPosition(executor, tokenId, user1.address, isLong, liquidatePrice, 0);
        printTransactionFees(liquidateResult.trxResult.transactions);
        expect(liquidateResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        console.log('position after liquidate:', liquidateResult.positionAfter);
        console.log('global position after liquidate:', liquidateResult.globalPositionAfter);

        // check position
        expect(liquidateResult.positionAfter.size).toEqual(0n);
        expect(liquidateResult.positionAfter.margin).toEqual(0n);

        expect(liquidateResult.globalLPPositionAfter?.netSize).toEqual(0n);

    });

    it('should adl perp', async () => {
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 100;
        let size = 0.02; // 1000u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        let perpPositionAfterIncrease = executeResult.positionAfter;
        console.log('position data after increase:', executeResult.positionDataAfter);
        console.log('global pool data after increase:', executeResult.poolStatAfter);

        /* =========================== adl perp ================================ */
        let adlMargin = 50;
        let adlSize = 0.01;
        let adlPrice = 48000;

        const adlResult = await adlPerpPosition(executor, tokenId, user1.address, isLong, adlMargin, adlSize, adlPrice, 0);
        expect(adlResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        let adlPosition = adlResult.positionAfter;
        console.log('global position after adl:', adlPosition);

        // check position
        expect(adlPosition?.size).toEqual(perpPositionAfterIncrease?.size - toNano(adlSize));
        expect(adlResult.globalLPPositionAfter?.netSize).toEqual(perpPositionAfterIncrease?.size - toNano(adlSize));
        expect(adlResult.globalLPPositionAfter?.isLong).toBeFalsy();

    });

    it('should claim funding fee', async () => {
        // set block time
        blockchain.now = Math.floor(Date.now() / 1000);
        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 100000;
        let executionFee = 0.1;
        const prices = Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tpl balance
        let user0TlpBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance:', user0TlpBalance);
        expect(user0TlpBalance).toBeGreaterThan(0);

        /* =========================== increase long perp ================================ */
        let isMarket = true;
        let tokenId = 1;
        let isLong = true;
        let margin = 50;
        let size = 0.01; // 500u
        let triggerPrice = 51000;
        let increasePrice = 50000;
        let _fundingFeeGrowth = 0;
        let _rolloverFeeGrowth = 0;

        // create order
        const createResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, isLong, margin, size, triggerPrice, 0, 0, 0, 0);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        expect(executeResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toNano(size));
        expect(executeResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

        /* =========================== increase short perp ================================ */
        let increaseShortMargin = 100;
        let increaseShortSize = 0.02;
        let increaseShortTriggerPrice = 50000;
        let increaseShortIncreasePrice = 51000;

        // create order
        const createIncreaseShortResult = await createIncreasePerpOrder(user1, executionFee, isMarket, tokenId, false, increaseShortMargin, increaseShortSize, increaseShortTriggerPrice, 0, 0, 0, 0);
        expect(createIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });

        // executor order
        const executeIncreaseShortResult = await executePerpOrder(executor, createIncreaseShortResult.orderIdBefore, increaseShortIncreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeIncreaseShortResult.trxResult.transactions);
        expect(executeIncreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        expect(executeIncreaseShortResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toNano(increaseShortSize - size));
        expect(executeIncreaseShortResult.positionDataAfter.globalLPPosition?.isLong).toBeTruthy();

        /* =========================== decrease short perp ================================ */
        blockchain.now = blockchain.now + 10 * 60; // 1 hour

        let decreaseShortMargin = 100;
        let decreaseShortSize = 0.02;
        let decreaseShortTriggerPrice = 51000;
        let decreaseShortIncreasePrice = 50000;
        _fundingFeeGrowth = 1;
        _rolloverFeeGrowth = 1;

        // create order
        const createDecreaseShortResult = await createDecreasePerpOrder(user1, executionFee, tokenId, false, decreaseShortMargin, decreaseShortSize, decreaseShortTriggerPrice);
        expect(createDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true
        });
        console.log('decrease short order:', createDecreaseShortResult.order);

        // executor order
        const executeDecreaseShortResult = await executePerpOrder(executor, createDecreaseShortResult.orderIdBefore, decreaseShortIncreasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeDecreaseShortResult.trxResult.transactions);
        expect(executeDecreaseShortResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true
        });
        expect(executeDecreaseShortResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toNano(size));
        expect(executeDecreaseShortResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

        /* =========================== claim protocol fee ================================ */
        console.log('>>>>>poolStat before claim', await pool.getPoolStat());

        const claimResult = await claimProtocolFee(user3);
        printTransactionFees(claimResult.trxResult.transactions);
        expect(claimResult.trxResult.transactions).toHaveTransaction({
            from: claimExecutor.address,
            to: pool.address,
            success: true
        });
        console.log('>>>>>poolStat after claim', await pool.getPoolStat());

    });

});
