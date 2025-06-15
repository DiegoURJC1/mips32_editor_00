import { toPng } from 'html-to-image';
import { getNodesBounds } from '@xyflow/react';
import { themes } from '../../common-data/settings.js';

const image = {
    width: 3840,
    height: 2160,
};

function getImageName(currentPanel) {
    if (currentPanel === 0) return 'mips32_diagram.png';
    if (currentPanel === 1) return 'states_diagram.png';
    return 'diagram.png'; // Valor por defecto
}

function getBackgroundColor(colorMode) {
    if (colorMode === themes.dark) return '#232323';
    if (colorMode === themes.light) return 'white';
    return 'white'; // Valor por defecto
}

export function downloadImage(dataUrl, currentPanel) {
    const a = document.createElement('a');
    a.setAttribute('download', getImageName(currentPanel));
    a.setAttribute('href', dataUrl);
    a.click();
}

export function handleDownload(getNodes, getViewportForBounds, colorMode, currentPanel) {
    const nodesBounds = getNodesBounds(getNodes());

    const zoom = currentPanel === 0 ? 2 : 2.5;
    const viewport = getViewportForBounds(
        nodesBounds,
        image.width,
        image.height,
        zoom,
        4,
        10
    );

    const backgroundColor = getBackgroundColor(colorMode);

    toPng(document.querySelector('.react-flow__viewport'), {
        backgroundColor,
        width: image.width,
        height: image.height,
        style: {
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
    }).then((dataUrl) => downloadImage(dataUrl, currentPanel));
}
