import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { getLastTransaction, waitForTransaction, attachPool } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    const orderId = BigInt(await provider.ui().input('orderId:'));

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano('0.2'),
        },
        {
            $$type: 'CancelPerpOrder',
            orderId: orderId,
            trxId: 1n,
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`cancel perp order submitted...`);
    }

}
