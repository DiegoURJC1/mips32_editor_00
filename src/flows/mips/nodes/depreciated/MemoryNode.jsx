import React from "react";
import CustomHandle from "../../../../handles/CustomHandle.jsx";
import { NodeToolbar, Position } from "@xyflow/react";
import "../common/node-mips-stylesheet.css";
import CustomNodeToolbar from "../common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../../handles/HandlesMapper.jsx";

export default function MemoryNode({ id, data, isConnectable }) {
    const size = {
        width: 120,
        height: 180,
    };

    const handleList = [
        {
            id: "direction-input",
            type: "target",
            position: Position.Left,
            connectioncount: 1,
            label: "Dirección",
            style: {
                top: `${Math.round(size.height / 4 / 10) * 10}px`,
            },
        },
        {
            id: "data-input",
            type: "target",
            position: Position.Left,
            connectioncount: 1,
            label: "Dato a\nescribir",
            style: {
                top: `${Math.round(size.height * 3 / 4 / 10) * 10 - 10}px`,
            },
        },
        {
            id: "control-read-input",
            type: "target",
            position: Position.Top,
            connectioncount: 1,
            label: undefined,
            name: "Entrada escritura",
            style: {
                left: `${size.width / 4}px`,
            },
        },
        {
            id: "control-write-input",
            type: "target",
            position: Position.Top,
            connectioncount: 1,
            label: undefined,
            name: "Entrada lectura",
            style: {
                left: `${size.width * 3 / 4}px`,
            },
        },
        {
            id: "output",
            type: "source",
            position: Position.Right,
            connectioncount: undefined,
            label: "Dato/instrucción\nleído",
        },
    ];

    return (
        <div
            className={"memory-node"}
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
