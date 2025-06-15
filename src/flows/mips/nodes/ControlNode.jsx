import {useEffect, useState} from "react";
import { Position, useUpdateNodeInternals} from "@xyflow/react";
import "./common/node-mips-stylesheet.css";
import "./control-node-toolbar.css"
import CustomNodeToolbar from "./common/node-toobar/CustomNodeToolbar.jsx";
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import {useFlowMIPS} from "../../../contexts/FlowMIPSContext.jsx";
import ButtonWithIconSmall, {
    ButtonWithTextSmall
} from "../../../modules/button-with-icon-small/ButtonWithIconSmall.jsx";
import BasicInputSmall from "../../../modules/basic-input-small/BasicInputSmall.jsx";

export default function ControlNode(
    {
        id,
        data,
        isConnectable
    }) {

    const {

        dynamicHeadersData,
        addDynamicHandle2,removeDynamicHandle2,

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
    }, [data, dynamicControlHandles, dynamicControlHandles.length, id, staticControlHandles, updateNodeInternals]);

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
                <div className={"add-handle-wrapper"}>
                    <BasicInputSmall
                        type="text"
                        minLength={1}
                        maxLength={16}
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                        style={{maxWidth: '120px', marginRight: '2px'}}
                        placeholder={"Nombre de salida"}
                    />
                    <BasicInputSmall
                        type="number"
                        min="1"
                        max="32"
                        value={handleBits}
                        onChange={handleChange}
                        placeholder={"Número de bits"}
                    />
                    <ButtonWithTextSmall
                        onClick={() => addDynamicHandle2({ label: columnName, bits: handleBits })}
                    >Añadir salida</ButtonWithTextSmall>
                </div>
                <div className={"remove-handle-wrapper"}>
                    <BasicInputSmall
                        type="text"
                        minLength={1}
                        maxLength={16}
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                        style={{maxWidth: '120px'}}
                        placeholder={"Nombre de salida"}
                    />
                    <ButtonWithTextSmall
                        onClick={() => removeDynamicHandle2(columnName)}
                    >Borrar salida</ButtonWithTextSmall>
                </div>
            </CustomNodeToolbar>

            <div
                className={"control-node"}
                style={{
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                }}
            >
                    {data.label}

                <HandlesMapper handleList={[...staticControlHandleInput, ...staticControlHandles, ...dynamicHeadersData]} isConnectable={isConnectable} />
            </div>
        </>
    );
}
