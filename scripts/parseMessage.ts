import { Cell } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { loadCancelPerpOrder, loadCreateTpSlPerpOrder, loadLiquidatePerpPosition } from '../wrappers/Pool';

export async function run(provider: NetworkProvider) {

    const rawBody = await provider.ui().input('Enter raw body:');

    await provider.ui().choose('Choose message type:', [
        'CreateTpSlPerpOrder',
        'CancelPerpOrder',
        'LiquidatePerpPosition'
    ], a => a).then(async (msg) => {
        const body = Buffer.from(rawBody, 'hex').toString('base64');
        const slice = Cell.fromBase64(body).asSlice();
        if (msg === 'CreateTpSlPerpOrder') {
            const msg = loadCreateTpSlPerpOrder(slice);
            console.log(`msg:`, msg);
        }
        if (msg === 'CancelPerpOrder') {
            const msg = loadCancelPerpOrder(slice);
            console.log(`msg:`, msg);
        }
        if (msg === 'LiquidatePerpPosition') {
            const msg = loadLiquidatePerpPosition(slice);
            console.log(`msg:`, msg);
        }
    });
    
}
