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

export type UpdateContract = {
    $$type: 'UpdateContract';
    code: Slice;
    data: Slice | null;
}

export function storeUpdateContract(src: UpdateContract) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(783354075, 32);
        b_0.storeRef(src.code.asCell());
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data.asCell()); } else { b_0.storeBit(false); }
    };
}

export function loadUpdateContract(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 783354075) { throw Error('Invalid prefix'); }
    let _code = sc_0.loadRef().asSlice();
    let _data = sc_0.loadBit() ? sc_0.loadRef()?.asSlice() ?? null : null;
    return { $$type: 'UpdateContract' as const, code: _code, data: _data };
}

function loadTupleUpdateContract(source: TupleReader) {
    let _code = source.readCell().asSlice();
    let _data = source.readCellOpt()?.asSlice() ?? null;
    return { $$type: 'UpdateContract' as const, code: _code, data: _data };
}

function loadGetterTupleUpdateContract(source: TupleReader) {
    let _code = source.readCell().asSlice();
    let _data = source.readCellOpt()?.asSlice() ?? null;
    return { $$type: 'UpdateContract' as const, code: _code, data: _data };
}

function storeTupleUpdateContract(source: UpdateContract) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.code.asCell());
    builder.writeSlice(source.data?.asCell());
    return builder.build();
}

