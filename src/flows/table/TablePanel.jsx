import {useState} from "react";
import "./table-panel.css"
export default function TablePanel({
                                       headers,
                                       data,
                                       removeColumn,
                                       removeRow,
                                       getRowNumberInBinary,
                                       editCell,
                                       editHeader,
                                   }) {
    const [editingCell, setEditingCell] = useState(null);

    const handleCellChange = (rowIndex, colIndex, e) => {
        editCell(rowIndex, colIndex, e.target.value);
    };

    const handleHeaderChange = (colIndex, e) => {
        editHeader(colIndex, e.target.value);
    };

    return (
        <div className={"table-panel-wrapper"}>
            <div className={"table-controls"}>table controls</div>

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
                                />
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
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
