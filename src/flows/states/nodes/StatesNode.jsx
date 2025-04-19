import React from 'react'
import {Position, useNodeConnections, useReactFlow} from "@xyflow/react";
import CustomNodeToolbar from "../../mips/nodes/common/node-toobar/CustomNodeToolbar.jsx";
import "./common/node-states-stylesheet.css"
import HandlesMapper from "../../../handles/HandlesMapper.jsx";

export default function StatesNode({id, data, isConnectable}) {
    const size = {
        width: 60,
        height: 60,
    };
    const { getNode } = useReactFlow();
    const connections = useNodeConnections({id,  handleType: 'target' });

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
    ]


    function generateLabel() {
        const index = data.statesNumber;
        const currentRow = data.data[index];
        const labelLines = [];

        if (!currentRow) return '';

        const binaryGroups = {}; // { base: [{ index, bit }] }
        const nonBinary = [];

        // Clasificamos los encabezados
        data.headers.forEach((header, i) => {
            const match = header.match(/^([a-zA-Z_]+)(\d+)$/);
            if (match) {
                const base = match[1];
                if (!binaryGroups[base]) binaryGroups[base] = [];
                binaryGroups[base].push({ index: i, bit: parseInt(match[2], 10) });
            } else {
                nonBinary.push({ header, index: i });
            }
        });

        // Ordenar bits por su número para que el orden binario sea correcto
        for (const base in binaryGroups) {
            binaryGroups[base].sort((a, b) => a.bit - b.bit);
        }

        // Si es el primer nodo
        if (index === 0) {
            // Mostrar todo lo que no sea 'X'
            for (const { header, index: i } of nonBinary) {
                const val = currentRow[i];
                if (val !== 'X') {
                    labelLines.push(`${header} = ${val}\n`);
                }
            }

            for (const base in binaryGroups) {
                const bits = binaryGroups[base];
                const value = bits.map(({ index }) => currentRow[index]).join('');
                if (!/^X+$/.test(value)) {
                    labelLines.push(`${base} = ${value}\n`);
                }
            }

            return labelLines.join('');
        }

        // Obtener filas de todos los nodos conectados
        const connectedRows = connections
            .map(conn => {
                const node = getNode(conn.source);
                if (node && node.data && typeof node.data.statesNumber !== 'undefined') {
                    return data.data[node.data.statesNumber];
                }
                return null;
            })
            .filter(Boolean); // Quitamos nulos

        // Comparar los valores no binarios
        for (const { header, index: i } of nonBinary) {
            const currentVal = currentRow[i];
            if (currentVal === 'X') continue;
            const allEqual = connectedRows.every(row => row[i]?.toString() === currentVal.toString());
            if (!allEqual) {
                labelLines.push(`${header} = ${currentVal}\n`);
            }
        }

        // Comparar valores binarios combinados
        for (const base in binaryGroups) {
            const bits = binaryGroups[base];
            const currentValue = bits
                .map(({ index }) => currentRow[index])
                .reverse() // 👈 esto invierte los bits
                .join('');
            if (/^X+$/.test(currentValue)) continue; // No mostramos si todos son 'X'


            const allEqual = connectedRows.every(row => {
                const comparedValue = bits
                    .map(({ index }) => row[index])
                    .reverse() // 👈 también invertimos aquí
                    .join('');
                return comparedValue === currentValue;
            });


            if (!allEqual) {
                labelLines.push(`${base} = ${currentValue}\n`);
            }
        }

        return labelLines.join('');
    }


    return (
        <>
            <div className={"state-number"}>
                {data.statesNumber}
            </div>
            <div
                className={"states-node"}
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
                    <div className="states-text" style={{ fontSize: `10px` }}>
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
                <div className="states-text" style={{ fontSize: `4px` }}>
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