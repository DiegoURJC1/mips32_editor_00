export class ControlHandle {
    constructor({id, label, bits, assignedBit = undefined, style, position, isLeft }) {
        this.id = id;
        this.label = label;
        this.bits = bits;
        this.assignedBit = assignedBit;
        this.style = style;
        this.position = position;
        this.positionInverted = true;
        this.isLeft = isLeft;
    }
}

export const staticHeadersDataControlHandle = [
    new ControlHandle({id:"EscrPC", label:"EscrPC", bits: 1}),
    new ControlHandle({id:"EscrPCCond", label:"EscrPCCond", bits: 1}),
    new ControlHandle({id:"IoD", label:"IoD", bits: 1}),
    new ControlHandle({id:"LeerMem", label:"LeerMem", bits: 1}),
    new ControlHandle({id:"EscrMem", label:"EscrMem", bits: 1}),
    new ControlHandle({id:"EscrIR", label:"EscrIR", bits: 1}),
    new ControlHandle({id:"MemaReg", label:"MemaReg", bits: 1}),
    new ControlHandle({id:"FuentePC", label:"FuentePC", bits: 2, assignedBit: 0}),
    new ControlHandle({id:"FuentePC", label:"FuentePC", bits: 2, assignedBit: 1}),
    new ControlHandle({id:"AlUOp", label:"AlUOp", bits: 2, assignedBit: 0}),
    new ControlHandle({id:"AlUOp", label:"AlUOp", bits: 2, assignedBit: 1}),
    new ControlHandle({id:"SelALUB", label:"SelALUB", bits: 2, assignedBit: 0}),
    new ControlHandle({id:"SelALUB", label:"SelALUB", bits: 2, assignedBit: 1}),
    new ControlHandle({id:"SelALUA", label:"SelALUA", bits: 1}),
    new ControlHandle({id:"EscrReg", label:"EscrReg", bits: 1}),
    new ControlHandle({id:"RegDest", label:"RegDest", bits: 1}),
]