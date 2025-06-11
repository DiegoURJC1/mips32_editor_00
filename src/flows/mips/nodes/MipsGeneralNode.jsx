import React from "react";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import "./common/node-mips-stylesheet.css";
import {useFlowMIPS} from "../../../contexts/FlowMIPSContext.jsx";

export default function MipsGeneralNode(
    {
        id,
        data,
        isConnectable,
    }) {
    const {
        numberNodes,
        updateNumberNodeValue
    } = useFlowMIPS();
    let label = numberNodes.get(id) ?? data.label;

    const handleInputChange = (event) => {
        updateNumberNodeValue(id, event.target.value);
    };

    return (
        <div
            className={`mips-node ${data.nodeClass}`}
            style={{
                width: `${data.size.width}px`,
                height: `${data.size.height}px`,
            }}
        >
            <CustomNodeToolbar nodeId={id} data={data} handles={data.handles} >
                {data.nodeClass === 'number' &&
                    <input
                        type="text"
                        value={label}
                        onChange={handleInputChange}
                    />
                }
            </CustomNodeToolbar>
            {label}

            <HandlesMapper nodeId={id} handleList={data.handles} isConnectable={isConnectable} />
        </div>
    );
}
