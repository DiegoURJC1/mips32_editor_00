import React from "react";
import {colors, renderRightAndSvg, renderRightNotSvg, renderRightOrSvg} from "../../assets/svg-nodes/svgNodesData.jsx";
import "./dnd-button.css"


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
    const isDark = props.colorMode === 'dark';

    const { backgroundColor, borderColor } = isDark ? colors.dark : colors.light;
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
            >Nodo Estado</DndButton>
        </>
    );
}