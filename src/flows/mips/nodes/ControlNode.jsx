import {useEffect, useState} from "react";
import { Position, useUpdateNodeInternals} from "@xyflow/react";
import "./common/node-mips-stylesheet.css";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "./common/handles/HandlesMapper.jsx"; // <- Asegúrate de importar el mapper

export default function ControlNode(
    {
        id,
        data,
        isConnectable
    }) {
    const size = {
        width: 160,
        height: 220,
    };
    const [bitsControl, setBitsControl] = useState(5);



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
        iRWriteOutput: getHandlePosition((180) / numHandles.left + 90),

        pcSourceOutput: getHandlePosition((180) / numHandles.right - 90),
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
            bits: bitsControl,
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
            bits: 1,
            label: "IoD",
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
    const [columnName, setColumnName] = useState("");
    const [handleBits, setHandleBits] = useState(1);
    const [dynamicHandles, setDynamicHandles] = useState([]);

    const updateNodeInternals = useUpdateNodeInternals();
    useEffect(() => {
        updateNodeInternals(id);
    }, [dynamicHandles.length, id, updateNodeInternals]);


    const calculateBitsInput = (n) => {
        return Math.max(Math.ceil(Math.log2(n)), 5);
    };
    const handleUpdateBitsInput = () => {
        setBitsControl(calculateBitsInput(handleList.length + dynamicHandles.length))
    }

    const handleAddColumn = () => {
        if (columnName) {
            data.functions.addColumn(columnName); // Llama la función addColumn con el nombre ingresado
        }
        setNumHandles(prevNumHandles => ({
            left: prevNumHandles.left,
            right: prevNumHandles.right + 1,
        }));
        let numberHandle = numHandles.right
        console.log("1",numberHandle);
        console.log("2",numHandles);
        let newHandle = {
                id: `${numberHandle}`,
                type: "source",
                position: Position.Right,
                isConnectable,
                label: columnName,
                bits: handleBits,
                connectioncount: 1,
                style: getHandlePosition((180 * numberHandle) / (numHandles.right + 1) - 90),
                positionInverted: true,
            };
        console.log("bits: ",handleBits);
        setDynamicHandles((prevHandles) => [...prevHandles, newHandle]);
        handleUpdateBitsInput();

    };
    useEffect(() => {
        const updatedHandles = dynamicHandles.map((handle, index) => {
            const newPosition = getHandlePosition((180 * (numHandles.right - index - 1)) / (numHandles.right) - 90);
            return {
                ...handle,
                style: newPosition,
            };
        });

        setDynamicHandles(updatedHandles);
    }, [dynamicHandles.length]);

    const handleRemoveColumn = () => {
        if (columnName) {
            data.functions.removeColumn(columnName);
        }
    };

    const handleUpdateHandleBits = (bits) => {
        setHandleBits(bits);
    }



    return (
        <>
            <CustomNodeToolbar data={data} nodeId={id}>
                <button onClick={handleAddColumn}>Añadir salida</button>
                <input
                    type="text"
                    minLength={1}
                    maxLength={16}
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
                />
                <input
                    type="number"
                    min="1"
                    max="32"
                    value={handleBits}
                    onChange={(e) => setHandleBits(Number(e.target.value))}
                    placeholder="Número de bits"
                />
                <br />
                <button onClick={handleRemoveColumn}>Borrar salida</button>
                <input
                    type="text"
                    minLength={1}
                    maxLength={16}
                    value={columnName}
                    onChange={handleUpdateHandleBits}
                />
            </CustomNodeToolbar>

            <div
                className={"control-node"}
                style={{
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                }}
            >
                    {data.label}

                <HandlesMapper handleList={[...handleList, ...dynamicHandles]} isConnectable={isConnectable} />
            </div>
        </>
    );
}
