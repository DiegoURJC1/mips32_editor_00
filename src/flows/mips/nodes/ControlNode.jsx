import {useEffect, useState} from "react";
import { Position, useUpdateNodeInternals} from "@xyflow/react";
import "./common/node-mips-stylesheet.css";
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import {useFlowMIPS} from "../../../hooks/FlowMIPSContext.jsx";

export default function ControlNode(
    {
        id,
        data,
        isConnectable
    }) {

    const {
        staticControlHandleInput,
        staticControlHandles,
        updateStaticHandleBits,

        dynamicControlHandles,
        addDynamicHandle,
        removeDynamicHandle,
        updateDynamicHandleBits,
        updateDynamicHandleSide,
        updateDynamicHandleLabel,
    } = useFlowMIPS();
    const size = {
        width: 160,
        height: 220,
    };

    const [columnName, setColumnName] = useState("");
    const [handleBits, setHandleBits] = useState(1);

    const updateNodeInternals = useUpdateNodeInternals();
    useEffect(() => {
        updateNodeInternals(id);
        data.handles = [...staticControlHandles, ...dynamicControlHandles];
    }, [dynamicControlHandles.length, id, updateNodeInternals]);

    const handleChange = (event) => {
        const value = event.target.value;
        // Verificamos si el valor es un número antes de actualizar el estado
        if (!isNaN(value)) {
            setHandleBits(Number(value)); // Convertimos el valor a número antes de guardarlo
        }
    };
    return (
        <>
            <CustomNodeToolbar data={data} nodeId={id}>
                <button onClick={() => addDynamicHandle({ label: columnName, bits: handleBits })}>Añadir salida</button>
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
                    onChange={handleChange}
                    placeholder="Número de bits"
                />
                <br />
                <button onClick={() => removeDynamicHandle(columnName)}>Borrar salida</button>
                <input
                    type="text"
                    minLength={1}
                    maxLength={16}
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
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

                <HandlesMapper handleList={[...staticControlHandleInput, ...staticControlHandles, ...dynamicControlHandles]} isConnectable={isConnectable} />
            </div>
        </>
    );
}
