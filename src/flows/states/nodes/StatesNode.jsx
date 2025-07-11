import React from 'react'
import { Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import CustomNodeToolbar from "../../mips/nodes/common/node-toobar/CustomNodeToolbar.jsx";
import "./common/node-states-stylesheet.css"
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import { useFlowMIPS } from "../../../contexts/FlowMIPSContext.jsx";

export default function StatesNode({ id, data, isConnectable }) {
    const {
        tableData,
        staticControlHandles,
        dynamicControlHandles,
        sumStaticHandleBits,
        sumDynamicHandleBits,
        sumBitsBeforeStaticLabel,
        sumBitsBeforeDynamicLabel,
        sumAllHandleBits,

    } = useFlowMIPS();
    const size = {
        width: 60,
        height: 60,
    };
    const { getNode } = useReactFlow();
    const connections = useNodeConnections({ id, handleType: 'target' });

    const handleList = [
        {
            id: "output",
            type: "source",
            position: Position.Bottom,
            connectioncount: null,
            label: null,
            name: "Salida"
        },
        {
            id: "input",
            type: "target",
            position: Position.Top,
            connectioncount: null,
            label: null,
            name: "Entrada"
        },
    ];

    function generateLabel() {
        const index = data.statesNumber;
        const currentRow = tableData[index];
        const labelLines = [];

        if (!currentRow) return '';

        let shiftBits = 0; // Mantiene el desplazamiento de los bits
        let tempBits = ''; // Para almacenar los bits concatenados

        // Función para comprobar si todos los valores son 'X'
        function isAllX(bits) {
            return bits.split('').every(bit => bit === 'X');
        }

        // Procesar los headers estáticos
        if (index === 0) {
            staticControlHandles.concat(dynamicControlHandles).forEach((header) => {
                const { label, bits } = header;
                // Si tiene más de 1 bit, concatenamos los valores de las celdas correspondientes
                if (bits && bits > 1) {
                    tempBits = ''; // Restablecemos tempBits para cada nuevo conjunto de bits

                    // Concatenar los valores correspondientes a los bits
                    for (let j = shiftBits; j < bits + shiftBits; j++) {
                        const value = currentRow[j];

                        // Verificamos que el valor no sea undefined ni null
                        if (value !== undefined && value !== null) {
                            tempBits += String(value);
                        } else {
                            tempBits += '';
                        }
                    }

                    // Verificar si la secuencia es solo 'X', si es así, no la mostramos
                    if (!isAllX(tempBits)) {
                        labelLines.push(`${label} = ${tempBits}`);
                    }
                } else {
                    // Si solo tiene un bit, lo mostramos (incluyendo cuando es 0)
                    const value = currentRow[shiftBits] !== undefined ? String(currentRow[shiftBits]) : '0'; // Aseguramos que el valor se muestre
                    if (value !== 'X')
                        labelLines.push(`${label} = ${value}`);
                }

                // Actualizamos el desplazamiento de los bits
                shiftBits += bits;
            });
        } else {
            shiftBits = 0; // Mantiene el desplazamiento de los bits
            tempBits = '';

            // Obtener las filas de las conexiones entrantes
            const connectedRows = connections
                .map(conn => {
                    const node = getNode(conn.source);
                    if (node && node.data && typeof node.data.statesNumber !== 'undefined') {
                        return tableData[node.data.statesNumber];
                    }
                    return null;
                })
                .filter(Boolean);

            staticControlHandles.concat(dynamicControlHandles).forEach((header) => {
                const { label, bits } = header;

                // Si tiene más de 1 bit
                if (bits && bits > 1) {
                    tempBits = '';

                    // Concatenar los valores correspondientes a los bits del nodo actual
                    for (let j = shiftBits; j < bits + shiftBits; j++) {
                        const value = currentRow[j];

                        // Verificamos que el valor no sea undefined ni null
                        if (value !== undefined && value !== null) {
                            tempBits += String(value);
                        } else {
                            tempBits += '';
                        }
                    }

                    // Ahora comparamos la secuencia de bits de la fila actual con las filas de los nodos conectados
                    const allEqual = connectedRows.every(row => {
                        const connectedBits = row.slice(shiftBits, shiftBits + bits).join('');
                        return connectedBits === tempBits; // Comparamos la secuencia completa de bits
                    });

                    // Verificar si la secuencia es solo 'X', si es así, no la mostramos
                    if (!isAllX(tempBits) && !allEqual) {
                        labelLines.push(`${label} = ${tempBits}`);
                    }
                } else {
                    const currentVal = currentRow[shiftBits];

                    if (currentVal !== 'X') {
                        const allEqual = connectedRows.every(row => {
                            return row[shiftBits]?.toString() === currentVal.toString();
                        });

                        // Si solo tiene un bit, lo mostramos (incluyendo cuando es 0)
                        const value = currentRow[shiftBits] !== undefined ? String(currentRow[shiftBits]) : '0'; // Aseguramos que el valor se muestre

                        // Verificar si el valor es distinto de 'X' y si los valores son diferentes entre las conexiones entrantes
                        if (!allEqual) {
                            labelLines.push(`${label} = ${value}`);
                        }
                    }
                }

                // Actualizamos el desplazamiento de los bits
                shiftBits += bits;
            });
        }

        return labelLines.join('\n');
    }






    return (
        <>
            <div className="state-number">
                {data.statesNumber}
            </div>
            <div
                className="states-node"
                style={{
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                }}
            >
                <CustomNodeToolbar
                    data={data}
                    handles={handleList}
                    nodeId={id}
                >
                    <div className="state-text-toolbar">
                        {generateLabel().split('\n').map((line, idx) => {
                            const isEmptyLine = line.trim() === '' || line.match(/= *$/);
                            return (
                                <React.Fragment key={idx}>
                                    <span style={{ color: isEmptyLine ? 'var(--negation-color)' : undefined }}>
                                        {line}
                                    </span>
                                    <br />
                                </React.Fragment>
                            );
                        })}
                    </div>
                </CustomNodeToolbar>
                <div className="state-text">
                    {generateLabel().split('\n').map((line, idx) => {
                        const isEmptyLine = line.trim() === '' || line.match(/= *$/);
                        return (
                            <React.Fragment key={idx}>
                                <span style={{ color: isEmptyLine ? 'var(--negation-color)' : undefined }}>
                                    {line}
                                </span>
                                <br />
                            </React.Fragment>
                        );
                    })}
                </div>
                <HandlesMapper
                    handleList={handleList}
                    isConnectable={isConnectable}
                />
            </div>
        </>
    );
}
