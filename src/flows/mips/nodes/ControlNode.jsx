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
        addDynamicHandle,
        removeDynamicHandle,

        staticControlHandleInput,
        staticControlHandles,

        dynamicControlHandles,
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

        // Si el campo está vacío, se permite
        if (value === "") {
            setHandleBits("");
            return;
        }

        // Si el valor es un número válido
        if (!isNaN(value)) {
            setHandleBits(Number(value));
        }
    };

    useEffect(() => {
        data.handles = [...staticControlHandleInput, ...staticControlHandles, ...dynamicControlHandles];
        updateNodeInternals(id);
    }, [staticControlHandles, dynamicControlHandles, data, id, updateNodeInternals]);

    const handles = Array.isArray(data.handles) ? data.handles : [];
    return (
        <>
            <CustomNodeToolbar data={data} nodeId={id} handles={data.handles}>
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
                        type="text"
                        value={handleBits}
                        onChange={handleChange}
                        placeholder={"Número de bits"}
                        style={{width: '100px'}}
                    />
                    <ButtonWithTextSmall
                        onClick={() => addDynamicHandle({ label: columnName, bits: handleBits })}
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
                        onClick={() => removeDynamicHandle(columnName)}
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

                <HandlesMapper handleList={handles} isConnectable={isConnectable} />
            </div>
        </>
    );
}
