import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type RequestUpgrade = {
    $$type: 'RequestUpgrade';
    code: Slice;
    data: Slice | null;
}

export function storeRequestUpgrade(src: RequestUpgrade) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2185695192, 32);
        b_0.storeRef(src.code.asCell());
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data.asCell()); } else { b_0.storeBit(false); }
    };
}

export function loadRequestUpgrade(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2185695192) { throw Error('Invalid prefix'); }
    let _code = sc_0.loadRef().asSlice();
    let _data = sc_0.loadBit() ? sc_0.loadRef()?.asSlice() ?? null : null;
    return { $$type: 'RequestUpgrade' as const, code: _code, data: _data };
}

function loadTupleRequestUpgrade(source: TupleReader) {
    let _code = source.readCell().asSlice();
    let _data = source.readCellOpt()?.asSlice() ?? null;
    return { $$type: 'RequestUpgrade' as const, code: _code, data: _data };
}

function loadGetterTupleRequestUpgrade(source: TupleReader) {
    let _code = source.readCell().asSlice();
    let _data = source.readCellOpt()?.asSlice() ?? null;
    return { $$type: 'RequestUpgrade' as const, code: _code, data: _data };
}

function storeTupleRequestUpgrade(source: RequestUpgrade) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.code.asCell());
    builder.writeSlice(source.data?.asCell());
    return builder.build();
}

function dictValueParserRequestUpgrade(): DictionaryValue<RequestUpgrade> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequestUpgrade(src)).endCell());
        },
        parse: (src) => {
            return loadRequestUpgrade(src.loadRef().beginParse());
        }
    }
}

export type ExecuteUpgrade = {
    $$type: 'ExecuteUpgrade';
    seqno: bigint;
}

export function storeExecuteUpgrade(src: ExecuteUpgrade) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1066365142, 32);
        b_0.storeUint(src.seqno, 32);
    };
}

export function loadExecuteUpgrade(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1066365142) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(32);
    return { $$type: 'ExecuteUpgrade' as const, seqno: _seqno };
}

function loadTupleExecuteUpgrade(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'ExecuteUpgrade' as const, seqno: _seqno };
}

function loadGetterTupleExecuteUpgrade(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'ExecuteUpgrade' as const, seqno: _seqno };
}

function storeTupleExecuteUpgrade(source: ExecuteUpgrade) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserExecuteUpgrade(): DictionaryValue<ExecuteUpgrade> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecuteUpgrade(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteUpgrade(src.loadRef().beginParse());
        }
    }
}

export type CancelUpgrade = {
    $$type: 'CancelUpgrade';
    seqno: bigint;
}

export function storeCancelUpgrade(src: CancelUpgrade) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3753649022, 32);
        b_0.storeUint(src.seqno, 32);
    };
}

export function loadCancelUpgrade(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3753649022) { throw Error('Invalid prefix'); }
    let _seqno = sc_0.loadUintBig(32);
    return { $$type: 'CancelUpgrade' as const, seqno: _seqno };
}

function loadTupleCancelUpgrade(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'CancelUpgrade' as const, seqno: _seqno };
}

function loadGetterTupleCancelUpgrade(source: TupleReader) {
    let _seqno = source.readBigNumber();
    return { $$type: 'CancelUpgrade' as const, seqno: _seqno };
}

function storeTupleCancelUpgrade(source: CancelUpgrade) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.seqno);
    return builder.build();
}

function dictValueParserCancelUpgrade(): DictionaryValue<CancelUpgrade> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelUpgrade(src)).endCell());
        },
        parse: (src) => {
            return loadCancelUpgrade(src.loadRef().beginParse());
        }
    }
}

export type UpgradeRequest = {
    $$type: 'UpgradeRequest';
    code: Slice;
    data: Slice | null;
    unlockTime: bigint;
}

export function storeUpgradeRequest(src: UpgradeRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code.asCell());
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data.asCell()); } else { b_0.storeBit(false); }
        b_0.storeUint(src.unlockTime, 32);
    };
}

export function loadUpgradeRequest(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef().asSlice();
    let _data = sc_0.loadBit() ? sc_0.loadRef()?.asSlice() ?? null : null;
    let _unlockTime = sc_0.loadUintBig(32);
    return { $$type: 'UpgradeRequest' as const, code: _code, data: _data, unlockTime: _unlockTime };
}

function loadTupleUpgradeRequest(source: TupleReader) {
    let _code = source.readCell().asSlice();
    let _data = source.readCellOpt()?.asSlice() ?? null;
    let _unlockTime = source.readBigNumber();
    return { $$type: 'UpgradeRequest' as const, code: _code, data: _data, unlockTime: _unlockTime };
}

function loadGetterTupleUpgradeRequest(source: TupleReader) {
    let _code = source.readCell().asSlice();
    let _data = source.readCellOpt()?.asSlice() ?? null;
    let _unlockTime = source.readBigNumber();
    return { $$type: 'UpgradeRequest' as const, code: _code, data: _data, unlockTime: _unlockTime };
}

function storeTupleUpgradeRequest(source: UpgradeRequest) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.code.asCell());
    builder.writeSlice(source.data?.asCell());
    builder.writeNumber(source.unlockTime);
    return builder.build();
}

function dictValueParserUpgradeRequest(): DictionaryValue<UpgradeRequest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpgradeRequest(src)).endCell());
        },
        parse: (src) => {
            return loadUpgradeRequest(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Slice;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadGetterTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonBurn = {
    $$type: 'JettonBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeJettonBurn(src: JettonBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadJettonBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleJettonBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleJettonBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'JettonBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleJettonBurn(source: JettonBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
        },
        parse: (src) => {
            return loadJettonBurn(src.loadRef().beginParse());
        }
    }
}

export type JettonMint = {
    $$type: 'JettonMint';
    origin: Address;
    receiver: Address;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeJettonMint(src: JettonMint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2310479113, 32);
        b_0.storeAddress(src.origin);
        b_0.storeAddress(src.receiver);
        b_0.storeInt(src.amount, 257);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2310479113) { throw Error('Invalid prefix'); }
    let _origin = sc_0.loadAddress();
    let _receiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleJettonMint(source: TupleReader) {
    let _origin = source.readAddress();
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'JettonMint' as const, origin: _origin, receiver: _receiver, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonMint(source: JettonMint) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.origin);
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.amount);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserJettonMint(): DictionaryValue<JettonMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonMint(src)).endCell());
        },
        parse: (src) => {
            return loadJettonMint(src.loadRef().beginParse());
        }
    }
}

export type JettonUpdateContent = {
    $$type: 'JettonUpdateContent';
    jetton_content: Cell;
}

export function storeJettonUpdateContent(src: JettonUpdateContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1536108317, 32);
        b_0.storeRef(src.jetton_content);
    };
}

export function loadJettonUpdateContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1536108317) { throw Error('Invalid prefix'); }
    let _jetton_content = sc_0.loadRef();
    return { $$type: 'JettonUpdateContent' as const, jetton_content: _jetton_content };
}

function loadTupleJettonUpdateContent(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'JettonUpdateContent' as const, jetton_content: _jetton_content };
}

function loadGetterTupleJettonUpdateContent(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'JettonUpdateContent' as const, jetton_content: _jetton_content };
}

function storeTupleJettonUpdateContent(source: JettonUpdateContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.jetton_content);
    return builder.build();
}

function dictValueParserJettonUpdateContent(): DictionaryValue<JettonUpdateContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonUpdateContent(src)).endCell());
        },
        parse: (src) => {
            return loadJettonUpdateContent(src.loadRef().beginParse());
        }
    }
}

export type UpdateBaseConfig = {
    $$type: 'UpdateBaseConfig';
    gasConfig: GasConfig | null;
    executorConfig: ExecutorConfig | null;
    contractConfig: ContractConfig | null;
}

export function storeUpdateBaseConfig(src: UpdateBaseConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3495850675, 32);
        let b_1 = new Builder();
        if (src.gasConfig !== null && src.gasConfig !== undefined) { b_1.storeBit(true); b_1.store(storeGasConfig(src.gasConfig)); } else { b_1.storeBit(false); }
        if (src.executorConfig !== null && src.executorConfig !== undefined) { b_1.storeBit(true); b_1.store(storeExecutorConfig(src.executorConfig)); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.contractConfig !== null && src.contractConfig !== undefined) { b_2.storeBit(true); b_2.store(storeContractConfig(src.contractConfig)); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateBaseConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3495850675) { throw Error('Invalid prefix'); }
    let sc_1 = sc_0.loadRef().beginParse();
    let _gasConfig = sc_1.loadBit() ? loadGasConfig(sc_1) : null;
    let _executorConfig = sc_1.loadBit() ? loadExecutorConfig(sc_1) : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _contractConfig = sc_2.loadBit() ? loadContractConfig(sc_2) : null;
    return { $$type: 'UpdateBaseConfig' as const, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function loadTupleUpdateBaseConfig(source: TupleReader) {
    const _gasConfig_p = source.readTupleOpt();
    const _gasConfig = _gasConfig_p ? loadTupleGasConfig(_gasConfig_p) : null;
    const _executorConfig_p = source.readTupleOpt();
    const _executorConfig = _executorConfig_p ? loadTupleExecutorConfig(_executorConfig_p) : null;
    const _contractConfig_p = source.readTupleOpt();
    const _contractConfig = _contractConfig_p ? loadTupleContractConfig(_contractConfig_p) : null;
    return { $$type: 'UpdateBaseConfig' as const, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function loadGetterTupleUpdateBaseConfig(source: TupleReader) {
    const _gasConfig_p = source.readTupleOpt();
    const _gasConfig = _gasConfig_p ? loadTupleGasConfig(_gasConfig_p) : null;
    const _executorConfig_p = source.readTupleOpt();
    const _executorConfig = _executorConfig_p ? loadTupleExecutorConfig(_executorConfig_p) : null;
    const _contractConfig_p = source.readTupleOpt();
    const _contractConfig = _contractConfig_p ? loadTupleContractConfig(_contractConfig_p) : null;
    return { $$type: 'UpdateBaseConfig' as const, gasConfig: _gasConfig, executorConfig: _executorConfig, contractConfig: _contractConfig };
}

function storeTupleUpdateBaseConfig(source: UpdateBaseConfig) {
    let builder = new TupleBuilder();
    if (source.gasConfig !== null && source.gasConfig !== undefined) {
        builder.writeTuple(storeTupleGasConfig(source.gasConfig));
    } else {
        builder.writeTuple(null);
    }
    if (source.executorConfig !== null && source.executorConfig !== undefined) {
        builder.writeTuple(storeTupleExecutorConfig(source.executorConfig));
    } else {
        builder.writeTuple(null);
    }
    if (source.contractConfig !== null && source.contractConfig !== undefined) {
        builder.writeTuple(storeTupleContractConfig(source.contractConfig));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserUpdateBaseConfig(): DictionaryValue<UpdateBaseConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateBaseConfig(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateBaseConfig(src.loadRef().beginParse());
        }
    }
}

export type UpdatePoolConfig = {
    $$type: 'UpdatePoolConfig';
    orderLockTime: bigint;
    maxLpNetCap: bigint;
    lpRolloverFeeRate: bigint;
    liquidatedPositionShareRate: bigint;
    normalPositionShareRate: bigint;
}

export function storeUpdatePoolConfig(src: UpdatePoolConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2788132204, 32);
        b_0.storeUint(src.orderLockTime, 32);
        b_0.storeCoins(src.maxLpNetCap);
        b_0.storeUint(src.lpRolloverFeeRate, 32);
        b_0.storeUint(src.liquidatedPositionShareRate, 32);
        b_0.storeUint(src.normalPositionShareRate, 32);
    };
}

export function loadUpdatePoolConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2788132204) { throw Error('Invalid prefix'); }
    let _orderLockTime = sc_0.loadUintBig(32);
    let _maxLpNetCap = sc_0.loadCoins();
    let _lpRolloverFeeRate = sc_0.loadUintBig(32);
    let _liquidatedPositionShareRate = sc_0.loadUintBig(32);
    let _normalPositionShareRate = sc_0.loadUintBig(32);
    return { $$type: 'UpdatePoolConfig' as const, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate };
}

function loadTupleUpdatePoolConfig(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    let _liquidatedPositionShareRate = source.readBigNumber();
    let _normalPositionShareRate = source.readBigNumber();
    return { $$type: 'UpdatePoolConfig' as const, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate };
}

function loadGetterTupleUpdatePoolConfig(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    let _liquidatedPositionShareRate = source.readBigNumber();
    let _normalPositionShareRate = source.readBigNumber();
    return { $$type: 'UpdatePoolConfig' as const, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate };
}

function storeTupleUpdatePoolConfig(source: UpdatePoolConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.maxLpNetCap);
    builder.writeNumber(source.lpRolloverFeeRate);
    builder.writeNumber(source.liquidatedPositionShareRate);
    builder.writeNumber(source.normalPositionShareRate);
    return builder.build();
}

function dictValueParserUpdatePoolConfig(): DictionaryValue<UpdatePoolConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdatePoolConfig(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePoolConfig(src.loadRef().beginParse());
        }
    }
}

export type SetManager = {
    $$type: 'SetManager';
    manager: Address;
    compensator: Address;
    claimer: Address;
}

export function storeSetManager(src: SetManager) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3368041608, 32);
        b_0.storeAddress(src.manager);
        b_0.storeAddress(src.compensator);
        b_0.storeAddress(src.claimer);
    };
}

export function loadSetManager(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3368041608) { throw Error('Invalid prefix'); }
    let _manager = sc_0.loadAddress();
    let _compensator = sc_0.loadAddress();
    let _claimer = sc_0.loadAddress();
    return { $$type: 'SetManager' as const, manager: _manager, compensator: _compensator, claimer: _claimer };
}

function loadTupleSetManager(source: TupleReader) {
    let _manager = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    return { $$type: 'SetManager' as const, manager: _manager, compensator: _compensator, claimer: _claimer };
}

function loadGetterTupleSetManager(source: TupleReader) {
    let _manager = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    return { $$type: 'SetManager' as const, manager: _manager, compensator: _compensator, claimer: _claimer };
}

function storeTupleSetManager(source: SetManager) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.manager);
    builder.writeAddress(source.compensator);
    builder.writeAddress(source.claimer);
    return builder.build();
}

function dictValueParserSetManager(): DictionaryValue<SetManager> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetManager(src)).endCell());
        },
        parse: (src) => {
            return loadSetManager(src.loadRef().beginParse());
        }
    }
}

export type ListToken = {
    $$type: 'ListToken';
    tokenId: bigint;
    config: TokenConfig;
}

export function storeListToken(src: ListToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3835378672, 32);
        b_0.storeUint(src.tokenId, 16);
        b_0.store(storeTokenConfig(src.config));
    };
}

export function loadListToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3835378672) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    let _config = loadTokenConfig(sc_0);
    return { $$type: 'ListToken' as const, tokenId: _tokenId, config: _config };
}

function loadTupleListToken(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    const _config = loadTupleTokenConfig(source);
    return { $$type: 'ListToken' as const, tokenId: _tokenId, config: _config };
}

function loadGetterTupleListToken(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    const _config = loadGetterTupleTokenConfig(source);
    return { $$type: 'ListToken' as const, tokenId: _tokenId, config: _config };
}

function storeTupleListToken(source: ListToken) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeTuple(storeTupleTokenConfig(source.config));
    return builder.build();
}

function dictValueParserListToken(): DictionaryValue<ListToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeListToken(src)).endCell());
        },
        parse: (src) => {
            return loadListToken(src.loadRef().beginParse());
        }
    }
}

export type DelistToken = {
    $$type: 'DelistToken';
    tokenId: bigint;
}

export function storeDelistToken(src: DelistToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2604852463, 32);
        b_0.storeUint(src.tokenId, 16);
    };
}

export function loadDelistToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2604852463) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    return { $$type: 'DelistToken' as const, tokenId: _tokenId };
}

function loadTupleDelistToken(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    return { $$type: 'DelistToken' as const, tokenId: _tokenId };
}

function loadGetterTupleDelistToken(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    return { $$type: 'DelistToken' as const, tokenId: _tokenId };
}

function storeTupleDelistToken(source: DelistToken) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    return builder.build();
}

function dictValueParserDelistToken(): DictionaryValue<DelistToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDelistToken(src)).endCell());
        },
        parse: (src) => {
            return loadDelistToken(src.loadRef().beginParse());
        }
    }
}

export type WithdrawFee = {
    $$type: 'WithdrawFee';
    feeReceiver: Address | null;
}

export function storeWithdrawFee(src: WithdrawFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2414010897, 32);
        b_0.storeAddress(src.feeReceiver);
    };
}

export function loadWithdrawFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2414010897) { throw Error('Invalid prefix'); }
    let _feeReceiver = sc_0.loadMaybeAddress();
    return { $$type: 'WithdrawFee' as const, feeReceiver: _feeReceiver };
}

function loadTupleWithdrawFee(source: TupleReader) {
    let _feeReceiver = source.readAddressOpt();
    return { $$type: 'WithdrawFee' as const, feeReceiver: _feeReceiver };
}

function loadGetterTupleWithdrawFee(source: TupleReader) {
    let _feeReceiver = source.readAddressOpt();
    return { $$type: 'WithdrawFee' as const, feeReceiver: _feeReceiver };
}

function storeTupleWithdrawFee(source: WithdrawFee) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.feeReceiver);
    return builder.build();
}

function dictValueParserWithdrawFee(): DictionaryValue<WithdrawFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawFee(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawFee(src.loadRef().beginParse());
        }
    }
}

export type FeedPrices = {
    $$type: 'FeedPrices';
    trxId: bigint;
    lpFundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
    prices: Dictionary<number, bigint>;
}

export function storeFeedPrices(src: FeedPrices) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2429242443, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeCoins(src.lpFundingFeeGrowth);
        b_0.storeCoins(src.rolloverFeeGrowth);
        b_0.storeDict(src.prices, Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128));
    };
}

export function loadFeedPrices(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2429242443) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _lpFundingFeeGrowth = sc_0.loadCoins();
    let _rolloverFeeGrowth = sc_0.loadCoins();
    let _prices = Dictionary.load(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), sc_0);
    return { $$type: 'FeedPrices' as const, trxId: _trxId, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth, prices: _prices };
}

function loadTupleFeedPrices(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _lpFundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), source.readCellOpt());
    return { $$type: 'FeedPrices' as const, trxId: _trxId, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth, prices: _prices };
}

function loadGetterTupleFeedPrices(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _lpFundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), source.readCellOpt());
    return { $$type: 'FeedPrices' as const, trxId: _trxId, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth, prices: _prices };
}

function storeTupleFeedPrices(source: FeedPrices) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.lpFundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128)).endCell() : null);
    return builder.build();
}

function dictValueParserFeedPrices(): DictionaryValue<FeedPrices> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFeedPrices(src)).endCell());
        },
        parse: (src) => {
            return loadFeedPrices(src.loadRef().beginParse());
        }
    }
}

export type IncreaseAum = {
    $$type: 'IncreaseAum';
    trxId: bigint;
    amount: bigint;
}

export function storeIncreaseAum(src: IncreaseAum) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(245540303, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeCoins(src.amount);
    };
}

export function loadIncreaseAum(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 245540303) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    return { $$type: 'IncreaseAum' as const, trxId: _trxId, amount: _amount };
}

function loadTupleIncreaseAum(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'IncreaseAum' as const, trxId: _trxId, amount: _amount };
}

function loadGetterTupleIncreaseAum(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'IncreaseAum' as const, trxId: _trxId, amount: _amount };
}

function storeTupleIncreaseAum(source: IncreaseAum) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserIncreaseAum(): DictionaryValue<IncreaseAum> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeIncreaseAum(src)).endCell());
        },
        parse: (src) => {
            return loadIncreaseAum(src.loadRef().beginParse());
        }
    }
}

export type CancelLiquidityOrder = {
    $$type: 'CancelLiquidityOrder';
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelLiquidityOrder(src: CancelLiquidityOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1777298942, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCancelLiquidityOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1777298942) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CancelLiquidityOrder' as const, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelLiquidityOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelLiquidityOrder' as const, orderId: _orderId, trxId: _trxId };
}

function loadGetterTupleCancelLiquidityOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelLiquidityOrder' as const, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelLiquidityOrder(source: CancelLiquidityOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelLiquidityOrder(): DictionaryValue<CancelLiquidityOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelLiquidityOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelLiquidityOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecuteLiquidityOrder = {
    $$type: 'ExecuteLiquidityOrder';
    orderId: bigint;
    trxId: bigint;
    prices: Dictionary<number, bigint>;
    lpFundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeExecuteLiquidityOrder(src: ExecuteLiquidityOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(827766024, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeDict(src.prices, Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128));
        b_0.storeCoins(src.lpFundingFeeGrowth);
        b_0.storeCoins(src.rolloverFeeGrowth);
    };
}

export function loadExecuteLiquidityOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 827766024) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _prices = Dictionary.load(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), sc_0);
    let _lpFundingFeeGrowth = sc_0.loadCoins();
    let _rolloverFeeGrowth = sc_0.loadCoins();
    return { $$type: 'ExecuteLiquidityOrder' as const, orderId: _orderId, trxId: _trxId, prices: _prices, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleExecuteLiquidityOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), source.readCellOpt());
    let _lpFundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ExecuteLiquidityOrder' as const, orderId: _orderId, trxId: _trxId, prices: _prices, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadGetterTupleExecuteLiquidityOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _prices = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), source.readCellOpt());
    let _lpFundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ExecuteLiquidityOrder' as const, orderId: _orderId, trxId: _trxId, prices: _prices, lpFundingFeeGrowth: _lpFundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function storeTupleExecuteLiquidityOrder(source: ExecuteLiquidityOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128)).endCell() : null);
    builder.writeNumber(source.lpFundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    return builder.build();
}

function dictValueParserExecuteLiquidityOrder(): DictionaryValue<ExecuteLiquidityOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecuteLiquidityOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteLiquidityOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateIncreasePerpOrder = {
    $$type: 'CreateIncreasePerpOrder';
    trxId: bigint;
    tokenId: bigint;
    isLong: boolean;
    isMarket: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    requestTime: bigint;
    executionFee: bigint;
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
}

export function storeCreateIncreasePerpOrder(src: CreateIncreasePerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2420088726, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeBit(src.isLong);
        b_0.storeBit(src.isMarket);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeUint(src.requestTime, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeCoins(src.tpSize);
        b_0.storeCoins(src.tpPrice);
        b_0.storeCoins(src.slSize);
        let b_1 = new Builder();
        b_1.storeCoins(src.slPrice);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCreateIncreasePerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2420088726) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _tokenId = sc_0.loadUintBig(16);
    let _isLong = sc_0.loadBit();
    let _isMarket = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _triggerPrice = sc_0.loadUintBig(128);
    let _requestTime = sc_0.loadUintBig(32);
    let _executionFee = sc_0.loadCoins();
    let _tpSize = sc_0.loadCoins();
    let _tpPrice = sc_0.loadCoins();
    let _slSize = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _slPrice = sc_1.loadCoins();
    return { $$type: 'CreateIncreasePerpOrder' as const, trxId: _trxId, tokenId: _tokenId, isLong: _isLong, isMarket: _isMarket, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, requestTime: _requestTime, executionFee: _executionFee, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice };
}

function loadTupleCreateIncreasePerpOrder(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _isMarket = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    return { $$type: 'CreateIncreasePerpOrder' as const, trxId: _trxId, tokenId: _tokenId, isLong: _isLong, isMarket: _isMarket, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, requestTime: _requestTime, executionFee: _executionFee, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice };
}

function loadGetterTupleCreateIncreasePerpOrder(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _isMarket = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    return { $$type: 'CreateIncreasePerpOrder' as const, trxId: _trxId, tokenId: _tokenId, isLong: _isLong, isMarket: _isMarket, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, requestTime: _requestTime, executionFee: _executionFee, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice };
}

function storeTupleCreateIncreasePerpOrder(source: CreateIncreasePerpOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeBoolean(source.isMarket);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeNumber(source.requestTime);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    return builder.build();
}

function dictValueParserCreateIncreasePerpOrder(): DictionaryValue<CreateIncreasePerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateIncreasePerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateIncreasePerpOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateDecreasePerpOrder = {
    $$type: 'CreateDecreasePerpOrder';
    trxId: bigint;
    tokenId: bigint;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    requestTime: bigint;
    executionFee: bigint;
}

export function storeCreateDecreasePerpOrder(src: CreateDecreasePerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3418083876, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeUint(src.requestTime, 32);
        b_0.storeCoins(src.executionFee);
    };
}

export function loadCreateDecreasePerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3418083876) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _tokenId = sc_0.loadUintBig(16);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _triggerPrice = sc_0.loadUintBig(128);
    let _requestTime = sc_0.loadUintBig(32);
    let _executionFee = sc_0.loadCoins();
    return { $$type: 'CreateDecreasePerpOrder' as const, trxId: _trxId, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, requestTime: _requestTime, executionFee: _executionFee };
}

function loadTupleCreateDecreasePerpOrder(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    return { $$type: 'CreateDecreasePerpOrder' as const, trxId: _trxId, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, requestTime: _requestTime, executionFee: _executionFee };
}

function loadGetterTupleCreateDecreasePerpOrder(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    return { $$type: 'CreateDecreasePerpOrder' as const, trxId: _trxId, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, requestTime: _requestTime, executionFee: _executionFee };
}

function storeTupleCreateDecreasePerpOrder(source: CreateDecreasePerpOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeNumber(source.requestTime);
    builder.writeNumber(source.executionFee);
    return builder.build();
}

function dictValueParserCreateDecreasePerpOrder(): DictionaryValue<CreateDecreasePerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateDecreasePerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateDecreasePerpOrder(src.loadRef().beginParse());
        }
    }
}

export type CreateTpSlPerpOrder = {
    $$type: 'CreateTpSlPerpOrder';
    executionFee: bigint;
    tokenId: bigint;
    isLong: boolean;
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    trxId: bigint;
    requestTime: bigint;
}

export function storeCreateTpSlPerpOrder(src: CreateTpSlPerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4182737083, 32);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.tpSize);
        b_0.storeUint(src.tpPrice, 128);
        b_0.storeCoins(src.slSize);
        b_0.storeUint(src.slPrice, 128);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.requestTime, 32);
    };
}

export function loadCreateTpSlPerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4182737083) { throw Error('Invalid prefix'); }
    let _executionFee = sc_0.loadCoins();
    let _tokenId = sc_0.loadUintBig(16);
    let _isLong = sc_0.loadBit();
    let _tpSize = sc_0.loadCoins();
    let _tpPrice = sc_0.loadUintBig(128);
    let _slSize = sc_0.loadCoins();
    let _slPrice = sc_0.loadUintBig(128);
    let _trxId = sc_0.loadUintBig(64);
    let _requestTime = sc_0.loadUintBig(32);
    return { $$type: 'CreateTpSlPerpOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId, requestTime: _requestTime };
}

function loadTupleCreateTpSlPerpOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    return { $$type: 'CreateTpSlPerpOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId, requestTime: _requestTime };
}

function loadGetterTupleCreateTpSlPerpOrder(source: TupleReader) {
    let _executionFee = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    return { $$type: 'CreateTpSlPerpOrder' as const, executionFee: _executionFee, tokenId: _tokenId, isLong: _isLong, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, trxId: _trxId, requestTime: _requestTime };
}

