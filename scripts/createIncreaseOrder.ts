import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { now, getLastTransaction, waitForTransaction, attachPool, attachMockJettonWallet, toUnits } from '../utils/util';
import { PRICE_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    // create order
    let executionFee = 0.1;
    let isMarket = true;
    let tokenId = 1;
    let isLong = true;
    let margin = 100;
    let size = 0.01;
    let triggerPrice = 70000;

    
    let trxId = BigInt(await provider.ui().input('trxId:'));

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano(0.2 + executionFee + margin),
        },
        {
            $$type: 'CreateIncreasePerpOrder',
            trxId: trxId,
            tokenId: BigInt(tokenId),
            isLong: isLong,
            isMarket: isMarket,
            marginDelta: toNano(margin),
            sizeDelta: toNano(size),
            triggerPrice: toUnits(triggerPrice, PRICE_DECIMAL),
            requestTime: BigInt(now()),
            executionFee: toNano(executionFee),
            tpSize: toNano(0),
            tpPrice: toUnits(0, PRICE_DECIMAL),
            slSize: toNano(0),
            slPrice: toUnits(0, PRICE_DECIMAL),
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
