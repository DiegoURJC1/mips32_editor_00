import React from "react";
import "./common/node-mips-stylesheet.css";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import {colorsForInlineSvg, renderAluSvg} from "../../../assets/svg-nodes/svgNodesData.jsx";
import {getAluHandles} from "./common/handles/handleLists.js";
import {useThemeContext} from "../../../hooks/ThemeContext.jsx";
import {themes} from "../../../common-data/settings.js";

export default function AluNode({ id, data, isConnectable }) {
    const { theme } = useThemeContext();

    let mul = 5;
    const size = {
        width: 28*mul,
        height: 32*mul,
    };

    let backgroundColor, borderColor;

    switch (theme) {
        case themes.light:
            backgroundColor = colorsForInlineSvg.light.backgroundColor;
            borderColor = colorsForInlineSvg.light.borderColor;
            break;
        case themes.dark:
            backgroundColor = colorsForInlineSvg.dark.backgroundColor;
            borderColor = colorsForInlineSvg.dark.borderColor;
            break;
    }


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
