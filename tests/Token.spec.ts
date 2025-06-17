import {
    SandboxContract,
    TreasuryContract
} from '@ton/sandbox';
import { TestEnv } from './lib/TestEnv';
import '@ton/test-utils';
import { delistToken, listToken } from './lib/PoolHelper';

describe('token settings', () => {
    let user0: SandboxContract<TreasuryContract>;

    const token = TestEnv.tokenConfigs[0];

    beforeEach(async () => {
        await TestEnv.resetEnv();
        user0 = TestEnv.user0;
    });

    it('should correctly list perp tokens', async () => {
        const sender = TestEnv.manager;
        const listTokenResult = await listToken(sender.getSender(), token);

        expect(listTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: true,
        });
    });

    it('should revert list perp tokens if sender is not a manager', async () => {
        const sender = TestEnv.user0;
        const listTokenResult = await listToken(sender.getSender(), token);

        expect(listTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: false,
        });
    });

    it('should correctly delist perp tokens', async () => {
        const sender = TestEnv.manager;
        const listTokenResult = await listToken(sender.getSender(), token);
        expect(listTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: true,
        });

        const delistTokenResult = await delistToken(sender.getSender(), token.tokenId);

        expect(delistTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: true,
        });
    });

    it('should revert delist perp tokens if sender is not a manager', async () => {
        let sender = TestEnv.manager;
        const listTokenResult = await listToken(sender.getSender(), token);
        expect(listTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: true,
        });

        sender = user0;
        const delistTokenResult = await delistToken(sender.getSender(), token.tokenId);
        expect(delistTokenResult.trxResult.transactions).toHaveTransaction({
            from: sender.address,
            to: TestEnv.pool.address,
            success: false,
        });
    });

});
