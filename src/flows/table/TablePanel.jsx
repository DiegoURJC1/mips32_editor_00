import "./table-panel.css"
import {useFlowMIPS} from "../../contexts/FlowMIPSContext.jsx";
import BasicButton from "../../modules/basic-button/BasicButton.jsx";
import {statesDataCopy} from "../../common-data/statesData.js";
export default function TablePanel() {
    const originalStatesTableData = statesDataCopy;
    const { headers, tableData, editHeader, editCell, getRowNumberInBinary, dynamicHeadersData, editHeader2 } = useFlowMIPS();
    const handleCellChange = (rowIndex, colIndex, e) => {
        let value = e.target.value;

        // Si escribe más de un carácter, solo tomamos el último ingresado
        if (value.length > 1) {
            value = value.slice(-1);
        }

        // Convertir 'x' en 'X'
        if (value === 'x') value = 'X';

        // Solo permitir '', '0', '1', 'X'
        if (['', '0', '1', 'X'].includes(value)) {
            editCell(rowIndex, colIndex, value);
        }
    };



    const handleHeaderChange = (colIndex, e) => {
        editHeader2(colIndex, e.target.value);
    };

    const downloadCSV = () => {
        const csvRows = [];

        // Encabezados
        csvRows.push(['', ...headers].join(','));

        // Filas con datos
        tableData.forEach((row, rowIndex) => {
            csvRows.push([getRowNumberInBinary(rowIndex), ...row].join(','));
        });

        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'tabla_mips.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={"table-panel-wrapper"}>
            <div className={"table-controls"}>
                <BasicButton onClick={downloadCSV}>Descargar CSV</BasicButton>
            </div>

            <div className={"table-content"}>
                <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                    <thead>
                    <tr>
                        <th></th>
                        {headers.map((header, idx) => (
                            <th key={idx}>
                                <input
                                    className={"input-table-value"}
                                    type="text"
                                    value={header}
                                    onChange={(e) => handleHeaderChange(idx, e)}
                                    disabled={idx < 16}
                                />
                            </th>
                        ))}
                        {dynamicHeadersData.map((header, idx) => (
                            <th key={header.id + header.assignedBit}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        className={"input-table-value"}
                                        type="text"
                                        value={header.label}
                                        onChange={(e) => handleHeaderChange(idx, e)}
                                        disabled={idx + 16 < 16}
                                    />
                                    {header.bits !== 1 && (
                                        <div className={"assigned-bit"}>{header.assignedBit}</div>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{getRowNumberInBinary(rowIndex)}</td>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>
                                    <input
                                        className={"input-table-value"}
                                        type="text"
                                        value={cell}
                                        onChange={(e) => handleCellChange(rowIndex, colIndex, e)}
                                        disabled={
                                            originalStatesTableData.length > rowIndex &&
                                            originalStatesTableData[0].length > colIndex &&
                                            originalStatesTableData[rowIndex][colIndex] !== 'X' &&
                                            rowIndex < 10 && colIndex < 16}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
