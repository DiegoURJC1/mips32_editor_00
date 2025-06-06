import React from "react";
import {colorsForInlineSvg, renderRightAndSvg, renderRightNotSvg, renderRightOrSvg} from "../../assets/svg-nodes/svgNodesData.jsx";
import "./dnd-button.css"
import {themes} from "../../common-data/settings.js";
import {useThemeContext} from "../../hooks/ThemeContext.jsx";


export default function DndButton(props) {
    return (
        <div
            className="dnd-node-wrapper"
            onDragStart={(event) =>
                props.onDragStart(event, props.nodeId)} draggable
        >
            <div className={"dnd-button-icon"}>
                {props.children}
            </div>

            <div className={"dnd-button-label"}>
                {props.label}
            </div>

        </div>
    );
}

export function DnDButtonsMips(props) {
    const { theme } = useThemeContext();
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
    const borderWidth = getComputedStyle(document.documentElement).getPropertyValue('--border-width').trim();

    return (
        <>
            <DndButton
                nodeId={'multiplexer'}
                onDragStart={props.onDragStart}
                label={'Mul'}
            ><div
                className={"mips-node multiplexer"}
                style={{
                    width: '20px',
                    height: '40px',
                }}
            >

            </div></DndButton>
            <DndButton
                nodeId={'number'}
                onDragStart={props.onDragStart}
                label={'Número'}
            ><div
                className={"mips-node number"}
                style={{
                    width: '30px',
                    height: '30px',
                }}
            >

            </div></DndButton>
            <DndButton
                colorMode={props.colorMode}
                nodeId={'and'}
                onDragStart={props.onDragStart}
                label={'AND'}
            >
                {renderRightAndSvg(backgroundColor, borderColor, borderWidth)}
            </DndButton>
            <DndButton
                nodeId={'or'}
                onDragStart={props.onDragStart}
                label={'OR'}
            >
                {renderRightOrSvg(backgroundColor, borderColor, borderWidth)}
            </DndButton>
            <DndButton
                nodeId={'not'}
                onDragStart={props.onDragStart}
                label={'NOT'}
            >
                {renderRightNotSvg(backgroundColor, borderColor, borderWidth)}
            </DndButton>
        </>
    );
}

export function DnDButtonsStates(props) {
    return (
        <>
            <DndButton
                nodeId={'state'}
                onDragStart={props.onDragStart}
                label={"Estado"}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 32 32"
                >
                    <circle
                        cx="50%"
                        cy="50%"
                        r="14px"
                        style={{
                            fill: "var(--background-color)",
                            stroke: "var(--border-color)",
                            strokeWidth: "var(--border-width)",
                            vectorEffect: 'non-scaling-stroke',
                        }}
                    />
                </svg>
            </DndButton>
        </>
    );
}