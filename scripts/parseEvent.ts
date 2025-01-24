import { Cell } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { loadLiquidityOrderCancelledEvent, loadLiquidityOrderCreatedEvent, loadLiquidityPoolUpdatedEvent, loadPerpOrderCancelledEvent, loadPerpOrderCreatedEvent, loadPerpPositionDecreasedEvent, loadPerpPositionIncreasedEvent } from '../wrappers/Pool';

export async function run(provider: NetworkProvider) {

    //example: b5ee9c7201010101000e000018583e40190000000000000008, CancelIncreaseOrderEvent
    const rawBody = await provider.ui().input('Enter raw body:');

    await provider.ui().choose('Choose event:', [
        'LiquidityOrderCreatedEvent',
        'LiquidityOrderCancelledEvent',
        'LiquidityPoolUpdatedEvent',
        'PerpOrderCreatedEvent',
        'PerpOrderCancelledEvent',
        'PerpPositionIncreasedEvent',
        'PerpPositionDecreasedEvent',
    ], a => a).then(async (event) => {
        const body = Buffer.from(rawBody, 'hex').toString('base64');
        const slice = Cell.fromBase64(body).asSlice();
        if (event === 'LiquidityOrderCreatedEvent') {
            const event = loadLiquidityOrderCreatedEvent(slice);
            console.log(`event:`, event);
        }
        if (event === 'LiquidityOrderCancelledEvent') {
            const event = loadLiquidityOrderCancelledEvent(slice);
            console.log(`event:`, event);
        }
        if (event === 'LiquidityPoolUpdatedEvent') {
            const event = loadLiquidityPoolUpdatedEvent(slice);
            console.log(`event:`, event);
        }
        if (event === 'PerpOrderCreatedEvent') {
            const event = loadPerpOrderCreatedEvent(slice);
            console.log(`event:`, event);
        }
        if (event === 'PerpOrderCancelledEvent') {
            const event = loadPerpOrderCancelledEvent(slice);
            console.log(`event:`, event);
        }
        if (event === 'PerpPositionIncreasedEvent') {
            const event = loadPerpPositionIncreasedEvent(slice);
            console.log(`event:`, event);
        }
        if (event === 'PerpPositionDecreasedEvent') {
            const event = loadPerpPositionDecreasedEvent(slice);
            console.log(`event:`, event);
        }
    });
    
}
