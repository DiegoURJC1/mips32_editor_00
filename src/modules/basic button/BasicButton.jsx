import React from "react";
import "./basic-button.css"
const BasicButton = (props) => {
    return (
        <button

            onClick={props.onClick}
            className="basic-button"
        >
            {props.children}
        </button>
    );
};

export default BasicButton;
