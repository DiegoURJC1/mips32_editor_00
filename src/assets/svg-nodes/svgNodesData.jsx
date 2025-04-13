import React from "react";

export const logicGateTypes = {
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT'
}

export const colors = {
    light: {
        backgroundColor: '#f4f7ff',
        borderColor: '#b8c7f6',
    },
    dark: {
        backgroundColor: '#2b2b2b',
        borderColor: '#aaa9a9',
    },
};

export const renderAluSvg = (backgroundColor, borderColor, borderWidth) => (
    <svg
        className={"alu-svg"}
        width="100%"
        height="100%"
        viewBox='0 -0.2 28 32.4'
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLineJoin: 'round', strokeMiterLimit: 2 }}
    >
        <g transform="matrix(1.65016e-16,2.69492,-2.38695,1.46158e-16,28,-4.55206)">
            <path
                d="M6.884,11.73L1.689,11.73L4.287,-0L10.966,-0L13.563,11.73L8.368,11.73L7.626,8.379L6.884,11.73Z"
                style={{
                    fill:backgroundColor,
                    stroke: borderColor,
                    strokeWidth: borderWidth,
                    vectorEffect: 'non-scaling-stroke',
                }}
            />
        </g>
    </svg>
);

export const renderLeftAndSvg = (backgroundColor, borderColor, borderWidth) => (
    <svg
        className="and-svg"
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
    >
        {/* Líneas de entrada */}
        <g transform="matrix(5.33455,0,0,1,-8.97569,-4)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none', stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke' }} />
        </g>
        <g transform="matrix(5.33455,0,0,1,-8.97569,4)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none', stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke' }} />
        </g>

        {/* Línea de salida */}
        <g transform="matrix(5.33455,0,0,2,-24.9757,-16)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none', stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke' }} />
        </g>

        <g transform="matrix(1,0,0,1,-8,8)">
            <path
                d="M24,16C19.585,16 16,12.415 16,8C16,3.585 19.585,0 24,0L32,0L32,16L24,16Z"
                style={{
                    fill: backgroundColor,
                    stroke: borderColor,
                    strokeWidth: borderWidth,
                    vectorEffect: 'non-scaling-stroke',
                }}
            />
        </g>
    </svg>
);

export const renderRightAndSvg = (backgroundColor, borderColor, borderWidth) => (
    <svg
        className="and-svg"
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
    >
        <g transform="matrix(-5.33455,0,0,1,40.9757,-4)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none', stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke' }}/>
        </g>
        <g transform="matrix(-5.33455,0,0,1,40.9757,4)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none', stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke' }}/>
        </g>
        <g transform="matrix(-5.33455,0,0,2,56.9757,-16)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none', stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke' }}/>
        </g>
        <g id="and" transform="matrix(-1,0,0,1,40,8)">
            <path
                d="M24,16C19.585,16 16,12.415 16,8C16,3.585 19.585,0 24,0L32,0L32,16L24,16Z"
                style={{
                    fill: backgroundColor,
                    stroke: borderColor,
                    strokeWidth: borderWidth,
                    vectorEffect: 'non-scaling-stroke',
                }}
            />
        </g>
    </svg>
);

export const renderLeftNotSvg = (backgroundColor, borderColor, borderWidth) => (
    <svg
        className={"not-svg"}
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        xmlnsSerif="http://www.serif.com/"
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLineJoin: 'round', strokeMiterLimit: 2 }}
    >
        <g transform="matrix(10.6691,0,0,2,-49.9514,-16)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none',stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke', }}/>
        </g>
        <g transform="matrix(7.72256e-17,-1.26119,1.27931,7.83352e-17,-5.82787,57.08)">
            <path
                d="M32.572,10.809L38.916,23.316L26.229,23.316L32.572,10.809Z"
                style={{
                    fill:backgroundColor,
                    stroke: borderColor,
                    strokeWidth: borderWidth,
                    vectorEffect: 'non-scaling-stroke',
                }}
            />
        </g>
        <g transform="matrix(1.94871,0,0,1.94871,-7.58968,-14.1239)">
            <circle
                cx="6.974"
                cy="15.458"
                r="1.026"
                style={{
                    fill:backgroundColor,
                    stroke: borderColor,
                    strokeWidth: borderWidth,
                    vectorEffect: 'non-scaling-stroke',
                }}
            />
        </g>
    </svg>
);

