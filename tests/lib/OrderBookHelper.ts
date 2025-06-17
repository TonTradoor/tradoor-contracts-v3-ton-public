import { SandboxContract, TreasuryContract } from "@ton/sandbox";
import { Address, toNano } from "@ton/core";
import { TestEnv } from "./TestEnv";
import { getAllBalance, toJettonUnits } from "./TokenHelper";

export async function createCompensate(executor: SandboxContract<TreasuryContract>, orderType: number, orderId: bigint,
    refundReceiver: Address, refundAmount: number, executionFeeReceiver: Address, executionFee: number) {
    let balanceBefore = await getAllBalance();
    let compensateIdBefore = (await TestEnv.pool.getCompensate(0n)).compensateIndexNext;
    // create order
    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano('0.2'),
        },
        {
            $$type: 'CreateCompensate',
            orderType: BigInt(orderType),
            orderId: BigInt(orderId),
            trxId: 1n,
            refundReceiver: refundReceiver,
            refundAmount: toJettonUnits(refundAmount),
            executionFeeReceiver: executionFeeReceiver,
            executionFee: toNano(executionFee),
        }
    );
    // after trx
    let balanceAfter = await getAllBalance();
    let compensateIdAfter = (await TestEnv.pool.getCompensate(0n)).compensateIndexNext;
    let compensate = (await TestEnv.pool.getCompensate(compensateIdBefore)).compensate;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        compensateIdBefore,
        compensateIdAfter,
        compensate
    };
}

export async function cancelCompensate(executor: SandboxContract<TreasuryContract>, compensateId: bigint) {
    let balanceBefore = await getAllBalance();

    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano('0.2'),
        },
        {
            $$type: 'ExecuteOrCancelCompensate',
            isCancel: true,
            compensateId: compensateId,
            trxId: 1n,
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let compensate = (await TestEnv.pool.getCompensate(compensateId)).compensate;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        compensate
    };
}

export async function executeCompensate(executor: SandboxContract<TreasuryContract>, gas: number, compensateId: bigint) {
    let balanceBefore = await getAllBalance();

    const trxResult = await TestEnv.pool.send(
        executor.getSender(),
        {
            value: toNano(gas),
        },
        {
            $$type: 'ExecuteOrCancelCompensate',
            isCancel: false,
            compensateId: compensateId,
            trxId: 1n,
        }
    );

    // after trx
    let balanceAfter = await getAllBalance();
    let compensate = (await TestEnv.pool.getCompensate(compensateId)).compensate;

    return {
        trxResult,
        balanceBefore,
        balanceAfter,
        compensate
    };
}