function storeTupleCreateTpSlPerpOrder(source: CreateTpSlPerpOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.requestTime);
    return builder.build();
}

function dictValueParserCreateTpSlPerpOrder(): DictionaryValue<CreateTpSlPerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateTpSlPerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateTpSlPerpOrder(src.loadRef().beginParse());
        }
    }
}

export type CancelPerpOrder = {
    $$type: 'CancelPerpOrder';
    orderId: bigint;
    trxId: bigint;
}

export function storeCancelPerpOrder(src: CancelPerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2104142681, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCancelPerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2104142681) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CancelPerpOrder' as const, orderId: _orderId, trxId: _trxId };
}

function loadTupleCancelPerpOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelPerpOrder' as const, orderId: _orderId, trxId: _trxId };
}

function loadGetterTupleCancelPerpOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CancelPerpOrder' as const, orderId: _orderId, trxId: _trxId };
}

function storeTupleCancelPerpOrder(source: CancelPerpOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCancelPerpOrder(): DictionaryValue<CancelPerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCancelPerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCancelPerpOrder(src.loadRef().beginParse());
        }
    }
}

export type ExecutePerpOrder = {
    $$type: 'ExecutePerpOrder';
    orderId: bigint;
    trxId: bigint;
    tokenId: bigint;
    price: bigint;
    premiumRate: bigint;
    fundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeExecutePerpOrder(src: ExecutePerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(83222555, 32);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeUint(src.price, 128);
        b_0.storeInt(src.premiumRate, 32);
        b_0.storeInt(src.fundingFeeGrowth, 128);
        b_0.storeInt(src.rolloverFeeGrowth, 128);
    };
}

export function loadExecutePerpOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 83222555) { throw Error('Invalid prefix'); }
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _tokenId = sc_0.loadUintBig(16);
    let _price = sc_0.loadUintBig(128);
    let _premiumRate = sc_0.loadIntBig(32);
    let _fundingFeeGrowth = sc_0.loadIntBig(128);
    let _rolloverFeeGrowth = sc_0.loadIntBig(128);
    return { $$type: 'ExecutePerpOrder' as const, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleExecutePerpOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ExecutePerpOrder' as const, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadGetterTupleExecutePerpOrder(source: TupleReader) {
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ExecutePerpOrder' as const, orderId: _orderId, trxId: _trxId, tokenId: _tokenId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function storeTupleExecutePerpOrder(source: ExecutePerpOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.tokenId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    builder.writeNumber(source.fundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    return builder.build();
}

function dictValueParserExecutePerpOrder(): DictionaryValue<ExecutePerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecutePerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadExecutePerpOrder(src.loadRef().beginParse());
        }
    }
}

export type LiquidatePerpPosition = {
    $$type: 'LiquidatePerpPosition';
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    trxId: bigint;
    price: bigint;
    premiumRate: bigint;
    fundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeLiquidatePerpPosition(src: LiquidatePerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1452665150, 32);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.price, 128);
        b_0.storeInt(src.premiumRate, 32);
        b_0.storeInt(src.fundingFeeGrowth, 128);
        b_0.storeInt(src.rolloverFeeGrowth, 128);
    };
}

export function loadLiquidatePerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1452665150) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadUintBig(128);
    let _premiumRate = sc_0.loadIntBig(32);
    let _fundingFeeGrowth = sc_0.loadIntBig(128);
    let _rolloverFeeGrowth = sc_0.loadIntBig(128);
    return { $$type: 'LiquidatePerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleLiquidatePerpPosition(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidatePerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadGetterTupleLiquidatePerpPosition(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidatePerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function storeTupleLiquidatePerpPosition(source: LiquidatePerpPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    builder.writeNumber(source.fundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    return builder.build();
}

function dictValueParserLiquidatePerpPosition(): DictionaryValue<LiquidatePerpPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidatePerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidatePerpPosition(src.loadRef().beginParse());
        }
    }
}

export type ADLPerpPosition = {
    $$type: 'ADLPerpPosition';
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    trxId: bigint;
    price: bigint;
    premiumRate: bigint;
    fundingFeeGrowth: bigint;
    rolloverFeeGrowth: bigint;
}

export function storeADLPerpPosition(src: ADLPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3588145116, 32);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.price, 128);
        b_0.storeInt(src.premiumRate, 32);
        b_0.storeInt(src.fundingFeeGrowth, 128);
        let b_1 = new Builder();
        b_1.storeInt(src.rolloverFeeGrowth, 128);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadADLPerpPosition(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3588145116) { throw Error('Invalid prefix'); }
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _trxId = sc_0.loadUintBig(64);
    let _price = sc_0.loadUintBig(128);
    let _premiumRate = sc_0.loadIntBig(32);
    let _fundingFeeGrowth = sc_0.loadIntBig(128);
    let sc_1 = sc_0.loadRef().beginParse();
    let _rolloverFeeGrowth = sc_1.loadIntBig(128);
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadTupleADLPerpPosition(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function loadGetterTupleADLPerpPosition(source: TupleReader) {
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _price = source.readBigNumber();
    let _premiumRate = source.readBigNumber();
    let _fundingFeeGrowth = source.readBigNumber();
    let _rolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'ADLPerpPosition' as const, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, trxId: _trxId, price: _price, premiumRate: _premiumRate, fundingFeeGrowth: _fundingFeeGrowth, rolloverFeeGrowth: _rolloverFeeGrowth };
}

function storeTupleADLPerpPosition(source: ADLPerpPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.price);
    builder.writeNumber(source.premiumRate);
    builder.writeNumber(source.fundingFeeGrowth);
    builder.writeNumber(source.rolloverFeeGrowth);
    return builder.build();
}

function dictValueParserADLPerpPosition(): DictionaryValue<ADLPerpPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeADLPerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadADLPerpPosition(src.loadRef().beginParse());
        }
    }
}

export type CreateCompensate = {
    $$type: 'CreateCompensate';
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFee: bigint;
}

export function storeCreateCompensate(src: CreateCompensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4231235453, 32);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeUint(src.orderType, 8); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeCoins(src.refundAmount);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeCoins(src.executionFee);
    };
}

export function loadCreateCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4231235453) { throw Error('Invalid prefix'); }
    let _orderType = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadCoins();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _executionFee = sc_0.loadCoins();
    return { $$type: 'CreateCompensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee };
}

function loadTupleCreateCompensate(source: TupleReader) {
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    return { $$type: 'CreateCompensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee };
}

function loadGetterTupleCreateCompensate(source: TupleReader) {
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    return { $$type: 'CreateCompensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee };
}

function storeTupleCreateCompensate(source: CreateCompensate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFee);
    return builder.build();
}

function dictValueParserCreateCompensate(): DictionaryValue<CreateCompensate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadCreateCompensate(src.loadRef().beginParse());
        }
    }
}

export type ExecuteOrCancelCompensate = {
    $$type: 'ExecuteOrCancelCompensate';
    isCancel: boolean;
    compensateId: bigint;
    trxId: bigint;
}

export function storeExecuteOrCancelCompensate(src: ExecuteOrCancelCompensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2296903975, 32);
        b_0.storeBit(src.isCancel);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadExecuteOrCancelCompensate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2296903975) { throw Error('Invalid prefix'); }
    let _isCancel = sc_0.loadBit();
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'ExecuteOrCancelCompensate' as const, isCancel: _isCancel, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleExecuteOrCancelCompensate(source: TupleReader) {
    let _isCancel = source.readBoolean();
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteOrCancelCompensate' as const, isCancel: _isCancel, compensateId: _compensateId, trxId: _trxId };
}

function loadGetterTupleExecuteOrCancelCompensate(source: TupleReader) {
    let _isCancel = source.readBoolean();
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'ExecuteOrCancelCompensate' as const, isCancel: _isCancel, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleExecuteOrCancelCompensate(source: ExecuteOrCancelCompensate) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isCancel);
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserExecuteOrCancelCompensate(): DictionaryValue<ExecuteOrCancelCompensate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecuteOrCancelCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteOrCancelCompensate(src.loadRef().beginParse());
        }
    }
}

export type CreateAddLiquidityOrder = {
    $$type: 'CreateAddLiquidityOrder';
    trxId: bigint;
    amount: bigint;
    executionFee: bigint;
}

export function storeCreateAddLiquidityOrder(src: CreateAddLiquidityOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3735223345, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.executionFee);
    };
}

export function loadCreateAddLiquidityOrder(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3735223345) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _executionFee = sc_0.loadCoins();
    return { $$type: 'CreateAddLiquidityOrder' as const, trxId: _trxId, amount: _amount, executionFee: _executionFee };
}

function loadTupleCreateAddLiquidityOrder(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    return { $$type: 'CreateAddLiquidityOrder' as const, trxId: _trxId, amount: _amount, executionFee: _executionFee };
}

function loadGetterTupleCreateAddLiquidityOrder(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    return { $$type: 'CreateAddLiquidityOrder' as const, trxId: _trxId, amount: _amount, executionFee: _executionFee };
}

function storeTupleCreateAddLiquidityOrder(source: CreateAddLiquidityOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.executionFee);
    return builder.build();
}

function dictValueParserCreateAddLiquidityOrder(): DictionaryValue<CreateAddLiquidityOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateAddLiquidityOrder(src)).endCell());
        },
        parse: (src) => {
            return loadCreateAddLiquidityOrder(src.loadRef().beginParse());
        }
    }
}

export type LiquidityOrderCreatedEvent = {
    $$type: 'LiquidityOrderCreatedEvent';
    opType: bigint;
    account: Address;
    amount: bigint;
    executionFee: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLiquidityOrderCreatedEvent(src: LiquidityOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1089656995, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLiquidityOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1089656995) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _executionFee = sc_0.loadCoins();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LiquidityOrderCreatedEvent' as const, opType: _opType, account: _account, amount: _amount, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function loadTupleLiquidityOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _amount = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidityOrderCreatedEvent' as const, opType: _opType, account: _account, amount: _amount, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function loadGetterTupleLiquidityOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _amount = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidityOrderCreatedEvent' as const, opType: _opType, account: _account, amount: _amount, executionFee: _executionFee, orderId: _orderId, trxId: _trxId };
}

function storeTupleLiquidityOrderCreatedEvent(source: LiquidityOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLiquidityOrderCreatedEvent(): DictionaryValue<LiquidityOrderCreatedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type LiquidityOrderCancelledEvent = {
    $$type: 'LiquidityOrderCancelledEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storeLiquidityOrderCancelledEvent(src: LiquidityOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3115334844, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadLiquidityOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3115334844) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'LiquidityOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTupleLiquidityOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidityOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadGetterTupleLiquidityOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'LiquidityOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTupleLiquidityOrderCancelledEvent(source: LiquidityOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserLiquidityOrderCancelledEvent(): DictionaryValue<LiquidityOrderCancelledEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type LiquidityPoolUpdatedEvent = {
    $$type: 'LiquidityPoolUpdatedEvent';
    trxId: bigint;
    orderId: bigint;
    opType: bigint;
    account: Address;
    amount: bigint;
    tlpDelta: bigint;
    tlpPrice: bigint;
    tlpSupply: bigint;
    lpFundAfter: bigint;
    realizedLpFundingFeeDelta: bigint;
    realizedLpRolloverFeeDelta: bigint;
    entryLpFundingFeeGrowth: bigint;
    entryRolloverFeeGrowth: bigint;
}

export function storeLiquidityPoolUpdatedEvent(src: LiquidityPoolUpdatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(605576415, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeAddress(src.account);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.tlpDelta);
        b_0.storeUint(src.tlpPrice, 128);
        b_0.storeCoins(src.tlpSupply);
        let b_1 = new Builder();
        b_1.storeInt(src.lpFundAfter, 128);
        b_1.storeCoins(src.realizedLpFundingFeeDelta);
        b_1.storeCoins(src.realizedLpRolloverFeeDelta);
        b_1.storeCoins(src.entryLpFundingFeeGrowth);
        b_1.storeCoins(src.entryRolloverFeeGrowth);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidityPoolUpdatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 605576415) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _account = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _tlpDelta = sc_0.loadCoins();
    let _tlpPrice = sc_0.loadUintBig(128);
    let _tlpSupply = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _lpFundAfter = sc_1.loadIntBig(128);
    let _realizedLpFundingFeeDelta = sc_1.loadCoins();
    let _realizedLpRolloverFeeDelta = sc_1.loadCoins();
    let _entryLpFundingFeeGrowth = sc_1.loadCoins();
    let _entryRolloverFeeGrowth = sc_1.loadCoins();
    return { $$type: 'LiquidityPoolUpdatedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, account: _account, amount: _amount, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter, realizedLpFundingFeeDelta: _realizedLpFundingFeeDelta, realizedLpRolloverFeeDelta: _realizedLpRolloverFeeDelta, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadTupleLiquidityPoolUpdatedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _amount = source.readBigNumber();
    let _tlpDelta = source.readBigNumber();
    let _tlpPrice = source.readBigNumber();
    let _tlpSupply = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _realizedLpFundingFeeDelta = source.readBigNumber();
    let _realizedLpRolloverFeeDelta = source.readBigNumber();
    let _entryLpFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidityPoolUpdatedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, account: _account, amount: _amount, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter, realizedLpFundingFeeDelta: _realizedLpFundingFeeDelta, realizedLpRolloverFeeDelta: _realizedLpRolloverFeeDelta, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadGetterTupleLiquidityPoolUpdatedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _account = source.readAddress();
    let _amount = source.readBigNumber();
    let _tlpDelta = source.readBigNumber();
    let _tlpPrice = source.readBigNumber();
    let _tlpSupply = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _realizedLpFundingFeeDelta = source.readBigNumber();
    let _realizedLpRolloverFeeDelta = source.readBigNumber();
    let _entryLpFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'LiquidityPoolUpdatedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, account: _account, amount: _amount, tlpDelta: _tlpDelta, tlpPrice: _tlpPrice, tlpSupply: _tlpSupply, lpFundAfter: _lpFundAfter, realizedLpFundingFeeDelta: _realizedLpFundingFeeDelta, realizedLpRolloverFeeDelta: _realizedLpRolloverFeeDelta, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function storeTupleLiquidityPoolUpdatedEvent(source: LiquidityPoolUpdatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeAddress(source.account);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.tlpDelta);
    builder.writeNumber(source.tlpPrice);
    builder.writeNumber(source.tlpSupply);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.realizedLpFundingFeeDelta);
    builder.writeNumber(source.realizedLpRolloverFeeDelta);
    builder.writeNumber(source.entryLpFundingFeeGrowth);
    builder.writeNumber(source.entryRolloverFeeGrowth);
    return builder.build();
}

function dictValueParserLiquidityPoolUpdatedEvent(): DictionaryValue<LiquidityPoolUpdatedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityPoolUpdatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityPoolUpdatedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpOrderCreatedEvent = {
    $$type: 'PerpOrderCreatedEvent';
    opType: bigint;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    executionFee: bigint;
    orderId: bigint;
    trxId: bigint;
    requestTime: bigint;
}

export function storePerpOrderCreatedEvent(src: PerpOrderCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2911777263, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeBit(src.triggerAbove);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.requestTime, 32);
    };
}

export function loadPerpOrderCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2911777263) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _triggerPrice = sc_0.loadUintBig(128);
    let _triggerAbove = sc_0.loadBit();
    let _executionFee = sc_0.loadCoins();
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _requestTime = sc_0.loadUintBig(32);
    return { $$type: 'PerpOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId, trxId: _trxId, requestTime: _requestTime };
}

function loadTuplePerpOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    return { $$type: 'PerpOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId, trxId: _trxId, requestTime: _requestTime };
}

function loadGetterTuplePerpOrderCreatedEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _executionFee = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _requestTime = source.readBigNumber();
    return { $$type: 'PerpOrderCreatedEvent' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, executionFee: _executionFee, orderId: _orderId, trxId: _trxId, requestTime: _requestTime };
}

function storeTuplePerpOrderCreatedEvent(source: PerpOrderCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.requestTime);
    return builder.build();
}

function dictValueParserPerpOrderCreatedEvent(): DictionaryValue<PerpOrderCreatedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrderCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrderCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpOrderCancelledEvent = {
    $$type: 'PerpOrderCancelledEvent';
    opType: bigint;
    orderId: bigint;
    trxId: bigint;
}

export function storePerpOrderCancelledEvent(src: PerpOrderCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4073041580, 32);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadPerpOrderCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4073041580) { throw Error('Invalid prefix'); }
    let _opType = sc_0.loadUintBig(8);
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'PerpOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadTuplePerpOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function loadGetterTuplePerpOrderCancelledEvent(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'PerpOrderCancelledEvent' as const, opType: _opType, orderId: _orderId, trxId: _trxId };
}

function storeTuplePerpOrderCancelledEvent(source: PerpOrderCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserPerpOrderCancelledEvent(): DictionaryValue<PerpOrderCancelledEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrderCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrderCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionIncreasedEvent = {
    $$type: 'PerpPositionIncreasedEvent';
    trxId: bigint;
    orderId: bigint;
    opType: bigint;
    positionId: bigint;
    account: Address;
    tokenId: bigint;
    isLong: boolean;
    marginDelta: bigint;
    marginAfter: bigint;
    sizeDelta: bigint;
    sizeAfter: bigint;
    tradePrice: bigint;
    entryPrice: bigint;
    fundingFee: bigint;
    rolloverFee: bigint;
    tradingFee: bigint;
    entryFundingFeeGrowthAfter: bigint;
    entryRolloverFeeGrowthAfter: bigint;
    globalLongMarginAfter: bigint;
    globalShortMarginAfter: bigint;
    globalLongSizeAfter: bigint;
    globalShortSizeAfter: bigint;
    globalLongValueAfter: bigint;
    globalShortValueAfter: bigint;
    lpNetSizeAfter: bigint;
    lpIsLong: boolean;
    lpEntryPriceAfter: bigint;
    lpFundAfter: bigint;
    lpTradingFee: bigint;
    lpRealizedPnl: bigint;
}

export function storePerpPositionIncreasedEvent(src: PerpPositionIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1197042366, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.positionId, 64);
        b_0.storeAddress(src.account);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 128);
        b_0.storeCoins(src.marginAfter);
        b_0.storeInt(src.sizeDelta, 128);
        b_0.storeCoins(src.sizeAfter);
        let b_1 = new Builder();
        b_1.storeUint(src.tradePrice, 128);
        b_1.storeUint(src.entryPrice, 128);
        b_1.storeInt(src.fundingFee, 128);
        b_1.storeCoins(src.rolloverFee);
        b_1.storeCoins(src.tradingFee);
        b_1.storeInt(src.entryFundingFeeGrowthAfter, 128);
        b_1.storeInt(src.entryRolloverFeeGrowthAfter, 128);
        b_1.storeCoins(src.globalLongMarginAfter);
        let b_2 = new Builder();
        b_2.storeCoins(src.globalShortMarginAfter);
        b_2.storeCoins(src.globalLongSizeAfter);
        b_2.storeCoins(src.globalShortSizeAfter);
        b_2.storeCoins(src.globalLongValueAfter);
        b_2.storeCoins(src.globalShortValueAfter);
        b_2.storeCoins(src.lpNetSizeAfter);
        b_2.storeBit(src.lpIsLong);
        b_2.storeUint(src.lpEntryPriceAfter, 128);
        b_2.storeInt(src.lpFundAfter, 128);
        let b_3 = new Builder();
        b_3.storeCoins(src.lpTradingFee);
        b_3.storeInt(src.lpRealizedPnl, 128);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1197042366) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _positionId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadUintBig(16);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(128);
    let _marginAfter = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadIntBig(128);
    let _sizeAfter = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _tradePrice = sc_1.loadUintBig(128);
    let _entryPrice = sc_1.loadUintBig(128);
    let _fundingFee = sc_1.loadIntBig(128);
    let _rolloverFee = sc_1.loadCoins();
    let _tradingFee = sc_1.loadCoins();
    let _entryFundingFeeGrowthAfter = sc_1.loadIntBig(128);
    let _entryRolloverFeeGrowthAfter = sc_1.loadIntBig(128);
    let _globalLongMarginAfter = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _globalShortMarginAfter = sc_2.loadCoins();
    let _globalLongSizeAfter = sc_2.loadCoins();
    let _globalShortSizeAfter = sc_2.loadCoins();
    let _globalLongValueAfter = sc_2.loadCoins();
    let _globalShortValueAfter = sc_2.loadCoins();
    let _lpNetSizeAfter = sc_2.loadCoins();
    let _lpIsLong = sc_2.loadBit();
    let _lpEntryPriceAfter = sc_2.loadUintBig(128);
    let _lpFundAfter = sc_2.loadIntBig(128);
    let sc_3 = sc_2.loadRef().beginParse();
    let _lpTradingFee = sc_3.loadCoins();
    let _lpRealizedPnl = sc_3.loadIntBig(128);
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function loadTuplePerpPositionIncreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _sizeAfter = source.readBigNumber();
    let _tradePrice = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    source = source.readTuple();
    let _rolloverFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _entryRolloverFeeGrowthAfter = source.readBigNumber();
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _globalLongValueAfter = source.readBigNumber();
    let _globalShortValueAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    source = source.readTuple();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function loadGetterTuplePerpPositionIncreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _sizeAfter = source.readBigNumber();
    let _tradePrice = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _rolloverFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _entryRolloverFeeGrowthAfter = source.readBigNumber();
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _globalLongValueAfter = source.readBigNumber();
    let _globalShortValueAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionIncreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function storeTuplePerpPositionIncreasedEvent(source: PerpPositionIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.sizeAfter);
    builder.writeNumber(source.tradePrice);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.rolloverFee);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.entryFundingFeeGrowthAfter);
    builder.writeNumber(source.entryRolloverFeeGrowthAfter);
    builder.writeNumber(source.globalLongMarginAfter);
    builder.writeNumber(source.globalShortMarginAfter);
    builder.writeNumber(source.globalLongSizeAfter);
    builder.writeNumber(source.globalShortSizeAfter);
    builder.writeNumber(source.globalLongValueAfter);
    builder.writeNumber(source.globalShortValueAfter);
    builder.writeNumber(source.lpNetSizeAfter);
    builder.writeBoolean(source.lpIsLong);
    builder.writeNumber(source.lpEntryPriceAfter);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.lpTradingFee);
    builder.writeNumber(source.lpRealizedPnl);
    return builder.build();
}

function dictValueParserPerpPositionIncreasedEvent(): DictionaryValue<PerpPositionIncreasedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionIncreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionIncreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionDecreasedEvent = {
    $$type: 'PerpPositionDecreasedEvent';
    trxId: bigint;
    orderId: bigint;
    opType: bigint;
    positionId: bigint;
    account: Address;
    tokenId: bigint;
    isLong: boolean;
    marginDelta: bigint;
    marginAfter: bigint;
    sizeDelta: bigint;
    sizeAfter: bigint;
    tradePrice: bigint;
    entryPrice: bigint;
    realizedPnLDelta: bigint;
    fundingFee: bigint;
    rolloverFee: bigint;
    tradingFee: bigint;
    entryFundingFeeGrowthAfter: bigint;
    entryRolloverFeeGrowthAfter: bigint;
    payout: bigint;
    globalLongMarginAfter: bigint;
    globalShortMarginAfter: bigint;
    globalLongSizeAfter: bigint;
    globalShortSizeAfter: bigint;
    globalLongValueAfter: bigint;
    globalShortValueAfter: bigint;
    lpNetSizeAfter: bigint;
    lpIsLong: boolean;
    lpEntryPriceAfter: bigint;
    lpFundAfter: bigint;
    lpTradingFee: bigint;
    lpRealizedPnl: bigint;
}

export function storePerpPositionDecreasedEvent(src: PerpPositionDecreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(592660044, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.positionId, 64);
        b_0.storeAddress(src.account);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeBit(src.isLong);
        b_0.storeInt(src.marginDelta, 128);
        b_0.storeCoins(src.marginAfter);
        b_0.storeInt(src.sizeDelta, 128);
        b_0.storeCoins(src.sizeAfter);
        let b_1 = new Builder();
        b_1.storeUint(src.tradePrice, 128);
        b_1.storeUint(src.entryPrice, 128);
        b_1.storeInt(src.realizedPnLDelta, 128);
        b_1.storeInt(src.fundingFee, 128);
        b_1.storeCoins(src.rolloverFee);
        b_1.storeCoins(src.tradingFee);
        b_1.storeInt(src.entryFundingFeeGrowthAfter, 128);
        b_1.storeInt(src.entryRolloverFeeGrowthAfter, 128);
        let b_2 = new Builder();
        b_2.storeCoins(src.payout);
        b_2.storeCoins(src.globalLongMarginAfter);
        b_2.storeCoins(src.globalShortMarginAfter);
        b_2.storeCoins(src.globalLongSizeAfter);
        b_2.storeCoins(src.globalShortSizeAfter);
        b_2.storeCoins(src.globalLongValueAfter);
        b_2.storeCoins(src.globalShortValueAfter);
        b_2.storeCoins(src.lpNetSizeAfter);
        b_2.storeBit(src.lpIsLong);
        let b_3 = new Builder();
        b_3.storeUint(src.lpEntryPriceAfter, 128);
        b_3.storeInt(src.lpFundAfter, 128);
        b_3.storeCoins(src.lpTradingFee);
        b_3.storeInt(src.lpRealizedPnl, 128);
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionDecreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 592660044) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _orderId = sc_0.loadUintBig(64);
    let _opType = sc_0.loadUintBig(8);
    let _positionId = sc_0.loadUintBig(64);
    let _account = sc_0.loadAddress();
    let _tokenId = sc_0.loadUintBig(16);
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadIntBig(128);
    let _marginAfter = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadIntBig(128);
    let _sizeAfter = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _tradePrice = sc_1.loadUintBig(128);
    let _entryPrice = sc_1.loadUintBig(128);
    let _realizedPnLDelta = sc_1.loadIntBig(128);
    let _fundingFee = sc_1.loadIntBig(128);
    let _rolloverFee = sc_1.loadCoins();
    let _tradingFee = sc_1.loadCoins();
    let _entryFundingFeeGrowthAfter = sc_1.loadIntBig(128);
    let _entryRolloverFeeGrowthAfter = sc_1.loadIntBig(128);
    let sc_2 = sc_1.loadRef().beginParse();
    let _payout = sc_2.loadCoins();
    let _globalLongMarginAfter = sc_2.loadCoins();
    let _globalShortMarginAfter = sc_2.loadCoins();
    let _globalLongSizeAfter = sc_2.loadCoins();
    let _globalShortSizeAfter = sc_2.loadCoins();
    let _globalLongValueAfter = sc_2.loadCoins();
    let _globalShortValueAfter = sc_2.loadCoins();
    let _lpNetSizeAfter = sc_2.loadCoins();
    let _lpIsLong = sc_2.loadBit();
    let sc_3 = sc_2.loadRef().beginParse();
    let _lpEntryPriceAfter = sc_3.loadUintBig(128);
    let _lpFundAfter = sc_3.loadIntBig(128);
    let _lpTradingFee = sc_3.loadCoins();
    let _lpRealizedPnl = sc_3.loadIntBig(128);
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, payout: _payout, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function loadTuplePerpPositionDecreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _sizeAfter = source.readBigNumber();
    let _tradePrice = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _realizedPnLDelta = source.readBigNumber();
    source = source.readTuple();
    let _fundingFee = source.readBigNumber();
    let _rolloverFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _entryRolloverFeeGrowthAfter = source.readBigNumber();
    let _payout = source.readBigNumber();
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _globalLongValueAfter = source.readBigNumber();
    let _globalShortValueAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    source = source.readTuple();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, payout: _payout, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function loadGetterTuplePerpPositionDecreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _orderId = source.readBigNumber();
    let _opType = source.readBigNumber();
    let _positionId = source.readBigNumber();
    let _account = source.readAddress();
    let _tokenId = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _marginAfter = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _sizeAfter = source.readBigNumber();
    let _tradePrice = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _realizedPnLDelta = source.readBigNumber();
    let _fundingFee = source.readBigNumber();
    let _rolloverFee = source.readBigNumber();
    let _tradingFee = source.readBigNumber();
    let _entryFundingFeeGrowthAfter = source.readBigNumber();
    let _entryRolloverFeeGrowthAfter = source.readBigNumber();
    let _payout = source.readBigNumber();
    let _globalLongMarginAfter = source.readBigNumber();
    let _globalShortMarginAfter = source.readBigNumber();
    let _globalLongSizeAfter = source.readBigNumber();
    let _globalShortSizeAfter = source.readBigNumber();
    let _globalLongValueAfter = source.readBigNumber();
    let _globalShortValueAfter = source.readBigNumber();
    let _lpNetSizeAfter = source.readBigNumber();
    let _lpIsLong = source.readBoolean();
    let _lpEntryPriceAfter = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _lpTradingFee = source.readBigNumber();
    let _lpRealizedPnl = source.readBigNumber();
    return { $$type: 'PerpPositionDecreasedEvent' as const, trxId: _trxId, orderId: _orderId, opType: _opType, positionId: _positionId, account: _account, tokenId: _tokenId, isLong: _isLong, marginDelta: _marginDelta, marginAfter: _marginAfter, sizeDelta: _sizeDelta, sizeAfter: _sizeAfter, tradePrice: _tradePrice, entryPrice: _entryPrice, realizedPnLDelta: _realizedPnLDelta, fundingFee: _fundingFee, rolloverFee: _rolloverFee, tradingFee: _tradingFee, entryFundingFeeGrowthAfter: _entryFundingFeeGrowthAfter, entryRolloverFeeGrowthAfter: _entryRolloverFeeGrowthAfter, payout: _payout, globalLongMarginAfter: _globalLongMarginAfter, globalShortMarginAfter: _globalShortMarginAfter, globalLongSizeAfter: _globalLongSizeAfter, globalShortSizeAfter: _globalShortSizeAfter, globalLongValueAfter: _globalLongValueAfter, globalShortValueAfter: _globalShortValueAfter, lpNetSizeAfter: _lpNetSizeAfter, lpIsLong: _lpIsLong, lpEntryPriceAfter: _lpEntryPriceAfter, lpFundAfter: _lpFundAfter, lpTradingFee: _lpTradingFee, lpRealizedPnl: _lpRealizedPnl };
}

