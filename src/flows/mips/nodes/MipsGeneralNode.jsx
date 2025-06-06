import React from "react";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import "./common/node-mips-stylesheet.css";
import {useFlowMIPS} from "../../../hooks/FlowMIPSContext.jsx";

export default function MipsGeneralNode(
    {
        id,
        data,
        isConnectable,
    }) {
    const {
        numberNodes,
    } = useFlowMIPS();
    let label = numberNodes.get(id) ?? data.label;
    return (
        <div
            className={`mips-node ${data.nodeClass}`}
            style={{
                width: `${data.size.width}px`,
                height: `${data.size.height}px`,
            }}
        >
            <CustomNodeToolbar nodeId={id} data={data} handles={data.handles} />
            {label}
            <HandlesMapper nodeId={id} handleList={data.handles} isConnectable={isConnectable} />
        </div>
    );
}
