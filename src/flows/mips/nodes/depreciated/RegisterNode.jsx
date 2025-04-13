import React from "react";
import CustomHandle from "../../../../handles/CustomHandle.jsx";
import { NodeToolbar, Position } from "@xyflow/react";
import "../common/node-mips-stylesheet.css";
import CustomNodeToolbar from "../common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../common/handles/HandlesMapper.jsx";

export default function RegisterNode({ id, data, isConnectable }) {
    const size = {
        width: 180,
        height: 240,
    };

    const handleList = [
        {
            id: "control-input",
            type: "target",
            position: Position.Top,
            connectioncount: 1,
            label: undefined,
            name: "Control"
        },
        {
            id: "read-reg-1-input",
            type: "target",
            position: Position.Left,
            connectioncount: 1,
            label: "Reg. de\nlectura 1",
            name: undefined,
            style: {
                top: `${size.height / 5}px`,
            }
        },
        {
            id: "read-reg-2-input",
            type: "target",
            position: Position.Left,
            connectioncount: 1,
            label: "Reg. de\nlectura 2",
            name: undefined,
            style: {
                top: `${size.height * 2 / 5}px`,
            }
        },
        {
            id: "write-reg-input",
            type: "target",
            position: Position.Left,
            connectioncount: 1,
            label: "Reg. de\nescritura",
            name: undefined,
            style: {
                top: `${size.height * 3 / 5}px`,
            }
        },
        {
            id: "data-input",
            type: "target",
            position: Position.Left,
            connectioncount: 1,
            label: "Dato a\nescribir",
            name: undefined,
            style: {
                top: `${size.height * 4 / 5}px`,
            }
        },
        {
            id: "read-data-1-output",
            type: "source",
            position: Position.Right,
            connectioncount: undefined,
            label: "Dato\nleído 1",
            name: undefined,
            style: {
                top: `${size.height / 3}px`,
            }
        },
        {
            id: "read-data-2-output",
            type: "source",
            position: Position.Right,
            connectioncount: undefined,
            label: "Dato\nleído 2",
            name: undefined,
            style: {
                top: `${size.height * 2 / 3}px`,
            }
        }
    ];

    return (
        <div
            className={"register-node"}
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
