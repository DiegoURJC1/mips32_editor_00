import TestNode from "./test-node/TestNode.jsx";

import LogicGateNode from "../LogicGateNode.jsx";
import MipsGeneralNode from "../MipsGeneralNode.jsx";

import ControlNode from "../ControlNode.jsx";

import AluNode from "../AluNode.jsx";
import MultiplexerNode from "../MultiplexerNode.jsx";



export const nodeTypes = {
    test: TestNode,

    logicGate: LogicGateNode,

    mipsGeneral: MipsGeneralNode,

    alu: AluNode,

    control: ControlNode,

    multiplexer: MultiplexerNode,
};