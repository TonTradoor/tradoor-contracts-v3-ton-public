import { Dictionary, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { attachPool, getLastTransaction, toPrice, waitForTransaction } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    let orderId = BigInt(await provider.ui().input('orderId:'));
    console.log(`orderId:`, orderId);

    let prices =  Dictionary.empty(Dictionary.Keys.Int(16), Dictionary.Values.BigInt(128))
    prices.set(1, toPrice(100000));
    prices.set(2, toPrice(3000));

    // execute order
    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.5'),
        },
        {
            $$type: 'ExecuteLiquidityOrder',
            orderId: orderId,
            trxId: 1n,
            prices: prices,
            lpFundingFeeGrowth: toNano(0),
            rolloverFeeGrowth: toNano(0),
        }
    );
    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`execute liquidity order success`);
    }

}
