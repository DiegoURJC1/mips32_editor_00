import "./button-with-icon-small.css"
import React from "react";
export default function ButtonWithIconSmall(props) {
    return (
        <button
            className={"button-with-icon-small"}
            onClick={props.onClick}
            disabled={props?.disabled || false}
        >
            {typeof props.icon === 'string' ? (
                <img className="svg-icon-small" src={props.icon} alt="icon" />
            ) : (
                <div className="svg-icon-small">{props.icon}</div>
            )}
        </button>
    );
}

export function ButtonWithTextSmall(props) {
    return (
        <button
            className={"button-with-text-small"}
            onClick={props.onClick}
            disabled={props?.disabled || false}
        >
            {typeof props.icon === 'string' ? (
                <img className="svg-icon-small" src={props.icon} alt="icon" />
            ) : (
                <div className="svg-icon-small">{props.icon}</div>
            )}
            {props.children}

        </button>
    );
}

export function TrashButtonSmall(props) {
    return (
        <button
            className={"trash-button-small"}
            onClick={props.onClick}
            disabled={props?.disabled || false}
        >
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
                    <g transform="matrix(1.13039,0,0,1.27443,-1.56292,1.95515)">
                        <path
                            d="M25.268,3.174C26.245,3.174 27.037,3.876 27.037,4.743C27.037,5.248 27.037,5.808 27.037,6.313C27.037,7.179 26.245,7.882 25.268,7.882C20.984,7.882 10.09,7.882 5.806,7.882C4.829,7.882 4.037,7.179 4.037,6.313C4.037,5.808 4.037,5.248 4.037,4.743C4.037,3.876 4.829,3.174 5.806,3.174C10.09,3.174 20.984,3.174 25.268,3.174Z"
                            style={{ fill: "var(--trash-icon-color)" }}
                        />
                    </g>
                    <g transform="matrix(-2.11817,0,0,-1.12463,51.7647,48.9882)">
                        <path
                            d="M21.927,29.975C21.965,30.484 21.884,31 21.705,31.389C21.525,31.777 21.265,32 20.992,32C18.997,32 14.772,32 12.777,32C12.504,32 12.244,31.777 12.065,31.389C11.886,31 11.804,30.484 11.842,29.975C12.097,26.551 12.608,19.694 12.836,16.637C12.901,15.759 13.3,15.106 13.771,15.106C15.282,15.106 18.488,15.106 19.999,15.106C20.47,15.106 20.869,15.759 20.934,16.637C21.162,19.694 21.672,26.551 21.927,29.975Z"
                            style={{ fill: "var(--trash-icon-color)" }}
                        />
                    </g>
                    <g transform="matrix(1.18143,0,0,1.39991,-2.97884,0)">
                        <path
                            d="M13.525,3.572L11.832,3.572L11.832,1.429C11.832,1.05 12.011,0.686 12.328,0.418C12.645,0.151 13.076,-0 13.525,0C15,0 17.128,0 18.604,0C19.053,-0 19.483,0.151 19.801,0.418C20.118,0.686 20.296,1.05 20.296,1.429C20.296,2.423 20.296,3.572 20.296,3.572L18.604,3.572L18.604,2.143C18.604,1.748 18.225,1.429 17.757,1.429C16.818,1.429 15.311,1.429 14.371,1.429C13.904,1.429 13.525,1.748 13.525,2.143C13.525,2.766 13.525,3.572 13.525,3.572Z"
                            style={{ fill: "var(--trash-icon-color)" }}
                        />
                    </g>
                </svg>
            </div>
        </button>

    );
}