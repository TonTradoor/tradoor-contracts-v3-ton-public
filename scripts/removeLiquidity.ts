import { beginCell, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    toUnits,
    getLastTransaction,
    waitForTransaction,
    attachPool,
    attachTLPJettonWallet
} from '../utils/util';
import { TLP_DECIMAL } from '../utils/constants';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    let trxId = BigInt(await provider.ui().input('trxId:'));

    /// create order
    let tlpAmount = Number(await provider.ui().input('tlpAmount:'));
    let executionFee = 0.1;


    let tlpWallet = await attachTLPJettonWallet(provider, provider.sender().address!!);
    let tlpWalletData = await tlpWallet.getGetWalletData();
    console.log('user TLP-Jetton balance:', tlpWalletData.balance);

    const lastTrx = await getLastTransaction(provider, pool.address);
    await tlpWallet.send(
        provider.sender(),
        {
            value: toNano(executionFee + 0.2),
        },
        {
            $$type: 'JettonTransfer',
            query_id: trxId,
            amount: toUnits(tlpAmount, TLP_DECIMAL),
            destination: pool.address,
            response_destination: provider.sender().address!!,
            custom_payload: null,
            forward_ton_amount: toNano(executionFee + 0.1),
            forward_payload: beginCell().storeCoins(toNano(executionFee)).asSlice()
        }
    );

    // wait for trx
    const transDone = await waitForTransaction(provider, pool.address, lastTrx, 20);
    if (transDone) {
        console.log(`create remove liquidity order success`);
    }

    // get pool TLP-jetton wallet address
    let poolTlpWallet = await attachTLPJettonWallet(provider, pool.address);
    let poolTlpData = await poolTlpWallet.getGetWalletData();

    console.log('pool TLP-jetton balance:', poolTlpData.balance);

}
