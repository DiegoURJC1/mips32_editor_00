import { toPng } from 'html-to-image';
import {getNodesBounds} from "@xyflow/react";
import {colorModes} from "../../common-data/settings.js";
const image = {
    width: 1920,
    height: 1080,
};

export function downloadImage(dataUrl) {
    const a = document.createElement('a');
    a.setAttribute('download', 'mips32.png');
    a.setAttribute('href', dataUrl);
    a.click();
}

export function handleDownload(getNodes, getViewportForBounds, colorMode) {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
        nodesBounds,
        image.width,
        image.height,
        1,
        4,
        10
    );

    let backgroundColor;
    if (colorMode === colorModes.dark) {
        backgroundColor = '#232323';
    } else if (colorMode === colorModes.light) {
        backgroundColor = 'white';
    }

    toPng(document.querySelector('.react-flow__viewport'), {
        backgroundColor: backgroundColor,
        width: image.width,
        height: image.height,
        style: {
            transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
    }).then(downloadImage);
}
