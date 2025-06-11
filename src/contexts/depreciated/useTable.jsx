import {useState} from 'react';

export const useTable = (initialHeaders, initialData) => {
    const [headers, setHeaders] = useState(initialHeaders);
    const [data, setData] = useState(initialData);

    const addColumn = (headerName) => {
        if (headers.includes(headerName)) {
            console.warn(`Column "${headerName}" already exists.`);
            return;
        }

        setHeaders([...headers, headerName]);
        setData(data.map(row => [...row, '']));
    };

    const removeColumn = (headerName) => {
        const columnIndex = headers.indexOf(headerName);

        if (columnIndex !== -1) {
            setHeaders(headers.filter((_, i) => i !== columnIndex));
            setData(data.map(row => row.filter((_, i) => i !== columnIndex)));
        } else {
            console.warn(`Column "${headerName}" does not exist.`);
        }
    };

    const addRow = () => {
        const newRow = new Array(headers.length).fill(''); // Valor predeterminado para la nueva fila
        setData([...data, newRow]);
    };

    const removeRow = (index) => {
        setData(data.filter((_, i) => i !== index));
    };

    const getRowNumberInBinary = (rowIndex) => {
        return rowIndex.toString(2).padStart(4, '0'); // Número binario en 4 dígitos
    };

    const editCell = (rowIndex, colIndex, newValue) => {
        const newData = [...data];
        newData[rowIndex][colIndex] = newValue;
        setData(newData);
    };

    const editHeader = (colIndex, newHeader) => {
        const newHeaders = [...headers];
        newHeaders[colIndex] = newHeader;
        setHeaders(newHeaders);
    };

    return {
        headers,
        data,
        addColumn,
        removeColumn,
        addRow,
        removeRow,
        getRowNumberInBinary,
        editCell,
        editHeader
    };
};