function storeTuplePerpPositionDecreasedEvent(source: PerpPositionDecreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.opType);
    builder.writeNumber(source.positionId);
    builder.writeAddress(source.account);
    builder.writeNumber(source.tokenId);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.marginAfter);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.sizeAfter);
    builder.writeNumber(source.tradePrice);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.realizedPnLDelta);
    builder.writeNumber(source.fundingFee);
    builder.writeNumber(source.rolloverFee);
    builder.writeNumber(source.tradingFee);
    builder.writeNumber(source.entryFundingFeeGrowthAfter);
    builder.writeNumber(source.entryRolloverFeeGrowthAfter);
    builder.writeNumber(source.payout);
    builder.writeNumber(source.globalLongMarginAfter);
    builder.writeNumber(source.globalShortMarginAfter);
    builder.writeNumber(source.globalLongSizeAfter);
    builder.writeNumber(source.globalShortSizeAfter);
    builder.writeNumber(source.globalLongValueAfter);
    builder.writeNumber(source.globalShortValueAfter);
    builder.writeNumber(source.lpNetSizeAfter);
    builder.writeBoolean(source.lpIsLong);
    builder.writeNumber(source.lpEntryPriceAfter);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.lpTradingFee);
    builder.writeNumber(source.lpRealizedPnl);
    return builder.build();
}

function dictValueParserPerpPositionDecreasedEvent(): DictionaryValue<PerpPositionDecreasedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionDecreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionDecreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type CompensateCreatedEvent = {
    $$type: 'CompensateCreatedEvent';
    compensateId: bigint;
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFee: bigint;
    unlockTime: bigint;
}

export function storeCompensateCreatedEvent(src: CompensateCreatedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2519251606, 32);
        b_0.storeUint(src.compensateId, 64);
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeUint(src.orderType, 8); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeCoins(src.refundAmount);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeCoins(src.executionFee);
        let b_1 = new Builder();
        b_1.storeUint(src.unlockTime, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCompensateCreatedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2519251606) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _orderType = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadCoins();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _executionFee = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _unlockTime = sc_1.loadUintBig(32);
    return { $$type: 'CompensateCreatedEvent' as const, compensateId: _compensateId, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function loadTupleCompensateCreatedEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'CompensateCreatedEvent' as const, compensateId: _compensateId, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function loadGetterTupleCompensateCreatedEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'CompensateCreatedEvent' as const, compensateId: _compensateId, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function storeTupleCompensateCreatedEvent(source: CompensateCreatedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.unlockTime);
    return builder.build();
}

function dictValueParserCompensateCreatedEvent(): DictionaryValue<CompensateCreatedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateCreatedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateCreatedEvent(src.loadRef().beginParse());
        }
    }
}

export type CompensateCancelledEvent = {
    $$type: 'CompensateCancelledEvent';
    compensateId: bigint;
    trxId: bigint;
}

export function storeCompensateCancelledEvent(src: CompensateCancelledEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1271087573, 32);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCompensateCancelledEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1271087573) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CompensateCancelledEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleCompensateCancelledEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CompensateCancelledEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function loadGetterTupleCompensateCancelledEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CompensateCancelledEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleCompensateCancelledEvent(source: CompensateCancelledEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCompensateCancelledEvent(): DictionaryValue<CompensateCancelledEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateCancelledEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateCancelledEvent(src.loadRef().beginParse());
        }
    }
}

export type CompensateExecutedEvent = {
    $$type: 'CompensateExecutedEvent';
    compensateId: bigint;
    trxId: bigint;
}

export function storeCompensateExecutedEvent(src: CompensateExecutedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3678790712, 32);
        b_0.storeUint(src.compensateId, 64);
        b_0.storeUint(src.trxId, 64);
    };
}

export function loadCompensateExecutedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3678790712) { throw Error('Invalid prefix'); }
    let _compensateId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    return { $$type: 'CompensateExecutedEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function loadTupleCompensateExecutedEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CompensateExecutedEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function loadGetterTupleCompensateExecutedEvent(source: TupleReader) {
    let _compensateId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    return { $$type: 'CompensateExecutedEvent' as const, compensateId: _compensateId, trxId: _trxId };
}

function storeTupleCompensateExecutedEvent(source: CompensateExecutedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateId);
    builder.writeNumber(source.trxId);
    return builder.build();
}

function dictValueParserCompensateExecutedEvent(): DictionaryValue<CompensateExecutedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateExecutedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateExecutedEvent(src.loadRef().beginParse());
        }
    }
}

export type FeeChargedEvent = {
    $$type: 'FeeChargedEvent';
    trxId: bigint;
    lpFundAfter: bigint;
    realizedLpFundingFeeDelta: bigint;
    realizedLpRolloverFeeDelta: bigint;
    entryLpFundingFeeGrowth: bigint;
    entryRolloverFeeGrowth: bigint;
}

export function storeFeeChargedEvent(src: FeeChargedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2052307995, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeInt(src.lpFundAfter, 128);
        b_0.storeCoins(src.realizedLpFundingFeeDelta);
        b_0.storeCoins(src.realizedLpRolloverFeeDelta);
        b_0.storeCoins(src.entryLpFundingFeeGrowth);
        b_0.storeCoins(src.entryRolloverFeeGrowth);
    };
}

export function loadFeeChargedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2052307995) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _lpFundAfter = sc_0.loadIntBig(128);
    let _realizedLpFundingFeeDelta = sc_0.loadCoins();
    let _realizedLpRolloverFeeDelta = sc_0.loadCoins();
    let _entryLpFundingFeeGrowth = sc_0.loadCoins();
    let _entryRolloverFeeGrowth = sc_0.loadCoins();
    return { $$type: 'FeeChargedEvent' as const, trxId: _trxId, lpFundAfter: _lpFundAfter, realizedLpFundingFeeDelta: _realizedLpFundingFeeDelta, realizedLpRolloverFeeDelta: _realizedLpRolloverFeeDelta, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadTupleFeeChargedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _realizedLpFundingFeeDelta = source.readBigNumber();
    let _realizedLpRolloverFeeDelta = source.readBigNumber();
    let _entryLpFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'FeeChargedEvent' as const, trxId: _trxId, lpFundAfter: _lpFundAfter, realizedLpFundingFeeDelta: _realizedLpFundingFeeDelta, realizedLpRolloverFeeDelta: _realizedLpRolloverFeeDelta, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadGetterTupleFeeChargedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    let _realizedLpFundingFeeDelta = source.readBigNumber();
    let _realizedLpRolloverFeeDelta = source.readBigNumber();
    let _entryLpFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'FeeChargedEvent' as const, trxId: _trxId, lpFundAfter: _lpFundAfter, realizedLpFundingFeeDelta: _realizedLpFundingFeeDelta, realizedLpRolloverFeeDelta: _realizedLpRolloverFeeDelta, entryLpFundingFeeGrowth: _entryLpFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function storeTupleFeeChargedEvent(source: FeeChargedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.lpFundAfter);
    builder.writeNumber(source.realizedLpFundingFeeDelta);
    builder.writeNumber(source.realizedLpRolloverFeeDelta);
    builder.writeNumber(source.entryLpFundingFeeGrowth);
    builder.writeNumber(source.entryRolloverFeeGrowth);
    return builder.build();
}

function dictValueParserFeeChargedEvent(): DictionaryValue<FeeChargedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFeeChargedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadFeeChargedEvent(src.loadRef().beginParse());
        }
    }
}

export type AumIncreasedEvent = {
    $$type: 'AumIncreasedEvent';
    trxId: bigint;
    amount: bigint;
    lpFundAfter: bigint;
}

export function storeAumIncreasedEvent(src: AumIncreasedEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(174001912, 32);
        b_0.storeUint(src.trxId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeInt(src.lpFundAfter, 128);
    };
}

export function loadAumIncreasedEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 174001912) { throw Error('Invalid prefix'); }
    let _trxId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _lpFundAfter = sc_0.loadIntBig(128);
    return { $$type: 'AumIncreasedEvent' as const, trxId: _trxId, amount: _amount, lpFundAfter: _lpFundAfter };
}

function loadTupleAumIncreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    return { $$type: 'AumIncreasedEvent' as const, trxId: _trxId, amount: _amount, lpFundAfter: _lpFundAfter };
}

function loadGetterTupleAumIncreasedEvent(source: TupleReader) {
    let _trxId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _lpFundAfter = source.readBigNumber();
    return { $$type: 'AumIncreasedEvent' as const, trxId: _trxId, amount: _amount, lpFundAfter: _lpFundAfter };
}

function storeTupleAumIncreasedEvent(source: AumIncreasedEvent) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.trxId);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.lpFundAfter);
    return builder.build();
}

function dictValueParserAumIncreasedEvent(): DictionaryValue<AumIncreasedEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAumIncreasedEvent(src)).endCell());
        },
        parse: (src) => {
            return loadAumIncreasedEvent(src.loadRef().beginParse());
        }
    }
}

export type AccountInfo = {
    $$type: 'AccountInfo';
    isExecutor: boolean;
    isCompensator: boolean;
    isClaimer: boolean;
    isManager: boolean;
}

export function storeAccountInfo(src: AccountInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isExecutor);
        b_0.storeBit(src.isCompensator);
        b_0.storeBit(src.isClaimer);
        b_0.storeBit(src.isManager);
    };
}

export function loadAccountInfo(slice: Slice) {
    let sc_0 = slice;
    let _isExecutor = sc_0.loadBit();
    let _isCompensator = sc_0.loadBit();
    let _isClaimer = sc_0.loadBit();
    let _isManager = sc_0.loadBit();
    return { $$type: 'AccountInfo' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, isClaimer: _isClaimer, isManager: _isManager };
}

function loadTupleAccountInfo(source: TupleReader) {
    let _isExecutor = source.readBoolean();
    let _isCompensator = source.readBoolean();
    let _isClaimer = source.readBoolean();
    let _isManager = source.readBoolean();
    return { $$type: 'AccountInfo' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, isClaimer: _isClaimer, isManager: _isManager };
}

function loadGetterTupleAccountInfo(source: TupleReader) {
    let _isExecutor = source.readBoolean();
    let _isCompensator = source.readBoolean();
    let _isClaimer = source.readBoolean();
    let _isManager = source.readBoolean();
    return { $$type: 'AccountInfo' as const, isExecutor: _isExecutor, isCompensator: _isCompensator, isClaimer: _isClaimer, isManager: _isManager };
}

function storeTupleAccountInfo(source: AccountInfo) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isExecutor);
    builder.writeBoolean(source.isCompensator);
    builder.writeBoolean(source.isClaimer);
    builder.writeBoolean(source.isManager);
    return builder.build();
}

function dictValueParserAccountInfo(): DictionaryValue<AccountInfo> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAccountInfo(src)).endCell());
        },
        parse: (src) => {
            return loadAccountInfo(src.loadRef().beginParse());
        }
    }
}

export type ConfigData = {
    $$type: 'ConfigData';
    orderLockTime: bigint;
    mintJettonGas: bigint;
    burnJettonGas: bigint;
    transferJettonGas: bigint;
    createPerpOrderGas: bigint;
    cancelPerpOrderGas: bigint;
    executePerpOrderGas: bigint;
    createLiquidityOrderGas: bigint;
    cancelLiquidityOrderGas: bigint;
    executeLiquidityOrderGas: bigint;
    minStorageReserve: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    tlpWallet: Address;
    tlpJetton: Address;
    maxLpNetCap: bigint;
}

export function storeConfigData(src: ConfigData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.orderLockTime, 32);
        b_0.storeCoins(src.mintJettonGas);
        b_0.storeCoins(src.burnJettonGas);
        b_0.storeCoins(src.transferJettonGas);
        b_0.storeCoins(src.createPerpOrderGas);
        b_0.storeCoins(src.cancelPerpOrderGas);
        b_0.storeCoins(src.executePerpOrderGas);
        b_0.storeCoins(src.createLiquidityOrderGas);
        let b_1 = new Builder();
        b_1.storeCoins(src.cancelLiquidityOrderGas);
        b_1.storeCoins(src.executeLiquidityOrderGas);
        b_1.storeCoins(src.minStorageReserve);
        b_1.storeCoins(src.lpMinExecutionFee);
        b_1.storeCoins(src.perpMinExecutionFee);
        b_1.storeAddress(src.tlpWallet);
        let b_2 = new Builder();
        b_2.storeAddress(src.tlpJetton);
        b_2.storeCoins(src.maxLpNetCap);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadConfigData(slice: Slice) {
    let sc_0 = slice;
    let _orderLockTime = sc_0.loadUintBig(32);
    let _mintJettonGas = sc_0.loadCoins();
    let _burnJettonGas = sc_0.loadCoins();
    let _transferJettonGas = sc_0.loadCoins();
    let _createPerpOrderGas = sc_0.loadCoins();
    let _cancelPerpOrderGas = sc_0.loadCoins();
    let _executePerpOrderGas = sc_0.loadCoins();
    let _createLiquidityOrderGas = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _cancelLiquidityOrderGas = sc_1.loadCoins();
    let _executeLiquidityOrderGas = sc_1.loadCoins();
    let _minStorageReserve = sc_1.loadCoins();
    let _lpMinExecutionFee = sc_1.loadCoins();
    let _perpMinExecutionFee = sc_1.loadCoins();
    let _tlpWallet = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _tlpJetton = sc_2.loadAddress();
    let _maxLpNetCap = sc_2.loadCoins();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, tlpWallet: _tlpWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function loadTupleConfigData(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _tlpWallet = source.readAddress();
    source = source.readTuple();
    let _tlpJetton = source.readAddress();
    let _maxLpNetCap = source.readBigNumber();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, tlpWallet: _tlpWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function loadGetterTupleConfigData(source: TupleReader) {
    let _orderLockTime = source.readBigNumber();
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _tlpWallet = source.readAddress();
    let _tlpJetton = source.readAddress();
    let _maxLpNetCap = source.readBigNumber();
    return { $$type: 'ConfigData' as const, orderLockTime: _orderLockTime, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, tlpWallet: _tlpWallet, tlpJetton: _tlpJetton, maxLpNetCap: _maxLpNetCap };
}

function storeTupleConfigData(source: ConfigData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.mintJettonGas);
    builder.writeNumber(source.burnJettonGas);
    builder.writeNumber(source.transferJettonGas);
    builder.writeNumber(source.createPerpOrderGas);
    builder.writeNumber(source.cancelPerpOrderGas);
    builder.writeNumber(source.executePerpOrderGas);
    builder.writeNumber(source.createLiquidityOrderGas);
    builder.writeNumber(source.cancelLiquidityOrderGas);
    builder.writeNumber(source.executeLiquidityOrderGas);
    builder.writeNumber(source.minStorageReserve);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeAddress(source.tlpWallet);
    builder.writeAddress(source.tlpJetton);
    builder.writeNumber(source.maxLpNetCap);
    return builder.build();
}

function dictValueParserConfigData(): DictionaryValue<ConfigData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeConfigData(src)).endCell());
        },
        parse: (src) => {
            return loadConfigData(src.loadRef().beginParse());
        }
    }
}

export type TokenConfig = {
    $$type: 'TokenConfig';
    name: string;
    enable: boolean;
    maxLeverage: bigint;
    liquidationFee: bigint;
    maintenanceRate: bigint;
    tradingFeeRate: bigint;
    lpTradingFeeRate: bigint;
}

export function storeTokenConfig(src: TokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeBit(src.enable);
        b_0.storeUint(src.maxLeverage, 16);
        b_0.storeCoins(src.liquidationFee);
        b_0.storeUint(src.maintenanceRate, 32);
        b_0.storeUint(src.tradingFeeRate, 32);
        b_0.storeUint(src.lpTradingFeeRate, 32);
    };
}

export function loadTokenConfig(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _enable = sc_0.loadBit();
    let _maxLeverage = sc_0.loadUintBig(16);
    let _liquidationFee = sc_0.loadCoins();
    let _maintenanceRate = sc_0.loadUintBig(32);
    let _tradingFeeRate = sc_0.loadUintBig(32);
    let _lpTradingFeeRate = sc_0.loadUintBig(32);
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _maintenanceRate = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate };
}

function loadGetterTupleTokenConfig(source: TupleReader) {
    let _name = source.readString();
    let _enable = source.readBoolean();
    let _maxLeverage = source.readBigNumber();
    let _liquidationFee = source.readBigNumber();
    let _maintenanceRate = source.readBigNumber();
    let _tradingFeeRate = source.readBigNumber();
    let _lpTradingFeeRate = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, name: _name, enable: _enable, maxLeverage: _maxLeverage, liquidationFee: _liquidationFee, maintenanceRate: _maintenanceRate, tradingFeeRate: _tradingFeeRate, lpTradingFeeRate: _lpTradingFeeRate };
}

function storeTupleTokenConfig(source: TokenConfig) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeBoolean(source.enable);
    builder.writeNumber(source.maxLeverage);
    builder.writeNumber(source.liquidationFee);
    builder.writeNumber(source.maintenanceRate);
    builder.writeNumber(source.tradingFeeRate);
    builder.writeNumber(source.lpTradingFeeRate);
    return builder.build();
}

function dictValueParserTokenConfig(): DictionaryValue<TokenConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTokenConfig(src)).endCell());
        },
        parse: (src) => {
            return loadTokenConfig(src.loadRef().beginParse());
        }
    }
}

export type PoolStat = {
    $$type: 'PoolStat';
    tlpSupply: bigint;
    orderAmountReserve: bigint;
    executionFeeReserve: bigint;
    feeReserve: bigint;
    globalLPFund: bigint;
    globalLpFundingFeeGrowth: bigint;
    globalRolloverFeeGrowth: bigint;
}

export function storePoolStat(src: PoolStat) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.tlpSupply);
        b_0.storeCoins(src.orderAmountReserve);
        b_0.storeCoins(src.executionFeeReserve);
        b_0.storeCoins(src.feeReserve);
        b_0.storeInt(src.globalLPFund, 128);
        b_0.storeCoins(src.globalLpFundingFeeGrowth);
        b_0.storeCoins(src.globalRolloverFeeGrowth);
    };
}

export function loadPoolStat(slice: Slice) {
    let sc_0 = slice;
    let _tlpSupply = sc_0.loadCoins();
    let _orderAmountReserve = sc_0.loadCoins();
    let _executionFeeReserve = sc_0.loadCoins();
    let _feeReserve = sc_0.loadCoins();
    let _globalLPFund = sc_0.loadIntBig(128);
    let _globalLpFundingFeeGrowth = sc_0.loadCoins();
    let _globalRolloverFeeGrowth = sc_0.loadCoins();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, feeReserve: _feeReserve, globalLPFund: _globalLPFund, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function loadTuplePoolStat(source: TupleReader) {
    let _tlpSupply = source.readBigNumber();
    let _orderAmountReserve = source.readBigNumber();
    let _executionFeeReserve = source.readBigNumber();
    let _feeReserve = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, feeReserve: _feeReserve, globalLPFund: _globalLPFund, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function loadGetterTuplePoolStat(source: TupleReader) {
    let _tlpSupply = source.readBigNumber();
    let _orderAmountReserve = source.readBigNumber();
    let _executionFeeReserve = source.readBigNumber();
    let _feeReserve = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, feeReserve: _feeReserve, globalLPFund: _globalLPFund, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function storeTuplePoolStat(source: PoolStat) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tlpSupply);
    builder.writeNumber(source.orderAmountReserve);
    builder.writeNumber(source.executionFeeReserve);
    builder.writeNumber(source.feeReserve);
    builder.writeNumber(source.globalLPFund);
    builder.writeNumber(source.globalLpFundingFeeGrowth);
    builder.writeNumber(source.globalRolloverFeeGrowth);
    return builder.build();
}

function dictValueParserPoolStat(): DictionaryValue<PoolStat> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePoolStat(src)).endCell());
        },
        parse: (src) => {
            return loadPoolStat(src.loadRef().beginParse());
        }
    }
}

export type AccountPerpPosition = {
    $$type: 'AccountPerpPosition';
    positions: Dictionary<Address, DirectionPerpPosition>;
}

export function storeAccountPerpPosition(src: AccountPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.positions, Dictionary.Keys.Address(), dictValueParserDirectionPerpPosition());
    };
}

export function loadAccountPerpPosition(slice: Slice) {
    let sc_0 = slice;
    let _positions = Dictionary.load(Dictionary.Keys.Address(), dictValueParserDirectionPerpPosition(), sc_0);
    return { $$type: 'AccountPerpPosition' as const, positions: _positions };
}

function loadTupleAccountPerpPosition(source: TupleReader) {
    let _positions = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserDirectionPerpPosition(), source.readCellOpt());
    return { $$type: 'AccountPerpPosition' as const, positions: _positions };
}

function loadGetterTupleAccountPerpPosition(source: TupleReader) {
    let _positions = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserDirectionPerpPosition(), source.readCellOpt());
    return { $$type: 'AccountPerpPosition' as const, positions: _positions };
}

function storeTupleAccountPerpPosition(source: AccountPerpPosition) {
    let builder = new TupleBuilder();
    builder.writeCell(source.positions.size > 0 ? beginCell().storeDictDirect(source.positions, Dictionary.Keys.Address(), dictValueParserDirectionPerpPosition()).endCell() : null);
    return builder.build();
}

function dictValueParserAccountPerpPosition(): DictionaryValue<AccountPerpPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAccountPerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadAccountPerpPosition(src.loadRef().beginParse());
        }
    }
}

export type DirectionPerpPosition = {
    $$type: 'DirectionPerpPosition';
    longPosition: PerpPosition;
    shortPosition: PerpPosition;
}

export function storeDirectionPerpPosition(src: DirectionPerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storePerpPosition(src.longPosition));
        let b_1 = new Builder();
        b_1.store(storePerpPosition(src.shortPosition));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDirectionPerpPosition(slice: Slice) {
    let sc_0 = slice;
    let _longPosition = loadPerpPosition(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _shortPosition = loadPerpPosition(sc_1);
    return { $$type: 'DirectionPerpPosition' as const, longPosition: _longPosition, shortPosition: _shortPosition };
}

function loadTupleDirectionPerpPosition(source: TupleReader) {
    const _longPosition = loadTuplePerpPosition(source);
    const _shortPosition = loadTuplePerpPosition(source);
    return { $$type: 'DirectionPerpPosition' as const, longPosition: _longPosition, shortPosition: _shortPosition };
}

function loadGetterTupleDirectionPerpPosition(source: TupleReader) {
    const _longPosition = loadGetterTuplePerpPosition(source);
    const _shortPosition = loadGetterTuplePerpPosition(source);
    return { $$type: 'DirectionPerpPosition' as const, longPosition: _longPosition, shortPosition: _shortPosition };
}

function storeTupleDirectionPerpPosition(source: DirectionPerpPosition) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTuplePerpPosition(source.longPosition));
    builder.writeTuple(storeTuplePerpPosition(source.shortPosition));
    return builder.build();
}

function dictValueParserDirectionPerpPosition(): DictionaryValue<DirectionPerpPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDirectionPerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadDirectionPerpPosition(src.loadRef().beginParse());
        }
    }
}

export type PerpPosition = {
    $$type: 'PerpPosition';
    positionId: bigint;
    margin: bigint;
    size: bigint;
    entryPrice: bigint;
    entryFundingFeeGrowth: bigint;
    entryRolloverFeeGrowth: bigint;
}

export function storePerpPosition(src: PerpPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.positionId, 64);
        b_0.storeCoins(src.margin);
        b_0.storeCoins(src.size);
        b_0.storeUint(src.entryPrice, 128);
        b_0.storeInt(src.entryFundingFeeGrowth, 128);
        b_0.storeInt(src.entryRolloverFeeGrowth, 128);
    };
}

export function loadPerpPosition(slice: Slice) {
    let sc_0 = slice;
    let _positionId = sc_0.loadUintBig(64);
    let _margin = sc_0.loadCoins();
    let _size = sc_0.loadCoins();
    let _entryPrice = sc_0.loadUintBig(128);
    let _entryFundingFeeGrowth = sc_0.loadIntBig(128);
    let _entryRolloverFeeGrowth = sc_0.loadIntBig(128);
    return { $$type: 'PerpPosition' as const, positionId: _positionId, margin: _margin, size: _size, entryPrice: _entryPrice, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadTuplePerpPosition(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _margin = source.readBigNumber();
    let _size = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _entryFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'PerpPosition' as const, positionId: _positionId, margin: _margin, size: _size, entryPrice: _entryPrice, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function loadGetterTuplePerpPosition(source: TupleReader) {
    let _positionId = source.readBigNumber();
    let _margin = source.readBigNumber();
    let _size = source.readBigNumber();
    let _entryPrice = source.readBigNumber();
    let _entryFundingFeeGrowth = source.readBigNumber();
    let _entryRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'PerpPosition' as const, positionId: _positionId, margin: _margin, size: _size, entryPrice: _entryPrice, entryFundingFeeGrowth: _entryFundingFeeGrowth, entryRolloverFeeGrowth: _entryRolloverFeeGrowth };
}

function storeTuplePerpPosition(source: PerpPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.positionId);
    builder.writeNumber(source.margin);
    builder.writeNumber(source.size);
    builder.writeNumber(source.entryPrice);
    builder.writeNumber(source.entryFundingFeeGrowth);
    builder.writeNumber(source.entryRolloverFeeGrowth);
    return builder.build();
}

function dictValueParserPerpPosition(): DictionaryValue<PerpPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPosition(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPosition(src.loadRef().beginParse());
        }
    }
}

