import React from "react";
import "./basic-button.css"
const BasicButton = (props) => {
    return (
        <button
            className="basic-button"
            onClick={e => {
                e.stopPropagation();
                props.onClick();
            }}
            style={props.style}
        >
            {props.children}
        </button>
    );
};

export default BasicButton;