export const renderRightNotSvg = (backgroundColor, borderColor, borderWidth) => (
    <svg
        className={"not-svg"}
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        xmlns:serif="http://www.serif.com/"
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLineJoin: 'round', strokeMiterLimit: 2 }}
    >
        <g id="not" transform="matrix(10.6691,0,0,2,-49.9514,-16)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none',stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke', }}/>
        </g>
            <g transform="matrix(-7.72256e-17,-1.26119,-1.27931,7.83352e-17,37.8279,57.08)">
            <path
                d="M32.572,10.809L38.916,23.316L26.229,23.316L32.572,10.809Z"
                style={{
                    fill:backgroundColor,
                    stroke: borderColor,
                    strokeWidth: borderWidth,
                    vectorEffect: 'non-scaling-stroke',
                }}
            />
        </g>
            <g transform="matrix(1.94871,0,0,1.94871,12.4103,-14.1239)">
            <circle
                cx="6.974"
                cy="15.458"
                r="1.026"
                style={{
                    fill:backgroundColor,
                    stroke: borderColor,
                    strokeWidth: borderWidth,
                    vectorEffect: 'non-scaling-stroke',
                }}
            />
        </g>
    </svg>
);


export const renderLeftOrSvg = (backgroundColor, borderColor, borderWidth) => (
    <svg
        className={"or-svg"}
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlSpace="preserve"
        xmlnsSerif="http://www.serif.com/"
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLineJoin: 'round', strokeMiterLimit: 2 }}
    >
        <g transform="matrix(5.33455,0,0,1,-8.97569,-4)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none',stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke', }}/>
        </g>
        <g transform="matrix(5.33455,0,0,1,-8.97569,4)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none',stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke', }}/>
        </g>
        <g transform="matrix(5.33455,0,0,2,-24.9757,-16)">
            <path d="M4.682,16L7.681,16" style={{ fill: 'none',stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke', }}/>
        </g>
        <g transform="matrix(1,0,0,1,-8,8)">
            <path
                d="M24,16C19.585,16 16,9.43 16,8C16,6.57 19.585,0 24,0L32,0C29.316,5.674 29.429,11.017 32,16L24,16Z"
                style={{
                    fill:backgroundColor,
                    stroke: borderColor,
                    strokeWidth: borderWidth,
                    vectorEffect: 'non-scaling-stroke',
                }}
            />
        </g>
    </svg>
);

export const renderRightOrSvg = (backgroundColor, borderColor, borderWidth) => (
    <svg
        className={"or-svg"}
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        xmlns:serif="http://www.serif.com/"
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLineJoin: 'round', strokeMiterLimit: 2 }}
    >
    <g transform="matrix(-5.33455,0,0,1,40.9757,-4)">
        <path d="M4.682,16L7.681,16" style={{ fill: 'none',stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke', }}/>
    </g>
        <g transform="matrix(-5.33455,0,0,1,40.9757,4)">
        <path d="M4.682,16L7.681,16" style={{ fill: 'none',stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke', }}/>
    </g>
        <g transform="matrix(-5.33455,0,0,2,56.9757,-16)">
        <path d="M4.682,16L7.681,16" style={{ fill: 'none',stroke: borderColor, strokeWidth: borderWidth, vectorEffect: 'non-scaling-stroke', }}/>
    </g>
        <g transform="matrix(-1,0,0,1,40,8)">
        <path
            d="M24,16C19.585,16 16,9.43 16,8C16,6.57 19.585,0 24,0L32,0C29.316,5.674 29.429,11.017 32,16L24,16Z"
            style={{
                fill:backgroundColor,
                stroke: borderColor,
                strokeWidth: borderWidth,
                vectorEffect: 'non-scaling-stroke',
            }}
        />
    </g>
</svg>
);