import { useState } from "react";
import { headders, statesData } from "../../common-data/statesData.js";
import "./table-panel.css";

export default function TablePanel(props) {
    const [headers, setHeaders] = useState(headders);
    const [tableData, setTableData] = useState(
        statesData.map((rowData) => {
            const rowObj = {};
            headers.forEach((header, index) => {
                // Cambiar -1 por 'X' para la visualización
                rowObj[header] = rowData[index] === -1 ? "X" : rowData[index];
            });
            return rowObj;
        })
    );

    const [editingCell, setEditingCell] = useState(null); // Estado para la celda que está siendo editada
    const [newValue, setNewValue] = useState(""); // Estado para almacenar el nuevo valor
    const [previousValue, setPreviousValue] = useState(""); // Estado para almacenar el valor anterior de la celda

    // Función para manejar el click en una celda para editar
    const handleCellClick = (rowIndex, header) => {
        setEditingCell({ rowIndex, header });
        setPreviousValue(tableData[rowIndex][header]); // Guardar el valor anterior
        setNewValue(tableData[rowIndex][header]); // Inicializa el valor del input con el valor actual de la celda
    };

    // Función para manejar el cambio del valor en el input
    const handleInputChange = (e) => {
        let value = e.target.value.toUpperCase(); // Convierte la entrada a mayúsculas
        setNewValue(value); // Actualiza el valor del input mientras se escribe
    };

    // Función para manejar el guardado de los cambios
    const handleSaveChange = () => {
        if (editingCell) {
            const { rowIndex, header } = editingCell;

            // Validación solo al salir del input, cuando se guarda el cambio
            let updatedValue = newValue;
            // Validar solo '1', '0' o 'X'
            if (["1", "0", "X"].includes(updatedValue)) {
                if (updatedValue === "X") {
                    updatedValue = -1; // Convertir 'X' a -1
                }
                // Si el valor es válido, lo actualizamos
                const updatedTableData = [...tableData];
                updatedTableData[rowIndex][header] = updatedValue;
                setTableData(updatedTableData);
            } else {
                // Si el valor no es válido, restauramos el valor anterior
                const updatedTableData = [...tableData];
                updatedTableData[rowIndex][header] = previousValue;
                setTableData(updatedTableData);
            }
            setEditingCell(null); // Dejar de editar la celda
        }
    };

    // Función para añadir una columna
    const addColumn = () => {
        if (headers.length <= 20) {
            const newHeader = `Columna ${headers.length + 1}`; // Nombre para la nueva columna
            setHeaders([...headers, newHeader]); // Agregar la cabecera nueva

            // Modificar los datos para agregar la nueva columna
            const newData = tableData.map((row) => ({
                ...row,
                [newHeader]: `X`, // Agregar un dato por fila
            }));

            setTableData(newData); // Actualizar las filas de datos
        }
    };

    // Función para eliminar una columna
    const removeColumn = () => {
        if (headers.length >= 17) {
            const updatedHeaders = headers.slice(0, -1); // Eliminar la última cabecera
            setHeaders(updatedHeaders);

            // Eliminar los datos correspondientes a la columna eliminada
            const updatedTableData = tableData.map((row) => {
                const updatedRow = { ...row };
                delete updatedRow[headers[headers.length - 1]]; // Eliminar la columna correspondiente
                return updatedRow;
            });

            setTableData(updatedTableData);
        }
    };

    return (
        <div className={"table-panel-wrapper"}>
            <div className={"table-controls"}>
                <button
                    onClick={addColumn}
                    disabled={headers.length >= 20}
                >
                    Añadir Columna
                </button>
                <button
                    onClick={removeColumn}
                    disabled={headers.length < 17}
                >
                    Eliminar Columna
                </button>
            </div>
            <div className={"table-content"}>
                <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                    <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td
                                    key={colIndex}
                                    onClick={() => handleCellClick(rowIndex, header)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {editingCell && editingCell.rowIndex === rowIndex && editingCell.header === header ? (
                                        <input
                                            className={"input-table-value"}
                                            type="text"
                                            value={newValue}
                                            onChange={handleInputChange}
                                            onBlur={handleSaveChange} // Guardar al perder el foco
                                            autoFocus
                                            maxLength={1} // Limitar la longitud a un solo carácter
                                        />
                                    ) : (
                                        // Si el valor es -1, mostrar X en lugar de -1
                                        row[header] === -1 ? "X" : row[header]
                                    )}
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
