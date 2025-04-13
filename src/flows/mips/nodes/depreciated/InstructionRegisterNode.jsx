import React from "react";
import CustomHandle from "../../../../handles/CustomHandle.jsx";
import { NodeToolbar, Position } from "@xyflow/react";
import "../common/node-mips-stylesheet.css";
import CustomNodeToolbar from "../common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../common/handles/HandlesMapper.jsx";

export default function InstructionRegisterNode({ id, data, isConnectable }) {
    const size = {
        width: 120,
        height: 260,
    };

    const handleList = [
        {
            id: "input",
            name: "Entrada",
            type: "target",
            position: Position.Left,
            label: undefined,
            connectioncount: 1,
            style: undefined,
        },
        {
            id: "control-input",
            name: "Control",
            type: "target",
            position: Position.Top,
            label: undefined,
            connectioncount: 1,
            style: undefined,
        },
        {
            id: "output-[31-26]",
            type: "source",
            position: Position.Right,
            label: "Instrucción\n[31-26]",
            connectioncount: undefined,
            style: {
                top: `${Math.round(size.height * 1 / 5 / 10) * 10 - 20}px`,
            },
        },
        {
            id: "output-[25-21]",
            type: "source",
            position: Position.Right,
            label: "Instrucción\n[25-21]",
            connectioncount: undefined,
            style: {
                top: `${Math.round(size.height * 2 / 5 / 10) * 10 - 20}px`,
            },
        },
        {
            id: "output-[20-16]",
            type: "source",
            position: Position.Right,
            label: "Instrucción\n[20-16]",
            connectioncount: undefined,
            style: {
                top: `${Math.round(size.height * 3 / 5 / 10) * 10 - 20}px`,
            },
        },
        {
            id: "output-[15-0]",
            type: "source",
            position: Position.Right,
            label: "Instrucción\n[15-0]",
            connectioncount: undefined,
            style: {
                top: `${Math.round(size.height * 4 / 5 / 10) * 10 - 20}px`,
            },
        },
    ];

    return (
        <div
            className={"instruction-register-node"}
            style={{
                width: `${size.width}px`,
                height: `${size.height}px`,
            }}
        >
            <CustomNodeToolbar
                data={data}
                handles={handleList}
                nodeId={id}
            />
            {data.label}

            <HandlesMapper
                handleList={handleList}
                isConnectable={isConnectable}
            />
        </div>
    );
}
