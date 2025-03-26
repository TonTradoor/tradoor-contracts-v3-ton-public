import { Cell } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import {
    loadCancelPerpOrder,
    loadCreateIncreasePerpOrder,
    loadCreateTpSlPerpOrder,
    loadExecuteLiquidityOrder,
    loadIncreaseAum,
    loadLiquidatePerpPosition,
    loadLiquidityOrder,
} from '../wrappers/Pool';

export async function run(provider: NetworkProvider) {

    const rawBody = await provider.ui().input('Enter raw body:');

    await provider.ui().choose('Choose message type:', [
        'CreateIncreasePerpOrder',
        'CreateTpSlPerpOrder',
        'CancelPerpOrder',
        'LiquidatePerpPosition',
        'ExecuteLiquidityOrder',
        'IncreaseAum'
    ], a => a).then(async (msg) => {
        const body = Buffer.from(rawBody, 'hex').toString('base64');
        const slice = Cell.fromBase64(body).asSlice();
        if (msg === 'CreateIncreasePerpOrder') {
            const msg = loadCreateIncreasePerpOrder(slice);
            console.log(`msg:`, msg);
        }
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
        if (msg === 'ExecuteLiquidityOrder') {
            const msg = loadExecuteLiquidityOrder(slice);
            console.log(`msg:`, msg);
        }
        if (msg == 'IncreaseAum') {
            const msg = loadIncreaseAum(slice);
            console.log(`msg:`, msg);
        }
    });
    
}
