import { useState } from 'react';

export const useTable = (initialHeaders, initialData) => {
    const [headers, setHeaders] = useState(initialHeaders);
    const [data, setData] = useState(initialData);
    console.log("In state: ",headers);
    console.log("In state: ",data);
    const addColumn = (headerName) => {
        setHeaders([...headers, headerName]);
        setData(data.map(row => [...row, ''])); // Default column value
    };

    const removeColumn = (index) => {
        setHeaders(headers.filter((_, i) => i !== index));
        setData(data.map(row => row.filter((_, i) => i !== index)));
    };

    const addRow = () => {
        const newRow = new Array(headers.length).fill(''); // Default row value
        setData([...data, newRow]);
    };

    const removeRow = (index) => {
        setData(data.filter((_, i) => i !== index));
    };

    const getRowNumberInBinary = (rowIndex) => {
        return rowIndex.toString(2).padStart(4, '0'); // Binary number in 4 digits
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
