import React from "react";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import "./common/node-mips-stylesheet.css";

export default function MipsGeneralNode(
    {
        id,
        data,
        isConnectable,
    }) {
    return (
        <div
            className={`mips-node ${data.nodeClass}`}
            style={{
                width: `${data.size.width}px`,
                height: `${data.size.height}px`,
            }}
        >
            <CustomNodeToolbar nodeId={id} data={data} handles={data.handles} />
            {data.label}
            <HandlesMapper nodeId={id} handleList={data.handles} isConnectable={isConnectable} />
        </div>
    );
}
