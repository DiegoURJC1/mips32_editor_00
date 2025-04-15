import { useState } from "react";
import CustomHandle from "../../../handles/CustomHandle.jsx";
import { NodeToolbar, Position } from "@xyflow/react";
import "./common/node-mips-stylesheet.css";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "./common/handles/HandlesMapper.jsx"; // <- Asegúrate de importar el mapper

export default function ControlNode({ id, data, isConnectable }) {
    const size = {
        width: 160,
        height: 220,
    };

    const centerX = (size.width - 8) / 2;
    const centerY = size.height / 2;
    const radiusX = (size.width - 6) / 2;
    const radiusY = size.height / 2;

    const getHandlePosition = (angleInDegrees) => {
        const angleInRadians = (Math.PI / 180) * angleInDegrees;
        const x = centerX + radiusX * Math.cos(angleInRadians);
        const y = centerY + radiusY * Math.sin(angleInRadians);
        return { top: y, left: x };
    };

    const [numHandles, setNumHandles] = useState({ left: 8, right: 7 });

    const handlePositions = {
        pcWriteCondOutput: getHandlePosition((180 * 7) / numHandles.left + 90),
        pcWriteOutput: getHandlePosition((180 * 6) / numHandles.left + 90),
        iOrDOutput: getHandlePosition((180 * 5) / numHandles.left + 90),
        memReadOutput: getHandlePosition((180 * 4) / numHandles.left + 90),
        memWriteOutput: getHandlePosition((180 * 3) / numHandles.left + 90),
        memToRegOutput: getHandlePosition((180 * 2) / numHandles.left + 90),
        iRWriteOutput: getHandlePosition((180 * 1) / numHandles.left + 90),

        pcSourceOutput: getHandlePosition((180 * 1) / numHandles.right - 90),
        aluOpOutput: getHandlePosition((180 * 2) / numHandles.right - 90),
        aluSrcBOutput: getHandlePosition((180 * 3) / numHandles.right - 90),
        aluSrcAOutput: getHandlePosition((180 * 4) / numHandles.right - 90),
        regWriteOutput: getHandlePosition((180 * 5) / numHandles.right - 90),
        regDstOutput: getHandlePosition((180 * 6) / numHandles.right - 90),
    };

    const handleList = [
        {
            id: "input",
            type: "target",
            position: Position.Bottom,
            bits: 5,
            isConnectable,
            connectioncount: 1,
        },
        {
            id: "pc-write-cond-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "EscPC Cond",
            isConnectable,
            style: handlePositions.pcWriteCondOutput,
            positionInverted: true,
        },
        {
            id: "pc-write-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "EscPC",
            isConnectable,
            style: handlePositions.pcWriteOutput,
            positionInverted: true,
        },
        {
            id: "i-or-d-output",
            type: "source",
            position: Position.Left,
            label: "I o D",
            isConnectable,
            style: handlePositions.iOrDOutput,
            positionInverted: true,
        },
        {
            id: "mem-read-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "LeerMem",
            isConnectable,
            style: handlePositions.memReadOutput,
            positionInverted: true,
        },
        {
            id: "mem-write-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "EscrMem",
            isConnectable,
            style: handlePositions.memWriteOutput,
            positionInverted: true,
        },
        {
            id: "mem-to-reg-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "MemoReg",
            isConnectable,
            style: handlePositions.memToRegOutput,
            positionInverted: true,
        },
        {
            id: "i-r-write-output",
            type: "source",
            position: Position.Left,
            bits: 1,
            label: "EscrIR",
            isConnectable,
            style: handlePositions.iRWriteOutput,
            positionInverted: true,
        },
        {
            id: "pc-source-output",
            type: "source",
            position: Position.Right,
            bits: 1,
            label: "FuentePC",
            isConnectable,
            style: handlePositions.pcSourceOutput,
            positionInverted: true,
        },
        {
            id: "alu-op-output",
            type: "source",
            position: Position.Right,
            bits: 1,
            label: "ALUOp",
            isConnectable,
            style: handlePositions.aluOpOutput,
            positionInverted: true,
        },
        {
            id: "alu-src-b-output",
            type: "source",
            position: Position.Right,
            bits: 2,
            label: "ALUSrcB",
            isConnectable,
            style: handlePositions.aluSrcBOutput,
            positionInverted: true,
        },
        {
            id: "alu-src-a-output",
            type: "source",
            position: Position.Right,
            bits: 1,
            label: "ALUSrcA",
            isConnectable,
            style: handlePositions.aluSrcAOutput,
            positionInverted: true,
        },
        {
            id: "reg-write-output",
            type: "source",
            position: Position.Right,
            bits: 1,
            label: "EscrReg",
            isConnectable,
            style: handlePositions.regWriteOutput,
            positionInverted: true,
        },
        {
            id: "reg-dst-output",
            type: "source",
            position: Position.Right,
            bits: 1,
            label: "RegDest",
            isConnectable,
            style: handlePositions.regDstOutput,
            positionInverted: true,
        },
    ];

    return (
        <>
            <CustomNodeToolbar data={data} nodeId={id}>
                <button>Nueva salida</button>
                <input type={"text"} minLength={1} maxLength={16} />
                <br />
                <button>Borrar salida</button>
                <input type={"text"} minLength={1} maxLength={16} />
            </CustomNodeToolbar>

            <div
                className={"control-node"}
                style={{
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                }}
            >
                    {data.label}

                <HandlesMapper handleList={handleList} isConnectable={isConnectable} />
            </div>
        </>
    );
}
