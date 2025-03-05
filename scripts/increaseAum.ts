import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { getLastTransaction, waitForTransaction, attachPool } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);
    
    let amount = await provider.ui().input('amount:');

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano(0.2 + amount),
        },
        {
            $$type: 'IncreaseAum',
            amount: toNano(amount)
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`increase aum success`);
    }

}