function dictValueParserUpdateContract(): DictionaryValue<UpdateContract> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateContract(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateContract(src.loadRef().beginParse());
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
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpSupply: _tlpSupply, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, positionIndexNext: _positionIndexNext, positions: _positions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, feeReserve: _feeReserve, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig, publicKey: _publicKey };
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
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpSupply: _tlpSupply, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, positionIndexNext: _positionIndexNext, positions: _positions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, feeReserve: _feeReserve, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig, publicKey: _publicKey };
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
    return { $$type: 'Pool$Data' as const, owner: _owner, stopped: _stopped, orderLockTime: _orderLockTime, maxLpNetCap: _maxLpNetCap, lpRolloverFeeRate: _lpRolloverFeeRate, liquidatedPositionShareRate: _liquidatedPositionShareRate, normalPositionShareRate: _normalPositionShareRate, mintJettonGas: _mintJettonGas, burnJettonGas: _burnJettonGas, transferJettonGas: _transferJettonGas, createPerpOrderGas: _createPerpOrderGas, cancelPerpOrderGas: _cancelPerpOrderGas, executePerpOrderGas: _executePerpOrderGas, createLiquidityOrderGas: _createLiquidityOrderGas, cancelLiquidityOrderGas: _cancelLiquidityOrderGas, executeLiquidityOrderGas: _executeLiquidityOrderGas, lpMinExecutionFee: _lpMinExecutionFee, perpMinExecutionFee: _perpMinExecutionFee, minStorageReserve: _minStorageReserve, tlpSupply: _tlpSupply, tlpJetton: _tlpJetton, tlpWallet: _tlpWallet, manager: _manager, compensator: _compensator, claimer: _claimer, executors: _executors, tokenConfigs: _tokenConfigs, liquidityOrders: _liquidityOrders, liquidityOrderIndexNext: _liquidityOrderIndexNext, perpOrders: _perpOrders, perpOrderExs: _perpOrderExs, perpOrderIndexNext: _perpOrderIndexNext, compensates: _compensates, compensateIndexNext: _compensateIndexNext, positionIndexNext: _positionIndexNext, positions: _positions, globalLPPositions: _globalLPPositions, globalPositions: _globalPositions, feeReserve: _feeReserve, orderAmountReserve: _orderAmountReserve, executionFeeReserve: _executionFeeReserve, globalLPFund: _globalLPFund, globalLPUnrealizedPnl: _globalLPUnrealizedPnl, globalLpFundingFeeGrowth: _globalLpFundingFeeGrowth, globalRolloverFeeGrowth: _globalRolloverFeeGrowth, multisig: _multisig, publicKey: _publicKey };
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
    const __code = Cell.fromBase64('te6ccgICAQUAAQAAVd8AAAEU/wD0pBP0vPLICwABAgFiAAIAAwLw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkAPgACAIBIAAEAAUCASAA1ADVAgEgAAYABwIBSADeAN8CASAA7QDuAfgRIxElESMRIhEkESIRIREjESERIBEiESARHxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPAAkCug4REA4Q31Uc2zzy4ILI+EMBzH8BygARLxEuES0RLBErESoRKREoEScRJhElESQRIxEiESERIBEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeDbPMntVAAKAAsEou2i7fsBkjB/4HAh10nCH5UwINcLH94gghBbjycduo6UMNMfAYIQW48nHbry4IHUATHbPH/gIIIQyMA8iLrjAiCCENBecrO64wIgghCmL4VsugAMAA0ADgAPAfYBES8BES4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBESwBygABESoByx8BESj6AgERJgHLHwERJAHLHwERIgHLHwERIPoCAREe+gIBERz6AgERGvoCyAERGfoCAREX+gIBERX6AgERE/oCARER+gJQD/oCUA0AJQHwES4RLxEuES0RLxEtESwRLxEsESsRLxErESoRLxEqESkRLxEpESgRLxEoEScRLxEnESYRLxEmESURLxElESQRLxEkESMRLxEjESIRLxEiESERLxEhESARLxEgER8RLxEfER4RLxEeER0RLxEdERwRLxEcERsRLxEbABAB4jDTHwGCEMjAPIi68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTABMDdjDTHwGCENBecrO68uCB1AHQ0gABjoTbPG8MkW3iAdIAAZX0BAFvAZFt4gHUMNDSAAGSMG3jDWwT2zx/ABQAFQAWBKCPOzDTHwGCEKYvhWy68uCB0x/6ANMf0x/TH1VAbBVXLVctVy1XLVctggCg9/hCVhrHBfL0iPhCAX9t2zx/4CCCEOSbO/C64wIgghCbQuTvugAfANEAIAAhAvgRGhEvERoRGREvERkRGBEvERgRFxEvERcRFhEvERYRFREvERURFBEvERQRExEvERMREhEvERIREREvEREREBEvERAPES8PDhEvDg0RLw0MES8MCxEvCwoRLwoJES8JES8IBwZVQNs8ES/IAYIQW48nHVjLH8zJES4RLxEuAM0AEQH8ES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbf21WHBEeERwRHREcABIBzBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA8Q7xDeEM0QvBCrEJoQiRB4EGcQVgQFVSDbPADRACZXGVcZVxmCAKD3+EJSMMcF8vR/AFj6APoA+gD6APoA+gD6APoA1AHQ+gD6APoA+gAwEEwQSxBKEEkQSBBHEEYQRQDK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTbwMB8BEuETERLhEtETARLREsES8RLBErETERKxEqETARKhEpES8RKREoETERKBEnETARJxEmES8RJhElETERJREkETARJBEjES8RIxEiETERIhEhETARIREgES8RIBEfETERHxEeETARHhEdES8RHREcETERHBEbETARGwAXAfwRGhEvERoRGRExERkRGBEwERgRFxEvERcRFhExERYRFREwERURFBEvERQRExExERMREhEwERIREREvEREREBExERAPETAPDhEvDg0RMQ0METAMCxEvCwoRMQoJETAJCBEv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CiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOLJVicBVjUBfwNwQwNtbds8MFFEoREoJQDSAEUCbshVwNs8yciCWMAAAAAAAAAAAAAAAAEBy2fMyXD7ABEYo1AEoVAMoQERHgEGERYGGBtGcEVQ2zwARgDDAMiCEIm3HQlQB8sfUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AIW6zlX8BygDMlHAyygDiAfoCAc8WATKhU2Rzf1UgbW1t2zwwERQkoSQBERUBEFZZANIApIIQJBhc31AOyx8cyz8ayz8YywdQBiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAE+gJY+gLLfwH6AgHIyn9Y+gJY+gJY+gJY+gLJAcwAbtMfAYIQkD+flrry4IHTP9MP0gDSAPoA+gDTf9Mf+gD6APoA+gDUAdD6ADAdHBsaGRgXFhUUQzAB8BEuETsRLhEtEToRLREsETkRLBErETgRKxEqETcRKhEpETYRKREoETURKBEnETQRJxEmETMRJhElETIRJREkETERJBEjETARIxEiES8RIhEhETsRIREgEToRIBEfETkRHxEeETgRHhEdETcRHREcETYRHBEbETURGwBLAhAw2zxsGNs8fwBSAFMEbI8IMNs8bBnbPH/gIIIQfWqrWbqOmDDTHwGCEH1qq1m68uCB0z/TP1lsEts8f+AgghAE9eAbugBaAFsAXABdAfwRGhE0ERoRGREzERkRGBEyERgRFxExERcRFhEwERYRFREvERURFBE7ERQRExE6ERMREhE5ERIRERE4EREREBE3ERAPETYPDhE1Dg0RNA0METMMCxEyCwoRMQoJETAJCBEvCAcROwcGEToGBRE5BQQROAQDETcDAhE2AgERNQEATAL2ETTbPPhBbyQwMoIA7XFWO1YhvvL0VjpWOsIAlFY5wgCRcOKTVjug3lY4wgCUVjfCAJFw4pNWO6DeggDO/VYoIqBWNKAUvhPy9BEykXqSgAviETARNREwES8RNBEvES4RMxEuES0RMhEtESwRMREsESsRMBErESoRLxEqAM4ATQH8ESkRLhEpESgRLREoEScRLBEnESYRKxEmESURKhElESQRKREkESMRKBEjESIRJxEiESERJhEhESARJREgER8RJBEfER4RIxEeER0RIhEdERwRIREcERsRIBEbERoRHxEaERkRHhEZERgRHREYERcRHBEXERYRGxEWERURGhEVAE4D/hEUERkRFBETERgRExESERcREhERERYREREQERUREA8RFA8OERMODRESDQwREQwLERALEK8QnhCNEHwQaxBaEEkQOBAnEDZRUFFQEEUDAhE/AgERPgFWPAERPts8VjVWNbyOEzAEETMEAxEyAwIRMQJXL1cvXwPjDQJWMKABVi8AkABPAFAAogMRMwMCETICARExAREwgEARNchVQFBU+gISy38B+gISy38B+gLJED4CETECAREtASBulTBZ9FswlEEz9BfiESoRLREqESoRLBEqESoRKxEqCwH8oAERLwERMKARKBEwESgRJxEvEScRJhEuESYRJREtESURJBEsESQRIxErESMRIhEqESIRIREpESERIBEoESARHxEnER9WHhEnER4RJhEeER0RJREdERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYERcRHxEXERYRHhEWAFEBvBEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEEwQOwoQiRAoEGcQVhBFA0RE2zwAwwA+0x8BghDLu9IkuvLggdM/0w/SAPoA+gDTf9Mf+gBVcAHwES4RNhEuES0RNREtESwRNBEsESsRMxErESoRMhEqESkRMREpESgRMBEoEScRLxEnESYRNhEmESURNRElESQRNBEkESMRMxEjESIRMhEiESERMREhESARMBEgER8RLxEfER4RNhEeER0RNREdERwRNBEcERsRMxEbAFQB/BEaETIRGhEZETERGREYETARGBEXES8RFxEWETYRFhEVETURFREUETQRFBETETMRExESETIREhERETEREREQETAREA8RLw8OETYODRE1DQwRNAwLETMLChEyCgkRMQkIETAIBxEvBwYRNgYFETUFBBE0BAMRMwMCETICARExAQBVAvoRMNs8+EFvJDAyggCIf1YzViG+8vSCAL2QVidWNKATvhLy9BEvETURLxEuETQRLhEtETMRLREsETIRLBErETERKxEqETARKhEpES8RKREoES4RKBEnES0RJxEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIQDOAFYB/BEgESYRIBEfESURHxEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGhEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQCgBXAvQQnxCOEH0QbBBbEEoQOUhwgAxUQXYFETkFBBE4BFoBETkBVjkBETnbPDAGVjCgES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmESURJxElViQRJxEkESYRJBEjESURIwCQAFgB/BEiESQRIhEhESMRIREgESIRIBEfESERHxEeESARHhEdER8RHREcER4RHBEbER0RGxEaERwRGhEZERsRGREYERoRGBEXERkRFxEWERgRFhEVERcRFREUERYRFBETERURExESERQREhERERMREREQERIREA8REQ8OERAOEN8QzgBZASoQvRCsEJsQihkQaBBXEEYQNUFA2zwAwwBC0x8BghD5T4C7uvLggfoA0w/SAPoA03/6ANN/0z/TH1WAAfARLhE3ES4RLRE2ES0RLBE1ESwRKxE0ESsRKhEzESoRKREyESkRKBExESgRJxEwEScRJhEvESYRJRE3ESURJBE2ESQRIxE1ESMRIhE0ESIRIREzESERIBEyESARHxExER8RHhEwER4RHREvER0RHBE3ERwRGxE2ERsAXgP0+EFvJDAyVhWAQCVZ9A9voZIwbd8gbpIwbY6H0Ns8bBxvDOKBf30hbrPy9CBu8tCAbyxsMzM0NYFebQGz8vSBS2lWLVYwoBi+F/L0Vh2BAQsmWfQKb6ExggCg9yGRf5RTNscF4vL0s5ojwAqRf5MjwAzikXDikTDjDXABBABnAGgEOo8IMNs8bBfbPH/gIIIQVpXpPrrjAiCCENXev9y6AGsAbABtAG4B/BEaETURGhEZETQRGREYETMRGBEXETIRFxEWETERFhEVETARFREUES8RFBETETcRExESETYREhERETUREREQETQREA8RMw8OETIODRExDQwRMAwLES8LChE3CgkRNgkIETUIBxE0BwYRMwYFETIFBBExBAMRMAMCES8CARE3AQBfA/oRNts8+EFvJDAycFY1wgCUVjTCAJFw4pIwcd5WM8IAlFYywgCRcOKRpN6BX/JWOVYivvL0gUtpVihWOqAiqBS+E/L0VjTCAJRWM8IAkXDijqKADXBWO0MUIlY6A1Y6UCMBEToBETlWPVY/2zwwETERMhExlFczVzPiVjDCAADOAJAAYAL4lFYvwgCRcOKOFgURNwUEETYEAxE0AwIRMwJXL1cvXwTjDVYvVi2ooFYeVi2oAREwAREtqBEoETERKBEnETARJxEmES8RJhElES4RJREkES0RJBEjESwRIxEiESsRIhEhESoRIREgESkRIBEfESgRHxEeEScRHhEdESYRHQBhAGIB/BEuETQRLhEtETMRLREsETIRLBErETERKxEqETARKhEpES8RKREoES4RKBEnES0RJxEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIREgESYRIBEfESURHxEeESQRHhEdESMRHREcESIRHBEbESERGxEaESARGgBjAfwRHBElERwRGxEkERsRGhEjERoRGREiERkRGBEhERgRFxEgERcRFhEfERYRFREeERURFBEdERQRExEcERMREhEbERIREREaEREREBEZERAPERgPDhEXDg0RFg0MERUMCxEUCwoREwoJERIJCBERCAcREAcQbxBeEE0QPEugECkAZgL+ERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKEJ8QjhB9EGxVVQURNwWADgVwI0UWQzQBEToBVjgBETrbPDAFETEFBBEwBACQAGQB/AMRLgMCES0CBREsBQQRKwQBESoBESkDESgDAhEnAgURJgUEESUEAREkAREjAxEiAwIRIQIFESAFBBEfBAERHgERHQMRHAMCERsCBREaBQQRGQQBERgBERcDERYDAhEVAgURFAUEERMEARESARERAxEQAxAvEF4QTVDLEDoQKQBlABQQWBBHUGUQNEAzARYQSBA3RWBEQBPbPADDABiBF+YBVjWg+CO78vQD3FMDwAqRf5MkwAvikjI14w1SYBEZgED0WzAhwgCOlFMxcn9VIG1tbds8MFFBoFDdoQwDkTHiQVTIVSCCEPLFrqxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wCjAREUoVYlWds8AGkA0gDDAvwwVhiAQClZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiIG6zjssgbvLQgG8lJQXCAJMDwgCSM3DilDNUQRPeAcIAksIAkjBw4pGgkTDiIMIAjpAxXHJ/VSBtbW3bPDBR7qEOkTDiUnARGYBA9FswERiRMOJRFXMA0gBqARx/VSBtbW3bPDBR5KEOBADSADrTHwGCEAT14Bu68uCB0z/TP9MP03/SH9J/0n9VYAP2MjP4QW8kMDKBS2lWKlYuoBO+EvL0ggCg94EBC1YdQBNZ9ApvoTHy9FYWgEAmWfQPb6GSMG3fIG6SMG2Oh9DbPGwcbwzigX99IW6z8vQgbvLQgG8sgV5tAbPy9H+AQCxRPFE8UTxRPFE8UTxRPEwTK1nIVbDbPMkCESECAQQAkgBvA34w2zxsGDL4QW8kMIFLaTNWLL4S8vSCAKD3gQELVh9AE1n0Cm+hMfL0VhakERcQRwYFQxPbPPhCAaNWJFnbPH8AlQCWAMMEto/QMNs8bBoy+EFvJDCBS2kzVi6+EvL0ggCg94EBC1YhQBNxQTP0Cm+hlAHXADCSW23ibrPy9FYYpBEZEEkIdAgFBlBzREDbPPhCAaNWJFnbPH/gIIIQ/DOHfboAogCjAMMApAT8AREhAVLwIG6VMFn0WzCUQTP0F+IowAqRf5MowAzis50Bk1KSvpNSkrvi8uZskmwh4nBTB8AKkX+TKMAL4uMPARErAQ2AQPRbMFYswgCOk/hCVi1yf1UgbW1t2zwwAVYsoQHeVh0BETGg+EIRLaMBES+hESkRMREpESgRMBEoAHAAcQDSAHIB/BE0ETwRNBEzETsRMxEyEToRMhExETkRMREwETgRMBEvETcRLxEuETYRLhEtETURLREsETwRLBErETsRKxEqEToRKhEpETkRKREoETgRKBEnETcRJxEmETYRJhElETURJREkETwRJBEjETsRIxEiEToRIhEhETkRIREgETgRIAB3Af4wETgROxE4ETcROhE3ETYRORE2ETUROxE1ETQROhE0ETMROREzETIROxEyETEROhExETAROREwES8ROxEvES4ROhEuES0ROREtESwROxEsESsROhErESoROREqESkROxEpESgROhEoEScROREnESYROxEmESUROhElESQROREkAHMB/BEnES8RJxEmES4RJhElES0RJREkESwRJBEjESsRIxEiESoRIhEhESkRIREgESgRIBEfEScRHxEeESYRHhEdESURHREcESQRHBEbESMRGxEaESIRGhEZESERGREYESARGBEXER8RFxEWER4RFhEVER0RFREUERwRFBETERsREwB2AfwRIxE7ESMRIhE6ESIRIRE5ESERIBE7ESARHxE6ER8RHhE5ER4RHRE7ER0RHBE6ERwBERsBERoROxEaERkROhEZAREYAREXETsRFxEWEToRFgERFQERFBE7ERQRExE6ERMBERIBEREROxERERAROhEQHw4ROw4NEToNHAsROwsAdAL+ChE6CgkROwlUQRkQZwIRPAIBETsB2zwEETIEAxEwAxEvAhEuAgMRLQMBESwBBBErBBEqAhEpAgMRKAMBEScBBBEmBBElAhEkAgMRIwMBESIBBBEhBBEgAhEfAgMRHgMBER0BBBEcBBEbAhEaAgMRGQMBERgBBBEXBBEWAhEVAgCjAHUASgMRFAMBERMBBBESBBERAhEQAhA/HhBNSxwQOhkQSEYXEDVABAMBlBESERoREhERERkREREQERgREA8RFw8OERYODREVDREQERQREAsREwsKERIKCRERCQgREAgQfxBuEF0QTBA7SpAQKBBHFhBFEts8AMMB/BEfETcRHxEeETYRHhEdETURHREcETwRHBEbETsRGxEaEToRGhEZETkRGREYETgRGAIRFwIRFhE2ERYRFRE1ERURFBE8ERQRExE7ERMREhE6ERIRERE5EREREBE4ERAQLw4RNg4NETUNDBE8DAsROwsKEToKCRE5CQgROAgQJwB4AsYGETYGVjwGVjYGBRE6BVY4UVBRUwUQNAMRPQMCET8CARFAARE+2zxWEIBAVjFZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiIG6znjADETYDAhE0AlcwVzFb4w0AeQB6AtxWH4AQKFn0D2+hkjBt3yBukjBtjofQ2zxsF28H4oFsliFus/L0IG7y0IBvJzaCAI9uUAXy9FYbgBAtWfQPb6GSMG3fIG6SMG2X0PQEATFvAeIgbrOXIG7y0IBvIZIwbeIggQELL1n0C2+hkjBt3wD3AHsCeCBu8tCAbyUkwgCTI8IAkXDikjMz4w0gwgCTIsIAkXDin18DAxE2AwIRNAJXMFcxW+MNVitQDYBA9FswDACIAIkE5CBukjBtjxLQ2zwG1AHQ2zw2EGxVBGwcbwziIG6zlyBu8tCAbyydMHBUcABTAHBUcABTAOJWF5ZUe6lUe6mWVHVDVHVD4iPAAJc1Vi6kES8F3lYsgBBWIFn0D2+hkjBt3yBukjBtjofQ2zxsFm8G4iBuswDqAOoA7AB8AvyYIG7y0IBvJluYMHBUcABTAFviViGUAVYfoJRWH6AB4iBWH6iCMA3gtrOnZAAAqQQiViCogjAN4Lazp2QAAKkEVjOAEFYmWfQPb6GSMG3fIG6SMG2d0PoA0gDTf1UgbBNvA+IgbrOXIG7y0IBvI5QwcHAh4nBWJSTCAJFw4w0AfQB+AAhWKCS6Av6OQTEjVia2CFYojhNWJSOhUhCogjAN4Lazp2QAAKkEjhMiViahUhCogjAN4Lazp2QAAKkE4lEhoVBVoSDAAJJwM94E3iDCAI4UM1IyqCJWJaigXaCpBFqgViazQAORMOJwUwBWKMIAklck4w1WJVAOoS+ogjAN4Lazp2QAAKkEAH8AgACqbCFWJlYmqFYiqIIwZ2XHk/oQB52qGqkEIBEkqIIQO5rKAKkEIsIAnjEhVleoghA7msoAqQQB3lYjIaEioAEROAGgUyGhVjigARE1AaARNBE3AREjAQH4ViRQDaEvqIIwDeC2s6dkAACpBFYQESktoCKhIaEBEREBoCARKaFS/6hWJ1YnqKAvViigqQQPViegViVWJVYrjhRWKFYSoVIwqIIwDeC2s6dkAACpBI4UVhFWKaFSMKiCMA3gtrOnZAAAqQTiI1YqqAERJgERI6ABESIBqACBAvqCMGdlx5P6EAedqhqpBAERIqBWKYFvuxEloLkBESMB8vRWJ4FDoBEiqFYiVhCogjAN4Lazp2QAAKkEvgERIQHy9FYnjhVXFlcWVxZXFlcWVxYpViFWHCpReqDjDhA6SYAGERwGBREbBQQREwQDERIDAhERAgEREAEPgQELDwCCAIMAolcQVxBXEFcQVxBXEClWIVYcKlFqoBEVERwRFREUERsRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQOAxETAwIREgIBEREBBhEQBwTyyFWwEGwQWxBKEDlIfNs8yFVQB9s8yQHMyQIREAIUVh0BIG6VMFn0WTCUQTP0E+KAEAHIAQH0AMkCESsCVhsBIG6VMFn0WzCUQTP0F+KAECNWESlWElYRVhHIVVDbPMkCESkCVhsBIG6VMFn0WzCUQTP0F+KAEFR7qQCuAK4AsACEAerIVSBa+gISygDLf8kCESoCVhsBIG6VMFn0WzCUQTP0F+IREhehERkRKBEZERgRKBEYERcRKBEXERYRKBEWBBEVBBEUESgRFAQREwQREBESERAREREoEREGERAGEC4QzRBMEGtJoBBYEEdeMRNWIlkPERAPEO8AhQGAyBEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAEJsQmgCGAfSCEEdZar4BER/LHwERHQHLPwERGwHLPwERGQHLBwERFwHLPwERFSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEREwHLDwEREQHKAB/Kf1AN+gIbyn9QCfoCB8jLfxbLfxTKf1j6AgH6Asp/yn9Y+gLIUAP6AgCHAFxQA/oCUAP6AlAD+gJQA/oCUAP6AhPKABPLfxPKf8hQBPoCFMp/yVjMyQHMyQHMAfhXOlYogA1WOfgjETMRNhEzETIRNREyETERNBExETARNhEwES8RNREvES4RNBEuES0RNhEtESwRNREsESsRNBErESoRNhEqESkRNREpESgRNBEoEScRNhEnESYRNREmESURNBElESQRNhEkESMRNREjESIRNBEiESERNhEhAIoB+hE4VieggA5WN/gjETQROBE0ETMRNxEzETIRNhEyETERNRExETARNBEwES8RMxEvES4RMhEuES0RMREtESwRMBEsESsRLxErESoRLhEqESkRLREpESgRLBEoEScRKxEnESYRKhEmESURKRElESQRKBEkESMRJxEjESIRJhEiAI4B/BEgETURIBEfETQRHxEeETYRHhEdETURHREcETQRHBEbETYRGxEaETURGhEZETQRGREYETYRGBEXETURFxEWETQRFhEVETYRFREUETURFBETETQRExESETYREhERETUREREQETQREA8RNg8OETUODRE0DQwRNgwLETULChE0CgCLAv4JETYJCBE1CAcRNAcGETYGBRE1BVY+BRA0VjkEVj4EVj1QNAIROAIBEToBVkEB2zwwES8ROBEvES4RMREuES0RMBEtESwRLxEsESsRLhErESoRLREqESkRLBEpESgRKxEoEScRKhEnESYRKREmESURKBElESQRJxEkESMRJhEjAJAAjAH8ESIRJREiESERJBEhESARIxEgER8RIhEfER4RIREeER0RIBEdERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANAI0AChDPVSsSAfwRIRElESERIBEkESARHxEjER8RHhEiER4RHREhER0RHBEgERwRGxEfERsRGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8AjwL+EK4QnRCMEHsQagkRPAkQKBBnBhE6BkVAAxE7A9s8MAMRMgMCETACAREuAQIRLQIRLAMRKwMBESoBAhEpAhEoAxEnAwERJgECESUCESQDESMDAREiAQIRIQIRIAMRHwMBER4BAhEdAhEcAxEbAwERGgECERkCERgDERcDAREWAQCQAJEDzijACpF/kyjAC+KSJbOOECjADJElmSjADZElkiWz4uLiVhqkgED4I1RssFRtwFRswFRsoFLQcFlwyFWw2zzJAhEfAlYdASBulTBZ9FswlEEz9BfiEIkQNFYbBFAzDBA1RADIVbDbPMkAkgCTAJQAQgIRFQIRFAMREwMBERIBAhERAhEQED9N7BA7SagQN0VkEgB8ULzLBxnLD1AHINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WFcoAUAP6AgH6Ast/ygDLDwH6AssfygAAjoIQrY4x71ANyx8bywcZyw9QByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhXKAFAD+gIB+gLLf8oAAfoCyz/LP8sfADjIgljAAAAAAAAAAAAAAAABActnzMlw+wAREhEQAHrTHwGCEFaV6T668uCB0w/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA0z/Tf9If0n/Sf1VwAt5WHIAQJln0D2+hkjBt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J+jKKHHNWReBch8hWkVFAbqOhds8f9sx4ADJAMoB/BEaETARGhEZES8RGREYETARGBEXES8RFxEWETARFhEVES8RFREUETARFBETES8RExESETAREhERES8REREQETAREA8RLw8OETAODREvDQwRMAwLES8LChEwCgkRLwkIETAIBxEvBwYRMAYFES8FBBEwBAMRLwMCETACAREvAQDHAvgRMNs8yAERMM8WyfsEVi9us44RyBEwIG7y0IABETABzxbJ7VSSVy/iESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfAM0AyADMER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcBBjbPNs8Vy1wiAERLgEAzQDLAMwA0AQY2zzbPFctf4gBES4BAM0AzgDPANAAEIIA0DBWLvL0ABYAAAAAUmVzdW1lZAAU+EJWLwHHBfLghAASggCdsFYus/L0ABYAAAAAU3RvcHBlZAEO+EIBf23bPADRATxtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPDAA0gHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgA0wCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIhuhe9s82zxXEF8PVxBfD2zxgA+ADWAgEgANcA2AAEVi0CAWIA2QDaAiW1pptnm2eNkQ2RDZENkQ2RDY8QAPgA3QLMquHbPNs8VxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFcQVxBXEFXgAPgA2wIgqR3bPNs8VxBfD1cQXw9s8QD4ANwAQFYsVihWKFYoVihWKFYoVihWKFYoViZWKVYpViZWKFY6AARWLgASVhtUeHlUeYcpAgEgAOAA4QL5sqIIG6SMG2OHCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Iji2zwRLhEwES4RLREvES0RLBEuESwRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESURJBEmESQRIxElESMRIhEkESIRIREjESGAA+ADoAvmtCu2eCJcIl4iXCJaIlwiWiJYIloiWCJWIlgiViJUIlYiVCJSIlQiUiJQIlIiUCJOIlAiTiJMIk4iTCJKIkwiSiJIIkoiSCJGIkgiRiJEIkYiRCJCIkQiQiJAIkIiQCI+IkAiPiI8Ij4iPCI6IjwiOiI4IjoiOCI2IjgiNwAD4AOIC+a54bZ4IlwiXiJcIloiXCJaIlgiWiJYIlYiWCJWIlQiViJUIlIiVCJSIlAiUiJQIk4iUCJOIkwiTiJMIkoiTCJKIkgiSiJIIkYiSCJGIkQiRiJEIkIiRCJCIkAiQiJAIj4iQCI+IjwiPiI8IjoiPCI6IjgiOiI4IjYiOCI3AAPgA5QGwERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXElcQXw9XElcQXw9s0gDjAT6AQFYQAln0D2+hkjBt3yBukjBtjofQ2zxsGG8I4lLgAOQA5NIAAZLTB5JtAeLTP9M/INcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoAINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAfoA0x9VcAGwERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXElcQXw9XElcQXw9s0gDmAUCAQFYVAln0D2+hkjBt3yBukjBtjofQ2zxsFm8G4lYTAQDnAFjSAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+gD6ANMf0gBVUAH4ESARIhEgER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31Uc2zxs82zzbPNsIwDpA95tIW6zj1kugBAkWfQPb6GSMG3fIG6SMG2X0PQEATFvAeIgbrOPNTEgbvLQgG8hgQELAiBu8tCAEln0C2+hkjBt3yBukjBtjxLQ2zwG1AHQ2zw2EGxVBGwcbwzikjAx4pEx4iyAECNZ9A9voZIwbd8A6gDqAOsAHNM/+gD6ANN/0n/Sf1VQAWQgbpIwbZ3Q+gDSANN/VSBsE28D4oAQVE0UWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiEgDsABz6APoA+gD6APoA+gBVUAIBIADvAPACASAA8wD0ABGwr7tRNDSAAGAC9bKnCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjbPBEuES8RLhEtES4RLREsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIIAD4APEB4BEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bMRsxGzEbLQA8gBSVhaBAQsicUEz9ApvoZQB1wAwkltt4m6zIVYaxwUiVhrHBQNWHMcFQTAC+bIHNs8ES4RLxEuES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbgAPgA9QL5snu2zwRLhEvES4RLREuES0RLBEtESwRKxEsESsRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERuAA+AD5AdQRGhEbERoRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ7bPFcQXw9XEF8PbPEgbpIwbZkgbvLQgG8nbwfiIG6SMG3eAPYBOoAQVhYCWfQPb6GSMG3fIG6SMG2Oh9DbPGwXbwfiAPcAJNQB0AHSANMP+gDTH9Mf0x9VYAJC7UTQ1AH4Y9IAAeMC+CjXCwqDCbry4ImBAQHXAAEB0ds8APoA+wGkERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxs82zzbPNsIwEDAvjbPFcvES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaAPwA/QT2MHCBALRwVHAAVHAAVHAAVHAAggr68ICCEAX14QCCCJiWgCONCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASNCGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASJiYltbW1xbW0ibVMRbW1tAQEBAQEBAQIB2PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDTH/oA0x/TH9Mf+gD6APoA+gDUAdD6APoA+gD6APoA+gD6APoA1DDQ+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAQD+AIQRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4BxvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAQD/AfT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE9AT0BNM/1DDQ9AT0BNM/9ATTP9M/1DDQ9AT0BPQE+gD6APoA0n/Sf/oA+gDUMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/MBEkES8RJAEAAHgRJBEuESQRJBEtESQRJBEsESQRJBErESQRJBEqESQRJBEpESQRJBEoESQRJBEnESQRJBEmESQRJBElESQAQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAA3lYSVHAAVHAAjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEIfhCES4RLREsESsRKhEpESgRJxEmESURJBEjESIRIREgER8RHhEdERwRGxEaERkRGBEXERYRFREUERMREhERERBV4AGQVhKAQCJZ9A9voZIwbd8gbpIwbY6H0Ns8bBxvDOKAQFYTQBNZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiVhFZAQQAcNMH0w/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA+gD6ANN/0gDTD/oA0x/SAFWw');
    const __system = Cell.fromBase64('te6cckICAQcAAQAAVesAAAEBwAABAQWg6L8AAgEU/wD0pBP0vPLICwADAgFiAAQA0QLw0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8ES4RMBEuES0RLxEtESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkAPoABQH4ESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDwAGAroOERAOEN9VHNs88uCCyPhDAcx/AcoAES8RLhEtESwRKxEqESkRKBEnESYRJREkESMRIhEhESARHxEeER0RHBEbERoRGREYERcRFhEVERQRExESEREREFXg2zzJ7VQABwDNBKLtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQW48nHbqOlDDTHwGCEFuPJx268uCB1AEx2zx/4CCCEMjAPIi64wIgghDQXnKzuuMCIIIQpi+FbLoACAAMAA4AGgHwES4RLxEuES0RLxEtESwRLxEsESsRLxErESoRLxEqESkRLxEpESgRLxEoEScRLxEnESYRLxEmESURLxElESQRLxEkESMRLxEjESIRLxEiESERLxEhESARLxEgER8RLxEfER4RLxEeER0RLxEdERwRLxEcERsRLxEbAAkC+BEaES8RGhEZES8RGREYES8RGBEXES8RFxEWES8RFhEVES8RFREUES8RFBETES8RExESES8REhERES8REREQES8REA8RLw8OES8ODREvDQwRLwwLES8LChEvCgkRLwkRLwgHBlVA2zwRL8gBghBbjycdWMsfzMkRLhEvES4AxgAKAfwRLREuES0RLBEtESwRKxEsESsRKhErESoRKREqESkRKBEpESgRJxEoEScRJhEnESYRJREmESURJBElESQRIxEkESMRIhEjESIRIREiESERIBEhESARHxEgER8RHhEfER4RHREeER0RHBEdERwRGxEcERt/bVYcER4RHBEdERwACwHMERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQDxDvEN4QzRC8EKsQmhCJEHgQZxBWBAVVINs8AMoB4jDTHwGCEMjAPIi68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTAA0AJlcZVxlXGYIAoPf4QlIwxwXy9H8DdjDTHwGCENBecrO68uCB1AHQ0gABjoTbPG8MkW3iAdIAAZX0BAFvAZFt4gHUMNDSAAGSMG3jDWwT2zx/AA8AEAARAFj6APoA+gD6APoA+gD6APoA1AHQ+gD6APoA+gAwEEwQSxBKEEkQSBBHEEYQRQDK+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTbwMB8BEuETERLhEtETARLREsES8RLBErETERKxEqETARKhEpES8RKREoETERKBEnETARJxEmES8RJhElETERJREkETARJBEjES8RIxEiETERIhEhETARIREgES8RIBEfETERHxEeETARHhEdES8RHREcETERHBEbETARGwASAfwRGhEvERoRGRExERkRGBEwERgRFxEvERcRFhExERYRFREwERURFBEvERQRExExERMREhEwERIREREvEREREBExERAPETAPDhEvDg0RMQ0METAMCxEvCwoRMQoJETAJCBEvCAcRMQcGETAGBREvBQQRMQQDETADAhEvAgERMQEAEwSYETDbPFYwbrOOLDFXGFcYVi0gbvLQgG8jW1YuIG7y0IBvIzAxES8gbvLQgG8jbCERGBEvERkBklcw4lYwbrOSVzDjDVYtbrOSVy3jDQDGABQAFQAXANQRMCBu8tCAbyEggQELcVn0gm+lIJZQI9cAMFiWbCFtMm0B4pCOQYEBCwGRf5Ft4gIRFwJWFwFxIW6VW1n0WTCYyAHPAEEz9EHigQELIgIRF3FBM/R0b6UgllAj1wAwWJZsIW0ybQHi6F8DAfpXGlcaVxpXGlcaVxpX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MhEsESsRMRErESoRNhEqESkRNREpESgRNBEoEScRMxEnESYRMhEmESURMRElESQRNhEkESMRNREjESIRNBEiESERMxEhESARMhEgER8RMREfER4RNhEeER0RNREdERwRNBEcAC8B/BEbETMRGxEaETIRGhEZETERGREYETYRGBEXETURFxEWETQRFgERFQERFBEyERQRExExERMREhE2ERIRERE1EREREBE0ERAfDhEyDg0RMQ0METYMCxE1CwoRNAoZCBEyCAcRMQcGETYGBRE1BQQRNAQTAhEyAlY2AgERMwFWNgAwAvTbPBEuETQRLhEtETMRLREsETIRLBErETERKxEqETARKhEpES8RKREoES4RKBEnES0RJxEmESwRJhElESsRJREkESoRJBEjESkRIxEiESgRIhEhEScRIREgESYRIBEfESURHxEeESQRHhEdESMRHREcESIRHBEbESERGwAxADMCXiLCAI8mcnBtcMhSEMsAydAQaF40EDfIVWDbPMlWHANWKUEzFEMwbW3bPDCSXwTiADIAywDeghAPin6lUAjLHxbLP1AE+gJYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiIW6zlX8BygDMlHAyygDiAfoCAc8WAMoRGhEgERoRGREfERkRGBEeERgRFxEdERcRFhEcERYRFREbERURFBEaERQREhEYERIREREXEREREBEWERAPERUPDhEUDg0REw0MERIMCxERCwoREAoQnxCOEM0QbBBbEEoQOUhmBwKwjpIjVhpzf1UgbW1t2zwwDFYZoQzeApFxkXLiQFTIVSCCELmwPLxQBMsfEssHyz/LP8nIgljAAAAAAAAAAAAAAAABActnzMlw+wARFqNQCqFWIgIRFgHbPADLALsBPjDTHwGCEDFWtQi68uCB0z/TP/QE+gD6AFVAbBXbPH8ANgLcOfhBbyQwMoF9ilYuVi62CVYnAaATvhLy9IIAoPdWG4EBCyNZ9ApvoTHy9FYYgEAmWfQPb6GSMG3fIG6SMG2Oh9DbPGwWbwbiggDTZyFus/L0IG7y0IBvJoFebTKz8vRSgBEdgED0WzBwJ4AQgwYA5wA3Af5Z9IZvpSCWUCPXATBYlmwhbTJtAeKQjmZWFoAQI1n0D2+hkjBt3yBukjBtndD6ANIA039VIGwTbwPiIG6zjiAgbvLQgG8jE6GoAZFxkX/iqIIwDeC2s6dkAACpBBKgAZFb4oAQKQKDBkEz9HxvpSCWUCPXATBYlmwhbTJtAeLoADgEzls3Ul2hUtyhIFY0qIIQO5rKAKkEU8CgAREQAaBRH6ERElYSoFMXoHBWKyfjD1YhwgCOlClWInJ/VSBtbW3bPDARFFYhoREU3giRcZFy4hCMEH0GEF1NNCwCVioCARESAREVLFYVEGcAOQA7AMsAPQLYVjSgIVY5JKG2CSaBXGYCu/L0VijAAJsygjAN4Lazp2QAAI4QAoIwDeC2s6dkAACoViipBOIlgjAN4Lazp2QAAKghqQRtI8jJ0CxRO1E1A8hVUNs8yVYpAVY3AX8DcEMDbW3bPDBRVqARKSWgADoAywDIghCJtx0JUAfLH1AFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPACFus5V/AcoAzJRwMsoA4gH6AgHPFgL+MVYyoAGCMA3gtrOnZAAAqFYnqQRTBKiCMA3gtrOnZAAAqQRUe1htyFUwghBZXwe8UAXLHxPLPwH6AgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOLJVicBVjUBfwNwQwNtbds8MFFEoREoJQDLADwBMqFTZHN/VSBtbW3bPDARFCShJAERFQEQVlkAywJuyFXA2zzJyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERijUAShUAyhAREeAQYRFgYYG0ZwRVDbPAA+ALsApIIQJBhc31AOyx8cyz8ayz8YywdQBiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAE+gJY+gLLfwH6AgHIyn9Y+gJY+gJY+gJY+gLJAcwEOo8IMNs8bB3bPH/gIIIQy7vSJLrjAiCCEPlPgLu6AEAAQQBJAFIAbtMfAYIQkD+flrry4IHTP9MP0gDSAPoA+gDTf9Mf+gD6APoA+gDUAdD6ADAdHBsaGRgXFhUUQzAB8BEuETsRLhEtEToRLREsETkRLBErETgRKxEqETcRKhEpETYRKREoETURKBEnETQRJxEmETMRJhElETIRJREkETERJBEjETARIxEiES8RIhEhETsRIREgEToRIBEfETkRHxEeETgRHhEdETcRHREcETYRHBEbETURGwBCAfwRGhE0ERoRGREzERkRGBEyERgRFxExERcRFhEwERYRFREvERURFBE7ERQRExE6ERMREhE5ERIRERE4EREREBE3ERAPETYPDhE1Dg0RNA0METMMCxEyCwoRMQoJETAJCBEvCAcROwcGEToGBRE5BQQROAQDETcDAhE2AgERNQEAQwL2ETTbPPhBbyQwMoIA7XFWO1YhvvL0VjpWOsIAlFY5wgCRcOKTVjug3lY4wgCUVjfCAJFw4pNWO6DeggDO/VYoIqBWNKAUvhPy9BEykXqSgAviETARNREwES8RNBEvES4RMxEuES0RMhEtESwRMREsESsRMBErESoRLxEqAMcARAH8ESkRLhEpESgRLREoEScRLBEnESYRKxEmESURKhElESQRKREkESMRKBEjESIRJxEiESERJhEhESARJREgER8RJBEfER4RIxEeER0RIhEdERwRIREcERsRIBEbERoRHxEaERkRHhEZERgRHREYERcRHBEXERYRGxEWERURGhEVAEUD/hEUERkRFBETERgRExESERcREhERERYREREQERUREA8RFA8OERMODRESDQwREQwLERALEK8QnhCNEHwQaxBaEEkQOBAnEDZRUFFQEEUDAhE/AgERPgFWPAERPts8VjVWNbyOEzAEETMEAxEyAwIRMQJXL1cvXwPjDQJWMKABVi8AgQBGAEcAogMRMwMCETICARExAREwgEARNchVQFBU+gISy38B+gISy38B+gLJED4CETECAREtASBulTBZ9FswlEEz9BfiESoRLREqESoRLBEqESoRKxEqCwH8oAERLwERMKARKBEwESgRJxEvEScRJhEuESYRJREtESURJBEsESQRIxErESMRIhEqESIRIREpESERIBEoESARHxEnER9WHhEnER4RJhEeER0RJREdERwRJBEcERsRIxEbERoRIhEaERkRIREZERgRIBEYERcRHxEXERYRHhEWAEgBvBEVER0RFREUERwRFBETERsRExESERoREhERERkREREQERgREA8RFw8OERYODREVDQwRFAwLERMLChESCgkREQkIERAIEH8QbhBdEEwQOwoQiRAoEGcQVhBFA0RE2zwAuwIQMNs8bBjbPH8ASgBLAD7THwGCEMu70iS68uCB0z/TD9IA+gD6ANN/0x/6AFVwAfARLhE2ES4RLRE1ES0RLBE0ESwRKxEzESsRKhEyESoRKRExESkRKBEwESgRJxEvEScRJhE2ESYRJRE1ESURJBE0ESQRIxEzESMRIhEyESIRIRExESERIBEwESARHxEvER8RHhE2ER4RHRE1ER0RHBE0ERwRGxEzERsATAH8ERoRMhEaERkRMREZERgRMBEYERcRLxEXERYRNhEWERURNREVERQRNBEUERMRMxETERIRMhESERERMRERERARMBEQDxEvDw4RNg4NETUNDBE0DAsRMwsKETIKCRExCQgRMAgHES8HBhE2BgURNQUEETQEAxEzAwIRMgIBETEBAE0C+hEw2zz4QW8kMDKCAIh/VjNWIb7y9IIAvZBWJ1Y0oBO+EvL0ES8RNREvES4RNBEuES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhAMcATgH8ESARJhEgER8RJREfER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaERkRHxEZERgRHhEYERcRHREXERYRHBEWERURGxEVERQRGhEUERMRGRETERIRGBESERERFxERERARFhEQDxEVDw4RFA4NERMNDBESDAsREQsKERAKAE8C9BCfEI4QfRBsEFsQShA5SHCADFRBdgUROQUEETgEWgEROQFWOQEROds8MAZWMKARLhEwES4RLREvES0RLBEuESwRKxEtESsRKhEsESoRKRErESkRKBEqESgRJxEpEScRJhEoESYRJREnESVWJBEnESQRJhEkESMRJREjAIEAUAH8ESIRJBEiESERIxEhESARIhEgER8RIREfER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q3xDOAFEBKhC9EKwQmxCKGRBoEFcQRhA1QUDbPAC7BGyPCDDbPGwZ2zx/4CCCEH1qq1m6jpgw0x8BghB9aqtZuvLggdM/0z9ZbBLbPH/gIIIQBPXgG7oAUwBUAF4AYwBC0x8BghD5T4C7uvLggfoA0w/SAPoA03/6ANN/0z/TH1WAAfARLhE3ES4RLRE2ES0RLBE1ESwRKxE0ESsRKhEzESoRKREyESkRKBExESgRJxEwEScRJhEvESYRJRE3ESURJBE2ESQRIxE1ESMRIhE0ESIRIREzESERIBEyESARHxExER8RHhEwER4RHREvER0RHBE3ERwRGxE2ERsAVQH8ERoRNREaERkRNBEZERgRMxEYERcRMhEXERYRMREWERURMBEVERQRLxEUERMRNxETERIRNhESERERNRERERARNBEQDxEzDw4RMg4NETENDBEwDAsRLwsKETcKCRE2CQgRNQgHETQHBhEzBgURMgUEETEEAxEwAwIRLwIBETcBAFYD+hE22zz4QW8kMDJwVjXCAJRWNMIAkXDikjBx3lYzwgCUVjLCAJFw4pGk3oFf8lY5ViK+8vSBS2lWKFY6oCKoFL4T8vRWNMIAlFYzwgCRcOKOooANcFY7QxQiVjoDVjpQIwEROgEROVY9Vj/bPDARMREyETGUVzNXM+JWMMIAAMcAgQBXAviUVi/CAJFw4o4WBRE3BQQRNgQDETQDAhEzAlcvVy9fBOMNVi9WLaigVh5WLagBETABES2oESgRMREoEScRMBEnESYRLxEmESURLhElESQRLREkESMRLBEjESIRKxEiESERKhEhESARKREgER8RKBEfER4RJxEeER0RJhEdAFgAXAH8ES4RNBEuES0RMxEtESwRMhEsESsRMRErESoRMBEqESkRLxEpESgRLhEoEScRLREnESYRLBEmESURKxElESQRKhEkESMRKREjESIRKBEiESERJxEhESARJhEgER8RJREfER4RJBEeER0RIxEdERwRIhEcERsRIREbERoRIBEaAFkC/hEZER8RGREYER4RGBEXER0RFxEWERwRFhEVERsRFREUERoRFBETERkRExESERgREhERERcREREQERYREA8RFQ8OERQODRETDQwREgwLERELChEQChCfEI4QfRBsVVUFETcFgA4FcCNFFkM0ARE6AVY4ARE62zwwBRExBQQRMAQAgQBaAfwDES4DAhEtAgURLAUEESsEAREqAREpAxEoAwIRJwIFESYFBBElBAERJAERIwMRIgMCESECBREgBQQRHwQBER4BER0DERwDAhEbAgURGgUE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UAP6AgB3AFxQA/oCUAP6AlAD+gJQA/oCUAP6AhPKABPLfxPKf8hQBPoCFMp/yVjMyQHMyQHMAnggbvLQgG8lJMIAkyPCAJFw4pIzM+MNIMIAkyLCAJFw4p9fAwMRNgMCETQCVzBXMVvjDVYrUA2AQPRbMAwAeQB+AfhXOlYogA1WOfgjETMRNhEzETIRNREyETERNBExETARNhEwES8RNREvES4RNBEuES0RNhEtESwRNREsESsRNBErESoRNhEqESkRNREpESgRNBEoEScRNhEnESYRNREmESURNBElESQRNhEkESMRNREjESIRNBEiESERNhEhAHoB/BEgETURIBEfETQRHxEeETYRHhEdETURHREcETQRHBEbETYRGxEaETURGhEZETQRGREYETYRGBEXETURFxEWETQRFhEVETYRFREUETURFBETETQRExESETYREhERETUREREQETQREA8RNg8OETUODRE0DQwRNgwLETULChE0CgB7Av4JETYJCBE1CAcRNAcGETYGBRE1BVY+BRA0VjkEVj4EVj1QNAIROAIBEToBVkEB2zwwES8ROBEvES4RMREuES0RMBEtESwRLxEsESsRLhErESoRLREqESkRLBEpESgRKxEoEScRKhEnESYRKREmESURKBElESQRJxEkESMRJhEjAIEAfAH8ESIRJREiESERJBEhESARIxEgER8RIhEfER4RIREeER0RIBEdERwRHxEcERsRHhEbERoRHREaERkRHBEZERgRGxEYERcRGhEXERYRGREWERURGBEVERQRFxEUERMRFhETERIRFRESERERFBERERARExEQDxESDw4REQ4NERANAH0AChDPVSsSAfoROFYnoIAOVjf4IxE0ETgRNBEzETcRMxEyETYRMhExETURMREwETQRMBEvETMRLxEuETIRLhEtETERLREsETARLBErES8RKxEqES4RKhEpES0RKREoESwRKBEnESsRJxEmESoRJhElESkRJREkESgRJBEjEScRIxEiESYRIgB/AfwRIRElESERIBEkESARHxEjER8RHhEiER4RHREhER0RHBEgERwRGxEfERsRGhEeERoRGREdERkRGBEcERgRFxEbERcRFhEaERYRFREZERURFBEYERQRExEXERMREhEWERIREREVEREREBEUERAPERMPDhESDg0REQ0MERAMEL8AgAL+EK4QnRCMEHsQagkRPAkQKBBnBhE6BkVAAxE7A9s8MAMRMgMCETACAREuAQIRLQIRLAMRKwMBESoBAhEpAhEoAxEnAwERJgECESUCESQDESMDAREiAQIRIQIRIAMRHwMBER4BAhEdAhEcAxEbAwERGgECERkCERgDERcDAREWAQCBAIUDzijACpF/kyjAC+KSJbOOECjADJElmSjADZElkiWz4uLiVhqkgED4I1RssFRtwFRswFRsoFLQcFlwyFWw2zzJAhEfAlYdASBulTBZ9FswlEEz9BfiEIkQNFYbBFAzDBA1RADIVbDbPMkAggCDAIQAfFC8ywcZyw9QByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhXKAFAD+gIB+gLLf8oAyw8B+gLLH8oAAI6CEK2OMe9QDcsfG8sHGcsPUAcg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYVygBQA/oCAfoCy3/KAAH6Ass/yz/LHwA4yIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIREABCAhEVAhEUAxETAwEREgECERECERAQP03sEDtJqBA3RWQSAf4wETgROxE4ETcROhE3ETYRORE2ETUROxE1ETQROhE0ETMROREzETIROxEyETEROhExETAROREwES8ROxEvES4ROhEuES0ROREtESwROxEsESsROhErESoROREqESkROxEpESgROhEoEScROREnESYROxEmESUROhElESQROREkAIcB/BEjETsRIxEiEToRIhEhETkRIREgETsRIBEfEToRHxEeETkRHhEdETsRHREcEToRHAERGwERGhE7ERoRGRE6ERkBERgBERcROxEXERYROhEWAREVAREUETsRFBETEToREwEREgERERE7EREREBE6ERAfDhE7Dg0ROg0cCxE7CwCIAv4KEToKCRE7CVRBGRBnAhE8AgEROwHbPAQRMgQDETADES8CES4CAxEtAwERLAEEESsEESoCESkCAxEoAwERJwEEESYEESUCESQCAxEjAwERIgEEESEEESACER8CAxEeAwERHQEEERwEERsCERoCAxEZAwERGAEEERcEERYCERUCAJwAiQBKAxEUAwEREwEEERIEERECERACED8eEE1LHBA6GRBIRhcQNUAEAwH8EScRLxEnESYRLhEm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ghDbReQ4UAPLH8s/yz/JyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsA+EIBo1ihViRZ2zwAuwG8+EFvJDAy+CdvEC6hLKEtoSOgIqFwAbYJIFYjtghWIwGhgQELVh1AFFn0Cm+hMbOSMHCXcAFWI6G2CeJZoVAEoVADoCLCAJJwM99YoSDCAI6Kcn9VIG1tbds8MJFb4gDLA76OqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gIIIQLrEI27qOojDTHwGCEC6xCNu68uCB1AHQAdIAAZPUAdCRbeISbBLbPH/gwACRMOMNcADKAL0AwQHwES4RMBEuES0RLxEtESwRMBEsESsRLxErESoRMBEqESkRLxEpESgRMBEoEScRLxEnESYRMBEmESURLxElESQRMBEkESMRLxEjESIRMBEiESERLxEhESARMBEgER8RLxEfER4RMBEeER0RLxEdERwRMBEcERsRLxEbAL4B/BEaETARGhEZES8RGREYETARGBEXES8RFxEWETARFhEVES8RFREUETARFBETES8RExESETAREhERES8REREQETAREA8RLw8OETAODREvDQwRMAwLES8LChEwCgkRLwkIETAIBxEvBwYRMAYFES8FBBEwBAMRLwMCETACAREvAQC/AvgRMNs8yAERMM8WyfsEVi9us44RyBEwIG7y0IABETABzxbJ7VSSVy/iESwRLhEsESsRLRErESoRLBEqESkRKxEpESgRKhEoEScRKREnESYRKBEmESURJxElESQRJhEkESMRJREjESIRJBEiESERIxEhESARIhEgER8RIREfAMYAwADMER4RIBEeER0RHxEdERwRHhEcERsRHREbERoRHBEaERkRGxEZERgRGhEYERcRGREXERYRGBEWERURFxEVERQRFhEUERMRFRETERIRFBESERERExERERAREhEQDxERDw4REA4Q31UcArT5ASCC8GyPRPRf7bTN/tTejbFKpbE61V1DD3WdBmkhC3TEj+Pfuo6GMNs8f9sx4ILwvPr3dpB8cZzI03nY8ZSqqifoyihxzVkXgXIfIVpFRQG6joXbPH/bMeAAwgDFBBjbPNs8Vy1wiAERLgEAxgDDAMQAyQAQggDQMFYu8vQAFgAAAABSZXN1bWVkBBjbPNs8Vy1/iAERLgEAxgDH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HxEhER8RHhEgER4RHREfER0RHBEeERwRGxEdERsRGhEcERoRGREbERkRGBEaERgRFxEZERcRFhEYERYRFREXERURFBEWERQRExEVERMREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPGzzbPNs82wjAOoD3m0hbrOPWS6AECRZ9A9voZIwbd8gbpIwbZfQ9AQBMW8B4iBus481MSBu8tCAbyGBAQsCIG7y0IASWfQLb6GSMG3fIG6SMG2PEtDbPAbUAdDbPDYQbFUEbBxvDOKSMDHikTHiLIAQI1n0D2+hkjBt3wDrAOsA7AAc0z/6APoA03/Sf9J/VVABZCBukjBtndD6ANIA039VIGwTbwPigBBUTRRZ9A9voZIwbd8gbpIwbY6H0Ns8bBZvBuISAO0AHPoA+gD6APoA+gD6AFVQAgEgAO8A9AIBIADwAPEAEbCvu1E0NIAAYAL1sqcINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8ES4RLxEuES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREggAPoA8gHgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxsxGzEbMRstADzAFJWFoEBCyJxQTP0Cm+hlAHXADCSW23ibrMhVhrHBSJWGscFA1YcxwVBMAIBIAD1APkC+bIHNs8ES4RLxEuES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbgAPoA9gHUERoRGxEaERkRGhEZERgRGREYERcRGBEXERYRFxEWERURFhEVERQRFREUERMRFBETERIRExESEREREhERERAREREQDxEQD1UO2zxXEF8PVxBfD2zxIG6SMG2ZIG7y0IBvJ28H4iBukjBt3gD3ATqAEFYWAln0D2+hkjBt3yBukjBtjofQ2zxsF28H4gD4ACTUAdAB0gDTD/oA0x/TH9MfVWAC+bJ7ts8ES4RLxEuES0RLhEtESwRLREsESsRLBErESoRKxEqESkRKhEpESgRKREoEScRKBEnESYRJxEmESURJhElESQRJREkESMRJBEjESIRIxEiESERIhEhESARIREgER8RIBEfER4RHxEeER0RHhEdERwRHREcERsRHBEbgAPoBBAJC7UTQ1AH4Y9IAAeMC+CjXCwqDCbry4ImBAQHXAAEB0ds8APsBAQL42zxXLxEtES4RLREsES0RLBErESwRKxEqESsRKhEpESoRKREoESkRKBEnESgRJxEmEScRJhElESYRJREkESURJBEjESQRIxEiESMRIhEhESIRIREgESERIBEfESARHxEeER8RHhEdER4RHREcER0RHBEbERwRGxEaERsRGgD8AQAB2PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gDTH/oA0x/TH9Mf+gD6APoA+gDUAdD6APoA+gD6APoA+gD6APoA1DDQ+gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAQD9Acb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1DDQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAEA/gH0+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BPQE9ATTP9Qw0PQE9ATTP/QE0z/TP9Qw0PQE9AT0BPoA+gD6ANJ/0n/6APoA1DDQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT/zARJBEvESQA/wB4ESQRLhEkESQRLREkESQRLBEkESQRKxEkESQRKhEkESQRKREkESQRKBEkESQRJxEkESQRJhEkESQRJREkAIQRGREaERkRGBEZERgRFxEYERcRFhEXERYRFREWERURFBEVERQRExEUERMREhETERIRERESEREREBERERAPERAPVQ4E9jBwgQC0cFRwAFRwAFRwAFRwAIIK+vCAghAF9eEAggiYloAjjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjQhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEiYmJbW1tcW1tIm1TEW1tbQECAQIBAgEDAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAN5WElRwAFRwAI0IYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCH4QhEuES0RLBErESoRKREoEScRJhElESQRIxEiESERIBEfER4RHREcERsRGhEZERgRFxEWERURFBETERIREREQVeABpBEaERsRGhEZERoRGREYERkRGBEXERgRFxEWERcRFhEVERYRFREUERURFBETERQRExESERMREhERERIREREQEREREA8REA9VDts8bPNs82zzbCMBBQGQVhKAQCJZ9A9voZIwbd8gbpIwbY6H0Ns8bBxvDOKAQFYTQBNZ9A9voZIwbd8gbpIwbY4R0PoA03/6ANN/+gBVQGwVbwXiVhFZAQYAcNMH0w/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA+gD6ANN/0gDTD/oA0x/SAFWwK95/og==');
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
    {"name":"UpdateContract","header":783354075,"fields":[{"name":"code","type":{"kind":"simple","type":"slice","optional":false}},{"name":"data","type":{"kind":"simple","type":"slice","optional":true}}]},
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
    {"name":"Pool$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"stopped","type":{"kind":"simple","type":"bool","optional":false}},{"name":"orderLockTime","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"maxLpNetCap","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpRolloverFeeRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"liquidatedPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"normalPositionShareRate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"mintJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"burnJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"transferJettonGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelPerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executePerpOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"createLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"cancelLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executeLiquidityOrderGas","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"perpMinExecutionFee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"minStorageReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpSupply","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tlpJetton","type":{"kind":"simple","type":"address","optional":false}},{"name":"tlpWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"manager","type":{"kind":"simple","type":"address","optional":false}},{"name":"compensator","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimer","type":{"kind":"simple","type":"address","optional":false}},{"name":"executors","type":{"kind":"dict","key":"address","value":"bool"}},{"name":"tokenConfigs","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"TokenConfig","valueFormat":"ref"}},{"name":"liquidityOrders","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"LiquidityOrder","valueFormat":"ref"}},{"name":"liquidityOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"perpOrders","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"PerpOrder","valueFormat":"ref"}},{"name":"perpOrderExs","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"PerpOrderEx","valueFormat":"ref"}},{"name":"perpOrderIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"compensates","type":{"kind":"dict","key":"uint","keyFormat":64,"value":"Compensate","valueFormat":"ref"}},{"name":"compensateIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"positionIndexNext","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"positions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"AccountPerpPosition","valueFormat":"ref"}},{"name":"globalLPPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"GlobalLPPosition","valueFormat":"ref"}},{"name":"globalPositions","type":{"kind":"dict","key":"uint","keyFormat":16,"value":"GlobalPosition","valueFormat":"ref"}},{"name":"feeReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"orderAmountReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executionFeeReserve","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalLPFund","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLPUnrealizedPnl","type":{"kind":"simple","type":"int","optional":false,"format":128}},{"name":"globalLpFundingFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"globalRolloverFeeGrowth","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"multisig","type":{"kind":"simple","type":"address","optional":false}},{"name":"publicKey","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
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
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateContract"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: JettonUpdateContent | SetManager | UpdateBaseConfig | UpdatePoolConfig | ListToken | DelistToken | WithdrawFee | null | JettonTransferNotification | CreateAddLiquidityOrder | CancelLiquidityOrder | ExecuteLiquidityOrder | CreateIncreasePerpOrder | CreateDecreasePerpOrder | CreateTpSlPerpOrder | CancelPerpOrder | ExecutePerpOrder | LiquidatePerpPosition | ADLPerpPosition | CreateCompensate | ExecuteOrCancelCompensate | Deploy | 'Resume' | 'Stop' | UpdateContract) {
        
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateContract') {
            body = beginCell().store(storeUpdateContract(message)).endCell();
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
    
}