export type GlobalLPPosition = {
    $$type: 'GlobalLPPosition';
    netSize: bigint;
    isLong: boolean;
    entryPrice: bigint;
}

export function storeGlobalLPPosition(src: GlobalLPPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.netSize);
        b_0.storeBit(src.isLong);
        b_0.storeUint(src.entryPrice, 128);
    };
}

export function loadGlobalLPPosition(slice: Slice) {
    let sc_0 = slice;
    let _netSize = sc_0.loadCoins();
    let _isLong = sc_0.loadBit();
    let _entryPrice = sc_0.loadUintBig(128);
    return { $$type: 'GlobalLPPosition' as const, netSize: _netSize, isLong: _isLong, entryPrice: _entryPrice };
}

function loadTupleGlobalLPPosition(source: TupleReader) {
    let _netSize = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _entryPrice = source.readBigNumber();
    return { $$type: 'GlobalLPPosition' as const, netSize: _netSize, isLong: _isLong, entryPrice: _entryPrice };
}

function loadGetterTupleGlobalLPPosition(source: TupleReader) {
    let _netSize = source.readBigNumber();
    let _isLong = source.readBoolean();
    let _entryPrice = source.readBigNumber();
    return { $$type: 'GlobalLPPosition' as const, netSize: _netSize, isLong: _isLong, entryPrice: _entryPrice };
}

function storeTupleGlobalLPPosition(source: GlobalLPPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.netSize);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.entryPrice);
    return builder.build();
}

function dictValueParserGlobalLPPosition(): DictionaryValue<GlobalLPPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGlobalLPPosition(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalLPPosition(src.loadRef().beginParse());
        }
    }
}

export type PerpPositionData = {
    $$type: 'PerpPositionData';
    perpPosition: DirectionPerpPosition | null;
    globalLPPosition: GlobalLPPosition | null;
    globalPosition: GlobalPosition | null;
}

export function storePerpPositionData(src: PerpPositionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.perpPosition !== null && src.perpPosition !== undefined) { b_0.storeBit(true); b_0.store(storeDirectionPerpPosition(src.perpPosition)); } else { b_0.storeBit(false); }
        if (src.globalLPPosition !== null && src.globalLPPosition !== undefined) { b_0.storeBit(true); b_0.store(storeGlobalLPPosition(src.globalLPPosition)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.globalPosition !== null && src.globalPosition !== undefined) { b_1.storeBit(true); b_1.store(storeGlobalPosition(src.globalPosition)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpPositionData(slice: Slice) {
    let sc_0 = slice;
    let _perpPosition = sc_0.loadBit() ? loadDirectionPerpPosition(sc_0) : null;
    let _globalLPPosition = sc_0.loadBit() ? loadGlobalLPPosition(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _globalPosition = sc_1.loadBit() ? loadGlobalPosition(sc_1) : null;
    return { $$type: 'PerpPositionData' as const, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
}

function loadTuplePerpPositionData(source: TupleReader) {
    const _perpPosition_p = source.readTupleOpt();
    const _perpPosition = _perpPosition_p ? loadTupleDirectionPerpPosition(_perpPosition_p) : null;
    const _globalLPPosition_p = source.readTupleOpt();
    const _globalLPPosition = _globalLPPosition_p ? loadTupleGlobalLPPosition(_globalLPPosition_p) : null;
    const _globalPosition_p = source.readTupleOpt();
    const _globalPosition = _globalPosition_p ? loadTupleGlobalPosition(_globalPosition_p) : null;
    return { $$type: 'PerpPositionData' as const, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
}

function loadGetterTuplePerpPositionData(source: TupleReader) {
    const _perpPosition_p = source.readTupleOpt();
    const _perpPosition = _perpPosition_p ? loadTupleDirectionPerpPosition(_perpPosition_p) : null;
    const _globalLPPosition_p = source.readTupleOpt();
    const _globalLPPosition = _globalLPPosition_p ? loadTupleGlobalLPPosition(_globalLPPosition_p) : null;
    const _globalPosition_p = source.readTupleOpt();
    const _globalPosition = _globalPosition_p ? loadTupleGlobalPosition(_globalPosition_p) : null;
    return { $$type: 'PerpPositionData' as const, perpPosition: _perpPosition, globalLPPosition: _globalLPPosition, globalPosition: _globalPosition };
}

function storeTuplePerpPositionData(source: PerpPositionData) {
    let builder = new TupleBuilder();
    if (source.perpPosition !== null && source.perpPosition !== undefined) {
        builder.writeTuple(storeTupleDirectionPerpPosition(source.perpPosition));
    } else {
        builder.writeTuple(null);
    }
    if (source.globalLPPosition !== null && source.globalLPPosition !== undefined) {
        builder.writeTuple(storeTupleGlobalLPPosition(source.globalLPPosition));
    } else {
        builder.writeTuple(null);
    }
    if (source.globalPosition !== null && source.globalPosition !== undefined) {
        builder.writeTuple(storeTupleGlobalPosition(source.globalPosition));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserPerpPositionData(): DictionaryValue<PerpPositionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpPositionData(src)).endCell());
        },
        parse: (src) => {
            return loadPerpPositionData(src.loadRef().beginParse());
        }
    }
}

export type GlobalPosition = {
    $$type: 'GlobalPosition';
    longMargin: bigint;
    shortMargin: bigint;
    longSize: bigint;
    shortSize: bigint;
    longValue: bigint;
    shortValue: bigint;
}

export function storeGlobalPosition(src: GlobalPosition) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.longMargin);
        b_0.storeCoins(src.shortMargin);
        b_0.storeCoins(src.longSize);
        b_0.storeCoins(src.shortSize);
        b_0.storeCoins(src.longValue);
        b_0.storeCoins(src.shortValue);
    };
}

export function loadGlobalPosition(slice: Slice) {
    let sc_0 = slice;
    let _longMargin = sc_0.loadCoins();
    let _shortMargin = sc_0.loadCoins();
    let _longSize = sc_0.loadCoins();
    let _shortSize = sc_0.loadCoins();
    let _longValue = sc_0.loadCoins();
    let _shortValue = sc_0.loadCoins();
    return { $$type: 'GlobalPosition' as const, longMargin: _longMargin, shortMargin: _shortMargin, longSize: _longSize, shortSize: _shortSize, longValue: _longValue, shortValue: _shortValue };
}

function loadTupleGlobalPosition(source: TupleReader) {
    let _longMargin = source.readBigNumber();
    let _shortMargin = source.readBigNumber();
    let _longSize = source.readBigNumber();
    let _shortSize = source.readBigNumber();
    let _longValue = source.readBigNumber();
    let _shortValue = source.readBigNumber();
    return { $$type: 'GlobalPosition' as const, longMargin: _longMargin, shortMargin: _shortMargin, longSize: _longSize, shortSize: _shortSize, longValue: _longValue, shortValue: _shortValue };
}

function loadGetterTupleGlobalPosition(source: TupleReader) {
    let _longMargin = source.readBigNumber();
    let _shortMargin = source.readBigNumber();
    let _longSize = source.readBigNumber();
    let _shortSize = source.readBigNumber();
    let _longValue = source.readBigNumber();
    let _shortValue = source.readBigNumber();
    return { $$type: 'GlobalPosition' as const, longMargin: _longMargin, shortMargin: _shortMargin, longSize: _longSize, shortSize: _shortSize, longValue: _longValue, shortValue: _shortValue };
}

function storeTupleGlobalPosition(source: GlobalPosition) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.longMargin);
    builder.writeNumber(source.shortMargin);
    builder.writeNumber(source.longSize);
    builder.writeNumber(source.shortSize);
    builder.writeNumber(source.longValue);
    builder.writeNumber(source.shortValue);
    return builder.build();
}

function dictValueParserGlobalPosition(): DictionaryValue<GlobalPosition> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGlobalPosition(src)).endCell());
        },
        parse: (src) => {
            return loadGlobalPosition(src.loadRef().beginParse());
        }
    }
}

export type GasConfig = {
    $$type: 'GasConfig';
    mintJettonGas: bigint;
    burnJettonGas: bigint;
    transferJettonGas: bigint;
    createPerpOrderGas: bigint;
    cancelPerpOrderGas: bigint;
    executePerpOrderGas: bigint;
    createLiquidityOrderGas: bigint;
    cancelLiquidityOrderGas: bigint;
    executeLiquidityOrderGas: bigint;
    minStorageReserve: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
}

export function storeGasConfig(src: GasConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.mintJettonGas);
        b_0.storeCoins(src.burnJettonGas);
        b_0.storeCoins(src.transferJettonGas);
        b_0.storeCoins(src.createPerpOrderGas);
        b_0.storeCoins(src.cancelPerpOrderGas);
        b_0.storeCoins(src.executePerpOrderGas);
        b_0.storeCoins(src.createLiquidityOrderGas);
        b_0.storeCoins(src.cancelLiquidityOrderGas);
        let b_1 = new Builder();
        b_1.storeCoins(src.executeLiquidityOrderGas);
        b_1.storeCoins(src.minStorageReserve);
        b_1.storeCoins(src.lpMinExecutionFee);
        b_1.storeCoins(src.perpMinExecutionFee);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGasConfig(slice: Slice) {
    let sc_0 = slice;
    let _mintJettonGas = sc_0.loadCoins();
    let _burnJettonGas = sc_0.loadCoins();
    let _transferJettonGas = sc_0.loadCoins();
    let _createPerpOrderGas = sc_0.loadCoins();
    let _cancelPerpOrderGas = sc_0.loadCoins();
    let _executePerpOrderGas = sc_0.loadCoins();
    let _createLiquidityOrderGas = sc_0.loadCoins();
    let _cancelLiquidityOrderGas = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _executeLiquidityOrderGas = sc_1.loadCoins();
    let _minStorageReserve = sc_1.loadCoins();
    let _lpMinExecutionFee = sc_1.loadCoins();
    let _perpMinExecutionFee = sc_1.loadCoins();
    return { $$type: 'GasConfig' as const, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee };
}

function loadTupleGasConfig(source: TupleReader) {
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    return { $$type: 'GasConfig' as const, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee };
}

function loadGetterTupleGasConfig(source: TupleReader) {
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    return { $$type: 'GasConfig' as const, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, minStorageReserve: _minStorageReserve, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee };
}

function storeTupleGasConfig(source: GasConfig) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.mintJettonGas);
    builder.writeNumber(source.burnJettonGas);
    builder.writeNumber(source.transferJettonGas);
    builder.writeNumber(source.createPerpOrderGas);
    builder.writeNumber(source.cancelPerpOrderGas);
    builder.writeNumber(source.executePerpOrderGas);
    builder.writeNumber(source.createLiquidityOrderGas);
    builder.writeNumber(source.cancelLiquidityOrderGas);
    builder.writeNumber(source.executeLiquidityOrderGas);
    builder.writeNumber(source.minStorageReserve);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    return builder.build();
}

function dictValueParserGasConfig(): DictionaryValue<GasConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGasConfig(src)).endCell());
        },
        parse: (src) => {
            return loadGasConfig(src.loadRef().beginParse());
        }
    }
}

export type ExecutorConfig = {
    $$type: 'ExecutorConfig';
    executors: Dictionary<Address, boolean>;
}

export function storeExecutorConfig(src: ExecutorConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool());
    };
}

export function loadExecutorConfig(slice: Slice) {
    let sc_0 = slice;
    let _executors = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_0);
    return { $$type: 'ExecutorConfig' as const, executors: _executors };
}

function loadTupleExecutorConfig(source: TupleReader) {
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'ExecutorConfig' as const, executors: _executors };
}

function loadGetterTupleExecutorConfig(source: TupleReader) {
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    return { $$type: 'ExecutorConfig' as const, executors: _executors };
}

function storeTupleExecutorConfig(source: ExecutorConfig) {
    let builder = new TupleBuilder();
    builder.writeCell(source.executors.size > 0 ? beginCell().storeDictDirect(source.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    return builder.build();
}

function dictValueParserExecutorConfig(): DictionaryValue<ExecutorConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecutorConfig(src)).endCell());
        },
        parse: (src) => {
            return loadExecutorConfig(src.loadRef().beginParse());
        }
    }
}

export type ContractConfig = {
    $$type: 'ContractConfig';
    multisig: Address;
    tlpJetton: Address;
    tlpWallet: Address;
}

export function storeContractConfig(src: ContractConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.multisig);
        b_0.storeAddress(src.tlpJetton);
        b_0.storeAddress(src.tlpWallet);
    };
}

export function loadContractConfig(slice: Slice) {
    let sc_0 = slice;
    let _multisig = sc_0.loadAddress();
    let _tlpJetton = sc_0.loadAddress();
    let _tlpWallet = sc_0.loadAddress();
    return { $$type: 'ContractConfig' as const, multisig: _multisig, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet };
}

function loadTupleContractConfig(source: TupleReader) {
    let _multisig = source.readAddress();
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    return { $$type: 'ContractConfig' as const, multisig: _multisig, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet };
}

function loadGetterTupleContractConfig(source: TupleReader) {
    let _multisig = source.readAddress();
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    return { $$type: 'ContractConfig' as const, multisig: _multisig, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet };
}

function storeTupleContractConfig(source: ContractConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.multisig);
    builder.writeAddress(source.tlpJetton);
    builder.writeAddress(source.tlpWallet);
    return builder.build();
}

function dictValueParserContractConfig(): DictionaryValue<ContractConfig> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContractConfig(src)).endCell());
        },
        parse: (src) => {
            return loadContractConfig(src.loadRef().beginParse());
        }
    }
}

export type LiquidityOrder = {
    $$type: 'LiquidityOrder';
    isIncrease: boolean;
    account: Address;
    amount: bigint;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
}

export function storeLiquidityOrder(src: LiquidityOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.isIncrease);
        b_0.storeAddress(src.account);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.blockTime, 32);
        b_0.storeBit(src.isPending);
    };
}

export function loadLiquidityOrder(slice: Slice) {
    let sc_0 = slice;
    let _isIncrease = sc_0.loadBit();
    let _account = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _executionFee = sc_0.loadCoins();
    let _blockTime = sc_0.loadUintBig(32);
    let _isPending = sc_0.loadBit();
    return { $$type: 'LiquidityOrder' as const, isIncrease: _isIncrease, account: _account, amount: _amount, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
}

function loadTupleLiquidityOrder(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _amount = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    return { $$type: 'LiquidityOrder' as const, isIncrease: _isIncrease, account: _account, amount: _amount, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
}

function loadGetterTupleLiquidityOrder(source: TupleReader) {
    let _isIncrease = source.readBoolean();
    let _account = source.readAddress();
    let _amount = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    return { $$type: 'LiquidityOrder' as const, isIncrease: _isIncrease, account: _account, amount: _amount, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
}

function storeTupleLiquidityOrder(source: LiquidityOrder) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.isIncrease);
    builder.writeAddress(source.account);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    return builder.build();
}

function dictValueParserLiquidityOrder(): DictionaryValue<LiquidityOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityOrder(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityOrder(src.loadRef().beginParse());
        }
    }
}

export type LiquidityOrderData = {
    $$type: 'LiquidityOrderData';
    liquidityOrderIndexNext: bigint;
    liquidityOrder: LiquidityOrder | null;
}

export function storeLiquidityOrderData(src: LiquidityOrderData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.liquidityOrderIndexNext, 64);
        if (src.liquidityOrder !== null && src.liquidityOrder !== undefined) { b_0.storeBit(true); b_0.store(storeLiquidityOrder(src.liquidityOrder)); } else { b_0.storeBit(false); }
    };
}

export function loadLiquidityOrderData(slice: Slice) {
    let sc_0 = slice;
    let _liquidityOrderIndexNext = sc_0.loadUintBig(64);
    let _liquidityOrder = sc_0.loadBit() ? loadLiquidityOrder(sc_0) : null;
    return { $$type: 'LiquidityOrderData' as const, liquidityOrderIndexNext: _liquidityOrderIndexNext, liquidityOrder: _liquidityOrder };
}

function loadTupleLiquidityOrderData(source: TupleReader) {
    let _liquidityOrderIndexNext = source.readBigNumber();
    const _liquidityOrder_p = source.readTupleOpt();
    const _liquidityOrder = _liquidityOrder_p ? loadTupleLiquidityOrder(_liquidityOrder_p) : null;
    return { $$type: 'LiquidityOrderData' as const, liquidityOrderIndexNext: _liquidityOrderIndexNext, liquidityOrder: _liquidityOrder };
}

function loadGetterTupleLiquidityOrderData(source: TupleReader) {
    let _liquidityOrderIndexNext = source.readBigNumber();
    const _liquidityOrder_p = source.readTupleOpt();
    const _liquidityOrder = _liquidityOrder_p ? loadTupleLiquidityOrder(_liquidityOrder_p) : null;
    return { $$type: 'LiquidityOrderData' as const, liquidityOrderIndexNext: _liquidityOrderIndexNext, liquidityOrder: _liquidityOrder };
}

function storeTupleLiquidityOrderData(source: LiquidityOrderData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.liquidityOrderIndexNext);
    if (source.liquidityOrder !== null && source.liquidityOrder !== undefined) {
        builder.writeTuple(storeTupleLiquidityOrder(source.liquidityOrder));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserLiquidityOrderData(): DictionaryValue<LiquidityOrderData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityOrderData(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityOrderData(src.loadRef().beginParse());
        }
    }
}

export type PerpOrder = {
    $$type: 'PerpOrder';
    opType: bigint;
    tokenId: bigint;
    account: Address;
    isLong: boolean;
    marginDelta: bigint;
    sizeDelta: bigint;
    triggerPrice: bigint;
    triggerAbove: boolean;
    callbackRate: bigint;
    executionFee: bigint;
    blockTime: bigint;
    isPending: boolean;
}

export function storePerpOrder(src: PerpOrder) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.opType, 8);
        b_0.storeUint(src.tokenId, 16);
        b_0.storeAddress(src.account);
        b_0.storeBit(src.isLong);
        b_0.storeCoins(src.marginDelta);
        b_0.storeCoins(src.sizeDelta);
        b_0.storeUint(src.triggerPrice, 128);
        b_0.storeBit(src.triggerAbove);
        b_0.storeUint(src.callbackRate, 16);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.blockTime, 32);
        b_0.storeBit(src.isPending);
    };
}

export function loadPerpOrder(slice: Slice) {
    let sc_0 = slice;
    let _opType = sc_0.loadUintBig(8);
    let _tokenId = sc_0.loadUintBig(16);
    let _account = sc_0.loadAddress();
    let _isLong = sc_0.loadBit();
    let _marginDelta = sc_0.loadCoins();
    let _sizeDelta = sc_0.loadCoins();
    let _triggerPrice = sc_0.loadUintBig(128);
    let _triggerAbove = sc_0.loadBit();
    let _callbackRate = sc_0.loadUintBig(16);
    let _executionFee = sc_0.loadCoins();
    let _blockTime = sc_0.loadUintBig(32);
    let _isPending = sc_0.loadBit();
    return { $$type: 'PerpOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, callbackRate: _callbackRate, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
}

function loadTuplePerpOrder(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _callbackRate = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    return { $$type: 'PerpOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, callbackRate: _callbackRate, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
}

function loadGetterTuplePerpOrder(source: TupleReader) {
    let _opType = source.readBigNumber();
    let _tokenId = source.readBigNumber();
    let _account = source.readAddress();
    let _isLong = source.readBoolean();
    let _marginDelta = source.readBigNumber();
    let _sizeDelta = source.readBigNumber();
    let _triggerPrice = source.readBigNumber();
    let _triggerAbove = source.readBoolean();
    let _callbackRate = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    let _blockTime = source.readBigNumber();
    let _isPending = source.readBoolean();
    return { $$type: 'PerpOrder' as const, opType: _opType, tokenId: _tokenId, account: _account, isLong: _isLong, marginDelta: _marginDelta, sizeDelta: _sizeDelta, triggerPrice: _triggerPrice, triggerAbove: _triggerAbove, callbackRate: _callbackRate, executionFee: _executionFee, blockTime: _blockTime, isPending: _isPending };
}

function storeTuplePerpOrder(source: PerpOrder) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.opType);
    builder.writeNumber(source.tokenId);
    builder.writeAddress(source.account);
    builder.writeBoolean(source.isLong);
    builder.writeNumber(source.marginDelta);
    builder.writeNumber(source.sizeDelta);
    builder.writeNumber(source.triggerPrice);
    builder.writeBoolean(source.triggerAbove);
    builder.writeNumber(source.callbackRate);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.blockTime);
    builder.writeBoolean(source.isPending);
    return builder.build();
}

function dictValueParserPerpOrder(): DictionaryValue<PerpOrder> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrder(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrder(src.loadRef().beginParse());
        }
    }
}

export type PerpOrderEx = {
    $$type: 'PerpOrderEx';
    tpSize: bigint;
    tpPrice: bigint;
    slSize: bigint;
    slPrice: bigint;
    executionFee: bigint;
}

export function storePerpOrderEx(src: PerpOrderEx) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeCoins(src.tpSize);
        b_0.storeUint(src.tpPrice, 128);
        b_0.storeCoins(src.slSize);
        b_0.storeUint(src.slPrice, 128);
        b_0.storeCoins(src.executionFee);
    };
}

export function loadPerpOrderEx(slice: Slice) {
    let sc_0 = slice;
    let _tpSize = sc_0.loadCoins();
    let _tpPrice = sc_0.loadUintBig(128);
    let _slSize = sc_0.loadCoins();
    let _slPrice = sc_0.loadUintBig(128);
    let _executionFee = sc_0.loadCoins();
    return { $$type: 'PerpOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee };
}

function loadTuplePerpOrderEx(source: TupleReader) {
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    return { $$type: 'PerpOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee };
}

function loadGetterTuplePerpOrderEx(source: TupleReader) {
    let _tpSize = source.readBigNumber();
    let _tpPrice = source.readBigNumber();
    let _slSize = source.readBigNumber();
    let _slPrice = source.readBigNumber();
    let _executionFee = source.readBigNumber();
    return { $$type: 'PerpOrderEx' as const, tpSize: _tpSize, tpPrice: _tpPrice, slSize: _slSize, slPrice: _slPrice, executionFee: _executionFee };
}

function storeTuplePerpOrderEx(source: PerpOrderEx) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tpSize);
    builder.writeNumber(source.tpPrice);
    builder.writeNumber(source.slSize);
    builder.writeNumber(source.slPrice);
    builder.writeNumber(source.executionFee);
    return builder.build();
}

function dictValueParserPerpOrderEx(): DictionaryValue<PerpOrderEx> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrderEx(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrderEx(src.loadRef().beginParse());
        }
    }
}

export type PerpOrderData = {
    $$type: 'PerpOrderData';
    perpOrderIndexNext: bigint;
    perpOrder: PerpOrder | null;
    perpOrderEx: PerpOrderEx | null;
}

export function storePerpOrderData(src: PerpOrderData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.perpOrderIndexNext, 64);
        if (src.perpOrder !== null && src.perpOrder !== undefined) { b_0.storeBit(true); b_0.store(storePerpOrder(src.perpOrder)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.perpOrderEx !== null && src.perpOrderEx !== undefined) { b_1.storeBit(true); b_1.store(storePerpOrderEx(src.perpOrderEx)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPerpOrderData(slice: Slice) {
    let sc_0 = slice;
    let _perpOrderIndexNext = sc_0.loadUintBig(64);
    let _perpOrder = sc_0.loadBit() ? loadPerpOrder(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _perpOrderEx = sc_1.loadBit() ? loadPerpOrderEx(sc_1) : null;
    return { $$type: 'PerpOrderData' as const, perpOrderIndexNext: _perpOrderIndexNext, perpOrder: _perpOrder, perpOrderEx: _perpOrderEx };
}

function loadTuplePerpOrderData(source: TupleReader) {
    let _perpOrderIndexNext = source.readBigNumber();
    const _perpOrder_p = source.readTupleOpt();
    const _perpOrder = _perpOrder_p ? loadTuplePerpOrder(_perpOrder_p) : null;
    const _perpOrderEx_p = source.readTupleOpt();
    const _perpOrderEx = _perpOrderEx_p ? loadTuplePerpOrderEx(_perpOrderEx_p) : null;
    return { $$type: 'PerpOrderData' as const, perpOrderIndexNext: _perpOrderIndexNext, perpOrder: _perpOrder, perpOrderEx: _perpOrderEx };
}

function loadGetterTuplePerpOrderData(source: TupleReader) {
    let _perpOrderIndexNext = source.readBigNumber();
    const _perpOrder_p = source.readTupleOpt();
    const _perpOrder = _perpOrder_p ? loadTuplePerpOrder(_perpOrder_p) : null;
    const _perpOrderEx_p = source.readTupleOpt();
    const _perpOrderEx = _perpOrderEx_p ? loadTuplePerpOrderEx(_perpOrderEx_p) : null;
    return { $$type: 'PerpOrderData' as const, perpOrderIndexNext: _perpOrderIndexNext, perpOrder: _perpOrder, perpOrderEx: _perpOrderEx };
}

function storeTuplePerpOrderData(source: PerpOrderData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.perpOrderIndexNext);
    if (source.perpOrder !== null && source.perpOrder !== undefined) {
        builder.writeTuple(storeTuplePerpOrder(source.perpOrder));
    } else {
        builder.writeTuple(null);
    }
    if (source.perpOrderEx !== null && source.perpOrderEx !== undefined) {
        builder.writeTuple(storeTuplePerpOrderEx(source.perpOrderEx));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserPerpOrderData(): DictionaryValue<PerpOrderData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePerpOrderData(src)).endCell());
        },
        parse: (src) => {
            return loadPerpOrderData(src.loadRef().beginParse());
        }
    }
}

export type Compensate = {
    $$type: 'Compensate';
    orderType: bigint | null;
    orderId: bigint;
    trxId: bigint;
    refundReceiver: Address | null;
    refundAmount: bigint;
    executionFeeReceiver: Address | null;
    executionFee: bigint;
    unlockTime: bigint;
}

export function storeCompensate(src: Compensate) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.orderType !== null && src.orderType !== undefined) { b_0.storeBit(true).storeUint(src.orderType, 8); } else { b_0.storeBit(false); }
        b_0.storeUint(src.orderId, 64);
        b_0.storeUint(src.trxId, 64);
        b_0.storeAddress(src.refundReceiver);
        b_0.storeCoins(src.refundAmount);
        b_0.storeAddress(src.executionFeeReceiver);
        b_0.storeCoins(src.executionFee);
        b_0.storeUint(src.unlockTime, 32);
    };
}

