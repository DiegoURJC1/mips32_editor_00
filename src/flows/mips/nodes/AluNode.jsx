import React from "react";
import { Position } from "@xyflow/react";
import "./common/node-mips-stylesheet.css";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "./common/handles/HandlesMapper.jsx";
import {colors, renderAluSvg} from "../../../assets/svg-nodes/svgNodesData.jsx";
import {getAluHandles} from "./common/handles/handleLists.js";

export default function AluNode({ id, data, isConnectable }) {

    let mul = 5;
    const size = {
        width: 28*mul,
        height: 32*mul,
    };

    const isDark = data.colorMode === 'dark';

    const { backgroundColor, borderColor } = isDark ? colors.dark : colors.light;


    const handleList = getAluHandles(size);

    const borderWidth = getComputedStyle(document.documentElement).getPropertyValue('--border-width').trim();


    return (
        <div
            className={"alu-node"}
            style={{
                width: `${size.width}px`,
                height: `${size.height}px`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <div
                className="alu-label"
            >
                {data.label}
            </div>

            <CustomNodeToolbar
                data={data}
                handles={handleList}
                nodeId={id}
            />

            {renderAluSvg(backgroundColor, borderColor, borderWidth)}

            <HandlesMapper
                handleList={handleList}
                isConnectable={isConnectable}
            />
        </div>
    );
}
