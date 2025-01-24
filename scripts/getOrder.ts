import { NetworkProvider } from '@ton/blueprint';
import { attachPool } from '../utils/util';

export async function run(provider: NetworkProvider) {
    const pool = attachPool(provider);

    const orderId = BigInt(await provider.ui().input('orderId:'));
    await provider.ui().choose('Choose order type:', [
        'LiquidityOrder',
        'PerpOrder',
    ], a => a).then(async (event) => {
        if (event === 'LiquidityOrder') {
            const order = await pool.getLiquidityOrder(orderId);
            console.log(`order:`, order);
        }
        if (event === 'PerpOrder') {
            const order = await pool.getPerpOrder(orderId);
            console.log(`order:`, order);
        }

    });
}