export function loadCompensate(slice: Slice) {
    let sc_0 = slice;
    let _orderType = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _orderId = sc_0.loadUintBig(64);
    let _trxId = sc_0.loadUintBig(64);
    let _refundReceiver = sc_0.loadMaybeAddress();
    let _refundAmount = sc_0.loadCoins();
    let _executionFeeReceiver = sc_0.loadMaybeAddress();
    let _executionFee = sc_0.loadCoins();
    let _unlockTime = sc_0.loadUintBig(32);
    return { $$type: 'Compensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function loadTupleCompensate(source: TupleReader) {
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'Compensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function loadGetterTupleCompensate(source: TupleReader) {
    let _orderType = source.readBigNumberOpt();
    let _orderId = source.readBigNumber();
    let _trxId = source.readBigNumber();
    let _refundReceiver = source.readAddressOpt();
    let _refundAmount = source.readBigNumber();
    let _executionFeeReceiver = source.readAddressOpt();
    let _executionFee = source.readBigNumber();
    let _unlockTime = source.readBigNumber();
    return { $$type: 'Compensate' as const, orderType: _orderType, orderId: _orderId, trxId: _trxId, refundReceiver: _refundReceiver, refundAmount: _refundAmount, executionFeeReceiver: _executionFeeReceiver, executionFee: _executionFee, unlockTime: _unlockTime };
}

function storeTupleCompensate(source: Compensate) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.orderType);
    builder.writeNumber(source.orderId);
    builder.writeNumber(source.trxId);
    builder.writeAddress(source.refundReceiver);
    builder.writeNumber(source.refundAmount);
    builder.writeAddress(source.executionFeeReceiver);
    builder.writeNumber(source.executionFee);
    builder.writeNumber(source.unlockTime);
    return builder.build();
}

function dictValueParserCompensate(): DictionaryValue<Compensate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensate(src)).endCell());
        },
        parse: (src) => {
            return loadCompensate(src.loadRef().beginParse());
        }
    }
}

export type CompensateData = {
    $$type: 'CompensateData';
    compensateIndexNext: bigint;
    compensate: Compensate | null;
}

export function storeCompensateData(src: CompensateData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.compensateIndexNext, 64);
        if (src.compensate !== null && src.compensate !== undefined) { b_0.storeBit(true); b_0.store(storeCompensate(src.compensate)); } else { b_0.storeBit(false); }
    };
}

export function loadCompensateData(slice: Slice) {
    let sc_0 = slice;
    let _compensateIndexNext = sc_0.loadUintBig(64);
    let _compensate = sc_0.loadBit() ? loadCompensate(sc_0) : null;
    return { $$type: 'CompensateData' as const, compensateIndexNext: _compensateIndexNext, compensate: _compensate };
}

function loadTupleCompensateData(source: TupleReader) {
    let _compensateIndexNext = source.readBigNumber();
    const _compensate_p = source.readTupleOpt();
    const _compensate = _compensate_p ? loadTupleCompensate(_compensate_p) : null;
    return { $$type: 'CompensateData' as const, compensateIndexNext: _compensateIndexNext, compensate: _compensate };
}

function loadGetterTupleCompensateData(source: TupleReader) {
    let _compensateIndexNext = source.readBigNumber();
    const _compensate_p = source.readTupleOpt();
    const _compensate = _compensate_p ? loadTupleCompensate(_compensate_p) : null;
    return { $$type: 'CompensateData' as const, compensateIndexNext: _compensateIndexNext, compensate: _compensate };
}

function storeTupleCompensateData(source: CompensateData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.compensateIndexNext);
    if (source.compensate !== null && source.compensate !== undefined) {
        builder.writeTuple(storeTupleCompensate(source.compensate));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserCompensateData(): DictionaryValue<CompensateData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCompensateData(src)).endCell());
        },
        parse: (src) => {
            return loadCompensateData(src.loadRef().beginParse());
        }
    }
}

export type Pool$Data = {
    $$type: 'Pool$Data';
    owner: Address;
    stopped: boolean;
    orderLockTime: bigint;
    maxLpNetCap: bigint;
    lpRolloverFeeRate: bigint;
    liquidatedPositionShareRate: bigint;
    normalPositionShareRate: bigint;
    mintJettonGas: bigint;
    burnJettonGas: bigint;
    transferJettonGas: bigint;
    createPerpOrderGas: bigint;
    cancelPerpOrderGas: bigint;
    executePerpOrderGas: bigint;
    createLiquidityOrderGas: bigint;
    cancelLiquidityOrderGas: bigint;
    executeLiquidityOrderGas: bigint;
    lpMinExecutionFee: bigint;
    perpMinExecutionFee: bigint;
    minStorageReserve: bigint;
    tlpSupply: bigint;
    tlpJetton: Address;
    tlpWallet: Address;
    manager: Address;
    compensator: Address;
    claimer: Address;
    executors: Dictionary<Address, boolean>;
    tokenConfigs: Dictionary<number, TokenConfig>;
    liquidityOrders: Dictionary<bigint, LiquidityOrder>;
    liquidityOrderIndexNext: bigint;
    perpOrders: Dictionary<bigint, PerpOrder>;
    perpOrderExs: Dictionary<bigint, PerpOrderEx>;
    perpOrderIndexNext: bigint;
    compensates: Dictionary<bigint, Compensate>;
    compensateIndexNext: bigint;
    positionIndexNext: bigint;
    positions: Dictionary<number, AccountPerpPosition>;
    globalLPPositions: Dictionary<number, GlobalLPPosition>;
    globalPositions: Dictionary<number, GlobalPosition>;
    feeReserve: bigint;
    orderAmountReserve: bigint;
    executionFeeReserve: bigint;
    globalLPFund: bigint;
    globalLPUnrealizedPnl: bigint;
    globalLpFundingFeeGrowth: bigint;
    globalRolloverFeeGrowth: bigint;
    multisig: Address;
    publicKey: bigint;
    upgradeSeqno: bigint;
    upgradeRequests: Dictionary<number, UpgradeRequest>;
    prices: Dictionary<number, bigint>;
}

export function storePool$Data(src: Pool$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.stopped);
        b_0.storeUint(src.orderLockTime, 32);
        b_0.storeCoins(src.maxLpNetCap);
        b_0.storeUint(src.lpRolloverFeeRate, 32);
        b_0.storeUint(src.liquidatedPositionShareRate, 32);
        b_0.storeUint(src.normalPositionShareRate, 32);
        b_0.storeCoins(src.mintJettonGas);
        b_0.storeCoins(src.burnJettonGas);
        b_0.storeCoins(src.transferJettonGas);
        b_0.storeCoins(src.createPerpOrderGas);
        let b_1 = new Builder();
        b_1.storeCoins(src.cancelPerpOrderGas);
        b_1.storeCoins(src.executePerpOrderGas);
        b_1.storeCoins(src.createLiquidityOrderGas);
        b_1.storeCoins(src.cancelLiquidityOrderGas);
        b_1.storeCoins(src.executeLiquidityOrderGas);
        b_1.storeCoins(src.lpMinExecutionFee);
        b_1.storeCoins(src.perpMinExecutionFee);
        b_1.storeCoins(src.minStorageReserve);
        let b_2 = new Builder();
        b_2.storeCoins(src.tlpSupply);
        b_2.storeAddress(src.tlpJetton);
        b_2.storeAddress(src.tlpWallet);
        b_2.storeAddress(src.manager);
        let b_3 = new Builder();
        b_3.storeAddress(src.compensator);
        b_3.storeAddress(src.claimer);
        b_3.storeDict(src.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool());
        b_3.storeDict(src.tokenConfigs, Dictionary.Keys.Uint(16), dictValueParserTokenConfig());
        b_3.storeDict(src.liquidityOrders, Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder());
        b_3.storeUint(src.liquidityOrderIndexNext, 64);
        let b_4 = new Builder();
        b_4.storeDict(src.perpOrders, Dictionary.Keys.BigUint(64), dictValueParserPerpOrder());
        b_4.storeDict(src.perpOrderExs, Dictionary.Keys.BigUint(64), dictValueParserPerpOrderEx());
        b_4.storeUint(src.perpOrderIndexNext, 64);
        b_4.storeDict(src.compensates, Dictionary.Keys.BigUint(64), dictValueParserCompensate());
        b_4.storeUint(src.compensateIndexNext, 64);
        b_4.storeUint(src.positionIndexNext, 64);
        let b_5 = new Builder();
        b_5.storeDict(src.positions, Dictionary.Keys.Uint(16), dictValueParserAccountPerpPosition());
        b_5.storeDict(src.globalLPPositions, Dictionary.Keys.Uint(16), dictValueParserGlobalLPPosition());
        b_5.storeDict(src.globalPositions, Dictionary.Keys.Uint(16), dictValueParserGlobalPosition());
        b_5.storeCoins(src.feeReserve);
        b_5.storeCoins(src.orderAmountReserve);
        b_5.storeCoins(src.executionFeeReserve);
        b_5.storeInt(src.globalLPFund, 128);
        b_5.storeInt(src.globalLPUnrealizedPnl, 128);
        b_5.storeCoins(src.globalLpFundingFeeGrowth);
        b_5.storeCoins(src.globalRolloverFeeGrowth);
        let b_6 = new Builder();
        b_6.storeAddress(src.multisig);
        b_6.storeUint(src.publicKey, 256);
        b_6.storeUint(src.upgradeSeqno, 32);
        b_6.storeDict(src.upgradeRequests, Dictionary.Keys.Uint(32), dictValueParserUpgradeRequest());
        b_6.storeDict(src.prices, Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128));
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPool$Data(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _stopped = sc_0.loadBit();
    let _orderLockTime = sc_0.loadUintBig(32);
    let _maxLpNetCap = sc_0.loadCoins();
    let _lpRolloverFeeRate = sc_0.loadUintBig(32);
    let _liquidatedPositionShareRate = sc_0.loadUintBig(32);
    let _normalPositionShareRate = sc_0.loadUintBig(32);
    let _mintJettonGas = sc_0.loadCoins();
    let _burnJettonGas = sc_0.loadCoins();
    let _transferJettonGas = sc_0.loadCoins();
    let _createPerpOrderGas = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _cancelPerpOrderGas = sc_1.loadCoins();
    let _executePerpOrderGas = sc_1.loadCoins();
    let _createLiquidityOrderGas = sc_1.loadCoins();
    let _cancelLiquidityOrderGas = sc_1.loadCoins();
    let _executeLiquidityOrderGas = sc_1.loadCoins();
    let _lpMinExecutionFee = sc_1.loadCoins();
    let _perpMinExecutionFee = sc_1.loadCoins();
    let _minStorageReserve = sc_1.loadCoins();
    let sc_2 = sc_1.loadRef().beginParse();
    let _tlpSupply = sc_2.loadCoins();
    let _tlpJetton = sc_2.loadAddress();
    let _tlpWallet = sc_2.loadAddress();
    let _manager = sc_2.loadAddress();
    let sc_3 = sc_2.loadRef().beginParse();
    let _compensator = sc_3.loadAddress();
    let _claimer = sc_3.loadAddress();
    let _executors = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.Bool(), sc_3);
    let _tokenConfigs = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserTokenConfig(), sc_3);
    let _liquidityOrders = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder(), sc_3);
    let _liquidityOrderIndexNext = sc_3.loadUintBig(64);
    let sc_4 = sc_3.loadRef().beginParse();
    let _perpOrders = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserPerpOrder(), sc_4);
    let _perpOrderExs = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserPerpOrderEx(), sc_4);
    let _perpOrderIndexNext = sc_4.loadUintBig(64);
    let _compensates = Dictionary.load(Dictionary.Keys.BigUint(64), dictValueParserCompensate(), sc_4);
    let _compensateIndexNext = sc_4.loadUintBig(64);
    let _positionIndexNext = sc_4.loadUintBig(64);
    let sc_5 = sc_4.loadRef().beginParse();
    let _positions = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserAccountPerpPosition(), sc_5);
    let _globalLPPositions = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserGlobalLPPosition(), sc_5);
    let _globalPositions = Dictionary.load(Dictionary.Keys.Uint(16), dictValueParserGlobalPosition(), sc_5);
    let _feeReserve = sc_5.loadCoins();
    let _orderAmountReserve = sc_5.loadCoins();
    let _executionFeeReserve = sc_5.loadCoins();
    let _globalLPFund = sc_5.loadIntBig(128);
    let _globalLPUnrealizedPnl = sc_5.loadIntBig(128);
    let _globalLpFundingFeeGrowth = sc_5.loadCoins();
    let _globalRolloverFeeGrowth = sc_5.loadCoins();
    let sc_6 = sc_5.loadRef().beginParse();
    let _multisig = sc_6.loadAddress();
    let _publicKey = sc_6.loadUintBig(256);
    let _upgradeSeqno = sc_6.loadUintBig(32);
    let _upgradeRequests = Dictionary.load(Dictionary.Keys.Uint(32), dictValueParserUpgradeRequest(), sc_6);
    let _prices = Dictionary.load(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), sc_6);
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpSupply: _tlpSupply, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, positionIndexNext: _positionIndexNext, positions: _positions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, feeReserve: _feeReserve, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig, publicKey: _publicKey, upgradeSeqno: _upgradeSeqno, upgradeRequests: _upgradeRequests, prices: _prices };
}

function loadTuplePool$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _stopped = source.readBoolean();
    let _orderLockTime = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    let _liquidatedPositionShareRate = source.readBigNumber();
    let _normalPositionShareRate = source.readBigNumber();
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    source = source.readTuple();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _tlpSupply = source.readBigNumber();
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    let _manager = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _tokenConfigs = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserTokenConfig(), source.readCellOpt());
    let _liquidityOrders = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder(), source.readCellOpt());
    source = source.readTuple();
    let _liquidityOrderIndexNext = source.readBigNumber();
    let _perpOrders = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserPerpOrder(), source.readCellOpt());
    let _perpOrderExs = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserPerpOrderEx(), source.readCellOpt());
    let _perpOrderIndexNext = source.readBigNumber();
    let _compensates = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserCompensate(), source.readCellOpt());
    let _compensateIndexNext = source.readBigNumber();
    let _positionIndexNext = source.readBigNumber();
    let _positions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserAccountPerpPosition(), source.readCellOpt());
    let _globalLPPositions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserGlobalLPPosition(), source.readCellOpt());
    let _globalPositions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserGlobalPosition(), source.readCellOpt());
    let _feeReserve = source.readBigNumber();
    let _orderAmountReserve = source.readBigNumber();
    let _executionFeeReserve = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    source = source.readTuple();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    let _multisig = source.readAddress();
    let _publicKey = source.readBigNumber();
    let _upgradeSeqno = source.readBigNumber();
    let _upgradeRequests = Dictionary.loadDirect(Dictionary.Keys.Uint(32), dictValueParserUpgradeRequest(), source.readCellOpt());
    let _prices = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), source.readCellOpt());
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpSupply: _tlpSupply, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, positionIndexNext: _positionIndexNext, positions: _positions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, feeReserve: _feeReserve, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig, publicKey: _publicKey, upgradeSeqno: _upgradeSeqno, upgradeRequests: _upgradeRequests, prices: _prices };
}

function loadGetterTuplePool$Data(source: TupleReader) {
    let _owner = source.readAddress();
    let _stopped = source.readBoolean();
    let _orderLockTime = source.readBigNumber();
    let _maxLpNetCap = source.readBigNumber();
    let _lpRolloverFeeRate = source.readBigNumber();
    let _liquidatedPositionShareRate = source.readBigNumber();
    let _normalPositionShareRate = source.readBigNumber();
    let _mintJettonGas = source.readBigNumber();
    let _burnJettonGas = source.readBigNumber();
    let _transferJettonGas = source.readBigNumber();
    let _createPerpOrderGas = source.readBigNumber();
    let _cancelPerpOrderGas = source.readBigNumber();
    let _executePerpOrderGas = source.readBigNumber();
    let _createLiquidityOrderGas = source.readBigNumber();
    let _cancelLiquidityOrderGas = source.readBigNumber();
    let _executeLiquidityOrderGas = source.readBigNumber();
    let _lpMinExecutionFee = source.readBigNumber();
    let _perpMinExecutionFee = source.readBigNumber();
    let _minStorageReserve = source.readBigNumber();
    let _tlpSupply = source.readBigNumber();
    let _tlpJetton = source.readAddress();
    let _tlpWallet = source.readAddress();
    let _manager = source.readAddress();
    let _compensator = source.readAddress();
    let _claimer = source.readAddress();
    let _executors = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Bool(), source.readCellOpt());
    let _tokenConfigs = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserTokenConfig(), source.readCellOpt());
    let _liquidityOrders = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder(), source.readCellOpt());
    let _liquidityOrderIndexNext = source.readBigNumber();
    let _perpOrders = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserPerpOrder(), source.readCellOpt());
    let _perpOrderExs = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserPerpOrderEx(), source.readCellOpt());
    let _perpOrderIndexNext = source.readBigNumber();
    let _compensates = Dictionary.loadDirect(Dictionary.Keys.BigUint(64), dictValueParserCompensate(), source.readCellOpt());
    let _compensateIndexNext = source.readBigNumber();
    let _positionIndexNext = source.readBigNumber();
    let _positions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserAccountPerpPosition(), source.readCellOpt());
    let _globalLPPositions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserGlobalLPPosition(), source.readCellOpt());
    let _globalPositions = Dictionary.loadDirect(Dictionary.Keys.Uint(16), dictValueParserGlobalPosition(), source.readCellOpt());
    let _feeReserve = source.readBigNumber();
    let _orderAmountReserve = source.readBigNumber();
    let _executionFeeReserve = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    let _multisig = source.readAddress();
    let _publicKey = source.readBigNumber();
    let _upgradeSeqno = source.readBigNumber();
    let _upgradeRequests = Dictionary.loadDirect(Dictionary.Keys.Uint(32), dictValueParserUpgradeRequest(), source.readCellOpt());
    let _prices = Dictionary.loadDirect(Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128), source.readCellOpt());
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpSupply: _tlpSupply, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, positionIndexNext: _positionIndexNext, positions: _positions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, feeReserve: _feeReserve, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig, publicKey: _publicKey, upgradeSeqno: _upgradeSeqno, upgradeRequests: _upgradeRequests, prices: _prices };
}

function storeTuplePool$Data(source: Pool$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeBoolean(source.stopped);
    builder.writeNumber(source.orderLockTime);
    builder.writeNumber(source.maxLpNetCap);
    builder.writeNumber(source.lpRolloverFeeRate);
    builder.writeNumber(source.liquidatedPositionShareRate);
    builder.writeNumber(source.normalPositionShareRate);
    builder.writeNumber(source.mintJettonGas);
    builder.writeNumber(source.burnJettonGas);
    builder.writeNumber(source.transferJettonGas);
    builder.writeNumber(source.createPerpOrderGas);
    builder.writeNumber(source.cancelPerpOrderGas);
    builder.writeNumber(source.executePerpOrderGas);
    builder.writeNumber(source.createLiquidityOrderGas);
    builder.writeNumber(source.cancelLiquidityOrderGas);
    builder.writeNumber(source.executeLiquidityOrderGas);
    builder.writeNumber(source.lpMinExecutionFee);
    builder.writeNumber(source.perpMinExecutionFee);
    builder.writeNumber(source.minStorageReserve);
    builder.writeNumber(source.tlpSupply);
    builder.writeAddress(source.tlpJetton);
    builder.writeAddress(source.tlpWallet);
    builder.writeAddress(source.manager);
    builder.writeAddress(source.compensator);
    builder.writeAddress(source.claimer);
    builder.writeCell(source.executors.size > 0 ? beginCell().storeDictDirect(source.executors, Dictionary.Keys.Address(), Dictionary.Values.Bool()).endCell() : null);
    builder.writeCell(source.tokenConfigs.size > 0 ? beginCell().storeDictDirect(source.tokenConfigs, Dictionary.Keys.Uint(16), dictValueParserTokenConfig()).endCell() : null);
    builder.writeCell(source.liquidityOrders.size > 0 ? beginCell().storeDictDirect(source.liquidityOrders, Dictionary.Keys.BigUint(64), dictValueParserLiquidityOrder()).endCell() : null);
    builder.writeNumber(source.liquidityOrderIndexNext);
    builder.writeCell(source.perpOrders.size > 0 ? beginCell().storeDictDirect(source.perpOrders, Dictionary.Keys.BigUint(64), dictValueParserPerpOrder()).endCell() : null);
    builder.writeCell(source.perpOrderExs.size > 0 ? beginCell().storeDictDirect(source.perpOrderExs, Dictionary.Keys.BigUint(64), dictValueParserPerpOrderEx()).endCell() : null);
    builder.writeNumber(source.perpOrderIndexNext);
    builder.writeCell(source.compensates.size > 0 ? beginCell().storeDictDirect(source.compensates, Dictionary.Keys.BigUint(64), dictValueParserCompensate()).endCell() : null);
    builder.writeNumber(source.compensateIndexNext);
    builder.writeNumber(source.positionIndexNext);
    builder.writeCell(source.positions.size > 0 ? beginCell().storeDictDirect(source.positions, Dictionary.Keys.Uint(16), dictValueParserAccountPerpPosition()).endCell() : null);
    builder.writeCell(source.globalLPPositions.size > 0 ? beginCell().storeDictDirect(source.globalLPPositions, Dictionary.Keys.Uint(16), dictValueParserGlobalLPPosition()).endCell() : null);
    builder.writeCell(source.globalPositions.size > 0 ? beginCell().storeDictDirect(source.globalPositions, Dictionary.Keys.Uint(16), dictValueParserGlobalPosition()).endCell() : null);
    builder.writeNumber(source.feeReserve);
    builder.writeNumber(source.orderAmountReserve);
    builder.writeNumber(source.executionFeeReserve);
    builder.writeNumber(source.globalLPFund);
    builder.writeNumber(source.globalLPUnrealizedPnl);
    builder.writeNumber(source.globalLpFundingFeeGrowth);
    builder.writeNumber(source.globalRolloverFeeGrowth);
    builder.writeAddress(source.multisig);
    builder.writeNumber(source.publicKey);
    builder.writeNumber(source.upgradeSeqno);
    builder.writeCell(source.upgradeRequests.size > 0 ? beginCell().storeDictDirect(source.upgradeRequests, Dictionary.Keys.Uint(32), dictValueParserUpgradeRequest()).endCell() : null);
    builder.writeCell(source.prices.size > 0 ? beginCell().storeDictDirect(source.prices, Dictionary.Keys.Uint(16), Dictionary.Values.BigUint(128)).endCell() : null);
    return builder.build();
}

function dictValueParserPool$Data(): DictionaryValue<Pool$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadPool$Data(src.loadRef().beginParse());
        }
    }
}

 type Pool_init_args = {
    $$type: 'Pool_init_args';
    deployId: bigint;
}

function initPool_init_args(src: Pool_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.deployId, 257);
    };
}

