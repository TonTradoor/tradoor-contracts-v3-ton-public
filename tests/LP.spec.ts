import { Blockchain, SandboxContract, TreasuryContract, prettyLogTransactions, printTransactionFees } from '@ton/sandbox';
import { toNano, fromNano, Dictionary } from '@ton/core';
import { TLPJettonWallet as TLPJettonWallet } from '../wrappers/TLPJettonWallet';
import { TLPJettonMaster as TLPJetton } from '../wrappers/JettonTLP';
import { Pool } from '../wrappers/Pool';
import { TestEnv } from './lib/TestEnv';
import {
    delistToken,
    fromTlpUnits,
    getFriendlyTonBalance,
    getTonBalance,
    toJettonUnits,
    toPriceUnits, toTlpUnits
} from './lib/TokenHelper';
import { cancelLiquidityOrder, createDecreaseLiquidityOrder, createIncreaseLiquidityOrder, executeLiquidityOrder } from './lib/LPHelper';
import '@ton/test-utils';
import {createIncreasePerpOrder, executePerpOrder} from "./lib/PerpHelper";
import { now } from '../utils/util';

describe('LP', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pool: SandboxContract<Pool>;
    let tlp: SandboxContract<TLPJetton>;
    let executor: SandboxContract<TreasuryContract>;
    let compensator: SandboxContract<TreasuryContract>;
    let user0: SandboxContract<TreasuryContract>;
    let user1: SandboxContract<TreasuryContract>;
    let poolTlpWallet: SandboxContract<TLPJettonWallet>;
    let user0TlpWallet: SandboxContract<TLPJettonWallet>;
    let user1TlpWallet: SandboxContract<TLPJettonWallet>;

    beforeEach(async () => {
        await TestEnv.resetEnv();

        blockchain = TestEnv.blockchain;
        deployer = TestEnv.deployer;
        pool = TestEnv.pool;
        tlp = TestEnv.tlp;
        executor = TestEnv.executor;
        compensator = TestEnv.compensator;
        user0 = TestEnv.user0;
        user1 = TestEnv.user1;
        poolTlpWallet = TestEnv.poolTlpWallet;
        user0TlpWallet = TestEnv.user0TlpWallet;
        user1TlpWallet = TestEnv.user1TlpWallet;
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
    });

    it('should delist token', async () => {
        // the check is done inside beforeEach
        // blockchain and pool are ready to use
        const res = await delistToken(2n);
        expect(res.trxResult.transactions).toHaveTransaction({
            from: TestEnv.deployer.address,
            to: pool.address,
            success: true,
        });
        expect(res.tokenConfigBefore).not.toBeNull();
        expect(res.tokenConfigAfter).toBeNull();
    });

    it('auto refund -- not enough execution fee', async () => {
        let liquidity = 10;
        let executionFee = 0.04;
        
        // get pool TON balance
        console.log("poolTonBalance", await getFriendlyTonBalance(pool.address));

        // create order
        let createResult = await createIncreaseLiquidityOrder(user0, liquidity, executionFee);
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });

        // check index
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);

        // check order
        expect(createResult.order).toBeNull();

        // check pool TON balance
        console.log("poolTonBalanceAfter", await getFriendlyTonBalance(pool.address));
    });

    it('auto refund -- stopped', async () => {
        let liquidity = 10;
        let executionFee = 0.05;
        
        // get pool TON balance
        console.log("poolTonBalance", await getFriendlyTonBalance(pool.address));

        // stop
        const trxResult = await TestEnv.pool.send(
            deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            "Stop"
        );
        printTransactionFees(trxResult.transactions);
        expect(trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            success: true,
        });

        // create order
        let createResult = await createIncreaseLiquidityOrder(user0, liquidity, executionFee);
        printTransactionFees(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });

        // check index
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);

        // check order
        expect(createResult.order).toBeNull();

        // resume
        const trxResult1 = await TestEnv.pool.send(
            deployer.getSender(),
            {
                value: toNano('0.1'),
            },
            "Resume"
        );
        printTransactionFees(trxResult.transactions);
        expect(trxResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pool.address,
            success: true,
        });

        // create order
        let createResult1 = await createIncreaseLiquidityOrder(user0, liquidity, executionFee);
        printTransactionFees(createResult1.trxResult.transactions);
        expect(createResult1.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });

        // check index
        expect(createResult1.orderIdAfter).toEqual(createResult1.orderIdBefore + 1n);

        // check order
        expect(createResult1.order).not.toBeNull();
    });

    it('should create increase LP order', async () => {
        /// create order
        let liquidity = 10;
        let executionFee = 0.1;

        // set block time
        blockchain.now = now(); 

        // create order
        const createResult = await createIncreaseLiquidityOrder(user0, liquidity, executionFee);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);

        console.log('create order gas used:', fromNano(createResult.balanceBefore.user0TonBalance - createResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.amount).toEqual(toJettonUnits(liquidity));
    });

    it('should cancel increase LP order', async () => {
        /// create order
        let liquidity = 10;
        let executionFee = 0.1;

        // set block time
        blockchain.now = now();

        // create order
        const createResult = await createIncreaseLiquidityOrder(user0, liquidity, executionFee);

        /// cancel order
        const cancelResult = await cancelLiquidityOrder(executor, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: pool.address,
            to: user0.address,
            success: true,
        });

        // check order
        expect(cancelResult.order).toBeNull();

        console.log('cancel order gas used:', fromNano(cancelResult.balanceBefore.executorTonBalance - cancelResult.balanceAfter.executorTonBalance + toNano(executionFee)));
    });

    it('should execute increase LP', async () => {
        /// create order
        let liquidity = 1000;
        let executionFee = 0.1;

        // set block time
        blockchain.now = now();

        // create order
        const createResult = await createIncreaseLiquidityOrder(user0, liquidity, executionFee);
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });

        /// executor order
        const prices =  Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128))
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        const lpFundingFeeGrowth = 10;
        const rolloverFeeGrowth = 20;

        const executeResult = await executeLiquidityOrder(executor, createResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeResult.orderAfter).toBeNull();

        // check tlp
        let user0TlpBalance = executeResult.balanceAfter.user0TlpBalance;
        expect(user0TlpBalance).toBeGreaterThan(0);
    });

    it('should create decrease LP order failed - insufficient quota of liquidity', async () => {
        /// create order
        let liquidity = 100001;
        let executionFee = 0.1;

        // set block time
        blockchain.now = now();

        // create order
        const createResult = await createIncreaseLiquidityOrder(user0, liquidity, executionFee);
        printTransactionFees(createResult.trxResult.transactions);
        prettyLogTransactions(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });

        /// executor order
        const prices =  Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128))
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        const lpFundingFeeGrowth = 0;
        const rolloverFeeGrowth = 0;

        const executeResult = await executeLiquidityOrder(executor, createResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        prettyLogTransactions(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: false,
        });
    });

    it('should create decrease LP order failed - insufficient tlp-jetton', async () => {
        let tlpAmount = 10;
        let executionFee = 0.1;

        // set block time
        blockchain.now = now();

        // create order
        const createResult = await createDecreaseLiquidityOrder(user0, tlpAmount, executionFee);
        console.log('order:', createResult.order);

        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: user0TlpWallet.address,
            success: false,
        });

        console.log('create order gas used:', fromNano(createResult.balanceBefore.user0TonBalance - createResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore);
        expect(createResult.order).toBeNull();
    });

    it('should create & cancel decrease LP order successfully', async () => {
        // set block time
        blockchain.now = now();

        /// create order
        let liquidity = 100;
        let executionFee = 0.1;
        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, liquidity, executionFee);
        printTransactionFees(createIncreaseResult.trxResult.transactions);
        prettyLogTransactions(createIncreaseResult.trxResult.transactions);
        expect(createIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });
        // wait for 6s (cancel )
        blockchain.now += 60;

        /// executor order
        const prices =  Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        console.log(">>>>>>>>user0TLPBalance", fromTlpUnits(executeIncreaseResult.balanceAfter.user0TlpBalance));
        let tlpAmount = 50;

        // set block time
        blockchain.now += 60;

        // create order
        const createResult = await createDecreaseLiquidityOrder(user0, tlpAmount, executionFee);
        console.log('order:', createResult.order);

        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: poolTlpWallet.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(createResult.orderIdAfter).toEqual(createResult.orderIdBefore + 1n);
        expect(createResult.order).not.toBeNull();
        expect(createResult.order?.amount).toEqual(toTlpUnits(tlpAmount));

        /// cancel order
        const cancelResult = await cancelLiquidityOrder(executor, createResult.orderIdBefore);
        printTransactionFees(cancelResult.trxResult.transactions);
        prettyLogTransactions(cancelResult.trxResult.transactions);

        expect(cancelResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(cancelResult.order).toBeNull();
    });

    it('should decrease LP successfully', async () => {
        // set block time
        blockchain.now = now();

        /// create order
        let liquidity = 100.5;
        let executionFee = 0.1;
        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;
        const prices =  Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, liquidity, executionFee);
        printTransactionFees(createIncreaseResult.trxResult.transactions);
        prettyLogTransactions(createIncreaseResult.trxResult.transactions);
        expect(createIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: user0.address,
            to: pool.address,
            success: true,
        });
        // wait for 6s (cancel )
        blockchain.now += 60;

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        const  user0TLPBalance = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log(">>>>>>>>user0TLPBalance", fromTlpUnits(executeIncreaseResult.balanceAfter.user0TlpBalance));

        let tlpAmount = 50;

        // set block time
        blockchain.now += 60;

        // create order
        const createDecreaseResult = await createDecreaseLiquidityOrder(user0, tlpAmount, executionFee);
        console.log('order:', createDecreaseResult.order);

        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: poolTlpWallet.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(createDecreaseResult.orderIdAfter).toEqual(createDecreaseResult.orderIdBefore + 1n);
        expect(createDecreaseResult.order).not.toBeNull();
        expect(createDecreaseResult.order?.amount).toEqual(toTlpUnits(tlpAmount));

        blockchain.now += 60;
        /// executor order
        const executeDecreaseResult = await executeLiquidityOrder(executor, createDecreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeDecreaseResult.orderAfter).toBeNull();

        // check tlp
        let user0TLPBalance1 = executeDecreaseResult.balanceAfter.user0TlpBalance;
        expect(user0TLPBalance1).toBeGreaterThan(0n);
        expect(user0TLPBalance1).toEqual(user0TLPBalance - toTlpUnits(tlpAmount));

    });

    it('should increase LP with bonus', async () => {
        // set block time
        blockchain.now = now();

        /* =========================== increase LP ================================ */
        /// create order
        let lpLiquidity = 10000;
        let executionFee = 0.1;
        
        const prices =  Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128));
        prices.set(1, toPriceUnits(60000)).set(2, toPriceUnits(3000));
        let lpFundingFeeGrowth = 0;
        let rolloverFeeGrowth = 0;

        // create order
        const createIncreaseResult = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);
        printTransactionFees(createIncreaseResult.trxResult.transactions);

        console.log('create increase LP order gas used:', fromNano(createIncreaseResult.balanceBefore.user0TonBalance - createIncreaseResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        /// executor order
        const executeIncreaseResult = await executeLiquidityOrder(executor, createIncreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult.trxResult.transactions);
        prettyLogTransactions(executeIncreaseResult.trxResult.transactions);
        expect(executeIncreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        // check order
        expect(executeIncreaseResult.orderAfter).toBeNull();

        // check tlp balance
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
        printTransactionFees(createResult.trxResult.transactions);
        expect(createResult.trxResult.transactions).toHaveTransaction({
            from: user1.address,
            to: pool.address,
            success: true,
        });
        console.log('create increase long perp order gas used:', fromNano(createResult.balanceBefore.user1TonBalance - createResult.balanceAfter.user1TonBalance - toNano(executionFee)));

        // executor order
        const executeResult = await executePerpOrder(executor, createResult.orderIdBefore, increasePrice, _fundingFeeGrowth, _rolloverFeeGrowth);
        printTransactionFees(executeResult.trxResult.transactions);
        expect(executeResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        console.log('execute increase long perp order gas used:', fromNano(executeResult.balanceBefore.executorTonBalance - executeResult.balanceAfter.executorTonBalance + toNano(executionFee)));

        console.log('position after increase long:', executeResult.positionDataAfter);

        expect(executeResult.positionDataAfter.globalLPPosition?.netSize).toEqual(toJettonUnits(size));
        expect(executeResult.positionDataAfter.globalLPPosition?.isLong).toBeFalsy();

        /* =========================== increase LP ================================ */
        /// create order
        const createIncreaseResult1 = await createIncreaseLiquidityOrder(user0, lpLiquidity, executionFee);
        printTransactionFees(createIncreaseResult1.trxResult.transactions);

        console.log('create increase LP order gas used:', fromNano(createIncreaseResult1.balanceBefore.user0TonBalance - createIncreaseResult1.balanceAfter.user0TonBalance - toNano(executionFee)));

        /// executor order
        prices.set(1, toPriceUnits(61000)).set(2, toPriceUnits(3100));
        lpFundingFeeGrowth = 0;
        rolloverFeeGrowth = 0;

        const executeIncreaseResult1 = await executeLiquidityOrder(executor, createIncreaseResult1.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeIncreaseResult1.trxResult.transactions);
        expect(executeIncreaseResult1.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });

        console.log('execute increase LP order gas used:', fromNano(executeIncreaseResult1.balanceBefore.executorTonBalance - executeIncreaseResult1.balanceAfter.executorTonBalance + toNano(executionFee)));

        // check order
        expect(executeIncreaseResult1.orderAfter).toBeNull();

        // check tlp balance
        let user0TlpBalance1 = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance1:', user0TlpBalance1);
        expect(user0TlpBalance1).toBeGreaterThan(0);

        /* =========================== decrease LP ================================ */
        // after 1 days
        blockchain.now += 10 * 24 * 60 * 60;
        let decreaseTlpAmount = 5000;

        // create order
        const createDecreaseResult = await createDecreaseLiquidityOrder(user0, decreaseTlpAmount, executionFee);
        console.log('order:', createDecreaseResult.order);

        expect(createDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: poolTlpWallet.address,
            to: pool.address,
            success: true,
        });

        console.log('create order gas used:', fromNano(createDecreaseResult.balanceBefore.user0TonBalance - createDecreaseResult.balanceAfter.user0TonBalance - toNano(executionFee)));

        // check order
        expect(createDecreaseResult.orderIdAfter).toEqual(createDecreaseResult.orderIdBefore + 1n);
        expect(createDecreaseResult.order).not.toBeNull();
        expect(createDecreaseResult.order?.amount).toEqual(toTlpUnits(decreaseTlpAmount));

        blockchain.now = blockchain.now + 10;
        /// executor order
        prices.set(1, toPriceUnits(61000)).set(2, toPriceUnits(3100));
        lpFundingFeeGrowth = 1;
        rolloverFeeGrowth = 1;
        const executeDecreaseResult = await executeLiquidityOrder(executor, createDecreaseResult.orderIdBefore, prices, lpFundingFeeGrowth, rolloverFeeGrowth);
        printTransactionFees(executeDecreaseResult.trxResult.transactions);
        prettyLogTransactions(executeDecreaseResult.trxResult.transactions);
        expect(executeDecreaseResult.trxResult.transactions).toHaveTransaction({
            from: executor.address,
            to: pool.address,
            success: true,
        });
        
        // check position
        let user0TlpBalance2 = executeIncreaseResult.balanceAfter.user0TlpBalance;
        console.log('user0TlpBalance2:', user0TlpBalance2);
        expect(user0TlpBalance2).toBeGreaterThan(0);
        
    });

});
