import {Position} from "@xyflow/react";
import "./test-node.css"
import CustomHandle from "../../../../../handles/CustomHandle.jsx";
export default function TestNode({data, isConnectable}) {
    return (
        <div className={"test-node-wrapper"} style={{width:data.width, height:data.height}}>
            {data.label}
            <CustomHandle
                id="output"
                type={"source"}
                position={Position.Right}
                isConnectable={isConnectable}
                label={"Right"}
            />
            <CustomHandle
                id="input"
                type={"target"}
                position={Position.Left}
                isConnectable={isConnectable}
                label={"left"}
            />
            <CustomHandle
                id="customHandle2"
                type={"target"}
                position={Position.Top}
                connectioncount={2}
                label={"top One"}
            />
            <CustomHandle
                id="customHandle3"
                type={"target"}
                position={Position.Bottom}
                connectioncount={2}
                label={"Bottom one"}
            />
        </div>
    )
}