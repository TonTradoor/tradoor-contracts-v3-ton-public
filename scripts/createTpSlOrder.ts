import { beginCell, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { now, getLastTransaction, waitForTransaction, attachPool, attachMockJettonWallet, toUnits } from '../utils/util';
import { MOCK_DECIMAL, OP_CREATE_INCREASE_PERP_POSITION_ORDER, PRICE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    /// create order
    let executionFee = 0.1;
    let isMarket = true;
    let tokenId = 1;
    let isLong = true;
    let margin = 100;
    let size = 0.01;
    let triggerPrice = 60000;
    let tpPrice = 61000;
    let slPrice = 59000;

    // transfer jetton with create increase perp position order payload
    // get user jetton wallet address
    let user0JettonWallet = await attachMockJettonWallet(provider, provider.sender().address!!);
    // get user jetton balance
    if (!await provider.isContractDeployed(user0JettonWallet.address)) {
        console.log('user jetton wallet:', user0JettonWallet.address);
        return;
    }
    let user0JettonData = await user0JettonWallet.getGetWalletData();
    console.log(`user jetton wallet ${user0JettonWallet.address} balance ${user0JettonData.balance}`);

    let trxId = BigInt(await provider.ui().input('trxId:'));
    executionFee *= 2;

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano(0.2 + executionFee),
        },
        {
            $$type: 'CreateTpSlPerpOrder',
            executionFee: toNano(executionFee),
            tokenId: BigInt(tokenId),
            isLong: isLong,
            tpSize: toNano(size),
            tpPrice: toUnits(tpPrice, PRICE_DECIMAL),
            slSize: toNano(size),
            slPrice: toUnits(slPrice, PRICE_DECIMAL),
            trxId: trxId,
            requestTime: BigInt(now())
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`create increase success`);
    }

    // get pool jetton wallet address 
    let poolJettonWallet = await attachMockJettonWallet(provider, pool.address);
    let poolJettonData = await poolJettonWallet.getGetWalletData();

    console.log('pool jetton balance:', poolJettonData.balance);

}
