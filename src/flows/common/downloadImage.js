import { toPng } from 'html-to-image';
import {getNodesBounds} from "@xyflow/react";
import {themes} from "../../common-data/settings.js";
const image = {
    width: 3840,
    height: 2160,
};

export function downloadImage(dataUrl) {
    const a = document.createElement('a');
    a.setAttribute('download', 'mips32.png');
    a.setAttribute('href', dataUrl);
    a.click();
}

export function handleDownload(getNodes, getViewportForBounds, colorMode, currentPanel) {
    const nodesBounds = getNodesBounds(getNodes());
    let viewport;
    if (currentPanel === 0) {
        viewport = getViewportForBounds(
            nodesBounds,
            image.width,
            image.height,
            2,
            4,
            10
        );
    } else if (currentPanel === 1) {
        viewport = getViewportForBounds(
            nodesBounds,
            image.width,
            image.height,
            2.5,
            4,
            10
        );
    }


    let backgroundColor;
    if (colorMode === themes.dark) {
        backgroundColor = '#232323';
    } else if (colorMode === themes.light) {
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
