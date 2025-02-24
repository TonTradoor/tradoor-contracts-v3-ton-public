import { toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { getLastTransaction, waitForTransaction, attachPool } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    let trxId = BigInt(await provider.ui().input('trxId:'));

    /// create order
    let amount = Number(await provider.ui().input('amount:'));
    let executionFee = 0.1;

    const lastTrx = await getLastTransaction(provider, pool.address);
    await pool.send(
        provider.sender(),
        {
            value: toNano(0.2 + executionFee + amount),
        },
        {
            $$type: 'CreateAddLiquidityOrder',
            executionFee: toNano(executionFee),
            amount: toNano(amount),
            trxId: trxId
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`create add liquidity order success`);
    }

}