async function Pool_init(deployId: bigint) {
    const __code = Cell.fromBase64('te6ccgICAScAAQAAYOwAAAEU/wD0pBP0vPLICwABAgFiAAIAAwLw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ETERMxExETARMhEwES8RMREvES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnARoACgIBIAAEAAUCASAA6gDrAgEgAAYABwIBSAD0APUCASAACAAJAgEgAQQBBQIBIAERARIB/BEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREgALAuIRERETEREREBESERAPEREPDhEQDlUd2zzy4ILI+EMBzH8BygARMhExETARLxEuES0RLBErESoRKREoEScRJhElESQRIxEiESERIBEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMntVAAMAA0Eou2i7fsBkjB/4HAh10nCH5UwINcLH94gghBbjycduo6UMNMfAYIQW48nHbry4IHUATHbPH/gIIIQyMA8iLrjAiCCENBecrO64wIgghCmL4VsugAOAA8AEAARAfYBETIBETEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBES8BygABES0Byx8BESv6AgERKQHLHwERJwHLHwERJQHLHwERI/oCAREh+gIBER/6AgERHfoCyAERHPoCAREa+gIBERj6AgERFvoCAREU+gIBERL6AgEAIgHwETERMhExETARMhEwES8RMhEvES4RMhEuES0RMhEtESwRMhEsESsRMhErESoRMhEqESkRMhEpESgRMhEoEScRMhEnESYRMhEmESURMhElESQRMhEkESMRMhEjESIRMhEiESERMhEhESARMhEgER8RMhEfER4RMhEeABIB4jDTHwGCEMjAPIi68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTABYDdjDTHwGCENBecrO68uCB1AHQ0gABjoTbPG8MkW3iAdIAAZX0BAFvAZFt4gHUMNDSAAGSMG3jDWwT2zx/ABcAGAAZBKCPOzDTHwGCEKYvhWy68uCB0x/6ANMf0x/TH1VAbBVXMFcwVzBXMFcwggCg9/hCVh3HBfL0iPhCAX9t2zx/4CCCEOSbO/C64wIgghCbQuTvugAlAOcAJgAnAvYRHREyER0RHBEyERwRGxEyERsRGhEyERoRGREyERkRGBEyERgRFxEyERcRFhEyERYRFREyERURFBEyERQRExEyERMREhEyERIREREyEREREBEyERAPETIPDhEyDg0RMg0METIMCxEyCwoRMgoJETIJETIIBwZVQNs8ETIA4wATAf7IAYIQW48nHVjLH8zJETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfABQB/BEeER8RHn9tVh8RIREfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiQAVARgQeBBnEFYEBVUg2zwA5wAmVxxXHFccggCg9/hCUmDHBfL0fwBY+gD6APoA+gD6APoA+gD6ANQB0PoA+gD6APoAMBBMEEsQShBJEEgQRxBGEEUAyvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsE28DAfARMRE0ETERMBEzETARLxEyES8RLhE0ES4RLREzES0RLBEyESwRKxE0ESsRKhEzESoRKREyESkRKBE0ESgRJxEzEScRJhEyESYRJRE0ESURJBEzESQRIxEyESMRIhE0ESIRIREzESERIBEyESARHxE0ER8RHhEzER4AGgH4ER0RMhEdERwRNBEcERsRMxEbERoRMhEaERkRNBEZERgRMxEYERcRMhEXERYRNBEWERURMxEVERQRMhEUERMRNBETERIRMxESERERMhERERARNBEQDxEzDw4RMg4NETQNDBEzDAsRMgsKETQKCREzCQgRMggHETQHBhEzBgAbBMgFETIFBBE0BAMRMwMCETICARE0AREz2zxWM26zjjA0VxtXG1YwIG7y0IBvI1tWMSBu8tCAbyMwMREyIG7y0IBvI2whAxEyAwMRHAMRGxOSVzPiVjNus5JXM+MNVjBus5JXMOMNAOMAHAAdAB4A1BEzIG7y0IBvISCBAQtxWfSCb6UgllAj1wAwWJZsIW0ybQHikI5BgQELAZF/kW3iAhEaAlYaAXEhbpVbWfRZMJjIAc8AQTP0QeKBAQsiAhEacUEz9HRvpSCWUCPXADBYlmwhbTJtAeLoXwMB+lcdVx1XHVcdVx1XHVcdVx1XHVcdVx1XHVYkIG7y0IBvLBArXwtWJSBu8tCAbywbXwtWJiBu8tCAbyxssVYnIG7y0IBvLF8LViggbvLQgG8sEKtfC1YpIG7y0IBvLBCbXwtWKiBu8tCAbywQi18LVisgbvLQgG8sEHtfC1YsAB8C/ogRLxEyES8RLhExES4RLREwES0RLBEvESwRKxEuESsRKhEtESoRKREsESkRKBErESgRJxEqEScRJhEpESYRJREoESURJBEnESQRIxEmESMRIhElESIRIREkESERIBEjESARHxEiER8RHhEhER4RHREgER0RHBEfERwRGxEeERsAIAAhAOogbvLQgG8sEGtfC1YtIG7y0IBvLBBbXwtWLiBu8tCAbywQS18LES8gbvLQgG8sEDtfCxEcES8RHAcRJwcGESYGBRElBQQRJAQDESMDAhEiAgERIQERHBEgERwRHwkRHgkIER0IChEcChB6EGkQWBBHEDZARRMALgAAAABiYXNlIGNvbmZpZyB1cGRhdGVkAdYRGhEdERoRGREcERkRGBEbERgRFxEaERcRFhEZERYRFREYERURFBEXERQRExEWERMREhEVERIREREUEREREBETERAPERIPDhERDg0REA0QzxC+EK0QnBCLEHoQaRBYEEcQNkVA+EIBf23bPADnAeAREPoCUA76AshQDfoCUAsg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQCSDXSYEBC7ry4Igg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wgAA/QA/AEAAQQLa+EFvJDAygX2KVjJWMrYJVisBoBO+EvL0ggCg91YfgQELI1n0Cm+hMfL0VhyAQCdZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuKCANNnIW6z8vQgbvLQgG8mgV5tMrPy9FKQESGAQPRbMHAogBCDBgD9AEgCEDDbPGwd2zx/AFAAUQQ6jwgw2zxsGNs8f+AgghD5T4C7uuMCIIIQfWqrWboAWQBaAFsAXAEkMFEhc39VIG1tbds8MBEQVhChAOgB/BEzETkRMxEyETgRMhExETcRMREwETYRMBEvETURLxEuETQRLhEtETkRLREsETgRLBErETcRKxEqETYRKhEpETURKREoETQRKBEnETkRJxEmETgRJhElETcRJREkETYRJBEjETURIxEiETQRIhEhETkRIREgETgRIBEfETcRHwBCArCOkiNWHXN/VSBtbW3bPDAPVhyhD94CkXGRcuJAVMhVIIIQubA8vFAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEZo1ANoVYlAhEZAds8AOgAzAH4ER4RNhEeER0RNREdERwRNBEcERsROREbERoROBEaERkRNxEZAREYAREXETURFxEWETQRFhEVETkRFREUETgRFBETETcREwEREgERERE1EREREBE0ERAPETkPDhE4Dg0RNw0cCxE1CwoRNAoJETkJCBE4CAcRNwcWBRE1BQBDAvoEETQEAxE5AwIROAIhARE5ARE6VjbbPBExETcRMREwETYRMBEvETURLxEuETQRLhEtETMRLREsETIRLBErETERKxEqETARKhEpES8RKREoES4RKBEnES0RJxEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIQBEAEUCXiLCAI8mcnBtcMhSEMsAydAQaF40EDfIVWDbPMlWHwNWLEEzFEMwbW3bPDCSXwTiAEYA6AH8ESARJhEgER8RJREfER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsMERAMEJ8QjhB9AEcA3oIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4iFus5V/AcoAzJRwMsoA4gH6AgHPFgAYEGwQWxBKEDlIZgcEAf5Z9IZvpSCWUCPXATBYlmwhbTJtAeKQjmZWGoAQI1n0D2+hkjBt3yBukjBtndD6ANIA039VIGwTbwPiIG6zjiAgbvLQgG8jE6GoAZFxkX/iqIIwDeC2s6dkAACpBBKgAZFb4oAQKgKDBkEz9HxvpSCWUCPXATBYlmwhbTJtAeLoAEkE3ls4UmAREaFSUBEQoSBWOKiCEDuaygCpBFYQIaABERQBoAFWE6EBERYBoFYVUAigcFYtJeMPViPCAI6UJ1Ykcn9VIG1tbds8MBEWViOhERbeBpFxkXLiEIsQfFA2AhEYAlICViwCAREUAREXU70QZwBKAEsA6ABMAtxWNqAhVjskobYJJIFcZgK78vRWKsAAmzKCMA3gtrOnZAAAjhACgjAN4Lazp2QAAKhWKqkE4iOCMA3gtrOnZAAAqCGpBG0jyMnQKlE5UTUDyFVQ2zzJVisBVjkBfwNwQwNtbds8MBEYJKARK1YYoABNAOgC/DFWNKABgjAN4Lazp2QAAKhWKakEUwKogjAN4Lazp2QAAKkEVHo2bchVMIIQWV8HvFAFyx8Tyz8B+gIBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WIW6zlX8BygDMlHAyygDiyVYpAVY3AX8DcEMDbW3bPDARF1YXoQDoAE4CYMhVwNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEao1APoQsRIQsJERkJSIDbPABPAMwAyIIQibcdCVAHyx9QBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwAhbrOVfwHKAMyUcDLKAOIB+gIBzxYBQhEqI6EkVhhzf1UgbW1t2zwwERZWF6FWFwQRGAQBERcBWQDoAKSCECQYXN9QDssfHMs/Gss/GMsHUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQBPoCWPoCy38B+gIByMp/WPoCWPoCWPoCWPoCyQHMAG7THwGCEJA/n5a68uCB0z/TD9IA0gD6APoA03/TH/oA+gD6APoA1AHQ+gAwHRwbGhkYFxYVFEMwAfARMRE+ETERMBE9ETARLxE8ES8RLhE7ES4RLRE6ES0RLBE5ESwRKxE4ESsRKhE3ESoRKRE2ESkRKBE1ESgRJxE0EScRJhEzESYRJREyESURJBE+ESQRIxE9ESMRIhE8ESIRIRE7ESERIBE6ESARHxE5ER8RHhE4ER4AUgH4ER0RNxEdERwRNhEcERsRNREbERoRNBEaERkRMxEZERgRMhEYERcRPhEXERYRPREWERURPBEVERQROxEUERMROhETERIRORESEREROBERERARNxEQDxE2Dw4RNQ4NETQNDBEzDAsRMgsKET4KCRE9CQgRPAgHETsHBhE6BgBTAvoFETkFBBE4BAMRNwMCETYCARE1ARE02zz4QW8kMDKCAO1xVjtWJL7y9FY6VjrCAJRWOcIAkXDik1Y7oN5WOMIAlFY3wgCRcOKTVjug3oIAzv1WKyKgVkGgFL4T8vQRP5F6koAL4hEzETgRMxEyETcRMhExETYRMREwETURMADkAFQB/BEvETQRLxEuETMRLhEtETIRLREsETERLBErETARKxEqES8RKhEpES4RKREoES0RKBEnESwRJxEmESsRJhElESoRJREkESkRJBEjESgRIxEiEScRIhEhESYRIREgESURIBEfESQRHxEeESMRHhEdESIRHREcESERHBEbESARGwBVAf4RGhEfERoRGREeERkRGBEdERgRFxEcERcRFhEbERYRFREaERURFBEZERQRExEYERMREhEXERIREREWEREREBEVERAPERQPDhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDgQJxA2BVY/BRA0AxFBA1Y/AwIRPwIBET4BAFYC/lY8ARE+2zxWNVY1vI5TAxEzAwIROgIBETcBETaAQBE1yFVAUFT6AhLLfwH6AhLLfwH6AskDEREDAhExAgERMwEgbpUwWfRbMJRBM/QX4hEuETQRLhEwETERMBEtETARLQ6OEzAEETkEAxE2AwIRNQJXMlcyXwPiBVYyoARWL6AAmABXAfoBES8BETKgESsRMxErESoRMhEqESkRMREpESgRMBEoEScRLxEnESYRLhEmESURLRElESQRLBEkESMRKxEjESIRKhEiViERKhEhESkRIREgESgRIBEfEScRHxEeESYRHhEdESURHREcESQRHBEbESMRGxEaESIRGhEZESERGQBYAdgRGBEgERgRFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCBB/EG4QTQwQOxAqEHkQWAcGBFAz2zwAzAA+0x8BghDLu9IkuvLggdM/0w/SAPoA+gDTf9Mf+gBVcAHwETERORExETAROBEwES8RNxEvES4RNhEuES0RNREtESwRNBEsESsRMxErESoRMhEqESkROREpESgROBEoEScRNxEnESYRNhEmESURNRElESQRNBEkESMRMxEjESIRMhEiESEROREhESAROBEgER8RNxEfER4RNhEeAF0CEDDbPGwZ2zx/AGsAbARsjpgw0x8BghB9aqtZuvLggdM/0z9ZbBLbPH/gIIIQBPXgG7qPCDDbPGwX2zx/4CCCEFaV6T66AGMAZABlAGYB+BEdETURHREcETQRHBEbETMRGxEaETIRGhEZETkRGREYETgRGBEXETcRFxEWETYRFhEVETURFREUETQRFBETETMRExESETIREhERETkREREQETgREA8RNw8OETYODRE1DQwRNAwLETMLChEyCgkROQkIETgIBxE3BwYRNgYAXgL+BRE1BQQRNAQDETMDAhEyAgEROQERONs8+EFvJDAyggCIf1Y7ViS+8vSCAL2QVipWPKATvhLy9BEyETgRMhExETcRMREwETYRMBEvETURLxEuETQRLhEtETMRLREsETIRLBErETERKxEqETARKhEpES8RKREoES4RKBEnES0RJwDkAF8B/BEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIREgESYRIBEfESURHxEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREgBgAv4REREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBBbEEoQOUhwECaADFQVZRMVVjsBET3bPDAJVjKgETERMxExETARMhEwES8RMREvES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpAJgAYQH4ESgRKhEoVicRKhEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFQBiAYARFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRwQmxCKEHkQaBBXEEYQNUEEA9s8AMwD9vhBbyQwMlYYgEAlWfQPb6GSMG3fIG6SMG2Oh9DbPGwcbwzigX99IW6z8vQgbvLQgG8sbDMzNDWBXm0Bs/L0gUtpB1Ywvhfy9FYggQELJln0Cm+hMYIAoPchkX+UUzbHBeLy9LOaI8AKkX+TI8AM4pFw4pEw4w1wUwPACgEmAGcAaAA60x8BghAE9eAbuvLggdM/0z/TD9N/0h/Sf9J/VWAD9DIz+EFvJDAygUtpVi+qAFYuAaATvhLy9IIAoPeBAQtWIEATWfQKb6Ex8vRWGYBAJln0D2+hkjBt3yBukjBtjofQ2zxsHG8M4oF/fSFus/L0IG7y0IBvLIFebQGz8vR/gEAsUTxRPFE8UTxRPFE8UTxMEytZyFWw2zzJASYAmgB3BJSPvzDbPGwYMvhBbyQwgUtpM1YvvhLy9IIAoPeBAQtWIkATWfQKb6Ex8vRWGaQRGhBHBgVDE9s8+EIBo1YnWds8f+AgghDV3r/cugCdAJ4AzACfABiBF+YBVjig+CO78vQD1pF/kyTAC+KSMjXjDVJgERyAQPRbMCHCAI6VUzFyf1UgbW1t2zwwUUGgERABoQ8DkTHiQVTIVSCCEPLFrqxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wCjAREXoVYoWds8AGkA6ADMAvwwVhuAQClZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiIG6zjs4gbvLQgG8lJQXCAJMDwgCSM3DilDNUQRPeAcIAksIAkjBw4pGgkTDiIMIAjpMxXHJ/VSBtbW3bPDAgERIBoRERkTDiUnARHIBA9FswERuRMOIA6ABqASZRFXN/VSBtbW3bPDARESShEREEAOgAQtMfAYIQ+U+Au7ry4IH6ANMP0gD6ANN/+gDTf9M/0x9VgAHwETEROhExETAROREwES8ROBEvES4RNxEuES0RNhEtESwRNREsESsRNBErESoRMxEqESkRMhEpESgROhEoEScROREnESYROBEmESURNxElESQRNhEkESMRNREjESIRNBEiESERMxEhESARMhEgER8ROhEfER4ROREeAG0B+BEdETgRHREcETcRHBEbETYRGxEaETURGhEZETQRGREYETMRGBEXETIRFxEWEToRFhEVETkRFREUETgRFBETETcRExESETYREhERETUREREQETQREA8RMw8OETIODRE6DQwROQwLETgLChE3CgkRNgkIETUIBxE0BwYRMwYAbgPsBREyBQQROgQDETkDAhE4AgERNwERNts8+EFvJDAycFY1wgCUVj3CAJFw4pIwcd5WPMIAlFY7wgCRcOKRpN6BX/JWOVYlvvL0gUtpVitWOqAiqBS+E/L0VjTCAJRWPMIAkXDilFc0VzvjDVY5wgCUVjjCAJFw4gDkAG8AcAE4gA1wVjtDFCJWOgNWOlAjARE6ARFCVj1WP9s8MACYAvaOFgUROQUEETgEAxE3AwIRNgJXM1czXwTjDVYvVjWoFKBWIVY1qAERMAERNagRKxE0ESsRKhEzESoRKREyESkRKBExESgRJxEwEScRJhEvESYRJREuESURJBEtESQRIxEsESMRIhErESIRIREqESERIBEpESARHxEoER8AcQByAfwRMRE3ETERMBE2ETARLxE1ES8RLhE0ES4RLREzES0RLBEyESwRKxExESsRKhEwESoRKREvESkRKBEuESgRJxEtEScRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREnESERIBEmESARHxElER8RHhEkER4RHREjER0AcwH8ER4RJxEeER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4NERYNDBEVDAsRFAsKERMKCRESCQgREQgHERAHAHYB/BEcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsVVUVgA4FcCRFFlA0AhE8AgB0AvgBETsBIBE82zwwBREzBQQRMgQDETEDAhEwAgQRLwQBES4BES0FESwFAxErAwIRKgIEESkEAREoAREnBREmBQMRJQMCESQCBBEjBAERIgERIQURIAUDER8DAhEeAgQRHQQBERwBERsFERoFAxEZAwIRGAIEERcEAREWAREVAJgAdQBQBREUBQMREwMCERICBBERBAEREAEPEF4QPRAsEEtQqRBYEDdGMwRFFQEsEG8QXhBNELxLoBA5EGgQVxBGRUDbPADMBPoCESQCAREkAVLwIG6VMFn0WzCUQTP0F+IowAqRf5MowAzis50Bk1KSvpNSkrvi8uZskmwh4nBTB8AKkX+TKMAL4uMPAREzAREQgED0WzBWL8IAjpP4QlYwcn9VIG1tbds8MARWL6EE3lYgARExoPhCETCjAREvoREsETQRLAB4AHkA6AB6AfwRNxE/ETcRNhE+ETYRNRE9ETURNBE8ETQRMxE7ETMRMhE6ETIRMRE5ETERMBE4ETARLxE/ES8RLhE+ES4RLRE9ES0RLBE8ESwRKxE7ESsRKhE6ESoRKRE5ESkRKBE4ESgRJxE/EScRJhE+ESYRJRE9ESURJBE8ESQRIxE7ESMAfwH+MBE7ET4ROxE6ET0ROhE5ETwRORE4ET4ROBE3ET0RNxE2ETwRNhE1ET4RNRE0ET0RNBEzETwRMxEyET4RMhExET0RMREwETwRMBEvET4RLxEuET0RLhEtETwRLREsET4RLBErET0RKxEqETwRKhEpET4RKREoET0RKBEnETwRJwB7AfwRKxEzESsRKhEyESoRKRExESkRKBEwESgRJxEvEScRJhEuESYRJREtESURJBEsESQRIxErESMRIhEqESIRIREpESERIBEoESARHxEnER8RHhEmER4RHRElER0RHBEkERwRGxEjERsRGhEiERoRGREhERkRGBEgERgRFxEfERcAfgH0ESYRPhEmESURPRElESQRPBEkESMRPhEjESIRPREiESERPBEhESARPhEgER8RPREfAREeAREdET4RHREcET0RHAERGwERGhE+ERoRGRE9ERkBERgBERcRPhEXERYRPREWAREVAREUET4RFBETET0REwEREgERERE+EREAfAL+ERARPREQHw4RPg4NET0NHAsRPgsKET0K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ERoRGREYERcRFhEVERQRExESEREREFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAEM4QzQCOAfSCEEdZar4BER/LHwERHQHLPwERGwHLPwERGQHLBwERFwHLPwERFSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEREwHLDwEREQHKAB/Kf1AN+gIbyn9QCfoCB8jLfxbLfxTKf1j6AgH6Asp/yn9Y+gLIUAP6AgCPAFxQA/oCUAP6AlAD+gJQA/oCUAP6AhPKABPLfxPKf8hQBPoCFMp/yVjMyQHMyQHMAfhXOlYrgA1WOfgjETYRORE2ETUROBE1ETQRNxE0ETMROREzETIROBEyETERNxExETAROREwES8ROBEvES4RNxEuES0ROREtESwROBEsESsRNxErESoROREqESkROBEpESgRNxEoEScROREnESYROBEmESURNxElESQROREkAJIB+hE4ViqggA5WN/gjETcROxE3ETYROhE2ETURORE1ETQROBE0ETMRNxEzETIRNhEyETERNRExETARNBEwES8RMxEvES4RMhEuES0RMREtESwRMBEsESsRLxErESoRLhEqESkRLREpESgRLBEoEScRKxEnESYRKhEmESURKRElAJYB+BEjETgRIxEiETcRIhEhETkRIREgETgRIBEfETcRHxEeETkRHhEdETgRHREcETcRHBEbETkRGxEaETgRGhEZETcRGREYETkRGBEXETgRFxEWETcRFhEVETkRFREUETgRFBETETcRExESETkREhERETgREREQETcREA8ROQ8AkwL2DhE4Dg0RNw0METkMCxE4CwoRNwoJETkJCBE4CAcRNwcGETkGBRE4BVY+BRA0VkEEVkMEVj1QNAIROwIBET0BVkEB2zwwETIROBEyETERNBExETARMxEwES8RMhEvES4RMREuES0RMBEtESwRLxEsESsRLhErESoRLREqAJgAlAH8ESkRLBEpESgRKxEoEScRKhEnESYRKREmESURKBElESQRJxEkESMRJhEjESIRJREiESERJBEhESARIxEgER8RIhEfER4RIREeER0RIBEdERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVAJUAXhEUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVSsSAfwRJBEoESQRIxEnESMRIhEmESIRIRElESERIBEkESARHxEjER8RHhEiER4RHREhER0RHBEgERwRGxEfERsRGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAAlwL+DxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQagkRPAkQKAcRPgcGET8GRUADET4D2zwwAxE1AwIRNAIBETIBAhExAgMRMAMBES8BES4CES0CAxEsAwERKwERKgIRKQIDESgDAREnAREmAhElAgMRJAMBESMBESICESECAxEgAwCYAJkDzijACpF/kyjAC+KSJbOOECjADJElmSjADZElkiWz4uLiVh2kgED4I1RssFRtwFRswFRsoFLQcFlwyFWw2zzJAhEiAlYgASBulTBZ9FswlEEz9BfiEIkQNFYeBFAzDBA1RADIVbDbPMkAmgCbAJwAjgERHwERHgIRHQIDERwDAREbAREaAhEZAgMRGAMBERcBERYCERUCAxEUAwEREwEREgIREQIDERADTf4QPEm6EDhGFlBVBwMEAHxQvMsHGcsPUAcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYVygBQA/oCAfoCy3/KAMsPAfoCyx/KAACOghCtjjHvUA3LHxvLBxnLD1AHINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFcoAUAP6AgH6Ast/ygAB+gLLP8s/yx8AOMiCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEVERMAetMfAYIQVpXpPrry4IHTD/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDTP9N/0h/Sf9J/VXAC3lYfgBAmWfQPb6GSMG3fIG6SMG2Oh9DbPGwXbwfigWyWIW6z8vQgbvLQgG8nNDWCAI9uUATy9FYagBAqWfQPb6GSMG3fIG6SMG2X0PQEATFvAeIgbrOXIG7y0IBvIZIwbeIggQELLFn0C2+hkjBt3wEYAKAEto/QMNs8bBoy+EFvJDCBS2kzVjG+EvL0ggCg94EBC1YkQBNxQTP0Cm+hlAHXADCSW23ibrPy9FYbpBEcEEkIdAgFBlBzREDbPPhCAaNWJ1nb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HiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIB+gIBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIB+gLLHwGoghCWKLqWUArLHxjLPyZus5d/AcoAFssHljZwUAbKAOIUyz8Syz8BIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuIB+gIBAMYBBNs8AMwAZiBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiAfoCAcjLH8kBzAF+XwcyIBEUgED0WzAREwHIWYIQS8NB1VADyx/LP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APhCVicBcNs8AMwE/jeBesH4I1AKvhny9CRus440BHEhbpJbcJG64pgRHRKAQPRbMI4bUiARHIBA9FswERoSgED0WzARGhEcERoRGREa4hEcWZIzM+JwI26zkyLCAJFw4o6WMAIgbvLQgCFzf1UgbW1t2zwwUf+hD5JsIuJwJW6zkyPCAJFw4uMPUiAA6ADJAMoAywEsMAQgbvLQgH8jchAjbW1t2zwwUdGhDQDoAAQzNAF8ERaAQPRbMBEVEshZghDbReQ4UAPLH8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EIBo1ihVidZ2zwAzAHA+EFvJDAy+CdvEFYRoS+hVhChI6AioXABtgkgVia2CFYmAaGBAQtWIEAUWfQKb6Exs5IwcJdwAVYmobYJ4lmhUAShUAOgIsIAknAz31ihIMIAjopyf1UgbW1t2zwwkVviAOgB8BExETMRMREwETIRMBEvETMRLxEuETIRLhEtETMRLREsETIRLBErETMRKxEqETIRKhEpETMRKREoETIRKBEnETMRJxEmETIRJhElETMRJREkETIRJBEjETMRIxEiETIRIhEhETMRIREgETIRIBEfETMRHxEeETIRHgDQAfARMREyETERMBEyETARLxEyES8RLhEyES4RLREyES0RLBEyESwRKxEyESsRKhEyESoRKREyESkRKBEyESgRJxEyEScRJhEyESYRJREyESURJBEyESQRIxEyESMRIhEyESIRIREyESERIBEyESARHxEyER8RHhEyER4A1QP2uo6VMNMfAYIQ37wjfrry4IHTHwEx2zx/4MAAj1r5ASCC8GyPRPRf7bTN/tTejbFKpbE61V1DD3WdBmkhC3TEj+Pfuo6GMNs8f9sx4ILwvPr3dpB8cZzI03nY8ZSqqifoyihxzVkXgXIfIVpFRQG6joXbPH/bMeCRMOJwANoA2wDcAfgRHREzER0RHBEyERwRGxEzERsRGhEyERoRGREzERkRGBEyERgRFxEzERcRFhEyERYRFREzERURFBEyERQRExEzERMREhEyERIREREzEREREBEyERAPETMPDhEyDg0RMw0METIMCxEzCwoRMgoJETMJCBEyCAcRMwcGETIGANED9gURMwUEETIEAxEzAwIRMgIBETMBETLbPPgjgQC0oAIRNAIBETMBI6RagCAEyFUgyFADzxbJUAPMIm6znH8BygDIUAPPFslYzJUycFjKAOLLH8kDETQDARE0ASBulTBZ9FswlEEz9BfiiBEwETIRMBEvETERLxEuETARLgDjANIA0wAqAAAAAHVwZ3JhZGUgcmVxdWVzdGVkAfwRLREvES0RLBEuESwRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkA1AG8ERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1QUAT+EIBf23bPADnAvwRHREyER0RHBEyERwRGxEyERsRGhEyERoRGREyERkRGBEyERgRFxEyERcRFhEyERYRFREyERURFBEyERQRExEyERMREhEyERIREREyEREREBEyERAPETIPDhEyDg0RMg0METIMCxEyCwoRMgoJETIJETIIBwZVQNs8IYAgVjQA4wDWAvpZ9A9voZIwbd8gbpIwbY4Y0NQB0AHSAAGT1AHQkW3iAdMfVSBsE28D4oIAgMQhbrPy9CBu8tCAbyOBOzn4I1i+8vTIWM8WyfsEIG6znMgBIG7y0IDPFsntVJEw4hEyAYAg9FswiBExETIRMREwETERMBEvETARLxEuES8RLgDXANgAKAAAAAB1cGdyYWRlIGV4ZWN1dGVkAfwRLREuES0RLBEtESwRKxEsESsRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkA2QG2ERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNEEw+EIBf23bPADnAfARMREyETERMBEyETARLxEyES8RLhEyES4RLREyES0RLBEyESwRKxEyESsRKhEyESoRKREyESkRKBEyESgRJxEyEScRJhEyESYRJREyESURJBEyESQRIxEyESMRIhEyESIRIREyESERIBEyESARHxEyER8RHhEyER4A3QQY2zzbPFcwcIgBETEBAOMA4QDiAOYEGNs82zxXMH+IARExAQDjAOQA5QDmAvwRHREyER0RHBEyERwRGxEyERsRGhEyERoRGREyERkRGBEyERgRFxEyERcRFhEyERYRFREyERURFBEyERQRExEyERMREhEyERIREREyEREREBEyERAPETIPDhEyDg0RMg0METIMCxEyCwoRMgoJETIJETIIBwZVQNs8ETIBgCAA4wDeAvj0WzCIETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeAN8A4AAoAAAAAHVwZ3JhZGUgY2FuY2VsZWQB8hEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMPhCAX9t2zwA5wAQggDQMFYx8vQAFgAAAABSZXN1bWVkABT4QlYyAccF8uCEABKCAJ2wVjGz8vQAFgAAAABTdG9wcGVkAQ74QgF/bds8AOcBPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MADoAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7CADpAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAim6F72zzbPFcQXw9XEF8PVxBfD2whgBGgDsAgEgAO0A7gAEVjACAWIA7wDwAh21pptnm2eNnO2c7ZztkPABGgDzAtiq4ds82zxXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVR0BGgDxAiipHds82zxXEF8PVxBfD1cQXw9sIQEaAPIAQFYvVitWK1YrVitWK1YrVitWK1YrVilWLFYsVilWK1Y9AARWMQAQVh5Ue6xUfKkCASAA9gD3AvmyoggbpIwbY4cINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiOLbPBExETMRMREwETIRMBEvETERLxEuETARLhEtES8RLREsES4RLBErES0RKxEqESwRKhEpESsRKREoESoRKBEnESkRJxEmESgRJhElEScRJREkESYRJIAEaAP4C+a0K7Z4ImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJWIlQiViJUIlIiVCJSIlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJEIkIiRCJCIkAiQiJAIj4iQCI+IjwiPiI9AARoA+AL5rnhtngiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlYiVCJWIlQiUiJUIlIiUCJSIlAiTiJQIk4iTCJOIkwiSiJMIkoiSCJKIkgiRiJIIkYiRCJGIkQiQiJEIkIiQCJCIkAiPiJAIj4iPCI+Ij0ABGgD7AdwRHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcSVxBfD1cSVxBfD1cQVxBfDgD5AUCAQFYTAln0D2+hkjBt3yBukjBtjofQ2zxsGG8I4lYRAQD6AOTSAAGS0weSbQHi0z/TPyDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gH6ACDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gH6ANMfVXAB3BEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxJXEF8PVxJXEF8PVxBXEF8OAPwBQIBAVhgCWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiVhYBAP0AWNIA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA0x/SAFVQAfgRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPAP8BIA4REA5VHds8bPNs82zzbFMBAAPgbSFus49aVhGAECRZ9A9voZIwbd8gbpIwbZfQ9AQBMW8B4iBus481MSBu8tCAbyGBAQsCIG7y0IASWfQLb6GSMG3fIG6SMG2PEtDbPAbUAdDbPDYQbFUEbBxvDOKSMDHikTHiL4AQI1n0D2+hkjBt3wEBAQEBAgAc0z/6APoA03/Sf9J/VVABZiBukjBtndD6ANIA039VIGwTbwPigBBWEEAUWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiEgEDABz6APoA+gD6APoA+gBVUAIBSAEGAQcCASABCgELABCqvu1E0NIAAQIoqiPbPNs8VxBfD1cQXw9XEF8PbCEBGgEIAWZwUxGAEIMGWfSGb6UgllAj1wEwWJZsIW0ybQHikIroXwNSkKCCMA3gtrOnZAAAqFYfqQQBCQDMVhGAECNZ9A9voZIwbd8gbpIwbZ3Q+gDSANN/VSBsE28D4iBus44gIG7y0IBvIxOhqAGRcZF/4qiCMA3gtrOnZAAAqQQToAKRW+KAECICgwZBM/R8b6UgllAj1wEwWJZsIW0ybQHiAvmvi22eCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiViJUIlYiVCJSIlQiUiJQIlIiUCJOIlAiTiJMIk4iTCJKIkwiSiJIIkoiSCJGIkgiRiJEIkYiRCJCIkQiQiJAIkIiQCI+IkAiPiI8Ij4iPQAEaAQwC9a1OEGukwICF3XlwRBBrhYUQQIJ/3XloRMGE3XlwRG2eCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiViJUIlYiVCJSIlQiUiJQIlIiUCJOIlAiTiJMIk4iTCJKIkwiSiJIIkoiSCJGIkgiRwAEaAQ4B1BEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbCEBDQCMIoAgIln0Dm+hMY42gCAjAln0D2+hkjBt3yBukjBtjhjQ1AHQAdIAAZPUAdCRbeIB0x9VIGwTbwPiIG7y0IBvI2whkjBt4gL8ESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxsxGzEAQ8BEABSVhmBAQsicUEz9ApvoZQB1wAwkltt4m6zIVYdxwUiVh3HBQNWH8cFQTAACGzEbOQCAWoBEwEUAvmye7bPBExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHoAEaARsC96Q5tngiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlYiVCJWIlQiUiJUIlIiUCJSIlAiTiJQIk4iTCJOIkwiSiJMIkoiSCJKIkgiRiJIIkYiRCJGIkQiQiJEIkIiQCJCIkAiPiJAIj4iPCI+Ij0BGgEVAiemv7Z5tniuIL4eriC+Hq4gvh7YQwEaARkC1BEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxBfD1cQXw9XEF8PbCEBFgEXATqAEFYZAln0D2+hkjBt3yBukjBtjofQ2zxsF28H4gEYACwgbpIwbZkgbvLQgG8nbwfiIG6SMG3eACTUAdAB0gDTD/oA0x/TH9MfVWAAAiICQu1E0NQB+GPSAAHjAvgo1wsKgwm68uCJgQEB1wABAdHbPAEcAR0ByBEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bPNs82zzbFMBJQL42zxXMhEwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHQEeAR8E7DBwgQC0cFRwAFRwAFRwAFRwAFRwACCNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASJiYltbW1xbW0ibVMRbW1tVhJUcABUcAABJAEkASQBIwHY+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANMf+gDTH9Mf0x/6APoA+gD6ANQB0PoA+gD6APoA+gD6APoA+gDUMND6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBASAAqBEcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgHG+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBASEB9PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9AT0BPQE0z/UMND0BPQE0z/0BNM/0z/UMND0BPQE9AT6APoA+gDSf9J/+gD6ANQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//TH/QE9AQwASIAhBEnETIRJxEnETERJxEnETARJxEnES8RJxEnES4RJxEnES0RJxEnESwRJxEnESsRJxEnESoRJxEnESkRJxEnESgRJwGaiVMbbW34QhExETARLxEuES0RLBErESoRKREoEScRJhElESQRIxEiESERIBEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeABJABDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAGQVhWAQCJZ9A9voZIwbd8gbpIwbY6H0Ns8bBxvDOKAQFYWQBNZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiVhRZASYAcNMH0w/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA+gD6ANN/0gDTD/oA0x/SAFWw');
    const __system = Cell.fromBase64('te6cckICASkAAQAAYPgAAAEBwAABAQWg6L8AAgEU/wD0pBP0vPLICwADAgFiAAQA5QLw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ETERMxExETARMhEwES8RMREvES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnARwABQH8ESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESAAYC4hERERMREREQERIREA8REQ8OERAOVR3bPPLggsj4QwHMfwHKABEyETERMBEvES4RLREsESsRKhEpESgRJxEmESURJBEjESIRIREgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UAAcA4QSi7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEFuPJx26jpQw0x8BghBbjycduvLggdQBMds8f+AgghDIwDyIuuMCIIIQ0F5ys7rjAiCCEKYvhWy6AAgADQAPABsB8BExETIRMREwETIRMBEvETIRLxEuETIRLhEtETIRLREsETIRLBErETIRKxEqETIRKhEpETIRKREoETIRKBEnETIRJxEmETIRJhElETIRJREkETIRJBEjETIRIxEiETIRIhEhETIRIREgETIRIBEfETIRHxEeETIRHgAJAvYRHREyER0RHBEyERwRGxEyERsRGhEyERoRGREyERkRGBEyERgRFxEyERcRFhEyERYRFREyERURFBEyERQRExEyERMREhEyERIREREyEREREBEyERAPETIPDhEyDg0RMg0METIMCxEyCwoRMgoJETIJETIIBwZVQNs8ETIA2gAKAf7IAYIQW48nHVjLH8zJETERMhExETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfAAsB/BEeER8RHn9tVh8RIREfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiQAMARgQeBBnEFYEBVUg2zwA3gHiMNMfAYIQyMA8iLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBMADgAmVxxXHFccggCg9/hCUmDHBfL0fwN2MNMfAYIQ0F5ys7ry4IHUAdDSAAGOhNs8bwyRbeIB0gABlfQEAW8BkW3iAdQw0NIAAZIwbeMNbBPbPH8AEAARABIAWPoA+gD6APoA+gD6APoA+gDUAdD6APoA+gD6ADAQTBBLEEoQSRBIEEcQRhBFAMr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBNvAwHwETERNBExETARMxEwES8RMhEvES4RNBEuES0RMxEtESwRMhEsESsRNBErESoRMxEqESkRMhEpESgRNBEoEScRMxEnESYRMhEmESURNBElESQRMxEkESMRMhEjESIRNBEiESERMxEhESARMhEgER8RNBEfER4RMxEeABMB+BEdETIRHREcETQRHBEbETMRGxEaETIRGhEZETQRGREYETMRGBEXETIRFxEWETQRFhEVETMRFREUETIRFBETETQRExESETMREhERETIREREQETQREA8RMw8OETIODRE0DQwRMwwLETILChE0CgkRMwkIETIIBxE0BwYRMwYAFATIBREyBQQRNAQDETMDAhEyAgERNAERM9s8VjNus44wNFcbVxtWMCBu8tCAbyNbVjEgbvLQgG8jMDERMiBu8tCAbyNsIQMRMgMDERwDERsTklcz4lYzbrOSVzPjDVYwbrOSVzDjDQDaABUAFgAYANQRMyBu8tCAbyEggQELcVn0gm+lIJZQI9cAMFiWbCFtMm0B4pCOQYEBCwGRf5Ft4gIRGgJWGgFxIW6VW1n0WTCYyAHPAEEz9EHigQELIgIRGnFBM/R0b6UgllAj1wAwWJZsIW0ybQHi6F8DAfpXHVcdVx1XHVcdVx1XHVcdVx1XHVcdVx1WJCBu8tCAbywQK18LViUgbvLQgG8sG18LViYgbvLQgG8sbLFWJyBu8tCAbyxfC1YoIG7y0IBvLBCrXwtWKSBu8tCAbywQm18LViogbvLQgG8sEItfC1YrIG7y0IBvLBB7XwtWLAAXAOogbvLQgG8sEGtfC1YtIG7y0IBvLBBbXwtWLiBu8tCAbywQS18LES8gbvLQgG8sEDtfCxEcES8RHAcRJwcGESYGBRElBQQRJAQDESMDAhEiAgERIQERHBEgERwRHwkRHgkIER0IChEcChB6EGkQWBBHEDZARRMC/ogRLxEyES8RLhExES4RLREwES0RLBEvESwRKxEuESsRKhEtESoRKREsESkRKBErESgRJxEqEScRJhEpESYRJREoESURJBEnESQRIxEmESMRIhElESIRIREkESERIBEjESARHxEiER8RHhEhER4RHREgER0RHBEfERwRGxEeERsAGQAaAC4AAAAAYmFzZSBjb25maWcgdXBkYXRlZAHWERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQPhCAX9t2zwA3gSgjzsw0x8BghCmL4VsuvLggdMf+gDTH9Mf0x9VQGwVVzBXMFcwVzBXMIIAoPf4QlYdxwXy9Ij4QgF/bds8f+AgghDkmzvwuuMCIIIQm0Lk77oAHADeAB0AIQAuAAAAAHBvb2wgY29uZmlnIHVwZGF0ZWQCLDDTHwGCEOSbO/C68uCB0w/bPBB4bBgBFwAeA26CAKD3+EJWJccF8vRVUIAQB8hVYNs8yQMRGgMSIG6VMFn0WzCUQTP0F+KIAREYAfhCAX9t2zx/AB8AIADeADLIUAfPFslQB8wUygASyw8B+gLLHxLLH8sfACAAAAAAdG9rZW4gbGlzdGVkBIKOlTDTHwGCEJtC5O+68uCB0w8BMds8f+AgghCP4uIRuuMCIMAAItdJwSGwklt/4CCCEJDLTEu64wIgghAOoqXPugAiACUAJgApA/aCAKD3+EJWHscF8vQtgBAiWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiIG6zjiGBXwUhIG7y0IBvJhA1XwUCIG7y0IBvJhAlXwUSoMAA8vSRMOIgERmAEPRbMFYYUA6AEPRbMFYYUA+AEPRbMAERGAEPgBD0WzCIDREYDR8BAgAjACQAJAAAAAB0b2tlbiBkZWxpc3RlZAESHh34QgF/bds8AN4B3jDTHwGCEI/i4hG68uCBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iMYIAoPf4QlYcAccF8vSBLKYtwgDy9CBus5UgbvLQgJMw+ELiUAyAQn9VIG1tbds8MHALfwDfA/ow0x8BghCQy0xLuvLggdM/+gD6APQEVTBsFDSCAKD3gQEL+EJWHllZ9ApvoTHy9FIaoVKZoSBWMaiCEDuaygCpBFOQoB2gURyhH6BUTpxTyshVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AIgQbBBpEGf4QgF/bds8fwAnACgA3gA4ghB6U7wbUAfLHxXLPxPKfwH6AgH6AgH6AgH6AgAkAAAAAHByaWNlcyB1cGRhdGVkAvyO8zDTHwGCEA6ipc+68uCB0z/6AFlsEvhBbyQwMoIAoPchViHHBfL0ggDToiNWLaATvhLy9FHRoFGxoFQyEshVIIIQCl8O+FAEyx8Syz8B+gLKf8nIgljAAAAAAAAAAAAAAAABActnzMlw+wBWKRC9QLvbPH/gIIIQc2LQnLoAwgAqBMSPTTDTHwGCEHNi0Jy68uCB0z/6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUEwMQI2wU+EFvJDAyViIBxwWzjoRbINs84w5/4CCCEN6i/DG64wIgghBp723+ugAsACsALQAxA1BWNY6EWyDbPOAB+gAwIFYnuZIxf5ZWKSGgErnijoQwINs84BJwWds8ACwALAAuAlwiwgCPJfhCcIBCcG0jyFIQywDJ0BBqEFkQSBA3yFVg2zzJFEMwbW3bPDCSXwTiADgA3wF4MNMfAYIQ3qL8Mbry4IHTP/oA+gBVIGwT+EFvJDAyggCIfyNWKL7y9IEwplYqJaAkoBO+EvL0An8C2zx/AC4D8lYapIBA+CNUZXBUZmBwyFVQ2zzJAhEeAlYdASBulTBZ9FswlEEz9BficCSaMBEQIqAiARERAd4RECKgBJFxkXLiUTVUQ0MBER4BCMhVUNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AAERGAEMoFYmAhEZERgB2zwALwAwAMIAXFBWygBQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6AssfygAAboIQQPLYo1AHyx8VywdQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgH6AgH6Ass/yz8Ero6YMNMfAYIQae9t/rry4IHTP9M/WWwS2zx/4CCCEDFWtQi6jp8w0x8BghAxVrUIuvLggdM/0z/0BPoA+gBVQGwV2zx/4CCCEJA/n5a64wIgghDLu9IkugAyADwARQBPBOT4QW8kMDKBfYpWKFYuoBO+EvL0VhmAQCRZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuKCANNnIW6z8vQgbvLQgG8mgV5tMrPy9IIAoPdWIIEBCydZ9ApvoTGRf5RTNccF4vL0UmARHoBA9FswcCTjD1YcwgAA+wAzADQAOwEkMFEhc39VIG1tbds8MBEQVhChAN8B/BEzETkRMxEyETgRMhExETcRMREwETYRMBEvETURLxEuETQRLhEtETkRLREsETgRLBErETcRKxEqETYRKhEpETURKREoETQRKBEnETkRJxEmETgRJhElETcRJREkETYRJBEjETURIxEiETQRIhEhETkRIREgETgRIBEfETcRHwA1AfgRHhE2ER4RHRE1ER0RHBE0ERwRGxE5ERsRGhE4ERoRGRE3ERkBERgBERcRNREXERYRNBEWERUROREVERQROBEUERMRNxETARESARERETUREREQETQREA8ROQ8OETgODRE3DRwLETULChE0CgkROQkIETgIBxE3BxYFETUFADYC+gQRNAQDETkDAhE4AiEBETkBETpWNts8ETERNxExETARNhEwES8RNREvES4RNBEuES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhADcAOQJeIsIAjyZycG1wyFIQywDJ0BBoXjQQN8hVYNs8yVYfA1YsQTMUQzBtbds8MJJfBOIAOADfAN6C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ESMRHhEdESIRHREcESERHBEbESARGwBLAf4RGhEfERoRGREeERkRGBEdERgRFxEcERcRFhEbERYRFREaERURFBEZERQRExEYERMREhEXERIREREWEREREBEVERAPERQPDhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDgQJxA2BVY/BRA0AxFBA1Y/AwIRPwIBET4BAEwC/lY8ARE+2zxWNVY1vI5TAxEzAwIROgIBETcBETaAQBE1yFVAUFT6AhLLfwH6AhLLfwH6AskDEREDAhExAgERMwEgbpUwWfRbMJRBM/QX4hEuETQRLhEwETERMBEtETARLQ6OEzAEETkEAxE2AwIRNQJXMlcyXwPiBVYyoARWL6AAiABNAfoBES8BETKgESsRMxErESoRMhEqESkRMREpESgRMBEoEScRLxEnESYRLhEmESURLRElESQRLBEkESMRKxEjESIRKhEiViERKhEhESkRIREgESgRIBEfEScRHxEeESYRHhEdESURHREcESQRHBEbESMRGxEaESIRGhEZESERGQBOAdgRGBEgERgRFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCBB/EG4QTQwQOxAqEHkQWAcGBFAz2zwAwgQ6jwgw2zxsGNs8f+AgghD5T4C7uuMCIIIQfWqrWboAUABRAFgAZQA+0x8BghDLu9IkuvLggdM/0w/SAPoA+gDTf9Mf+gBVcAHwETERORExETAROBEwES8RNxEvES4RNhEuES0RNREtESwRNBEsESsRMxErESoRMhEqESkROREpESgROBEoEScRNxEnESYRNhEmESURNRElESQRNBEkESMRMxEjESIRMhEiESEROREhESAROBEgER8RNxEfER4RNhEeAFIB+BEdETURHREcETQRHBEbETMRGxEaETIRGhEZETkRGREYETgRGBEXETcRFxEWETYRFhEVETURFREUETQRFBETETMRExESETIREhERETkREREQETgREA8RNw8OETYODRE1DQwRNAwLETMLChEyCgkROQkIETgIBxE3BwYRNgYAUwL+BRE1BQQRNAQDETMDAhEyAgEROQERONs8+EFvJDAyggCIf1Y7ViS+8vSCAL2QVipWPKATvhLy9BEyETgRMhExETcRMREwETYRMBEvETURLxEuETQRLhEtETMRLREsETIRLBErETERKxEqETARKhEpES8RKREoES4RKBEnES0RJwDbAFQB/BEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIREgESYRIBEfESURHxEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREgBVAv4REREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbBBbEEoQOUhwECaADFQVZRMVVjsBET3bPDAJVjKgETERMxExETARMhEwES8RMREvES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpAIgAVgH4ESgRKhEoVicRKhEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFQBXAYARFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRwQmxCKEHkQaBBXEEYQNUEEA9s8AMICEDDbPGwZ2zx/AFkAWgBC0x8BghD5T4C7uvLggfoA0w/SAPoA03/6ANN/0z/TH1WAAfARMRE6ETERMBE5ETARLxE4ES8RLhE3ES4RLRE2ES0RLBE1ESwRKxE0ESsRKhEzESoRKREyESkRKBE6ESgRJxE5EScRJhE4ESYRJRE3ESURJBE2ESQRIxE1ESMRIhE0ESIRIREzESERIBEyESARHxE6ER8RHhE5ER4AWwH4ER0ROBEdERwRNxEcERsRNhEbERoRNREaERkRNBEZERgRMxEYERcRMhEXERYROhEWERUROREVERQROBEUERMRNxETERIRNhESERERNRERERARNBEQDxEzDw4RMg4NEToNDBE5DAsROAsKETcKCRE2CQgRNQgHETQHBhEzBgBcA+wFETIFBBE6BAMROQMCETgCARE3ARE22zz4QW8kMDJwVjXCAJRWPcIAkXDikjBx3lY8wgCUVjvCAJFw4pGk3oFf8lY5ViW+8vSBS2lWK1Y6oCKoFL4T8vRWNMIAlFY8wgCRcOKUVzRXO+MNVjnCAJRWOMIAkXDiANsAXQBeATiADXBWO0MUIlY6A1Y6UCMBEToBEUJWPVY/2zwwAIgC9o4WBRE5BQQROAQDETcDAhE2AlczVzNfBOMNVi9WNagUoFYhVjWoAREwARE1qBErETQRKxEqETMRKhEpETIRKREoETERKBEnETARJxEmES8RJhElES4RJREkES0RJBEjESwRIxEiESsRIhEhESoRIREgESkRIBEfESgRHwBfAGMB/BExETcRMREwETYRMBEvETURLxEuETQRLhEtETMRLREsETIRLBErETERKxEqETARKhEpES8RKREoES4RKBEnES0RJxEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIREgESYRIBEfESURHxEeESQRHhEdESMRHQBgAfwRHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbFVVFYAOBXAkRRZQNAIRPAIAYQL4ARE7ASARPNs8MAURMwUEETIEAxExAwIRMAIEES8EAREuAREtBREsBQMRKwMCESoCBBEpBAERKAERJwURJgUDESUDAhEkAgQRIwQBESIBESEFESAFAxEfAwIRHgIEER0EAREcAREbBREaBQMRGQMCERgCBBEXBAERFgERFQCIAGIAUAURFAUDERMDAhESAgQREQQBERABDxBeED0QLBBLUKkQWBA3RjMERRUB/BEeEScRHhEdESYRHREcESURHBEbESQRGxEaESMRGhEZESIRGREYESERGBEXESARFxEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBwBkASwQbxBeEE0QvEugEDkQaBBXEEZFQNs8AMIEbI6YMNMfAYIQfWqrWbry4IHTP9M/WWwS2zx/4CCCEAT14Bu6jwgw2zxsF9s8f+AgghBWlek+ugBmAGsAbACTA/b4QW8kMDJWGIBAJVn0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AHgC+oIwZ2XHk/oQB52qGqkEAREioFYpgW+7ESWguQERIwHy9FYngUOgESKoViJWEKiCMA3gtrOnZAAAqQS+AREhAfL0VieOFVcWVxZXFlcWVxZXFilWIVYcKlF6oOMOEDpJgAYRHAYFERsFBBETBAMREgMCERECAREQAQ+BAQsPAHkAegCiVxBXEFcQVxBXEFcQKVYhVhwqUWqgERURHBEVERQRGxEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4DERMDAhESAgEREQEGERAHBPLIVbAQbBBbEEoQOUh82zzIVVAH2zzJAczJAhEQAhRWHQEgbpUwWfRZMJRBM/QT4oAQAcgBAfQAyQIRLgJWGwEgbpUwWfRbMJRBM/QX4oAQI1YRKVYSVhFWEchVUNs8yQIRLAJWGwEgbpUwWfRbMJRBM/QX4oAQVHupAK0ArQCvAHsB6shVIFr6AhLKAMt/yQIRLQJWGwEgbpUwWfRbMJRBM/QX4hESF6ERGRErERkRGBErERgRFxErERcRFhErERYEERUEERQRKxEUBBETBBEQERIREBERESsREQYREAYQLhDNEEwQa0mgEFgQR14xE1YlWQ8REA8Q7wB8AYDIER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMnIgljAAAAAAAAAAAAAAAABActnzMlw+wAQzhDNAH0B9IIQR1lqvgERH8sfAREdAcs/AREbAcs/AREZAcsHAREXAcs/AREVINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WARETAcsPARERAcoAH8p/UA36AhvKf1AJ+gIHyMt/Fst/FMp/WPoCAfoCyn/Kf1j6AshQA/oCAH4AXFAD+gJQA/oCUAP6AlAD+gJQA/oCE8oAE8t/E8p/yFAE+gIUyn/JWMzJAczJAcwCeiBu8tCAbyUkwgCTI8IAkXDikjMz4w0gwgCTIsIAkXDin18DAxE5AwIROAJXMlc1W+MNVjMBERCAQPRbMA8AgACFAfhXOlYrgA1WOfgjETYRORE2ETUROBE1ETQRNxE0ETMROREzETIROBEyETERNxExETAROREwES8ROBEvES4RNxEuES0ROREtESwROBEsESsRNxErESoROREqESkROBEpESgRNxEoEScROREnESYROBEmESURNxElESQROREkAIEB+BEjETgRIxEiETcRIhEhETkRIREgETgRIBEfETcRHxEeETkRHhEdETgRHREcETcRHBEbETkRGxEaETgRGhEZETcRGREYETkRGBEXETgRFxEWETcRFhEVETkRFREUETgRFBETETcRExESETkREhERETgREREQETcREA8ROQ8AggL2DhE4Dg0RNw0METkMCxE4CwoRNwoJETkJCBE4CAcRNwcGETkGBRE4BVY+BRA0VkEEVkMEVj1QNAIROwIBET0BVkEB2zwwETIROBEyETERNBExETARMxEwES8RMhEvES4RMREuES0RMBEtESwRLxEsESsRLhErESoRLREqAIgAgwH8ESkRLBEpESgRKxEoEScRKhEnESYRKREmESURKBElESQRJxEkESMRJhEjESIRJREiESERJBEhESARIxEgER8RIhEfER4RIREeER0RIBEdERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVAIQAXhEUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPVSsSAfoROFYqoIAOVjf4IxE3ETsRNxE2EToRNhE1ETkRNRE0ETgRNBEzETcRMxEyETYRMhExETURMREwETQRMBEvETMRLxEuETIRLhEtETERLREsETARLBErES8RKxEqES4RKhEpES0RKREoESwRKBEnESsRJxEmESoRJhElESkRJQCGAfwRJBEoESQRIxEnESMRIhEmESIRIRElESERIBEkESARHxEjER8RHhEiER4RHREhER0RHBEgERwRGxEfERsRGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAAhwL+DxETDw4REg4NERENDBEQDBC/EK4QnRCMEHsQagkRPAkQKAcRPgcGET8GRUADET4D2zwwAxE1AwIRNAIBETIBAhExAgMRMAMBES8BES4CES0CAxEsAwERKwERKgIRKQIDESgDAREnAREmAhElAgMRJAMBESMBESICESECAxEgAwCIAIwDzijACpF/kyjAC+KSJbOOECjADJElmSjADZElkiWz4uLiVh2kgED4I1RssFRtwFRswFRsoFLQcFlwyFWw2zzJAhEiAlYgASBulTBZ9FswlEEz9BfiEIkQNFYeBFAzDBA1RADIVbDbPMkAiQCKAIsAfFC8ywcZyw9QByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhXKAFAD+gIB+gLLf8oAyw8B+gLLH8oAAI6CEK2OMe9QDcsfG8sHGcsPUAcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYVygBQA/oCAfoCy3/KAAH6Ass/yz/LHwA4yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERUREwCOAREfAREeAhEdAgMRHAMBERsBERoCERkCAxEYAwERFwERFgIRFQIDERQDARETARESAhERAgMREANN/hA8SboQOEYWUFUHAwQB/jAROxE+ETsROhE9EToRORE8ETkROBE+ETgRNxE9ETcRNhE8ETYRNRE+ETURNBE9ETQRMxE8ETMRMhE+ETIRMRE9ETERMBE8ETARLxE+ES8RLhE9ES4RLRE8ES0RLBE+ESwRKxE9ESsRKhE8ESoRKRE+ESkRKBE9ESgRJxE8EScAjgH0ESYRPhEmESURPRElESQRPBEkESMRPhEjESIRPREiESERPBEhESARPhEgER8RPREfAREeAREdET4RHREcET0RHAERGwERGhE+ERoRGRE9ERkBERgBERcRPhEXERYRPREWAREVAREUET4RFBETET0REwEREgERERE+EREAjwL+ERARPREQHw4RPg4NET0NHAsRPgsKET0KCRE+CVRBGRBnAhE/AgERPgHbPAQRNQQDETQDBBEzBAIRMgIDETEDBBEwBBEvAREuAQIRLQIDESwDBBErBBEqAREpAQIRKAIDEScDBBEmBBElAREkAQIRIwIDESIDBBEhBBEgAREfAQCjAJAAigIRHgIDER0DBBEcBBEbAREaAQIRGQIDERgDBBEXBBEWAREVAQIRFAIDERMDBBESBBERAREQARAvED4QTUq8EDkQSF5gAgH8ESsRMxErESoRMhEqESkRMREpESgRMBEoEScRLxEnESYRLhEmESURLRElESQRLBEkESMRKxEjESIRKhEiESERKREhESARKBEgER8RJxEfER4RJhEeER0RJREdERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYERcRHxEXAJIBxBEWER4RFhEVER0RFREUERwRFBETERsR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cn9VIG1tbds8MJFb4gDfBP6OqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gIIIQgkcP2LqOojDTHwGCEIJHD9i68uCB1AHQAdIAAZPUAdCRbeISbBLbPH/gIIIQP49w1rqOlTDTHwGCED+PcNa68uCB0x8BMds8f+AgghDfvCN+AN4AxADKANAB8BExETMRMREwETIRMBEvETMRLxEuETIRLhEtETMRLREsETIRLBErETMRKxEqETIRKhEpETMRKREoETIRKBEnETMRJxEmETIRJhElETMRJREkETIRJBEjETMRIxEiETIRIhEhETMRIREgETIRIBEfETMRHxEeETIRHgDFAfgRHREzER0RHBEyERwRGxEzERsRGhEyERoRGREzERkRGBEyERgRFxEzERcRFhEyERYRFREzERURFBEyERQRExEzERMREhEyERIREREzEREREBEyERAPETMPDhEyDg0RMw0METIMCxEzCwoRMgoJETMJCBEyCAcRMwcGETIGAMYD9gURMwUEETIEAxEzAwIRMgIBETMBETLbPPgjgQC0oAIRNAIBETMBI6RagCAEyFUgyFADzxbJUAPMIm6znH8BygDIUAPPFslYzJUycFjKAOLLH8kDETQDARE0ASBulTBZ9FswlEEz9BfiiBEwETIRMBEvETERLxEuETARLgDaAMcAyAAqAAAAAHVwZ3JhZGUgcmVxdWVzdGVkAfwRLREvES0RLBEuESwRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkAyQG8ERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1QUAT+EIBf23bPADeAfARMREyETERMBEyETARLxEyES8RLhEyES4RLREyES0RLBEyESwRKxEyESsRKhEyESoRKREyESkRKBEyESgRJxEyEScRJhEyESYRJREyESURJBEyESQRIxEyESMRIhEyESIRIREyESERIBEyESARHxEyER8RHhEyER4AywL8ER0RMhEdERwRMhEcERsRMhEbERoRMhEaERkRMhEZERgRMhEYERcRMhEXERYRMhEWERURMhEVERQRMhEUERMRMhETERIRMhESERERMhERERARMhEQDxEyDw4RMg4NETINDBEyDAsRMgsKETIKCREyCREyCAcGVUDbPCGAIFY0ANoAzAL6WfQPb6GSMG3fIG6SMG2OGNDUAdAB0gABk9QB0JFt4gHTH1UgbBNvA+KCAIDEIW6z8vQgbvLQgG8jgTs5+CNYvvL0yFjPFsn7BCBus5zIASBu8tCAzxbJ7VSRMOIRMgGAIPRbMIgRMREyETERMBExETARLxEwES8RLhEvES4AzQDOACgAAAAAdXBncmFkZSBleGVjdXRlZAH8ES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZAM8BthEYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDRBMPhCAX9t2zwA3gP2uo6VMNMfAYIQ37wjfrry4IHTHwEx2zx/4MAAj1r5ASCC8GyPRPRf7bTN/tTejbFKpbE61V1DD3WdBmkhC3TEj+Pfuo6GMNs8f9sx4ILwvPr3dpB8cZzI03nY8ZSqqifoyihxzVkXgXIfIVpFRQG6joXbPH/bMeCRMOJwANEA1gDZAfARMREyETERMBEyETARLxEyES8RLhEyES4RLREyES0RLBEyESwRKxEyESsRKhEyESoRKREyESkRKBEyESgRJxEyEScRJhEyESYRJREyESURJBEyESQRIxEyESMRIhEyESIRIREyESERIBEyESARHxEyER8RHhEyER4A0gL8ER0RMhEdERwRMhEcERsRMhEbERoRMhEaERkRMhEZERgRMhEYERcRMhEXERYRMhEWERURMhEVERQRMhEUERMRMhETERIRMhESERERMhERERARMhEQDxEyDw4RMg4NETINDBEyDAsRMgsKETIKCREyCREyCAcGVUDbPBEyAYAgANoA0wL49FswiBExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHgDUANUAKAAAAAB1cGdyYWRlIGNhbmNlbGVkAfIRHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0QTD4QgF/bds8AN4EGNs82zxXMHCIARExAQDaANcA2ADdABCCANAwVjHy9AAWAAAAAFJlc3VtZWQEGNs82zxXMH+IARExAQDaANsA3ADdABT4QlYyAccF8uCEABKCAJ2wVjGz8vQAFgAAAABTdG9wcGVkAQ74QgF/bds8AN4BPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MADfAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7CADgAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAfYBETIBETEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBES8BygABES0Byx8BESv6AgERKQHLHwERJwHLHwERJQHLHwERI/oCAREh+gIBER/6AgERHfoCyAERHPoCAREa+gIBERj6AgERFvoCAREU+gIBERL6AgEA4gHgERD6AlAO+gLIUA36AlALINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQBgDjAf4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQBCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhL0APQA9AASyz8CyPQAE/QAFMs/FPQAFMs/FMs/BMj0ABX0ABX0AFAG+gJQBvoCUAb6AhbKfxbKf1AG+gJQBvoCAOQAgMhQByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhfL/xfLHxj0ABb0AMlYzMkBzMlQA8zJWMzJAczJAcwCASAA5gDxAgEgAOcA6QIpuhe9s82zxXEF8PVxBfD1cQXw9sIYARwA6AAEVjACASAA6gDvAgFiAOsA7QLYquHbPNs8VxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFUdARwA7ABAVi9WK1YrVitWK1YrVitWK1YrVitWKVYsVixWKVYrVj0CKKkd2zzbPFcQXw9XEF8PVxBfD2whARwA7gAEVjECHbWmm2ebZ42c7ZztnO2Q8AEcAPAAEFYeVHusVHypAgEgAPIBAwIBSADzAPwCASAA9AD4AvmtCu2eCJiImQiYiJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiViJUIlYiVCJSIlQiUiJQIlIiUCJOIlAiTiJMIk4iTCJKIkwiSiJIIkoiSCJGIkgiRiJEIkYiRCJCIkQiQiJAIkIiQCI+IkAiPiI8Ij4iPQAEcAPUB3BEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxJXEF8PVxJXEF8PVxBXEF8OAPYBQIBAVhMCWfQPb6GSMG3fIG6SMG2Oh9DbPGwYbwjiVhEBAPcA5NIAAZLTB5JtAeLTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoA0x9VcAL5rnhtngiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlYiVCJWIlQiUiJUIlIiUCJSIlAiTiJQIk4iTCJOIkwiSiJMIkoiSCJKIkgiRiJIIkYiRCJGIkQiQiJEIkIiQCJCIkAiPiJAIj4iPCI+Ij0ABHAD5AdwRHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcSVxBfD1cSVxBfD1cQVxBfDgD6AUCAQFYYAln0D2+hkjBt3yBukjBtjofQ2zxsFm8G4lYWAQD7AFjSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6ANMf0gBVUAL5sqIIG6SMG2OHCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRMREzETERMBEyETARLxExES8RLhEwES4RLREvES0RLBEuESwRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESSABHAD9AfgRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPAP4BIA4REA5VHds8bPNs82zzbFMA/wPgbSFus49aVhGAECRZ9A9voZIwbd8gbpIwbZfQ9AQBMW8B4iBus481MSBu8tCAbyGBAQsCIG7y0IASWfQLb6GSMG3fIG6SMG2PEtDbPAbUAdDbPDYQbFUEbBxvDOKSMDHikTHiL4AQI1n0D2+hkjBt3wEAAQABAQAc0z/6APoA03/Sf9J/VVABZiBukjBtndD6ANIA039VIGwTbwPigBBWEEAUWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiEgECABz6APoA+gD6APoA+gBVUAIBIAEEARICASABBQEKAgFIAQYBBwAQqr7tRNDSAAECKKoj2zzbPFcQXw9XEF8PVxBfD2whARwBCAFmcFMRgBCDBln0hm+lIJZQI9cBMFiWbCFtMm0B4pCK6F8DUpCggjAN4Lazp2QAAKhWH6kEAQkAzFYRgBAjWfQPb6GSMG3fIG6SMG2d0PoA0gDTf1UgbBNvA+IgbrOOICBu8tCAbyMToagBkXGRf+KogjAN4Lazp2QAAKkEE6ACkVvigBAiAoMGQTP0fG+lIJZQI9cBMFiWbCFtMm0B4gIBIAELAQ4C+a+LbZ4ImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJWIlQiViJUIlIiVCJSIlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJEIkIiRCJCIkAiQiJAIj4iQCI+IjwiPiI9AARwBDAHUER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9sIQENAIwigCAiWfQOb6ExjjaAICMCWfQPb6GSMG3fIG6SMG2OGNDUAdAB0gABk9QB0JFt4gHTH1UgbBNvA+IgbvLQgG8jbCGSMG3iAvWtThBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtngiYiJkImIiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlYiVCJWIlQiUiJUIlIiUCJSIlAiTiJQIk4iTCJOIkwiSiJMIkoiSCJKIkgiRiJIIkcABHAEPAvwRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPGzEbMQBEAERAFJWGYEBCyJxQTP0Cm+hlAHXADCSW23ibrMhVh3HBSJWHccFA1YfxwVBMAAIbMRs5AIBIAETARsCAWoBFAEZAvekObZ4ImIiZCJiImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJWIlQiViJUIlIiVCJSIlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJEIkIiRCJCIkAiQiJAIj4iQCI+IjwiPiI9ARwBFQLUER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw9sIQEWARgBOoAQVhkCWfQPb6GSMG3fIG6SMG2Oh9DbPGwXbwfiARcAJNQB0AHSANMP+gDTH9Mf0x9VYAAsIG6SMG2ZIG7y0IBvJ28H4iBukjBt3gInpr+2ebZ4riC+Hq4gvh6uIL4e2EMBHAEaAAIiAvmye7bPBExETIRMREwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHoAEcASYCQu1E0NQB+GPSAAHjAvgo1wsKgwm68uCJgQEB1wABAdHbPAEdASMC+Ns8VzIRMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESsRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0BHgEiAdj6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0x/6ANMf0x/TH/oA+gD6APoA1AHQ+gD6APoA+gD6APoA+gD6ANQw0PoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEBHwHG+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBASAB9PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9AT0BPQE0z/UMND0BPQE0z/0BNM/0z/UMND0BPQE9AT6APoA+gDSf9J/+gD6ANQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//TH/QE9AQwASEAhBEnETIRJxEnETERJxEnETARJxEnES8RJxEnES4RJxEnES0RJxEnESwRJxEnESsRJxEnESoRJxEnESkRJxEnESgRJwCoERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UOBOwwcIEAtHBUcABUcABUcABUcABUcAAgjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiYmJbW1tcW1tIm1TEW1tbVYSVHAAVHAAASUBJQElASQBmolTG21t+EIRMREwES8RLhEtESwRKxEqESkRKBEnESYRJREkESMRIhEhESARHxEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXgASUAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAByBEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bPNs82zzbFMBJwGQVhWAQCJZ9A9voZIwbd8gbpIwbY6H0Ns8bBxvDOKAQFYWQBNZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiVhRZASgAcNMH0w/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA+gD6ANN/0gDTD/oA0x/SAFWwS95/Zw==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPool_init_args({ $$type: 'Pool_init_args', deployId })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Pool_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    1644: { message: `not reach trigger price` },
    5238: { message: `position not exist` },
    6118: { message: `too early to cancel` },
    11120: { message: `compensate not exist` },
    11430: { message: `insufficient fee reserve` },
    12454: { message: `incorrect value transferred` },
    15161: { message: `time lock not expired` },
    17312: { message: `leverage too high` },
    19305: { message: `gas not enough` },
    23654: { message: `insufficient capacity` },
    24173: { message: `order is pending` },
    24325: { message: `token cannot be delisted` },
    24562: { message: `execution fee not enough` },
    27798: { message: `invalid token` },
    28603: { message: `margin rate too high` },
    31425: { message: `not reach unlock time` },
    32138: { message: `insufficient value transferred` },
    32637: { message: `order not exist` },
    32964: { message: `invalid seqno` },
    34943: { message: `insufficient execution fee` },
    36718: { message: `disabled token` },
    40368: { message: `Contract stopped` },
    40940: { message: `margin is too high to liquidate` },
    41207: { message: `invalid sender` },
    48528: { message: `insufficient transfered value` },
    52989: { message: `OrderBook: incorrect value transferred` },
    53296: { message: `Contract not stopped` },
    54119: { message: `non-existent order` },
    54178: { message: `invalid amount` },
    60785: { message: `OrderBook: insufficient execution fee` },
    62409: { message: `insufficient margin` },
}

const Pool_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RequestUpgrade","header":2185695192,"fields":[{"name":"code","type":{"kind":"simple","type":"slice","optional":false}},{"name":"data","type":{"kind":"simple","type":"slice","optional":true}}]},
    {"name":"ExecuteUpgrade","header":1066365142,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CancelUpgrade","header":3753649022,"fields":[{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"UpgradeRequest","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"slice","optional":false}},{"name":"data","type":{"kind":"simple","type":"slice","optional":true}},{"name":"unlockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"JettonMint","header":2310479113,"fields":[{"name":"origin","type":{"kind":"simple","type":"address","optional":false}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonUpdateContent","header":1536108317,"fields":[{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"UpdateBaseConfig","header":3495850675,"fields":[{"name":"gasConfig","type":{"kind":"simple","type":"GasConfig","optional":true}},{"name":"executorConfig","type":{"kind":"simple","type":"ExecutorConfig","optional":true}},{"name":"contractConfig","type":{"kind":"simple","type":"ContractConfig","optional":true}}]},
    {"name":"UpdatePoolConfig","header":2788132204,"fields":[{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRolloverFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"liquidatedPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"normalPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"SetManager","header":3368041608,"fields":[{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ListToken","header":3835378672,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"config","type":{"kind":"simple","type":"TokenConfig","optional":false}}]},
    {"name":"DelistToken","header":2604852463,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"WithdrawFee","header":2414010897,"fields":[{"name":"feeReceiver","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"FeedPrices","header":2429242443,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"lpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"prices","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":128}}]},
    {"name":"IncreaseAum","header":245540303,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CancelLiquidityOrder","header":1777298942,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ExecuteLiquidityOrder","header":827766024,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prices","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":128}},{"name":"lpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CreateIncreasePerpOrder","header":2420088726,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isMarket","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CreateDecreasePerpOrder","header":3418083876,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CreateTpSlPerpOrder","header":4182737083,"fields":[{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CancelPerpOrder","header":2104142681,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ExecutePerpOrder","header":83222555,"fields":[{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"LiquidatePerpPosition","header":1452665150,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"ADLPerpPosition","header":3588145116,"fields":[{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"price","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"premiumRate","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"fundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"CreateCompensate","header":4231235453,"fields":[{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExecuteOrCancelCompensate","header":2296903975,"fields":[{"name":"isCancel","type":{"kind":"simple","type":"bool","optional":false}},{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CreateAddLiquidityOrder","header":3735223345,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"LiquidityOrderCreatedEvent","header":1089656995,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityOrderCancelledEvent","header":3115334844,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"LiquidityPoolUpdatedEvent","header":605576415,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"realizedLpFundingFeeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"realizedLpRolloverFeeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PerpOrderCreatedEvent","header":2911777263,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"requestTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PerpOrderCancelledEvent","header":4073041580,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"PerpPositionIncreasedEvent","header":1197042366,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"marginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"sizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradePrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryRolloverFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongValueAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortValueAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"lpTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"PerpPositionDecreasedEvent","header":592660044,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"marginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"sizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradePrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"realizedPnLDelta","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"fundingFee","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"rolloverFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryFundingFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryRolloverFeeGrowthAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"payout","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortMarginAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLongValueAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalShortValueAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpNetSizeAfter","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpIsLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"lpEntryPriceAfter","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"lpTradingFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"CompensateCreatedEvent","header":2519251606,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompensateCancelledEvent","header":1271087573,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"CompensateExecutedEvent","header":3678790712,"fields":[{"name":"compensateId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FeeChargedEvent","header":2052307995,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"realizedLpFundingFeeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"realizedLpRolloverFeeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AumIncreasedEvent","header":174001912,"fields":[{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpFundAfter","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"AccountInfo","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isCompensator","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isClaimer","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isManager","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"mintJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"burnJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"transferJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executePerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executeLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minStorageReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"maxLeverage","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"liquidationFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maintenanceRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PoolStat","header":null,"fields":[{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderAmountReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"feeReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"AccountPerpPosition","header":null,"fields":[{"name":"positions","type":{"kind":"dict","key":"address","value":"DirectionPerpPosition","valueFormat":"ref"}}]},
    {"name":"DirectionPerpPosition","header":null,"fields":[{"name":"longPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}},{"name":"shortPosition","type":{"kind":"simple","type":"PerpPosition","optional":false}}]},
    {"name":"PerpPosition","header":null,"fields":[{"name":"positionId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"margin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"size","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"entryFundingFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"entryRolloverFeeGrowth","type":{"kind":"simple","type":"int","optional":false,"format":128}}]},
    {"name":"GlobalLPPosition","header":null,"fields":[{"name":"netSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"entryPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
    {"name":"PerpPositionData","header":null,"fields":[{"name":"perpPosition","type":{"kind":"simple","type":"DirectionPerpPosition","optional":true}},{"name":"globalLPPosition","type":{"kind":"simple","type":"GlobalLPPosition","optional":true}},{"name":"globalPosition","type":{"kind":"simple","type":"GlobalPosition","optional":true}}]},
    {"name":"GlobalPosition","header":null,"fields":[{"name":"longMargin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortMargin","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"longSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"longValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"shortValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"GasConfig","header":null,"fields":[{"name":"mintJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"burnJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"transferJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executePerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executeLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minStorageReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExecutorConfig","header":null,"fields":[{"name":"executors","type":{"kind":"dict","key":"address","value":"bool"}}]},
    {"name":"ContractConfig","header":null,"fields":[{"name":"multisig","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"LiquidityOrder","header":null,"fields":[{"name":"isIncrease","type":{"kind":"simple","type":"bool","optional":false}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"LiquidityOrderData","header":null,"fields":[{"name":"liquidityOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"liquidityOrder","type":{"kind":"simple","type":"LiquidityOrder","optional":true}}]},
    {"name":"PerpOrder","header":null,"fields":[{"name":"opType","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"tokenId","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"account","type":{"kind":"simple","type":"address","optional":false}},{"name":"isLong","type":{"kind":"simple","type":"bool","optional":false}},{"name":"marginDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sizeDelta","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"triggerPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"triggerAbove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"callbackRate","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"blockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"isPending","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"PerpOrderEx","header":null,"fields":[{"name":"tpSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tpPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"slSize","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"slPrice","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PerpOrderData","header":null,"fields":[{"name":"perpOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpOrder","type":{"kind":"simple","type":"PerpOrder","optional":true}},{"name":"perpOrderEx","type":{"kind":"simple","type":"PerpOrderEx","optional":true}}]},
    {"name":"Compensate","header":null,"fields":[{"name":"orderType","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"orderId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"trxId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"refundReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"refundAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReceiver","type":{"kind":"simple","type":"address","optional":true}},{"name":"executionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"unlockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CompensateData","header":null,"fields":[{"name":"compensateIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"compensate","type":{"kind":"simple","type":"Compensate","optional":true}}]},
    {"name":"Pool$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"stopped","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRolloverFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"liquidatedPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"normalPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"mintJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"burnJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"transferJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executePerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executeLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minStorageReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}},{"name":"executors","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"tokenConfigs","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"TokenConfig","valueFormat":"ref"}},{"name":"liquidityOrders","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"LiquidityOrder","valueFormat":"ref"}},{"name":"liquidityOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpOrders","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"PerpOrder","valueFormat":"ref"}},{"name":"perpOrderExs","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"PerpOrderEx","valueFormat":"ref"}},{"name":"perpOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"compensates","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"Compensate","valueFormat":"ref"}},{"name":"compensateIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"positionIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"positions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"AccountPerpPosition","valueFormat":"ref"}},{"name":"globalLPPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"GlobalLPPosition","valueFormat":"ref"}},{"name":"globalPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"GlobalPosition","valueFormat":"ref"}},{"name":"feeReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderAmountReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"multisig","type":{"kind":"simple","type":"address","optional":false}},{"name":"publicKey","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"upgradeSeqno","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"upgradeRequests","type":{"kind":"dict","key":"uint","keyFormat":32,"value":"UpgradeRequest","valueFormat":"ref"}},{"name":"prices","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"uint","valueFormat":128}}]},
]

const Pool_getters: ABIGetter[] = [
    {"name":"accountInfo","arguments":[{"name":"account","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"AccountInfo","optional":false}},
    {"name":"perpPosition","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"account","type":{"kind":"simple","type":"address","optional":true}}],"returnType":{"kind":"simple","type":"PerpPositionData","optional":false}},
    {"name":"configData","arguments":[],"returnType":{"kind":"simple","type":"ConfigData","optional":false}},
    {"name":"tokenConfig","arguments":[{"name":"tokenId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"TokenConfig","optional":true}},
    {"name":"poolStat","arguments":[],"returnType":{"kind":"simple","type":"PoolStat","optional":false}},
    {"name":"liquidityOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"LiquidityOrderData","optional":false}},
    {"name":"perpOrder","arguments":[{"name":"orderId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"PerpOrderData","optional":false}},
    {"name":"compensate","arguments":[{"name":"compensateId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"CompensateData","optional":false}},
    {"name":"tlpPrice","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"upgradeUnlockTime","arguments":[{"name":"seqno","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"upgradeSeqno","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const Pool_getterMapping: { [key: string]: string } = {
    'accountInfo': 'getAccountInfo',
    'perpPosition': 'getPerpPosition',
    'configData': 'getConfigData',
    'tokenConfig': 'getTokenConfig',
    'poolStat': 'getPoolStat',
    'liquidityOrder': 'getLiquidityOrder',
    'perpOrder': 'getPerpOrder',
    'compensate': 'getCompensate',
    'tlpPrice': 'getTlpPrice',
    'stopped': 'getStopped',
    'owner': 'getOwner',
    'upgradeUnlockTime': 'getUpgradeUnlockTime',
    'upgradeSeqno': 'getUpgradeSeqno',
}

const Pool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"JettonUpdateContent"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetManager"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateBaseConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePoolConfig"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ListToken"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DelistToken"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawFee"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"FeedPrices"}},
    {"receiver":"internal","message":{"kind":"typed","type":"IncreaseAum"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateAddLiquidityOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelLiquidityOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteLiquidityOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateIncreasePerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateDecreasePerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateTpSlPerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelPerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecutePerpOrder"}},
    {"receiver":"internal","message":{"kind":"typed","type":"LiquidatePerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ADLPerpPosition"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CreateCompensate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteOrCancelCompensate"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RequestUpgrade"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteUpgrade"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CancelUpgrade"}},
]

export class Pool implements Contract {
    
    static async init(deployId: bigint) {
        return await Pool_init(deployId);
    }
    
    static async fromInit(deployId: bigint) {
        const init = await Pool_init(deployId);
        const address = contractAddress(0, init);
        return new Pool(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Pool(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Pool_types,
        getters: Pool_getters,
        receivers: Pool_receivers,
        errors: Pool_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonUpdateContent | SetManager | UpdateBaseConfig | UpdatePoolConfig | ListToken | DelistToken | WithdrawFee | null | FeedPrices | IncreaseAum | JettonTransferNotification | CreateAddLiquidityOrder | CancelLiquidityOrder | ExecuteLiquidityOrder | CreateIncreasePerpOrder | CreateDecreasePerpOrder | CreateTpSlPerpOrder | CancelPerpOrder | ExecutePerpOrder | LiquidatePerpPosition | ADLPerpPosition | CreateCompensate | ExecuteOrCancelCompensate | Deploy | 'Resume' | 'Stop' | RequestUpgrade | ExecuteUpgrade | CancelUpgrade) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonUpdateContent') {
            body = beginCell().store(storeJettonUpdateContent(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetManager') {
            body = beginCell().store(storeSetManager(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateBaseConfig') {
            body = beginCell().store(storeUpdateBaseConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePoolConfig') {
            body = beginCell().store(storeUpdatePoolConfig(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ListToken') {
            body = beginCell().store(storeListToken(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DelistToken') {
            body = beginCell().store(storeDelistToken(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawFee') {
            body = beginCell().store(storeWithdrawFee(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FeedPrices') {
            body = beginCell().store(storeFeedPrices(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'IncreaseAum') {
            body = beginCell().store(storeIncreaseAum(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransferNotification') {
            body = beginCell().store(storeJettonTransferNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateAddLiquidityOrder') {
            body = beginCell().store(storeCreateAddLiquidityOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelLiquidityOrder') {
            body = beginCell().store(storeCancelLiquidityOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteLiquidityOrder') {
            body = beginCell().store(storeExecuteLiquidityOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateIncreasePerpOrder') {
            body = beginCell().store(storeCreateIncreasePerpOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateDecreasePerpOrder') {
            body = beginCell().store(storeCreateDecreasePerpOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateTpSlPerpOrder') {
            body = beginCell().store(storeCreateTpSlPerpOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelPerpOrder') {
            body = beginCell().store(storeCancelPerpOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecutePerpOrder') {
            body = beginCell().store(storeExecutePerpOrder(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'LiquidatePerpPosition') {
            body = beginCell().store(storeLiquidatePerpPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ADLPerpPosition') {
            body = beginCell().store(storeADLPerpPosition(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateCompensate') {
            body = beginCell().store(storeCreateCompensate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteOrCancelCompensate') {
            body = beginCell().store(storeExecuteOrCancelCompensate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message === 'Resume') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Stop') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RequestUpgrade') {
            body = beginCell().store(storeRequestUpgrade(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteUpgrade') {
            body = beginCell().store(storeExecuteUpgrade(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CancelUpgrade') {
            body = beginCell().store(storeCancelUpgrade(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getAccountInfo(provider: ContractProvider, account: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(account);
        let source = (await provider.get('accountInfo', builder.build())).stack;
        const result = loadGetterTupleAccountInfo(source);
        return result;
    }
    
    async getPerpPosition(provider: ContractProvider, tokenId: bigint, account: Address | null) {
        let builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        builder.writeAddress(account);
        let source = (await provider.get('perpPosition', builder.build())).stack;
        const result = loadGetterTuplePerpPositionData(source);
        return result;
    }
    
    async getConfigData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('configData', builder.build())).stack;
        const result = loadGetterTupleConfigData(source);
        return result;
    }
    
    async getTokenConfig(provider: ContractProvider, tokenId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(tokenId);
        let source = (await provider.get('tokenConfig', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleTokenConfig(result_p) : null;
        return result;
    }
    
    async getPoolStat(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('poolStat', builder.build())).stack;
        const result = loadGetterTuplePoolStat(source);
        return result;
    }
    
    async getLiquidityOrder(provider: ContractProvider, orderId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(orderId);
        let source = (await provider.get('liquidityOrder', builder.build())).stack;
        const result = loadGetterTupleLiquidityOrderData(source);
        return result;
    }
    
    async getPerpOrder(provider: ContractProvider, orderId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(orderId);
        let source = (await provider.get('perpOrder', builder.build())).stack;
        const result = loadGetterTuplePerpOrderData(source);
        return result;
    }
    
    async getCompensate(provider: ContractProvider, compensateId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(compensateId);
        let source = (await provider.get('compensate', builder.build())).stack;
        const result = loadGetterTupleCompensateData(source);
        return result;
    }
    
    async getTlpPrice(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tlpPrice', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getStopped(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stopped', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getUpgradeUnlockTime(provider: ContractProvider, seqno: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(seqno);
        let source = (await provider.get('upgradeUnlockTime', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getUpgradeSeqno(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('upgradeSeqno', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}