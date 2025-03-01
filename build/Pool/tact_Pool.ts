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
    globalLPUnrealizedPnl: bigint;
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
        b_0.storeInt(src.globalLPUnrealizedPnl, 128);
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
    let _globalLPUnrealizedPnl = sc_0.loadIntBig(128);
    let _globalLpFundingFeeGrowth = sc_0.loadCoins();
    let _globalRolloverFeeGrowth = sc_0.loadCoins();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, feeReserve: _feeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function loadTuplePoolStat(source: TupleReader) {
    let _tlpSupply = source.readBigNumber();
    let _orderAmountReserve = source.readBigNumber();
    let _executionFeeReserve = source.readBigNumber();
    let _feeReserve = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, feeReserve: _feeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function loadGetterTuplePoolStat(source: TupleReader) {
    let _tlpSupply = source.readBigNumber();
    let _orderAmountReserve = source.readBigNumber();
    let _executionFeeReserve = source.readBigNumber();
    let _feeReserve = source.readBigNumber();
    let _globalLPFund = source.readBigNumber();
    let _globalLPUnrealizedPnl = source.readBigNumber();
    let _globalLpFundingFeeGrowth = source.readBigNumber();
    let _globalRolloverFeeGrowth = source.readBigNumber();
    return { $$type: 'PoolStat' as const, tlpSupply: _tlpSupply, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, feeReserve: _feeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth };
}

function storeTuplePoolStat(source: PoolStat) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tlpSupply);
    builder.writeNumber(source.orderAmountReserve);
    builder.writeNumber(source.executionFeeReserve);
    builder.writeNumber(source.feeReserve);
    builder.writeNumber(source.globalLPFund);
    builder.writeNumber(source.globalLPUnrealizedPnl);
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
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpSupply: _tlpSupply, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, positionIndexNext: _positionIndexNext, positions: _positions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, feeReserve: _feeReserve, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig, publicKey: _publicKey, upgradeSeqno: _upgradeSeqno, upgradeRequests: _upgradeRequests };
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
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpSupply: _tlpSupply, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, positionIndexNext: _positionIndexNext, positions: _positions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, feeReserve: _feeReserve, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig, publicKey: _publicKey, upgradeSeqno: _upgradeSeqno, upgradeRequests: _upgradeRequests };
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
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpSupply: _tlpSupply, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, positionIndexNext: _positionIndexNext, positions: _positions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, feeReserve: _feeReserve, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig, publicKey: _publicKey, upgradeSeqno: _upgradeSeqno, upgradeRequests: _upgradeRequests };
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
    const __code = Cell.fromBase64('te6ccgICAR0AAQAAXeEAAAEU/wD0pBP0vPLICwABAgFiAAIAAwLw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ETARMhEwES8RMREvES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmARAACgIBIAAEAAUCASAA5gDnAgEgAAYABwIBSADwAPECASAACAAJAgEgAQABAQIBIAEIAQkB/BElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREQALAtYREBESERAPEREPDhEQDhDfVRzbPPLggsj4QwHMfwHKABExETARLxEuES0RLBErESoRKREoEScRJhElESQRIxEiESERIBEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMntVAAMAA0Eou2i7fsBkjB/4HAh10nCH5UwINcLH94gghBbjycduo6UMNMfAYIQW48nHbry4IHUATHbPH/gIIIQyMA8iLrjAiCCENBecrO64wIgghCmL4VsugAOAA8AEAARAfQBETEBETAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBES4BygABESwByx8BESr6AgERKAHLHwERJgHLHwERJAHLHwERIvoCAREg+gIBER76AgERHPoCyAERG/oCAREZ+gIBERf6AgERFfoCARET+gIBERH6AgAoAfARMBExETARLxExES8RLhExES4RLRExES0RLBExESwRKxExESsRKhExESoRKRExESkRKBExESgRJxExEScRJhExESYRJRExESURJBExESQRIxExESMRIhExESIRIRExESERIBExESARHxExER8RHhExER4RHRExER0AEgHiMNMfAYIQyMA8iLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBMAFgN2MNMfAYIQ0F5ys7ry4IHUAdDSAAGOhNs8bwyRbeIB0gABlfQEAW8BkW3iAdQw0NIAAZIwbeMNbBPbPH8AFwAYABkEoI87MNMfAYIQpi+FbLry4IHTH/oA0x/TH9MfVUBsFVcvVy9XL1cvVy+CAKD3+EJWHMcF8vSI+EIBf23bPH/gIIIQ5Js78LrjAiCCEJtC5O+6ACIA4wAjACQC6hEcETERHBEbETERGxEaETERGhEZETERGREYETERGBEXETERFxEWETERFhEVETERFREUETERFBETETERExESETEREhERETEREREQETEREA8RMQ8OETEODRExDQwRMQwLETELChExCgkRMQkRMQgHBlVA2zwRMQDfABMB/sgBghBbjycdWMsfzMkRMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESsRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4AFAH+ER0RHhEdf21WHhEgER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWBAAVAQoFVSDbPADjACZXG1cbVxuCAKD3+EJSUMcF8vR/AFj6APoA+gD6APoA+gD6APoA1AHQ+gD6APoA+gAwEEwQSxBKEEkQSBBHEEYQRQDK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTbwMB8BEwETMRMBEvETIRLxEuETERLhEtETMRLREsETIRLBErETERKxEqETMRKhEpETIRKREoETERKBEnETMRJxEmETIRJhElETERJREkETMRJBEjETIRIxEiETERIhEhETMRIREgETIRIBEfETERHxEeETMRHhEdETIRHQAaAfwRHBExERwRGxEzERsRGhEyERoRGRExERkRGBEzERgRFxEyERcRFhExERYRFREzERURFBEyERQRExExERMREhEzERIREREyEREREBExERAPETMPDhEyDg0RMQ0METMMCxEyCwoRMQoJETMJCBEyCAcRMQcGETMGBREyBQQRMQQAGwS4AxEzAwIRMgIBETEBETPbPFYzbrOOMDNXGlcaVjAgbvLQgG8jW1YxIG7y0IBvIzAxETIgbvLQgG8jbCECETICAhEbAhEaEpJXM+JWMG6zklcw4w1WMG6zklcw4w0A3wAcAB0AHgDUETAgbvLQgG8hIIEBC3FZ9IJvpSCWUCPXADBYlmwhbTJtAeKQjkGBAQsBkX+RbeICERkCVhkBcSFulVtZ9FkwmMgBzwBBM/RB4oEBCyICERlxQTP0dG+lIJZQI9cAMFiWbCFtMm0B4uhfAwH6VxxXHFccVxxXHFccVxxXHFccVxxXHFccViQgbvLQgG8sECtfC1YlIG7y0IBvLBtfC1YmIG7y0IBvLGyxVicgbvLQgG8sXwtWKCBu8tCAbywQq18LVikgbvLQgG8sEJtfC1YqIG7y0IBvLBCLXwtWKyBu8tCAbywQe18LViwAHwL+iBEuETERLhEtETARLREsES8RLBErES4RKxEqES0RKhEpESwRKREoESsRKBEnESoRJxEmESkRJhElESgRJREkEScRJBEjESYRIxEiESURIhEhESQRIREgESMRIBEfESIRHxEeESERHhEdESARHREcER8RHBEbER4RGxEaER0RGgAgACEA6iBu8tCAbywQa18LVi0gbvLQgG8sEFtfC1YuIG7y0IBvLBBLXwsRLyBu8tCAbywQO18LERsRLxEbBxEmBwYRJQYFESQFBBEjBAMRIgMCESECAREgAREbER8RGxEeCREdCQgRHAgKERsKEHoQaRBYEEcQNkBFEwAuAAAAAGJhc2UgY29uZmlnIHVwZGF0ZWQByhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREhERERQREREQERMREA8REg8OEREODREQDRDPEL4QrRCcEIsQehBpEFgQRxA2RUD4QgF/bds8AOMALgAAAABwb29sIGNvbmZpZyB1cGRhdGVkAiww0x8BghDkmzvwuvLggdMP2zwQeGwYAQ4AJQSCjpUw0x8BghCbQuTvuvLggdMPATHbPH/gIIIQj+LiEbrjAiDA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kXDik1Y7oN5WOMIAlFY3wgCRcOKTVjug3oIAzv1WKiKgVkGgFL4T8vQRP5F6koAL4hEyETcRMhExETYRMREwETURMBEvETQRLxEuETMRLgDgAFAB/BEtETIRLREsETERLBErETARKxEqES8RKhEpES4RKREoES0RKBEnESwRJxEmESsRJhElESoRJREkESkRJBEjESgRIxEiEScRIhEhESYRIREgESURIBEfESQRHxEeESMRHhEdESIRHREcESERHBEbESARGxEaER8RGhEZER4RGQBRBPwRGBEdERgRFxEcERcRFhEbERYRFREaERURFBEZERQRExEYERMREhEXERIREREWEREREBEVERAPERQPDhETDg0REg0MEREMCxEQCxCvEJ4QjRB8EGsQWhBJEDgQJxA2BVY/BRA0Vj8DAhE/AgERPgFWPAERPts8VjVWNbzjDwQAlQBSAFMAVACmAxEzAwIRMgIBETcBETaAQBE1yFVAUFT6AhLLfwH6AhLLfwH6AskDERADAhExAgERMwEgbpUwWfRbMJRBM/QX4hEuETERLhEtES4RLREsES0RLA0AJjAEETYEAxE1AwIRMwJXMVcxXwMB/FYyoANWL6ABES8BETKgESoRMhEqESkRMREpESgRMBEoEScRLxEnESYRLhEmESURLRElESQRLBEkESMRKxEjESIRKhEiESERKREhViARKREgESgRIBEfEScRHxEeESYRHhEdESURHREcESQRHBEbESMRGxEaESIRGhEZESERGQBVAdwRGBEgERgRFxEfERcRFhEeERYRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPDhEWDg0RFQ0MERQMCxETCwoREgoJEREJCBEQCBB/EG4QXRA8EKsQKhB5EEgHEEYQRVnbPADIAD7THwGCEMu70iS68uCB0z/TD9IA+gD6ANN/0x/6AFVwAfARMBE4ETARLxE3ES8RLhE2ES4RLRE1ES0RLBE0ESwRKxEzESsRKhEyESoRKRExESkRKBE4ESgRJxE3EScRJhE2ESYRJRE1ESURJBE0ESQRIxEzESMRIhEyESIRIRExESERIBE4ESARHxE3ER8RHhE2ER4RHRE1ER0AWAH8ERwRNBEcERsRMxEbERoRMhEaERkRMREZERgROBEYERcRNxEXERYRNhEWERURNREVERQRNBEUERMRMxETERIRMhESERERMRERERAROBEQDxE3Dw4RNg4NETUNDBE0DAsRMwsKETIKCRExCQgROAgHETcHBhE2BgURNQUEETQEAFkC+gMRMwMCETICARExARE42zz4QW8kMDKCAIh/VjtWI77y9IIAvZBWKVY8oBO+EvL0ETERNxExETARNhEwES8RNREvES4RNBEuES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElAOAAWgH8ESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQAFsC9A8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsEFsQShA5SHAGETgGgAxUQXYQNQQROgRaVjsBETvbPDAIVjKgETARMhEwES8RMREvES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoAJUAXAH4EScRKREnViYRKREmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFABdAXIRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsGxCKEHkQaBBXEEYQNUFA2zwAyABC0x8BghD5T4C7uvLggfoA0w/SAPoA03/6ANN/0z/TH1WAAfARMBE5ETARLxE4ES8RLhE3ES4RLRE2ES0RLBE1ESwRKxE0ESsRKhEzESoRKREyESkRKBExESgRJxE5EScRJhE4ESYRJRE3ESURJBE2ESQRIxE1ESMRIhE0ESIRIREzESERIBEyESARHxExER8RHhE5ER4RHRE4ER0AYgP2+EFvJDAyVheAQCVZ9A9voZIwbd8gbpIwbY6H0Ns8bBxvDOKBf30hbrPy9CBu8tCAbyxsMzM0NYFebQGz8vSBS2kHVi++F/L0Vh+BAQsmWfQKb6ExggCg9yGRf5RTNscF4vL0s5ojwAqRf5MjwAzikXDikTDjDXBTA8AKARwAbABtBDqPCDDbPGwX2zx/4CCCEFaV6T664wIgghDV3r/cugBwAHEAcgBzAfwRHBE3ERwRGxE2ERsRGhE1ERoRGRE0ERkRGBEzERgRFxEyERcRFhExERYRFRE5ERURFBE4ERQRExE3ERMREhE2ERIRERE1EREREBE0ERAPETMPDhEyDg0RMQ0METkMCxE4CwoRNwoJETYJCBE1CAcRNAcGETMGBREyBQQRMQQAYwPcAxE5AwIROAIBETcBETbbPPhBbyQwMnBWNcIAlFY0wgCRcOKSMHHeVjzCAJRWO8IAkXDikaTegV/yVjlWJL7y9IFLaVYqVjqgIqgUvhPy9FY0wgCUVjPCAJFw4pRXM1cz4w1WOcIAlFY4wgCRcOIA4ABkAGUBRIANcFY7QxQiVjoDVjpQIwEROgEROVY9Vj/bPDARMREyETEAlQL2jhYFETkFBBE4BAMRNwMCETYCVzNXM18E4w1WL1YtqBOgViBWLagBETABES2oESoRMxEqESkRMhEpESgRMREoEScRMBEnESYRLxEmESURLhElESQRLREkESMRLBEjESIRKxEiESERKhEhESARKREgER8RKBEfER4RJxEeAGYAZwH8ETARNhEwES8RNREvES4RNBEuES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfER4RJBEeER0RIxEdERwRIhEcAGgB/BEdESYRHREcESURHBEbESQRGxEaESMRGhEZESIRGREYESERGBEXESARFxEWER8RFhEVER4RFREUER0RFBETERwRExESERsREhERERoREREQERkREA8RGA8OERcODREWDQwRFQwLERQLChETCgkREgkIEREIBxEQBxBvEF4QTQBrAf4RGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEH0QbFVVBRE3BYAOBXAjRRZQNAIRPAIBETsBAGkC/FY6ARE82zwwBREzBQQRMgQDETEDAhEwAgMRLwMBES4BES0FESwFBBErBAIRKgIDESkDAREoAREnBREmBQQRJQQCESQCAxEjAwERIgERIQURIAUEER8EAhEeAgMRHQMBERwBERsFERoFBBEZBAIRGAIDERcDAREWAREVBREUBQCVAGoARgQREwQCERICAxERAwEREAEPEF4QTRAsEDtQqRBYEEdGE0VFASIQPEmgEGgQVxBGEDVEQBPbPADIABiBF+YBVjeg+CO78vQD1JF/kyTAC+KSMjXjDVJgERuAQPRbMCHCAI6UUzFyf1UgbW1t2zwwUUGgUP+hDgORMeJBVMhVIIIQ8sWurFAEyx8SywfLP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7AKMBERahVidZ2zwAbgDkAMgC/DBWGoBAKVn0D2+hkjBt3yBukjBtjhHQ+gDTf/oA03/6AFVAbBVvBeIgbrOOziBu8tCAbyUlBcIAkwPCAJIzcOKUM1RBE94BwgCSwgCSMHDikaCRMOIgwgCOkzFccn9VIG1tbds8MCAREQGhERCRMOJScBEbgED0WzARGpEw4gDkAG8BJlEVc39VIG1tbds8MBEQJKEREAQA5AA60x8BghAE9eAbuvLggdM/0z/TD9N/0h/Sf9J/VWAD9DIz+EFvJDAygUtpVi6qAFYtAaATvhLy9IIAoPeBAQtWH0ATWfQKb6Ex8vRWGIBAJln0D2+hkjBt3yBukjBtjofQ2zxsHG8M4oF/fSFus/L0IG7y0IBvLIFebQGz8vR/gEAsUTxRPFE8UTxRPFE8UTxMEytZyFWw2zzJARwAlwB0A34w2zxsGDL4QW8kMIFLaTNWLr4S8vSCAKD3gQELViFAE1n0Cm+hMfL0VhikERkQRwYFQxPbPPhCAaNWJlnbPH8AmgCbAMgEto/QMNs8bBoy+EFvJDCBS2kzVjC+EvL0ggCg94EBC1YjQBNxQTP0Cm+hlAHXADCSW23ibrPy9FYapBEbEEkIdAgFBlBzREDbPPhCAaNWJlnbPH/gIIIQ/DOHfboApwCoAMgAqQT4AhEjAgERIwFS8CBulTBZ9FswlEEz9BfiKMAKkX+TKMAM4rOdAZNSkr6TUpK74vLmbJJsIeJwUwfACpF/kyjAC+LjDwERMwEPgED0WzBWLsIAjpP4QlYvcn9VIG1tbds8MANWLqED3lYfARExoPhCES+jAREwoRErETMRKwB1AHYA5AB3AfwRNhE+ETYRNRE9ETURNBE8ETQRMxE7ETMRMhE6ETIRMRE5ETERMBE4ETARLxE3ES8RLhE+ES4RLRE9ES0RLBE8ESwRKxE7ESsRKhE6ESoRKRE5ESkRKBE4ESgRJxE3EScRJhE+ESYRJRE9ESURJBE8ESQRIxE7ESMRIhE6ESIAfAH+MBE6ET0ROhE5ETwRORE4ETsROBE3ET0RNxE2ETwRNhE1ETsRNRE0ET0RNBEzETwRMxEyETsRMhExET0RMREwETwRMBEvETsRLxEuET0RLhEtETwRLREsETsRLBErET0RKxEqETwRKhEpETsRKREoET0RKBEnETwRJxEmETsRJgB4AfwRKhEyESoRKRExESkRKBEwESgRJxEvEScRJhEuESYRJREtESURJBEsESQRIxErESMRIhEqESIRIREpESERIBEoESARHxEnER8RHhEmER4RHRElER0RHBEkERwRGxEjERsRGhEiERoRGREhERkRGBEgERgRFxEfERcRFhEeERYAewH+ESURPRElESQRPBEkESMROxEjESIRPREiESERPBEhESAROxEgER8RPREfER4RPBEeAREdAREcET0RHBEbETwRGwERGgERGRE9ERkRGBE8ERgBERcBERYRPREWERURPBEVAREUARETET0RExESETwREgEREQEREBE9ERAPETwPHgB5Av4NET0NDBE8DBsKET0KGVY8CRBnARE+Ads8BBE0BAMRMgMEETEEETADES8DAhEuAgERLQEEESwEESsDESoDAhEpAgERKAEEEScEESYDESUDAhEkAgERIwEEESIEESEDESADAhEfAgERHgEEER0EERwDERsDAhEaAgERGQEEERgEAKgAegBaERcDERYDAhEVAgERFAEEERMEERIDEREDAhEQAh8QTg0QPEugEEkIEDdGE0AFAbwRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPERARFhEQDREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEEwQO0qQECgQZxA2FRRDMNs8AMgB+BEhETkRIREgETgRIBEfETcRHxEeET4RHhEdET0RHREcETwRHBEbETsRGxEaEToRGgIRGQIRGBE4ERgRFxE3ERcRFhE+ERYRFRE9ERURFBE8ERQRExE7ERMREhE6ERICERECERAROBEQDxE3Dw4RPg4NET0NDBE8DAsROwsAfQLkChE6ChApCBE4CAcRNwcGET4GVjwGVj4GBRE6BVZABVY6UVMFEDQDET0DAhE/AgERQAERP9s8VhKAQFY5WfQPb6GSMG3fIG6SMG2OEdD6ANN/+gDTf/oAVUBsFW8F4iBus54wAxE4AwIRNgJXMVcxW+MNAH4AfwLcViGAEChZ9A9voZIwbd8gbpIwbY6H0Ns8bBdvB+KBbJYhbrPy9CBu8tCAbyc2ggCPblAF8vRWHYAQLVn0D2+hkjBt3yBukjBtl9D0BAExbwHiIG6zlyBu8tCAbyGSMG3iIIEBCy9Z9AtvoZIwbd8BDgCAAnggbvLQgG8lJMIAkyPCAJFw4pIzM+MNIMIAkyLCAJFw4p9fAwMROAMCETYCVzFXMVvjDVYzUA+AQPRbMA4AjQCOBOQgbpIwbY8S0Ns8BtQB0Ns8NhBsVQRsHG8M4iBus5cgbvLQgG8snTBwVHAAUwBwVHAAUwDiVheWVHupVHupllR1Q1R1Q+IjwACXNVYwpBExBd5WLoAQViBZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuIgbrMA/QD9AP8AgQL8mCBu8tCAbyZbmDBwVHAAUwBb4lYhlAFWH6CUVh+gAeIgVh+ogjAN4Lazp2QAAKkEIlYgqIIwDeC2s6dkAACpBFY1gBBWJln0D2+hkjBt3yBukjBtndD6ANIA039VIGwTbwPiIG6zlyBu8tCAbyOUMHBwIeJwViUkwgCRcOMNAIIAgwAIVigkugL+jkExI1YmtghWKI4TViUjoVIQqIIwDeC2s6dkAACpBI4TIlYmoVIQqIIwDeC2s6dkAACpBOJRIaFQVaEgwACScDPeBN4gwgCOFDNSMqgiViWooF2gqQRaoFYms0ADkTDicFMAVijCAJJXJOMNViVQDqEvqIIwDeC2s6dkAACpBACEAIUAqmwhViZWJqhWIqiCMGdlx5P6EAedqhqpBCARJKiCEDuaygCpBCLCAJ4xIVZZqIIQO5rKAKkEAd5WIyGhIqABEToBoFMhoVY6oAERNwGgETYROQERIwEB+FYkUA2hL6iCMA3gtrOnZAAAqQRWEBEpLaAioSGhARERAaAgESmhUv+oVidWJ6igL1YooKkED1YnoFYlViVWK44UVihWEqFSMKiCMA3gtrOnZAAAqQSOFFYRVimhUjCogjAN4Lazp2QAAKkE4iNWKqgBESYBESOgAREiAagAhgL6gjBnZceT+hAHnaoaqQQBESKgVimBb7sRJaC5AREjAfL0VieBQ6ARIqhWIlYQqIIwDeC2s6dkAACpBL4BESEB8vRWJ44VVxZXFlcWVxZXFlcWKVYhVhwqUXqg4w4QOkmABhEcBgURGwUEERMEAxESAwIREQIBERABD4EBCw8AhwCIAKJXEFcQVxBXEFcQVxApViFWHCpRaqARFREcERURFBEbERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDgMREwMCERICARERAQYREAcE8shVsBBsEFsQShA5SHzbPMhVUAfbPMkBzMkCERACFFYdASBulTBZ9FkwlEEz9BPigBAByAEB9ADJAhEtAlYbASBulTBZ9FswlEEz9BfigBAjVhEpVhJWEVYRyFVQ2zzJAhErAlYbASBulTBZ9FswlEEz9BfigBBUe6kAswCzALUAiQHqyFUgWvoCEsoAy3/JAhEsAlYbASBulTBZ9FswlEEz9BfiERIXoREZESoRGREYESoRGBEXESoRFxEWESoRFgQRFQQRFBEqERQEERMEERAREhEQERERKhERBhEQBhAuEM0QTBBrSaAQWBBHXjETViRZDxEQDxDvAIoBgMgRHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABC9ELwAiwH0ghBHWWq+AREfyx8BER0Byz8BERsByz8BERkBywcBERcByz8BERUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERMByw8BEREBygAfyn9QDfoCG8p/UAn6AgfIy38Wy38Uyn9Y+gIB+gLKf8p/WPoCyFAD+gIAjABcUAP6AlAD+gJQA/oCUAP6AlAD+gITygATy38Tyn/IUAT6AhTKf8lYzMkBzMkBzAH4VzpWKoANVjr4IxE1ETgRNRE0ETcRNBEzETYRMxEyETgRMhExETcRMREwETYRMBEvETgRLxEuETcRLhEtETYRLREsETgRLBErETcRKxEqETYRKhEpETgRKREoETcRKBEnETYRJxEmETgRJhElETcRJREkETYRJBEjETgRIwCPAfoROFYpoIAOVjj4IxE2EToRNhE1ETkRNRE0ETgRNBEzETcRMxEyETYRMhExETURMREwETQRMBEvETMRLxEuETIRLhEtETERLREsETARLBErES8RKxEqES4RKhEpES0RKREoESwRKBEnESsRJxEmESoRJhElESkRJREkESgRJACTAfwRIhE3ESIRIRE2ESERIBE4ESARHxE3ER8RHhE2ER4RHRE4ER0RHBE3ERwRGxE2ERsRGhE4ERoRGRE3ERkRGBE2ERgRFxE4ERcRFhE3ERYRFRE2ERURFBE4ERQRExE3ERMREhE2ERIRERE4EREREBE3ERAPETYPDhE4Dg0RNw0AkAL+DBE2DAsROAsKETcKCRE2CQgROAgHETcHBhE2BgUROAVWPgUQNFZBBFY7BFY9UDQCETsCARE6AVZBAds8MBEyETgRMhEwETMRMBEvETIRLxEuETERLhEtETARLREsES8RLBErES4RKxEqES0RKhEpESwRKREoESsRKBEnESoRJwCVAJEB/BEmESkRJhElESgRJREkEScRJBEjESYRIxEiESURIhEhESQRIREgESMRIBEfESIRHxEeESERHhEdESARHREcER8RHBEbER4RGxEaER0RGhEZERwRGREYERsRGBEXERoRFxEWERkRFhEVERgRFREUERcRFBETERYRExESERUREgCSADoREREUEREREBETERAPERIPDhERDg0REA0Qz1UrEgH4ESMRJxEjESIRJhEiESERJREhESARJBEgER8RIxEfER4RIhEeER0RIREdERwRIBEcERsRHxEbERoRHhEaERkRHREZERgRHBEYERcRGxEXERYRGhEWERURGREVERQRGBEUERMRFxETERIRFhESERERFRERERARFBEQDxETDwCUAvoOERIODRERDQwREAwQvxCuEJ0QjBB7EGoJETwJECgHET4HBhE+BkVAAxE7A9s8MAMRNAMCETICAxEwAwIRLwIBES4BES0DESwDAhErAgERKgERKQMRKAMCEScCAREmARElAxEkAwIRIwIBESIBESEDESADAhEfAgERHgERHQCVAJYDzijACpF/kyjAC+KSJbOOECjADJElmSjADZElkiWz4uLiVhykgED4I1RssFRtwFRswFRsoFLQcFlwyFWw2zzJAhEhAlYfASBu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ESIB8vQAqFcRVxFXEVcRVxFXEShWHCkGVhuhCVYjoREVERwRFRETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQIREgIBEREBBhEQBhDOCQYHBQP8gjAN4Lazp2QAAKkEEK8QSRA4EEcGER4GEF4EERUEAxEUAwIREwIBERIBERGBAQsREchVsBBsEFsQShA5SHzbPMhVUAfbPMkBzMkCERICFlYfASBulTBZ9FkwlEEz9BPigBAByAEB9ADJAhEvAlYdASBulTBZ9FswlEEz9BfiALMAswC0ACJQVss/UAP6AgH6Ast/yn/KfwP4gBBUeYdUd5jIVVDbPMkCES0CVh0BIG6VMFn0WzCUQTP0F+KAEFRy/shVIFr6AhLKAMt/yQIRLgJWHQEgbpUwWfRbMJRBM/QX4lYeARE0gED0WzBWHFYac39VIG1tbds8MBEpVhmhERQcoREdER4RHREcER4RHBEbER4RGwC1AOQAtgAoUGX6AlAD+gIB+gIB+gJY+gIB+gIB2AgRGggRGREeERkIERgIERcRHhEXDxEWDxEVESwRFREUER4RFBESERMREg8REg8OEREODhEQDhCvHlQdCA0MES0MCxEfCxCKEHkQaBA3EFYQRQQRLQRAE1YnAgERLgEREBERERAPERAPEN4QzQC3AZLIESARHxEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAChEUChDOCg0MALgB9IIQI1NGTAERIcsfAREfAcs/AREdAcs/AREbAcsHAREZAcs/AREXINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAREVAcsPARETAcoAARERAcp/UA/6Ah3Kf1AL+gIJyMt/GMt/Fsp/FMp/WPoCAfoCyn/Kf8hYALkAcvoCUAP6AlAD+gJQA/oCUAP6AlAD+gJQA/oCUAP6AhPKAAPIy38Uyn9QBPoCFMp/yVADzMlYzMkBzAH20x8BghD8M4d9uvLggdIAAZLTB5JtAeLTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAAL4D9oIAoPf4QlYixwXy9PhBbyQwMYFLaTJWL77y9PgjggP0gKBWF6SAQFR5h1R5h1OYyFVw2zzJAhEbAlYaASBulTBZ9FswlEEz9BfiERgIBwZVQMhVgNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APhCVicRERESEREBcAC/AMAAwQPGMNMfAYIQiOf5J7ry4IHSANM/0z9VIGwTggCg9/hCVh7HBfL0gUtp+EFvJBNfA1YpvvL0VhOAQCNZ9A9voZIwbd8gbpIwbY6H0Ns8bBhvCOKBK3AhbrPy9CBu8tCAbygK4w9/APYAwwDEBP6OqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gIIIQgkcP2LqOojDTHwGCEIJHD9i68uCB1AHQAdIAAZPUAdCRbeISbBLbPH/gIIIQP49w1rqOlTDTHwGCED+PcNa68uCB0x8BMds8f+AgghDfvCN+AOMAyQDKAMsABFVgAPAnbrOYf1AJygAXyweYN3BQCMoAEGfiFcs/E8s/ASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiAfoCASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiAfoCyx8BqIIQlii6llAKyx8Yyz8mbrOXfwHKABbLB5Y2cFAGygDiFMs/Ess/ASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiAfoCAQDCAQTbPADIAGYgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4gH6AgHIyx/JAcwBfl8HMiARE4BA9FswERIByFmCEEvDQdVQA8sfyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wD4QlYmAXDbPADIBP43gXrB+CNQCr4Z8vQkbrOONARxIW6SW3CRuuKYERwSgED0WzCOG1IgERuAQPRbMBEZEoBA9FswERkRGxEZERgRGeIRG1mSMzPicCNus5MiwgCRcOKOljACIG7y0IAhc39VIG1tbds8MFHuoQ6SbCLicCVus5MjwgCRcOLjD1IgAOQAxQDGAMcBLDAEIG7y0IB/I3IQI21tbds8MFHBoQwA5AAEMzQBfBEVgED0WzARFBLIWYIQ20XkOFADyx/LP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APhCAaNYoVYmWds8AMgBvvhBbyQwMvgnbxBWEKEuoS+hI6AioXABtgkgViW2CFYlAaGBAQtWH0AUWfQKb6Exs5IwcJdwAVYlobYJ4lmhUAShUAOgIsIAknAz31ihIMIAjopyf1UgbW1t2zwwkVviAOQB8BEwETIRMBEvETERLxEuETIRLhEtETERLREsETIRLBErETERKxEqETIRKhEpETERKREoETIRKBEnETERJxEmETIRJhElETERJREkETIRJBEjETERIxEiETIRIhEhETERIREgETIRIBEfETERHxEeETIRHhEdETERHQDMAfARMBExETARLxExES8RLhExES4RLRExES0RLBExESwRKxExESsRKhExESoRKRExESkRKBExESgRJxExEScRJhExESYRJRExESURJBExESQRIxExESMRIhExESIRIRExESERIBExESARHxExER8RHhExER4RHRExER0A0QP2uo6VMNMfAYIQ37wjfrry4IHTHwEx2zx/4MAAj1r5ASCC8GyPRPRf7bTN/tTejbFKpbE61V1DD3WdBmkhC3TEj+Pfuo6GMNs8f9sx4ILwvPr3dpB8cZzI03nY8ZSqqifoyihxzVkXgXIfIVpFRQG6joXbPH/bMeCRMOJwANYA1wDYAfwRHBEyERwRGxExERsRGhEyERoRGRExERkRGBEyERgRFxExERcRFhEyERYRFRExERURFBEyERQRExExERMREhEyERIRERExEREREBEyERAPETEPDhEyDg0RMQ0METIMCxExCwoRMgoJETEJCBEyCAcRMQcGETIGBRExBQQRMgQAzQP2AxExAwIRMgIBETEBETLbPPgjggP0gKACETICAREzAVYypFqAIATIVSDIUAPPFslQA8wibrOcfwHKAMhQA88WyVjMlTJwWMoA4ssfyQMRMwMBETIBIG6VMFn0WzCUQTP0F+KIES8RMREvES4RMBEuES0RLxEtESwRLhEsAN8AzgDPACoAAAAAdXBncmFkZSByZXF1ZXN0ZWQB/BErES0RKxEqESwRKhEpESsRKREoESoRKBEnESkRJxEmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFwDQAaIRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQihB5EGgQVxBGEDUQJPhCAX9t2zwA4wLwERwRMREcERsRMREbERoRMREaERkRMREZERgRMREYERcRMREXERYRMREWERURMREVERQRMREUERMRMRETERIRMRESERERMRERERARMREQDxExDw4RMQ4NETENDBExDAsRMQsKETEKCRExCRExCAcGVUDbPCCAIFYzAN8A0gL8WfQPb6GSMG3fIG6SMG2OGNDUAdAB0gABk9QB0JFt4gHTH1UgbBNvA+KCAIDEIW6z8vQgbvLQgG8jgTs5+CNYvvL0yFjPFsn7BCBus5zIASBu8tCAzxbJ7VSRMOIBETEBgCD0WzCIETARMREwES8RMBEvES4RLxEuES0RLhEtANMA1AAoAAAAAHVwZ3JhZGUgZXhlY3V0ZWQB/BEsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGADVAaoRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeBBnEFYQRRA0ECP4QgF/bds8AOMB8BEwETERMBEvETERLxEuETERLhEtETERLREsETERLBErETERKxEqETERKhEpETERKREoETERKBEnETERJxEmETERJhElETERJREkETERJBEjETERIxEiETERIhEhETERIREgETERIBEfETERHxEeETERHhEdETERHQDZBBjbPNs8Vy9wiAERMAEA3wDdAN4A4gQY2zzbPFcvf4gBETABAN8A4ADhAOID+hEcETERHBEbETERGxEaETERGhEZETERGREYETERGBEXETERFxEWETERFhEVETERFREUETERFBETETERExESETEREhERETEREREQETEREA8RMQ8OETEODRExDQwRMQwLETELChExCgkRMQkRMQgHBlVA2zwBETEBgCD0WzCIAN8A2gDbACgAAAAAdXBncmFkZSBjYW5jZWxlZAH8ETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcANwB2hEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDQQI/hCAX9t2zwA4wAQggDQMFYw8vQAFgAAAABSZXN1bWVkABT4QlYxAccF8uCEABKCAJ2wVjCz8vQAFgAAAABTdG9wcGVkAQ74QgF/bds8AOMBPG1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MADkAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7CADlAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAie6F72zzbPFcQXw9XEF8PVxBfDzGAEQAOgCASAA6QDqAARWLwIBYgDrAOwCJbWmm2ebZ42RDZENkQ2RDZENkxABEADvAtCq4ds82zxXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxFsHwEQAO0CJqkd2zzbPFcQXw9XEF8PVxBfDzEBEADuAEBWLlYqVipWKlYqVipWKlYqVipWKlYoVitWK1YoVipWPAAEVjAAElYdVHqbVHupKwIBIADyAPMC+bKiCBukjBtjhwg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI4ts8ETARMhEwES8RMREvES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjgARAA+gL5rQrtngiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlYiVCJWIlQiUiJUIlIiUCJSIlAiTiJQIk4iTCJOIkwiSiJMIkoiSCJKIkgiRiJIIkYiRCJGIkQiQiJEIkIiQCJCIkAiPiJAIj4iPCI+IjwiOiI8IjsABEAD0AvmueG2eCJgImIiYCJeImAiXiJcIl4iXCJaIlwiWiJYIloiWCJWIlgiViJUIlYiVCJSIlQiUiJQIlIiUCJOIlAiTiJMIk4iTCJKIkwiSiJIIkoiSCJGIkgiRiJEIkYiRCJCIkQiQiJAIkIiQCI+IkAiPiI8Ij4iPCI6IjwiOwAEQAPcByBEcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8VxJXEF8PVxJXEF8PbPIA9QFAgEBWEgJZ9A9voZIwbd8gbpIwbY6H0Ns8bBhvCOJWEAEA9gDk0gABktMHkm0B4tM/0z8g1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB+gAg1wsBwwCOH/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiUctchbeIB+gDTH1VwAcgRHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcSVxBfD1cSVxBfD2zyAPgBQIBAVhcCWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiVhUBAPkAWNIA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6APoA0x/SAFVQAfwRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRwA+wEU2zxs82zzbPNsQwD8A+BtIW6zj1pWEIAQJFn0D2+hkjBt3yBukjBtl9D0BAExbwHiIG6zjzUxIG7y0IBvIYEBCwIgbvLQgBJZ9AtvoZIwbd8gbpIwbY8S0Ns8BtQB0Ns8NhBsVQRsHG8M4pIwMeKRMeIugBAjWfQPb6GSMG3fAP0A/QD+ABzTP/oA+gDTf9J/0n9VUAFkIG6SMG2d0PoA0gDTf1UgbBNvA+KAEFRPFFn0D2+hkjBt3yBukjBtjofQ2zxsFm8G4hIA/wAc+gD6APoA+gD6APoAVVAAEbCvu1E0NIAAYAIBIAECAQMC+a+LbZ4ImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJWIlQiViJUIlIiVCJSIlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJEIkIiRCJCIkAiQiJAIj4iQCI+IjwiPiI8IjoiPCI7AARABBAL1rU4Qa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4ImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJWIlQiViJUIlIiVCJSIlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJFAARABBgHGERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw8xAQUAjCGAICJZ9A5voTGONoAgIgJZ9A9voZIwbd8gbpIwbY4Y0NQB0AHSAAGT1AHQkW3iAdMfVSBsE28D4iBu8tCAbyNsIZIwbeIB+BEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bMRsxGzEbNQBBwBSVhiBAQsicUEz9ApvoZQB1wAwkltt4m6zIVYcxwUiVhzHBQNWHscFQTACAWoBCgELAvmye7bPBEwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHYAEQAREC96Q5tngiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlYiVCJWIlQiUiJUIlIiUCJSIlAiTiJQIk4iTCJOIkwiSiJMIkoiSCJKIkgiRiJIIkYiRCJGIkQiQiJEIkIiQCJCIkAiPiJAIj4iPCI+IjwiOiI8IjsBEAEMAiWmv7Z5tniuIL4eriC+Hq4gvh5jARABDwHyERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw8xIG6SMG2ZIG7y0IBvJ28H4iBukjBt3gENATqAEFYYAln0D2+hkjBt3yBukjBtjofQ2zxsF28H4gEOACTUAdAB0gDTD/oA0x/TH9MfVWAAAiECQu1E0NQB+GPSAAHjAvgo1wsKgwm68uCJgQEB1wABAdHbPAESARMBvBEcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bPNs82zzbEMBGwL42zxXMREvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHAEUARUE7DBwgQC0cFRwAFRwAFRwAFRwAFRwACCNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASJiYltbW1xbW0ibVMRbW1tVhJUcABUcAABGgEaARoBGQHY+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANMf+gDTH9Mf0x/6APoA+gD6ANQB0PoA+gD6APoA+gD6APoA+gDUMND6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBARYAnBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgHG+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBARcB/PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9AT0BPQE0z/UMND0BPQE0z/0BNM/0z/UMND0BPQE9AT6APoA+gDSf9J/+gD6ANQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//TH/QEMBEmETERJgEYAHgRJhEwESYRJhEvESYRJhEuESYRJhEtESYRJhEsESYRJhErESYRJhEqESYRJhEpESYRJhEoESYRJhEnESYBlIlTG234QhEwES8RLhEtESwRKxEqESkRKBEnESYRJREkESMRIhEhESARHxEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXgARoAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABABkFYUgEAiWfQPb6GSMG3fIG6SMG2Oh9DbPGwcbwzigEBWFUATWfQPb6GSMG3fIG6SMG2OEdD6ANN/+gDTf/oAVUBsFW8F4lYTWQEcAHDTB9MP+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAPoA+gDTf9IA0w/6ANMf0gBVsA==');
    const __system = Cell.fromBase64('te6cckICAR8AAQAAXe0AAAEBwAABAQWg6L8AAgEU/wD0pBP0vPLICwADAgFiAAQA4QLw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ETARMhEwES8RMREvES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmARIABQH8ESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERAAYC1hEQERIREA8REQ8OERAOEN9VHNs88uCCyPhDAcx/AcoAETERMBEvES4RLREsESsRKhEpESgRJxEmESURJBEjESIRIREgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4Ns8ye1UAAcA3QSi7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEFuPJx26jpQw0x8BghBbjycduvLggdQBMds8f+AgghDIwDyIuuMCIIIQ0F5ys7rjAiCCEKYvhWy6AAgADQAPABsB8BEwETERMBEvETERLxEuETERLhEtETERLREsETERLBErETERKxEqETERKhEpETERKREoETERKBEnETERJxEmETERJhElETERJREkETERJBEjETERIxEiETERIhEhETERIREgETERIBEfETERHxEeETERHhEdETERHQAJAuoRHBExERwRGxExERsRGhExERoRGRExERkRGBExERgRFxExERcRFhExERYRFRExERURFBExERQRExExERMREhExERIRERExEREREBExERAPETEPDhExDg0RMQ0METEMCxExCwoRMQoJETEJETEIBwZVQNs8ETEA1gAKAf7IAYIQW48nHVjLH8zJETARMREwES8RMBEvES4RLxEuES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeAAsB/hEdER4RHX9tVh4RIBEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVgQADAEKBVUg2zwA2gHiMNMfAYIQyMA8iLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBMADgAmVxtXG1cbggCg9/hCUlDHBfL0fwN2MNMfAYIQ0F5ys7ry4IHUAdDSAAGOhNs8bwyRbeIB0gABlfQEAW8BkW3iAdQw0NIAAZIwbeMNbBPbPH8AEAARABIAWPoA+gD6APoA+gD6APoA+gDUAdD6APoA+gD6ADAQTBBLEEoQSRBIEEcQRhBFAMr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBNvAwHwETARMxEwES8RMhEvES4RMREuES0RMxEtESwRMhEsESsRMRErESoRMxEqESkRMhEpESgRMREoEScRMxEnESYRMhEmESURMRElESQRMxEkESMRMhEjESIRMREiESERMxEhESARMhEgER8RMREfER4RMxEeER0RMhEdABMB/BEcETERHBEbETMRGxEaETIRGhEZETERGREYETMRGBEXETIRFxEWETERFhEVETMRFREUETIRFBETETERExESETMREhERETIREREQETEREA8RMw8OETIODRExDQwRMwwLETILChExCgkRMwkIETIIBxExBwYRMwYFETIFBBExBAAUBLgDETMDAhEyAgERMQERM9s8VjNus44wM1caVxpWMCBu8tCAbyNbVjEgbvLQgG8jMDERMiBu8tCAbyNsIQIRMgICERsCERoSklcz4lYwbrOSVzDjDVYwbrOSVzDjDQDWABUAFgAYANQRMCBu8tCAbyEggQELcVn0gm+lIJZQI9cAMFiWbCFtMm0B4pCOQYEBCwGRf5Ft4gIRGQJWGQFxIW6VW1n0WTCYyAHPAEEz9EHigQELIgIRGXFBM/R0b6UgllAj1wAwWJZsIW0ybQHi6F8DAfpXHFccVxxXHFccVxxXHFccVxxXHFccVxxWJCBu8tCAbywQK18LViUgbvLQgG8sG18LViYgbvLQgG8sbLFWJyBu8tCAbyxfC1YoIG7y0IBvLBCrXwtWKSBu8tCAbywQm18LViogbvLQgG8sEItfC1YrIG7y0IBvLBB7XwtWLAAXAOogbvLQgG8sEGtfC1YtIG7y0IBvLBBbXwtWLiBu8tCAbywQS18LES8gbvLQgG8sEDtfCxEbES8RGwcRJgcGESUGBREkBQQRIwQDESIDAhEhAgERIAERGxEfERsRHgkRHQkIERwIChEbChB6EGkQWBBHEDZARRMC/ogRLhExES4RLREwES0RLBEvESwRKxEuESsRKhEtESoRKREsESkRKBErESgRJxEqEScRJhEpESYRJREoESURJBEnESQRIxEmESMRIhElESIRIREkESERIBEjESARHxEiER8RHhEhER4RHREgER0RHBEfERwRGxEeERsRGhEdERoAGQAaAC4AAAAAYmFzZSBjb25maWcgdXBkYXRlZAHKERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANEM8QvhCtEJwQixB6EGkQWBBHEDZFQPhCAX9t2zwA2gSgjzsw0x8BghCmL4VsuvLggdMf+gDTH9Mf0x9VQGwVVy9XL1cvVy9XL4IAoPf4QlYcxwXy9Ij4QgF/bds8f+AgghDkmzvwuuMCIIIQm0Lk77oAHADaAB0AIQAuAAAAAHBvb2wgY29uZmlnIHVwZGF0ZWQCLDDTHwGCEOSbO/C68uCB0w/bPBB4bBgBDgAeA26CAKD3+EJWJMcF8vRVUIAQB8hVYNs8yQMRGQMSIG6VMFn0WzCUQTP0F+KIAREXAfhCAX9t2zx/AB8AIADaADLIUAfPFslQB8wUygASyw8B+gLLHxLLH8sfACAAAAAAdG9rZW4gbGlzdGVkBIKOlTDTHwGCEJtC5O+68uCB0w8BMds8f+AgghCP4uIRuuMCIMAAItdJwSGwklt/4CCCEHNi0Jy64wIgghDeovwxugAiACUAJgApA/aCAKD3+EJWHccF8vQsgBAiWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiIG6zjiGBXwUhIG7y0IBvJhA1XwUCIG7y0IBvJhAlXwUSoMAA8vSRMOIgERiAEPRbMFYXUA2AEPRbMFYXUA6AEPRbMAERFwEOgBD0WzCIDBEXDB4A/gAjACQAJAAAAAB0b2tlbiBkZWxpc3RlZAESHRz4QgF/bds8ANoB3jDTHwGCEI/i4hG68uCBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iMYIAoPf4QlYbAccF8vSBLKYswgDy9CBus5UgbvLQgJMw+ELiUAuAQn9VIG1tbds8MHAKfwDbApow0x8BghBzYtCcuvLggdM/+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVBMDECNsFPhBbyQwMlYhAccFs46EWyDbPOMOfwAoACcDUFY0joRbINs84AH6ADAgVia5kjF/llYoIaASueKOhDAg2zzgEnBZ2zwAKAAoACoCXCLCAI8l+EJwgEJwbSPIUhDLAMnQEGoQWRBIEDfIVWDbPMkUQzBtbds8MJJfBOIAMwDbBOiOvDDTHwGCEN6i/DG68uCB0z/6APoAVSBsE/hBbyQwMoIAiH8jVie+8vSBMKZWKSWgJKATvhLy9AJ/Ats8f+AgghBp723+uo6YMNMfAYIQae9t/rry4IHTP9M/WWwS2zx/4CCCEDFWtQi64wIgghCQP5+WugAqAC0ANgBAA+hWGaSAQPgjVGVwVGZgcMhVUNs8yQIRHQJWHAEgbpUwWfRbMJRBM/QX4nAkljBR8qBR8t5R8qAEkXGRcuJRNVRDQwERHQEIyFVQ2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAAREXAQugViUCERgRFwHbPAArACwAvgBcUFbKAFADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCAfoCyx/KAABughBA8tijUAfLHxXLB1ADINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAfoCAfoCyz/LPwTk+EFvJDAygX2KVidWLaATvhLy9FYYgEAkWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiggDTZyFus/L0IG7y0IBvJoFebTKz8vSCAKD3Vh+BAQsnWfQKb6ExkX+UUzXHBeLy9FJgER2AQPRbMHAk4w9WG8IAAPcALgAvADUBIDBRIXN/VSBtbW3bPDBR/6EA2wH8ETIROBEyETERNxExETARNhEwES8RNREvES4RNBEuES0RMxEtESwROBEsESsRNxErESoRNhEqESkRNREpESgRNBEoEScRMxEnESYROBEmESURNxElESQRNhEkESMRNREjESIRNBEiESERMxEhESAROBEgER8RNxEfER4RNhEeADAB/BEdETURHREcETQRHBEbETMRGxEaETgRGhEZETcRGREYETYRGAERFwERFhE0ERYRFREzERURFBE4ERQRExE3ERMREhE2ERIBEREBERARNBEQDxEzDw4ROA4NETcNDBE2DBsKETQKCREzCQgROAgHETcHBhE2BhUEETQEAxEzAwAxAvoCETgCVjYCARE5ARE0VjTbPBEwETYRMBEvETURLxEuETQRLhEtETMRLREsETIRLBErETERKxEqETARKhEpES8RKREoES4RKBEnES0RJxEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIREgESYRIBEfESURHwAyADQCXiLCAI8mcnBtcMhSEMsAydAQaF40EDfIVWDbPMlWHgNWK0EzFEMwbW3bPDCSXwTiADMA2wDeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WAPwRHhEkER4RHREjER0RHBEiERwRGxEhERsRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFBEaERQRExEZERMREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQzxCOEH0QbBBbEEoQOUhmBwMCsI6SI1Ycc39VIG1tbds8MA5WG6EO3gKRcZFy4kBUyFUgghC5sDy8UATLHxLLB8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERijUAyhViQCERgB2zwA2wC+AT4w0x8BghAxVrUIuvLggdM/0z/0BPoA+gBVQGwV2zx/ADcC3Dv4QW8kMDKBfYpWMFYwtglWKQGgE74S8vSCAKD3Vh2BAQsjWfQKb6Ex8vRWGoBAJln0D2+hkjBt3yBukjBtjofQ2zxsFm8G4oIA02chbrPy9CBu8tCAbyaBXm0ys/L0UoARH4BA9FswcCeAEIMGAPcAOAH+WfSGb6UgllAj1wEwWJZsIW0ybQHikI5mVhiAECNZ9A9voZIwbd8gbpIwbZ3Q+gDSANN/VSBsE28D4iBus44gIG7y0IBvIxOhqAGRcZF/4qiCMA3gtrOnZAAAqQQSoAGRW+KAECkCgwZBM/R8b6UgllAj1wEwWJZsIW0ybQHi6AA5BNhbN1JfoVL+oSBWNqiCEDuaygCpBFPgoAEREgGgAVYRoQERFAGgVhMnoHBWLCbjD1YiwgCOlChWI3J/VSBtbW3bPDARFVYioREV3geRcZFy4hCLEHwGBVA0AhEXAiwCVisCARETAREWK1YWEGcAOgA8ANsAPgLcVjWgIVY6JKG2CSWBXGYCu/L0VinAAJsygjAN4Lazp2QAAI4QAoIwDeC2s6dkAACoVimpBOIkgjAN4Lazp2QAAKghqQRtI8jJ0CtROlE1A8hVUNs8yVYqAVY4AX8DcEMDbW3bPDARFyWgESpWF6AAOwDbAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WAvwxVjOgAYIwDeC2s6dkAACoViipBFMDqIIwDeC2s6dkAACpBFR6R23IVTCCEFlfB7xQBcsfE8s/AfoCASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiFus5V/AcoAzJRwMsoA4slWKAFWNgF/A3BDA21t2zwwERZWFqEA2wA9AUIRKSShJVYXc39VIG1tbds8MBEVVhahVhYFERcFAREWAVkA2wJsyFXA2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERmjUA6hAhEgAggRGAgQrRAqECkQJ9s8AD8AvgCkghAkGFzfUA7LHxzLPxrLPxjLB1AGINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAT6Alj6Ast/AfoCAcjKf1j6Alj6Alj6Alj6AskBzAQ6jwgw2zxsHds8f+AgghDLu9IkuuMCIIIQ+U+Au7oAQQBCAEsAVABu0x8BghCQP5+WuvLggdM/0w/SANIA+gD6ANN/0x/6APoA+gD6ANQB0PoAMB0cGxoZGBcWFRRDMAHwETARPREwES8RPBEvES4ROxEuES0ROhEtESwROREsESsROBErESoRNxEqESkRNhEpESgRNREoEScRNBEnESYRMxEmESURMhElESQRMREkESMRPREjESIRPBEiESEROxEhESAROhEgER8ROREfER4ROBEeER0RNxEdAEMB/BEcETYRHBEbETURGxEaETQRGhEZETMRGREYETIRGBEXETERFxEWET0RFhEVETwRFREUETsRFBETEToRExESETkREhERETgREREQETcREA8RNg8OETUODRE0DQwRMwwLETILChExCgkRPQkIETwIBxE7BwYROgYFETkFBBE4BABEAvYDETcDAhE2AgERNQERNNs8+EFvJDAyggDtcVY7ViO+8vRWOlY6wgCUVjnCAJFw4pNWO6DeVjjCAJRWN8IAkXDik1Y7oN6CAM79VioioFZBoBS+E/L0ET+RepKAC+IRMhE3ETIRMRE2ETERMBE1ETARLxE0ES8RLhEzES4A1wBFAfwRLREyES0RLBExESwRKxEwESsRKhEvESoRKREuESkRKBEtESgRJxEsEScRJhErESYRJREqESURJBEpESQRIxEoESMRIhEnESIRIREmESERIBElESARHxEkER8RHhEjER4RHREiER0RHBEhERwRGxEgERsRGhEfERoRGREeERkARgT8ERgRHREYERcRHBEXERYRGxEWERURGhEVERQRGREUERMRGBETERIRFxESERERFhERERARFREQDxEUDw4REw4NERINDBERDAsREAsQrxCeEI0QfBBrEFoQSRA4ECcQNgVWPwUQNFY/AwIRPwIBET4BVjwBET7bPFY1VjW84w8EAIQARwBIAEkApgMRMwMCETICARE3ARE2gEARNchVQFBU+gISy38B+gISy38B+gLJAxEQAwIRMQIBETMBIG6VMFn0WzCUQTP0F+IRLhExES4RLREuES0RLBEtESwNACYwBBE2BAMRNQMCETMCVzFXMV8DAfxWMqADVi+gAREvAREyoBEqETIRKhEpETERKREoETARKBEnES8RJxEmES4RJhElES0RJREkESwRJBEjESsRIxEiESoRIhEhESkRIVYgESkRIBEoESARHxEnER8RHhEmER4RHRElER0RHBEkERwRGxEjERsRGhEiERoRGREhERkASgHcERgRIBEYERcRHxEXERYRHhEWERURHREVERQRHBEUERMRGxETERIRGhESERERGRERERARGBEQDxEXDw4RFg4NERUNDBEUDAsREwsKERIKCRERCQgREAgQfxBuEF0QPBCrECoQeRBIBxBGEEVZ2zwAvgIQMNs8bBjbPH8ATABNAD7THwGCEMu70iS68uCB0z/TD9IA+gD6ANN/0x/6AFVwAfARMBE4ETARLxE3ES8RLhE2ES4RLRE1ES0RLBE0ESwRKxEzESsRKhEyESoRKRExESkRKBE4ESgRJxE3EScRJhE2ESYRJRE1ESURJBE0ESQRIxEzESMRIhEyESIRIRExESERIBE4ESARHxE3ER8RHhE2ER4RHRE1ER0ATgH8ERwRNBEcERsRMxEbERoRMhEaERkRMREZERgROBEYERcRNxEXERYRNhEWERURNREVERQRNBEUERMRMxETERIRMhESERERMRERERAROBEQDxE3Dw4RNg4NETUNDBE0DAsRMwsKETIKCRExCQgROAgHETcHBhE2BgURNQUEETQEAE8C+gMRMwMCETICARExARE42zz4QW8kMDKCAIh/VjtWI77y9IIAvZBWKVY8oBO+EvL0ETERNxExETARNhEwES8RNREvES4RNBEuES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElANcAUAH8ESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQAFEC9A8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsEFsQShA5SHAGETgGgAxUQXYQNQQROgRaVjsBETvbPDAIVjKgETARMhEwES8RMREvES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoAIQAUgH4EScRKREnViYRKREmESgRJhElEScRJREkESYRJBEjESURIxEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFABTAXIRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsGxCKEHkQaBBXEEYQNUFA2zwAvgRsjwgw2zxsGds8f+AgghB9aqtZuo6YMNMfAYIQfWqrWbry4IHTP9M/WWwS2zx/4CCCEAT14Bu6AFUAVgBhAGYAQtMfAYIQ+U+Au7ry4IH6ANMP0gD6ANN/+gDTf9M/0x9VgAHwETAROREwES8ROBEvES4RNxEuES0RNhEtESwRNREsESsRNBErESoRMxEqESkRMhEpESgRMREoEScROREnESYROBEmESURNxElESQRNhEkESMRNREjESIRNBEiESERMxEhESARMhEgER8RMREfER4ROREeER0ROBEdAFcB/BEcETcRHBEbETYRGxEaETURGhEZETQRGREYETMRGBEXETIRFxEWETERFhEVETkRFREUETgRFBETETcRExESETYREhERETUREREQETQREA8RMw8OETIODRExDQwROQwLETgLChE3CgkRNgkIETUIBxE0BwYRMwYFETIFBBExBABYA9wDETkDAhE4AgERNwERNts8+EFvJDAycFY1wgCUVjTCAJFw4pIwcd5WPMIAlFY7wgCRcOKRpN6BX/JWOVYkvvL0gUtpVipWOqAiqBS+E/L0VjTCAJRWM8IAkXDilFczVzPjDVY5wgCUVjjCAJFw4gDXAFkAWgFEgA1wVjtDFCJWOgNWOlAjARE6ARE5Vj1WP9s8MBExETIRMQCEAvaOFgUROQUEETgEAxE3AwIRNgJXM1czXwTjDVYvVi2oE6BWIFYtqAERMAERLagRKhEzESoRKREyESkRKBExESgRJxEwEScRJhEvESYRJREuESURJBEtESQRIxEsESMRIhErESIRIREqESERIBEpESARHxEoER8RHhEnER4AWwBfAfwRMBE2ETARLxE1ES8RLhE0ES4RLREzES0RLBEyESwRKxExESsRKhEwESoRKREvESkRKBEuESgRJxEtEScRJhEsESYRJRErESURJBEqESQRIxEpESMRIhEoESIRIREnESERIBEmESARHxElER8RHhEkER4RHREjER0RHBEiERwAXAH+ERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGxVVQURNwWADgVwI0UWUDQCETwCARE7AQBdAvxWOgERPNs8MAURMwUEETIEAxExAwIRMAIDES8DAREuAREtBREsBQQRKwQCESoCAxEpAwERKAERJwURJgUEESUEAhEkAgMRIwMBESIBESEFESAFBBEfBAIRHgIDER0DAREcAREbBREaBQQRGQQCERgCAxEXAwERFgERFQURFAUAhABeAEYEERMEAhESAgMREQMBERABDxBeEE0QLBA7UKkQWBBHRhNFRQH8ER0RJhEdERwRJREcERsRJBEbERoRIxEaERkRIhEZERgRIREYERcRIBEXERYRHxEWERURHhEVERQRHREUERMRHBETERIRGxESERERGhERERARGREQDxEYDw4RFw4NERYNDBEVDAsRFAsKERMKCRESCQgREQgHERAHEG8QXhBNAGABIhA8SaAQaBBXEEYQNURAE9s8AL4D9vhBbyQwMlYXgEAlWfQPb6GSMG3fIG6SMG2Oh9DbPGwcbwzigX99IW6z8vQgbvLQgG8sbDMzNDWBXm0Bs/L0gUtpB1Yvvhfy9FYfgQELJln0Cm+hMYIAoPchkX+UUzbHBeLy9LOaI8AKkX+TI8AM4pFw4pEw4w1wUwPACgEeAGIAYwAYgRfmAVY3oPgju/L0A9SRf5MkwAvikjI14w1SYBEbgED0WzAhwgCOlFMxcn9VIG1tbds8MFFBoFD/oQ4DkTHiQVTIVSCCEPLFrqxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wCjAREWoVYnWds8AGQA2wC+AvwwVhqAQClZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiIG6zjs4gbvLQgG8lJQXCAJMDwgCSM3DilDNUQRPeAcIAksIAkjBw4pGgkTDiIMIAjpMxXHJ/VSBtbW3bPDAgEREBoREQkTDiUnARG4BA9FswERqRMOIA2wBlASZRFXN/VSBtbW3bPDARECShERAEANsEOo8IMNs8bBfbPH/gIIIQVpXpPrrjAiCCENXev9y6AGcAaACPAJ0A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ERYRKhEWBBEVBBEUESoRFAQREwQREBESERAREREqEREGERAGEC4QzRBMEGtJoBBYEEdeMRNWJFkPERAPEO8AeAGAyBEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAEL0QvAB5AfSCEEdZar4BER/LHwERHQHLPwERGwHLPwERGQHLBwERFwHLPwERFSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEREwHLDwEREQHKAB/Kf1AN+gIbyn9QCfoCB8jLfxbLfxTKf1j6AgH6Asp/yn9Y+gLIUAP6AgB6AFxQA/oCUAP6AlAD+gJQA/oCUAP6AhPKABPLfxPKf8hQBPoCFMp/yVjMyQHMyQHMAnggbvLQgG8lJMIAkyPCAJFw4pIzM+MNIMIAkyLCAJFw4p9fAwMROAMCETYCVzFXMVvjDVYzUA+AQPRbMA4AfACBAfhXOlYqgA1WOvgjETUROBE1ETQRNxE0ETMRNhEzETIROBEyETERNxExETARNhEwES8ROBEvES4RNxEuES0RNhEtESwROBEsESsRNxErESoRNhEqESkROBEpESgRNxEoEScRNhEnESYROBEmESURNxElESQRNhEkESMROBEjAH0B/BEiETcRIhEhETYRIREgETgRIBEfETcRHxEeETYRHhEdETgRHREcETcRHBEbETYRGxEaETgRGhEZETcRGREYETYRGBEXETgRFxEWETcRFhEVETYRFREUETgRFBETETcRExESETYREhERETgREREQETcREA8RNg8OETgODRE3DQB+Av4METYMCxE4CwoRNwoJETYJCBE4CAcRNwcGETYGBRE4BVY+BRA0VkEEVjsEVj1QNAIROwIBEToBVkEB2zwwETIROBEyETARMxEwES8RMhEvES4RMREuES0RMBEtESwRLxEsESsRLhErESoRLREqESkRLBEpESgRKxEoEScRKhEnAIQAfwH8ESYRKREmESURKBElESQRJxEkESMRJhEjESIRJREiESERJBEhESARIxEgER8RIhEfER4RIREeER0RIBEdERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESAIAAOhERERQREREQERMREA8REg8OEREODREQDRDPVSsSAfoROFYpoIAOVjj4IxE2EToRNhE1ETkRNRE0ETgRNBEzETcRMxEyETYRMhExETURMREwETQRMBEvETMRLxEuETIRLhEtETERLREsETARLBErES8RKxEqES4RKhEpES0RKREoESwRKBEnESsRJxEmESoRJhElESkRJREkESgRJACCAfgRIxEnESMRIhEmESIRIRElESERIBEkESARHxEjER8RHhEiER4RHREhER0RHBEgERwRGxEfERsRGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPAIMC+g4REg4NERENDBEQDBC/EK4QnRCMEHsQagkRPAkQKAcRPgcGET4GRUADETsD2zwwAxE0AwIRMgIDETADAhEvAgERLgERLQMRLAMCESsCAREqAREpAxEoAwIRJwIBESYBESUDESQDAhEjAgERIgERIQMRIAMCER8CAREeAREdAIQAiAPOKMAKkX+TKMAL4pIls44QKMAMkSWZKMANkSWSJbPi4uJWHKSAQPgjVGywVG3AVGzAVGygUtBwWXDIVbDbPMkCESECVh8BIG6VMFn0WzCUQTP0F+IQiRA0Vh0EUDMMEDVEAMhVsNs8yQCFAIYAhwB8ULzLBxnLD1AHINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFcoAUAP6AgH6Ast/ygDLDwH6AssfygAAjoIQrY4x71ANyx8bywcZyw9QByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhXKAFAD+gIB+gLLf8oAAfoCyz/LP8sfADjIgljAAAAAAAAAAAAAAAABActnzMlw+wARFBESAGQDERwDAhEbAgERGgERGQMRGAMCERcCAREWAREVAxEUAwIREwIBERIBEREDERADT+1VgwH+MBE6ET0ROhE5ETwRORE4ETsROBE3ET0RNxE2ETwRNhE1ETsRNRE0ET0RNBEzETwRMxEyETsRMhExET0RMREwETwRMBEvETsRLxEuET0RLhEtETwRLREsETsRLBErET0RKxEqETwRKhEpETsRKREoET0RKBEnETwRJxEmETsRJgCKAf4RJRE9ESURJBE8ESQRIxE7ESMRIhE9ESIRIRE8ESERIBE7ESARHxE9ER8RHhE8ER4BER0BERwRPREcERsRPBEbAREaAREZET0RGREYETwRGAERFwERFhE9ERYRFRE8ERUBERQBERMRPRETERIRPBESARERAREQET0REA8RPA8eAIsC/g0RPQ0METwMGwoRPQoZVjwJEGcBET4B2zwEETQEAxEyAwQRMQQRMAMRLwMCES4CAREtAQQRLAQRKwMRKgMCESkCAREoAQQRJwQRJgMRJQMCESQCAREjAQQRIgQRIQMRIAMCER8CAREeAQQRHQQRHAMRGwMCERoCAREZAQQRGAQAnwCMAFoRFwMRFgMCERUCAREUAQQREwQREgMREQMCERACHxBODRA8S6AQSQgQN0YTQAUB/BEqETIRKhEpETERKREoETARKBEnES8RJxEmES4RJhElES0RJREkESwRJBEjESsRIxEiESoRIhEhESkRIREgESgRIBEfEScRHxEeESYRHhEdESURHREcESQRHBEbESMRGxEaESIRGhEZESERGREYESARGBEXER8RFxEWER4RFgCOAbwRFREdERURFBEcERQRExEbERMREhEaERIREREZEREREBEYERAPERcPERARFhEQDREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEEwQO0qQECgQZxA2FRRDMNs8AL4DfjDbPGwYMvhBbyQwgUtpM1YuvhLy9IIAoPeBAQtWIUATWfQKb6Ex8vRWGKQRGRBHBgVDE9s8+EIBo1YmWds8fwCQAJEAvgB60x8BghBWlek+uvLggdMP+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANM/03/SH9J/0n9VcALeVh6AECZZ9A9voZIwbd8gbpIwbY6H0Ns8bBdvB+KBbJYhbrPy9CBu8tCAbyc0NYIAj25QBPL0VhmAECpZ9A9voZIwbd8gbpIwbZfQ9AQBMW8B4iBus5cgbvLQgG8hkjBt4iCBAQssWfQLb6GSMG3fAQ4AkgTgIG6SMG2PEtDbPAbUAdDbPDYQbFUEbBxvDOIgbrOXIG7y0IBvLJ0wcFRwAFMAcFRwAFMA4lYUllR7qVR7qZZUdUNUdUPigRR2JMIA8vRTQ1YsgBBWH1n0D2+hkjBt3yBukjBtjofQ2zxsFm8G4iBuswD8APwA/gCTAf6YIG7y0IBvJluYMHBU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MG2Oh9DbPGwYbwjigStwIW6z8vQgbvLQgG8oCuMPfwDzALkAugF+XwcyIBETgED0WzAREgHIWYIQS8NB1VADyx/LP8s/yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7APhCViYBcNs8AL4E/jeBesH4I1AKvhny9CRus440BHEhbpJbcJG64pgRHBKAQPRbMI4bUiARG4BA9FswERkSgED0WzARGREbERkRGBEZ4hEbWZIzM+JwI26zkyLCAJFw4o6WMAIgbvLQgCFzf1UgbW1t2zwwUe6hDpJsIuJwJW6zkyPCAJFw4uMPUiAA2wC7ALwAvQEsMAQgbvLQgH8jchAjbW1t2zwwUcGhDADbAAQzNAF8ERWAQPRbMBEUEshZghDbReQ4UAPLH8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EIBo1ihViZZ2zwAvgG++EFvJDAy+CdvEFYQoS6hL6EjoCKhcAG2CSBWJbYIViUBoYEBC1YfQBRZ9ApvoTGzkjBwl3ABViWhtgniWaFQBKFQA6AiwgCScDPfWKEgwgCOinJ/VSBtbW3bPDCRW+IA2wT+jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEIJHD9i6jqIw0x8BghCCRw/YuvLggdQB0AHSAAGT1AHQkW3iEmwS2zx/4CCCED+PcNa6jpUw0x8BghA/j3DWuvLggdMfATHbPH/gIIIQ37wjfgDaAMAAxgDMAfARMBEyETARLxExES8RLhEyES4RLRExES0RLBEyESwRKxExESsRKhEyESoRKRExESkRKBEyESgRJxExEScRJhEyESYRJRExESURJBEyESQRIxExESMRIhEyESIRIRExESERIBEyESARHxExER8RHhEyER4RHRExER0AwQH8ERwRMhEcERsRMREbERoRMhEaERkRMREZERgRMhEYERcRMREXERYRMhEWERURMREVERQRMhEUERMRMRETERIRMhESERERMRERERARMhEQDxExDw4RMg4NETENDBEyDAsRMQsKETIKCRExCQgRMggHETEHBhEyBgURMQUEETIEAMID9gMRMQMCETICARExAREy2zz4I4ID9ICgAhEyAgERMwFWMqRagCAEyFUgyFADzxbJUAPMIm6znH8BygDIUAPPFslYzJUycFjKAOLLH8kDETMDAREyASBulTBZ9FswlEEz9BfiiBEvETERLxEuETARLhEtES8RLREsES4RLADWAMMAxAAqAAAAAHVwZ3JhZGUgcmVxdWVzdGVkAfwRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcAxQGiERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOEL0QrBCbEIoQeRBoEFcQRhA1ECT4QgF/bds8ANoB8BEwETERMBEvETERLxEuETERLhEtETERLREsETERLBErETERKxEqETERKhEpETERKREoETERKBEnETERJxEmETERJhElETERJREkETERJBEjETERIxEiETERIhEhETERIREgETERIBEfETERHxEeETERHhEdETERHQDHAvARHBExERwRGxExERsRGhExERoRGRExERkRGBExERgRFxExERcRFhExERYRFRExERURFBExERQRExExERMREhExERIRERExEREREBExERAPETEPDhExDg0RMQ0METEMCxExCwoRMQoJETEJETEIBwZVQNs8IIAgVjMA1gDIAvxZ9A9voZIwbd8gbpIwbY4Y0NQB0AHSAAGT1AHQkW3iAdMfVSBsE28D4oIAgMQhbrPy9CBu8tCAbyOBOzn4I1i+8vTIWM8WyfsEIG6znMgBIG7y0IDPFsntVJEw4gERMQGAIPRbMIgRMBExETARLxEwES8RLhEvES4RLREuES0AyQDKACgAAAAAdXBncmFkZSBleGVjdXRlZAH8ESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYAMsBqhEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVhBFEDQQI/hCAX9t2zwA2gP2uo6VMNMfAYIQ37wjfrry4IHTHwEx2zx/4MAAj1r5ASCC8GyPRPRf7bTN/tTejbFKpbE61V1DD3WdBmkhC3TEj+Pfuo6GMNs8f9sx4ILwvPr3dpB8cZzI03nY8ZSqqifoyihxzVkXgXIfIVpFRQG6joXbPH/bMeCRMOJwAM0A0gDVAfARMBExETARLxExES8RLhExES4RLRExES0RLBExESwRKxExESsRKhExESoRKRExESkRKBExESgRJxExEScRJhExESYRJRExESURJBExESQRIxExESMRIhExESIRIRExESERIBExESARHxExER8RHhExER4RHRExER0AzgP6ERwRMREcERsRMREbERoRMREaERkRMREZERgRMREYERcRMREXERYRMREWERURMREVERQRMREUERMRMRETERIRMRESERERMRERERARMREQDxExDw4RMQ4NETENDBExDAsRMQsKETEKCRExCRExCAcGVUDbPAERMQGAIPRbMIgA1gDPANAAKAAAAAB1cGdyYWRlIGNhbmNlbGVkAfwRMBExETARLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESsRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwA0QHaERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWEEUQNBAj+EIBf23bPADaBBjbPNs8Vy9wiAERMAEA1gDTANQA2QAQggDQMFYw8vQAFgAAAABSZXN1bWVkBBjbPNs8Vy9/iAERMAEA1gDXANgA2QAU+EJWMQHHBfLghAASggCdsFYws/L0ABYAAAAAU3RvcHBlZAEO+EIBf23bPADaATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDAA2wHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgA3ACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAH0ARExAREwINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WAREuAcoAAREsAcsfAREq+gIBESgByx8BESYByx8BESQByx8BESL6AgERIPoCAREe+gIBERz6AsgBERv6AgERGfoCAREX+gIBERX6AgERE/oCARER+gIA3gHgUA/6AlAN+gLIUAz6AlAKINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQBiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshQBQDfAf4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFvQA9AAS9AASyz8CyPQAFPQAFMs/FPQAFMs/FMs/BMj0ABX0ABb0AFAG+gJQBvoCUAb6AhbKfxbKf1AG+gJQBvoCAOAAeshQByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhfL/xjLHxb0AMlQA8zJAczJAczJWMzJAczJAcwCASAA4gDtAgEgAOMA5QInuhe9s82zxXEF8PVxBfD1cQXw8xgBEgDkAARWLwIBIADmAOsCAWIA5wDpAtCq4ds82zxXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxFsHwESAOgAQFYuVipWKlYqVipWKlYqVipWKlYqVihWK1YrVihWKlY8AiapHds82zxXEF8PVxBfD1cQXw8xARIA6gAEVjACJbWmm2ebZ42RDZENkQ2RDZENkxABEgDsABJWHVR6m1R7qSsCASAA7gD/AgFIAO8A+AIBIADwAPQC+a0K7Z4ImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJWIlQiViJUIlIiVCJSIlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJEIkIiRCJCIkAiQiJAIj4iQCI+IjwiPiI8IjoiPCI7AARIA8QHIERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXElcQXw9XElcQXw9s8gDyAUCAQFYSAln0D2+hkjBt3yBukjBtjofQ2zxsGG8I4lYQAQDzAOTSAAGS0weSbQHi0z/TPyDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gH6ACDXCwHDAI4f+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJRy1yFt4gH6ANMfVXAC+a54bZ4ImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJWIlQiViJUIlIiVCJSIlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJEIkIiRCJCIkAiQiJAIj4iQCI+IjwiPiI8IjoiPCI7AARIA9QHIERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXElcQXw9XElcQXw9s8gD2AUCAQFYXAln0D2+hkjBt3yBukjBtjofQ2zxsFm8G4lYVAQD3AFjSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6ANMf0gBVUAL5sqIIG6SMG2OHCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRMBEyETARLxExES8RLhEwES4RLREvES0RLBEuESwRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESOABEgD5AfwRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRwA+gEU2zxs82zzbPNsQwD7A+BtIW6zj1pWEIAQJFn0D2+hkjBt3yBukjBtl9D0BAExbwHiIG6zjzUxIG7y0IBvIYEBCwIgbvLQgBJZ9AtvoZIwbd8gbpIwbY8S0Ns8BtQB0Ns8NhBsVQRsHG8M4pIwMeKRMeIugBAjWfQPb6GSMG3fAPwA/AD9ABzTP/oA+gDTf9J/0n9VUAFkIG6SMG2d0PoA0gDTf1UgbBNvA+KAEFRPFFn0D2+hkjBt3yBukjBtjofQ2zxsFm8G4hIA/gAc+gD6APoA+gD6APoAVVACASABAAEJAgEgAQEBAgARsK+7UTQ0gABgAgEgAQMBBgL5r4ttngiYCJiImAiXiJgIl4iXCJeIlwiWiJcIloiWCJaIlgiViJYIlYiVCJWIlQiUiJUIlIiUCJSIlAiTiJQIk4iTCJOIkwiSiJMIkoiSCJKIkgiRiJIIkYiRCJGIkQiQiJEIkIiQCJCIkAiPiJAIj4iPCI+IjwiOiI8IjsABEgEEAcYRHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PVxBfDzEBBQCMIYAgIln0Dm+hMY42gCAiAln0D2+hkjBt3yBukjBtjhjQ1AHQAdIAAZPUAdCRbeIB0x9VIGwTbwPiIG7y0IBvI2whkjBt4gL1rU4Qa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4ImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJWIlQiViJUIlIiVCJSIlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJFAARIBBwH4ESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxsxGzEbMRs1AEIAFJWGIEBCyJxQTP0Cm+hlAHXADCSW23ibrMhVhzHBSJWHMcFA1YexwVBMAIBIAEKARECAWoBCwEPAvekObZ4ImAiYiJgIl4iYCJeIlwiXiJcIloiXCJaIlgiWiJYIlYiWCJWIlQiViJUIlIiVCJSIlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJEIkIiRCJCIkAiQiJAIj4iQCI+IjwiPiI8IjoiPCI7ARIBDAHyERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD1cQXw8xIG6SMG2ZIG7y0IBvJ28H4iBukjBt3gENATqAEFYYAln0D2+hkjBt3yBukjBtjofQ2zxsF28H4gEOACTUAdAB0gDTD/oA0x/TH9MfVWACJaa/tnm2eK4gvh6uIL4eriC+HmMBEgEQAAIhAvmye7bPBEwETERMBEvETARLxEuES8RLhEtES4RLREsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHYAESARwCQu1E0NQB+GPSAAHjAvgo1wsKgwm68uCJgQEB1wABAdHbPAETARkC+Ns8VzERLxEwES8RLhEvES4RLREuES0RLBEtESwRKxEsESsRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwBFAEYAdj6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0x/6ANMf0x/TH/oA+gD6APoA1AHQ+gD6APoA+gD6APoA+gD6ANQw0PoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEBFQHG+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBARYB/PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9AT0BPQE0z/UMND0BPQE0z/0BNM/0z/UMND0BPQE9AT6APoA+gDSf9J/+gD6ANQw0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//TH/QEMBEmETERJgEXAHgRJhEwESYRJhEvESYRJhEuESYRJhEtESYRJhEsESYRJhErESYRJhEqESYRJhEpESYRJhEoESYRJhEnESYAnBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDgTsMHCBALRwVHAAVHAAVHAAVHAAVHAAII0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABImJiW1tbXFtbSJtUxFtbW1WElRwAFRwAAEbARsBGwEaAZSJUxtt+EIRMBEvES4RLREsESsRKhEpESgRJxEmESURJBEjESIRIREgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4AEbAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAbwRHBEdERwRGxEcERsRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPGzzbPNs82xDAR0BkFYUgEAiWfQPb6GSMG3fIG6SMG2Oh9DbPGwcbwzigEBWFUATWfQPb6GSMG3fIG6SMG2OEdD6ANN/+gDTf/oAVUBsFW8F4lYTWQEeAHDTB9MP+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAPoA+gDTf9IA0w/6ANMf0gBVsHQjINE=');
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
    {"name":"AccountInfo","header":null,"fields":[{"name":"isExecutor","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isCompensator","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isClaimer","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isManager","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"ConfigData","header":null,"fields":[{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"mintJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"burnJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"transferJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executePerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executeLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minStorageReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TokenConfig","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"enable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"maxLeverage","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"liquidationFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"maintenanceRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"tradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lpTradingFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PoolStat","header":null,"fields":[{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderAmountReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"feeReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
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
    {"name":"Pool$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"stopped","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRolloverFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"liquidatedPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"normalPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"mintJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"burnJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"transferJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executePerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executeLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minStorageReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}},{"name":"executors","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"tokenConfigs","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"TokenConfig","valueFormat":"ref"}},{"name":"liquidityOrders","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"LiquidityOrder","valueFormat":"ref"}},{"name":"liquidityOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpOrders","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"PerpOrder","valueFormat":"ref"}},{"name":"perpOrderExs","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"PerpOrderEx","valueFormat":"ref"}},{"name":"perpOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"compensates","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"Compensate","valueFormat":"ref"}},{"name":"compensateIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"positionIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"positions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"AccountPerpPosition","valueFormat":"ref"}},{"name":"globalLPPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"GlobalLPPosition","valueFormat":"ref"}},{"name":"globalPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"GlobalPosition","valueFormat":"ref"}},{"name":"feeReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderAmountReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"multisig","type":{"kind":"simple","type":"address","optional":false}},{"name":"publicKey","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"upgradeSeqno","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"upgradeRequests","type":{"kind":"dict","key":"uint","keyFormat":32,"value":"UpgradeRequest","valueFormat":"ref"}}]},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonUpdateContent | SetManager | UpdateBaseConfig | UpdatePoolConfig | ListToken | DelistToken | WithdrawFee | null | JettonTransferNotification | CreateAddLiquidityOrder | CancelLiquidityOrder | ExecuteLiquidityOrder | CreateIncreasePerpOrder | CreateDecreasePerpOrder | CreateTpSlPerpOrder | CancelPerpOrder | ExecutePerpOrder | LiquidatePerpPosition | ADLPerpPosition | CreateCompensate | ExecuteOrCancelCompensate | Deploy | 'Resume' | 'Stop' | RequestUpgrade | ExecuteUpgrade | CancelUpgrade) {
        
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