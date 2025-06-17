import { Address, fromNano, Sender, toNano } from "@ton/core";
import { fromUnits, toUnits } from '../../utils/util';
import { TestEnv } from "./TestEnv";
import { TLPJettonWallet } from "../../wrappers/TLPJettonWallet";
import { buildOnchainMetadata } from "../../contracts/jetton/utils/jetton-helpers";

export async function updateJettonContent(sender: Sender) {

    const jettonParams = {
        name: 'TON Tradoor LP',
        description: '12345',
        symbol: 'TON-TLP',
        image: 'https://cache.tonapi.io/imgproxy/j-LhzbGesMjo5C17FRTdMQrGT1xCNJCjO4GmNDdY0Dk/rs:fill:200:200:1/g:no/aHR0cHM6Ly90b24uYXBwL21lZGlhL2pldHRvbi0xYmY5NTgxNC03ODdhLTRlMmQtODZlYS1lMGRhZTNhOTQ4NGMuanBnP3c9NjQwJnE9NTA.webp',
        decimals: '9'
    };

    const trxResult = await TestEnv.pool.send(
        sender,
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'JettonUpdateContent',
            jetton_content: buildOnchainMetadata(jettonParams),
        }
    );

    return { trxResult };
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