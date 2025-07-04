import React, { useEffect, useMemo } from "react";
import { Position, useUpdateNodeInternals } from "@xyflow/react";

import {
    colorsForInlineSvg,
    logicGateTypes,
    renderLeftAndSvg, renderRightAndSvg,
    renderLeftOrSvg, renderRightOrSvg,
    renderLeftNotSvg, renderRightNotSvg,
} from "../../../assets/svg-nodes/svgNodesData.jsx";

import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import {useThemeContext} from "../../../contexts/ThemeContext.jsx";
import {themes} from "../../../common-data/settings.js";
import {useFlowMIPS} from "../../../contexts/FlowMIPSContext.jsx";
import ButtonWithIconSmall from "../../../modules/button-with-icon-small/ButtonWithIconSmall.jsx";

// Constants
const NODE_HEIGHT = 80;
import flipIcon from "/src/assets/icons/vertical_flip_icon.svg";
// Generates handles for each gate type and orientation
function getHandles(gateType, isLeft, height) {
    const unit = "px";
    const inputPosition = isLeft ? Position.Right : Position.Left;
    const outputPosition = isLeft ? Position.Left : Position.Right;

    switch (gateType) {
        case logicGateTypes.AND:
        case logicGateTypes.OR:
            return [
                {
                    id: "input1",
                    name: "Input 1",
                    type: "target",
                    position: inputPosition,
                    connectioncount: 1,
                    bits: 1,
                    style: { top: `30px` },
                },
                {
                    id: "input2",
                    name: "Input 2",
                    type: "target",
                    position: inputPosition,
                    connectioncount: 1,
                    bits: 1,
                    style: { top: `${height - 30}${unit}` },
                },
                {
                    id: "output",
                    name: "Output",
                    type: "source",
                    position: outputPosition,
                    bits: 1,
                },
            ];
        case logicGateTypes.NOT:
            return [
                {
                    id: "input",
                    name: "Input",
                    type: "target",
                    position: inputPosition,
                    bits: 1,
                    connectioncount: 1,
                },
                {
                    id: "output",
                    name: "Output",
                    type: "source",
                    position: outputPosition,
                    bits: 1,
                },
            ];
        default:
            return [];
    }
}

// Generates SVGs for each gate type
function getSVGs(gateType, bgColor, borderColor, borderWidth) {
    switch (gateType) {
        case logicGateTypes.AND:
            return {
                left: renderLeftAndSvg(bgColor, borderColor, borderWidth),
                right: renderRightAndSvg(bgColor, borderColor, borderWidth),
            };
        case logicGateTypes.OR:
            return {
                left: renderLeftOrSvg(bgColor, borderColor, borderWidth),
                right: renderRightOrSvg(bgColor, borderColor, borderWidth),
            };
        case logicGateTypes.NOT:
            return {
                left: renderLeftNotSvg(bgColor, borderColor, borderWidth),
                right: renderRightNotSvg(bgColor, borderColor, borderWidth),
            };
        default:
            return { left: null, right: null };
    }
}

const LogicGateNode = React.memo(function LogicGateNode({ id, data, isConnectable }) {
    const { theme } = useThemeContext();
    const updateNodeInternals = useUpdateNodeInternals();
    const { logicGateOrientation, setOrientation } = useFlowMIPS();

    const isLeftOriented = logicGateOrientation.get(id) ?? false;

    // Update handles when orientation changes
    useEffect(() => {
        updateNodeInternals(id);
    }, [isLeftOriented, id, updateNodeInternals]);

    const handleToggleOrientation = () => {
        setOrientation(id, !isLeftOriented);
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

    const borderWidth = useMemo(() => {
        return getComputedStyle(document.documentElement)
            .getPropertyValue("--border-width")
            .trim();
    }, []);

    const handleList = useMemo(() => {
        return getHandles(data.type, isLeftOriented, NODE_HEIGHT);
    }, [data.type, isLeftOriented]);

    const { left: leftSVG, right: rightSVG } = useMemo(() => {
        return getSVGs(data.type, backgroundColor, borderColor, borderWidth);
    }, [data.type, backgroundColor, borderColor, borderWidth]);

    return (
        <div
            className="logic-gate-node"
            style={{
                height: `${NODE_HEIGHT}px`,
            }}
        >
            {isLeftOriented ? leftSVG : rightSVG}

            <CustomNodeToolbar data={data} handles={handleList} nodeId={id}>
                <ButtonWithIconSmall onClick={handleToggleOrientation} icon={flipIcon}/>
            </CustomNodeToolbar>

            <HandlesMapper handleList={handleList} isConnectable={isConnectable} />
        </div>
    );
});

export default LogicGateNode;
