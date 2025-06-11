import React from 'react'
import { Position, useNodeConnections, useReactFlow } from "@xyflow/react";
import CustomNodeToolbar from "../../mips/nodes/common/node-toobar/CustomNodeToolbar.jsx";
import "./common/node-states-stylesheet.css"
import HandlesMapper from "../../../handles/HandlesMapper.jsx";
import { useFlowMIPS } from "../../../contexts/FlowMIPSContext.jsx";

export default function StatesNode({ id, data, isConnectable }) {
    const { headers, tableData, dynamicHeadersData } = useFlowMIPS();
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

        const binaryGroups = {}; // { base: [{ index, bit }] }
        const nonBinary = [];

        // Procesar headers estáticos
        headers.forEach((header, i) => {
            const match = header.match(/^([a-zA-Z_]+)(\d+)$/);
            if (match) {
                const base = match[1];
                const bit = parseInt(match[2], 10);
                if (!binaryGroups[base]) binaryGroups[base] = [];
                binaryGroups[base].push({ index: i, bit });
            } else {
                nonBinary.push({ label: header, index: i });
            }
        });

        // Procesar headers dinámicos
        dynamicHeadersData.forEach((header, i) => {
            const globalIndex = i + 16;
            const { label, assignedBit, bits } = header;

            if (bits && bits > 1 && assignedBit !== undefined) {
                if (!binaryGroups[label]) binaryGroups[label] = [];
                binaryGroups[label].push({ index: globalIndex, bit: assignedBit });
            } else {
                nonBinary.push({ label, index: globalIndex });
            }
        });

        // Ordenar los bits por bit de mayor a menor (más significativo primero)
        for (const base in binaryGroups) {
            binaryGroups[base].sort((a, b) => b.bit - a.bit);
        }

        if (index === 0) {
            for (const { label, index: i } of nonBinary) {
                const val = currentRow[i];
                if (val !== 'X') {
                    labelLines.push(`${label} = ${val}\n`);
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

        const connectedRows = connections
            .map(conn => {
                const node = getNode(conn.source);
                if (node && node.data && typeof node.data.statesNumber !== 'undefined') {
                    return tableData[node.data.statesNumber];
                }
                return null;
            })
            .filter(Boolean);

        for (const { label, index: i } of nonBinary) {
            const currentVal = currentRow[i];
            if (currentVal === 'X') continue;
            const allEqual = connectedRows.every(row => row[i]?.toString() === currentVal.toString());
            if (!allEqual) {
                labelLines.push(`${label} = ${currentVal}\n`);
            }
        }

        for (const base in binaryGroups) {
            const bits = binaryGroups[base];
            const currentValue = bits.map(({ index }) => currentRow[index]).join('');
            if (/^X+$/.test(currentValue)) continue;

            const allEqual = connectedRows.every(row => {
                const comparedValue = bits.map(({ index }) => row[index]).join('');
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
