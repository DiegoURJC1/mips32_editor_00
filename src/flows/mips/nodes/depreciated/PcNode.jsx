import React from "react";
import { Position } from "@xyflow/react";
import "../common/node-mips-stylesheet.css";
import CustomNodeToolbar from "../common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../../handles/HandlesMapper.jsx";

export default function PcNode({ id, data, isConnectable }) {
    const size = {
        width: 40,
        height: 80,
    };

    const handleList = [
        {
            id: "input",
            type: "target",
            position: Position.Left,
            connectioncount: 1,
            label: undefined,
            name: "Entrada"
        },
        {
            id: "control-input",
            type: "target",
            position: Position.Top,
            connectioncount: 1,
            label: undefined,
            name: "Control"
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
            className={"pc-node"}
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
