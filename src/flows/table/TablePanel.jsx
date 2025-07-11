import "./table-panel.css";
import { useFlowMIPS } from "../../contexts/FlowMIPSContext.jsx";
import BasicButton from "../../modules/basic-button/BasicButton.jsx";
//import { ReactComponent as DownloadIcon } from "/src/assets/icons/download.svg";

export default function TablePanel() {
    const {
        tableData,
        tableDataReference,
        editHeader,
        editCell,
        getRowNumberInBinary,

        staticControlHandles,
        dynamicControlHandles,

        changeStaticHandleBits,
        sumStaticHandleBits,

        editHeader2
    } = useFlowMIPS();

    console.log("Suma de bits estáticos:", sumStaticHandleBits());

    // Crear staticHeadersData y dynamicHeadersData a partir de staticControlHandles y dynamicControlHandles
    const staticHeadersData = staticControlHandles.map(handle => ({
        label: handle.label,
        bits: handle.bits
    }));

    const dynamicHeadersData = dynamicControlHandles.map(handle => ({
        label: handle.label,
        bits: handle.bits
    }));

    console.log("Datos de encabezados estáticos:", staticHeadersData);
    console.log("Datos de encabezados dinámicos:", dynamicHeadersData);

    // Función para generar encabezados con la cantidad de bits correspondiente
    const generateHeaderLabels = (header) => {
        const labels = [];
        const bits = header.bits;

        if (bits > 1) {
            // Generar los encabezados para más de 1 bit (de n-1 a 0)
            for (let i = bits - 1; i >= 0; i--) {
                labels.push(`${header.label}${i}`);
            }
        } else {
            // Si el bits es 1, solo mostramos el label
            labels.push(header.label);
        }

        return labels;
    };

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

        // 1. Construir encabezados combinando estáticos y dinámicos
        const allHeaderLabels = [];

        staticHeadersData.forEach(header => {
            const labels = generateHeaderLabels(header);
            allHeaderLabels.push(...labels);
        });

        dynamicHeadersData.forEach(header => {
            const labels = generateHeaderLabels(header);
            allHeaderLabels.push(...labels);
        });

        // Añadir primera fila con encabezados (primer campo vacío para el índice binario)
        csvRows.push(['', ...allHeaderLabels].join(','));

        // 2. Añadir filas de datos
        tableData.forEach((row, rowIndex) => {
            csvRows.push([getRowNumberInBinary(rowIndex), ...row].join(','));
        });

        // 3. Crear y descargar el archivo CSV
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
                <BasicButton
                    className="basic-button"
                    onClick={downloadCSV}
                    style={{ display: "flex", alignItems: "center", gap: "5px",whiteSpace: "nowrap" }}
                >
                    Descargar CSV
                    <div className="svg-icon-small">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                                strokeLinejoin: "round",
                                strokeMiterlimit: 2
                            }}
                        >
                            <g transform="matrix(1,0,0,0.58938,3.55271e-15,13.1399)">
                                <path
                                    d="M1,32C0.448,32 0,31.24 -0,30.303C-0,27.695 -0,22.731 -0,20.123C0,19.186 0.448,18.426 1,18.426C1.265,18.426 1.52,18.605 1.707,18.923C1.895,19.242 2,19.673 2,20.123C2,22.006 2,25.027 2,26.91C2,27.847 2.448,28.607 3,28.607C7.355,28.607 24.645,28.607 29,28.607C29.552,28.607 30,27.847 30,26.91C30,25.027 30,22.006 30,20.123C30,19.673 30.105,19.242 30.293,18.923C30.48,18.605 30.735,18.426 31,18.426C31.552,18.426 32,19.186 32,20.123C32,22.731 32,27.695 32,30.303C32,31.24 31.552,32 31,32C26.225,32 5.775,32 1,32Z"/>

                            </g>
                            <g transform="matrix(0.0441942,-0.0441942,1.87539,1.87539,-44.022,-32.7743)">
                                <path
                                    d="M54.627,31.251L128.212,31.251C137.049,31.251 144.212,31.42 144.212,31.628C144.212,31.728 142.526,31.824 139.526,31.895C136.525,31.965 132.455,32.005 128.212,32.005C90.762,32.005 0.533,32.005 0.213,32.005C0.197,32.005 0.186,32.005 0.186,32.004C0.185,32.004 0.196,32.004 0.211,32.003C0.212,32.002 0.212,32 0.212,32L0.16,32C0.064,31.999 0.005,31.996 0.005,31.994C-0,31.865 -0,29.84 -0,28.984C-0,28.884 1.686,28.788 4.686,28.717C7.687,28.646 11.757,28.607 16,28.607C16,28.607 16,28.607 16,28.607C24.836,28.607 32,28.775 32,28.984C32,29.591 32,30.718 32,30.718C32,30.718 187.977,27.042 231.773,26.01C234.774,25.939 238.844,25.9 243.087,25.9C247.331,25.9 251.4,25.939 254.401,26.01C254.401,26.01 254.401,26.01 254.401,26.01C257.402,26.081 259.087,26.177 259.087,26.277C259.087,26.377 257.401,26.472 254.401,26.543C210.604,27.575 54.627,31.251 54.627,31.251Z"/>
                            </g>
                        </svg>
                    </div>
                </BasicButton>
            </div>

            <div className={"table-content"}>
                <table border="1" style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                    <thead>
                    <tr>
                        <th></th>
                        {/* Verificar y renderizar encabezados estáticos */}
                        {staticHeadersData.length > 0 && staticHeadersData.map((header, idx) => {
                            const headerLabels = generateHeaderLabels(header);
                            return headerLabels.map((label, index) => (
                                <th key={`${header.label}-${index}`}>
                                    <input
                                        className={"input-table-value"}
                                        type="text"
                                        value={label}
                                        onChange={(e) => handleHeaderChange(idx, e)}
                                        disabled={idx < sumStaticHandleBits()}
                                    />
                                </th>
                            ));
                        })}
                        {/* Verificar y renderizar encabezados dinámicos */}
                        {dynamicHeadersData.length > 0 && dynamicHeadersData.map((header, idx) => {
                            const headerLabels = generateHeaderLabels(header);
                            return headerLabels.map((label, index) => (
                                <th key={`${header.label}-${index}`}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            className={"input-table-value"}
                                            type="text"
                                            value={label}
                                            onChange={(e) => handleHeaderChange(idx, e)}
                                            disabled={true/*idx + sumStaticHandleBits() < sumStaticHandleBits()*/}
                                        />
                                    </div>
                                </th>
                            ));
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {/* Renderizar filas de la tabla */}
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
                                            tableDataReference.length > rowIndex &&
                                            tableDataReference[0].length > colIndex &&
                                            tableDataReference[rowIndex][colIndex] !== 'X' &&
                                            rowIndex < 10 && colIndex < sumStaticHandleBits()
                                        }
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
