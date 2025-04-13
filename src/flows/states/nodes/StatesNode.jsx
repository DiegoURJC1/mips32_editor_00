import {Position} from "@xyflow/react";
import CustomNodeToolbar from "../../mips/nodes/common/node-toobar/CustomNodeToolbar.jsx";
import React from "react";
import CustomHandle from "../../../handles/CustomHandle.jsx";
import "./common/node-states-stylesheet.css"
import HandlesMapper from "../../mips/nodes/common/handles/HandlesMapper.jsx";

export default function StatesNode({id, data, isConnectable}) {
    const size = {
        width: 60,
        height: 60,
    };
    const handleList = [
        {
            id: "output",
            type: "source",
            position: Position.Bottom,
            connectioncount: null,
            label: null,
            name: "Salida"
        },
        {
            id: "input",
            type: "target",
            position: Position.Top,
            connectioncount: null,
            label: null,
            name: "Entrada"
        },
    ]
    return (
        <>
            <div className={"state-number"}>
                {data.statesNumber}
            </div>
            <div
                className={"states-node"}
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

                Text

                <HandlesMapper
                    handleList={handleList}
                    isConnectable={isConnectable}
                />
            </div>
        </>
    );
}