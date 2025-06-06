import "./table-panel.css"
import {useFlowMIPS} from "../../hooks/FlowMIPSContext.jsx";
import BasicButton from "../../modules/basic-button/BasicButton.jsx";
export default function TablePanel() {

    const { headers, tableData, editHeader, editCell, getRowNumberInBinary } = useFlowMIPS();
    const handleCellChange = (rowIndex, colIndex, e) => {
        editCell(rowIndex, colIndex, e.target.value);
    };

    const handleHeaderChange = (colIndex, e) => {
        editHeader(colIndex, e.target.value);
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
