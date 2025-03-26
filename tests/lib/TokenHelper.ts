import { Address, fromNano, toNano } from "@ton/core";
import { fromUnits, toUnits } from '../../utils/util';
import { TestEnv } from "./TestEnv";
import { TLPJettonWallet } from "../../wrappers/TLPJettonWallet";

export async function delistToken(tokenId: bigint) {
    let tokenConfigBefore = (await TestEnv.pool.getTokenConfig(tokenId));
    const trxResult = await TestEnv.pool.send(
        TestEnv.deployer.getSender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'DelistToken',
            tokenId: tokenId
        }
    );
    let tokenConfigAfter = (await TestEnv.pool.getTokenConfig(tokenId));

    return {
        trxResult,
        tokenConfigBefore,
        tokenConfigAfter
    };
}

export async function getTlpWallet(senderAddress: Address) {
    return TestEnv.blockchain.openContract(await TLPJettonWallet.fromInit(senderAddress, TestEnv.tlp.address));
}

export function toTlpUnits(src: number | string | bigint) {
    return toUnits(src, TestEnv.tlpDecimal);
}

export function toJettonUnits(src: number | string | bigint) {
    return toUnits(src, TestEnv.jettonDecimal);
}

export function fromJettonUnits(src: number | string | bigint) {
    return fromUnits(src, TestEnv.jettonDecimal);
}

export function fromTlpUnits(src: number | string | bigint) {
    return fromUnits(src, TestEnv.tlpDecimal);
}

export async function getTonBalance(address: Address) {
    return (await TestEnv.blockchain.getContract(address)).balance;
}

export async function getFriendlyTonBalance(address: Address) {
    return fromNano(await getTonBalance(address));
}


export async function getTlpBalance(address: Address) {
    let tlpWallet = await getTlpWallet(address);
    let tlpWalletSmart = await TestEnv.blockchain.getContract(tlpWallet.address);
    if (tlpWalletSmart.accountState?.type == 'active') {
        let tlpData = await tlpWallet.getGetWalletData();
        return tlpData.balance;
    }
    return 0n;
}

export async function getAllBalance() {
    return {
        deployerTonBalance: await getTonBalance(TestEnv.deployer.address),
        poolTonBalance: await getTonBalance(TestEnv.pool.address),
        executorTonBalance: await getTonBalance(TestEnv.executor.address),
        compensatorTonBalance: await getTonBalance(TestEnv.compensator.address),
        user0TonBalance: await getTonBalance(TestEnv.user0.address),
        user1TonBalance: await getTonBalance(TestEnv.user1.address),
        user2TonBalance: await getTonBalance(TestEnv.user2.address),
        user3TonBalance: await getTonBalance(TestEnv.user3.address),
        poolTlpBalance: await getTlpBalance(TestEnv.pool.address),
        user0TlpBalance: await getTlpBalance(TestEnv.user0.address),
        user1TlpBalance: await getTlpBalance(TestEnv.user1.address),
        user2TlpBalance: await getTlpBalance(TestEnv.user2.address),
        user3TlpBalance: await getTlpBalance(TestEnv.user3.address),
    }
}

export function toPriceUnits(src: number | string | bigint) {
    return toUnits(src, TestEnv.priceDecimal);
}

export function fromPriceUnits(src: number | string | bigint) {
    return fromUnits(src, TestEnv.priceDecimal);
}