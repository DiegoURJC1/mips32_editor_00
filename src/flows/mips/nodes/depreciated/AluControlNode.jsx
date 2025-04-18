import React from "react";
import CustomHandle from "../../../../handles/CustomHandle.jsx";
import { NodeToolbar, Position } from "@xyflow/react";
import "../common/node-mips-stylesheet.css";
import CustomNodeToolbar from "../common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../../handles/HandlesMapper.jsx";

export default function AluControlNode({ id, data, isConnectable }) {
    const size = {
        width: 80,
        height: 100,
    };

    const handleList = [
        {
            id: "control-input",
            type: "target",
            position: Position.Bottom,
            connectioncount: 1,
            label: undefined,
            name: "Control"
        },
        {
            id: "input",
            type: "target",
            position: Position.Left,
            connectioncount: 1,
            label: undefined,
            name: "Entrada"
        },
        {
            id: "output",
            type: "source",
            position: Position.Right,
            connectioncount: undefined,
            label: undefined,
            name: "Salida"
        }
    ];

    return (
        <div
            className={"alu-control-node"}
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
