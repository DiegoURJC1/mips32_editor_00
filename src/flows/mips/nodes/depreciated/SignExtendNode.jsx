import React from "react";
import CustomHandle from "../../../../handles/CustomHandle.jsx";
import { NodeToolbar, Position } from "@xyflow/react";
import "../common/node-mips-stylesheet.css";
import CustomNodeToolbar from "../common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../../handles/HandlesMapper.jsx";

export default function SignExtendNode({ id, data, isConnectable }) {
    const size = {
        width: 80,
        height: 100,
    };

    // Lista de handles para este nodo
    const handleList = [
        {
            id: "input",
            name: "Entrada",
            type: "target",
            position: Position.Left,
            connectioncount: 1,
        },
        {
            id: "output",
            name: "Salida",
            type: "source",
            position: Position.Right,
            connectioncount: undefined,
        }
    ];

    return (
        <div
            className={"sign-extend-node"}
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
