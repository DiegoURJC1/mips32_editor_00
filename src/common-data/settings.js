export const themes = {
    dark: 'dark',
    light: 'light',
}

export const defaultSettings = {
    minimap: true,
    grid: {
        x: 10,
        y: 10,
        gap: 10,
        offset: 10,
    },
}

// Viewport Coordinates for MIPS Flow
export const vpcMips = {
    translateExtentCoordinates: {
        minX: 0,
        minY: 0,
        maxX: 2500,
        maxY: 2100,
    },
    nodeExtentCoordinates: {
        minX: 100,
        minY: 100,
        maxX: 2400,
        maxY: 2000,
    },
}

// Viewport Coordinates for States Flow
export const vpcStates = {
    translateExtentCoordinates: {
        minX: 0,
        minY: 0,
        maxX: 2500,
        maxY: 2100,
    },
    nodeExtentCoordinates: {
        minX: 100,
        minY: 100,
        maxX: 2400,
        maxY: 2000,
    },
}