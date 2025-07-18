import "./button-with-icon.css";

function ButtonWithIcon(props) {
    return (
        <button
            className={`button-with-icon ${props.isActive ? "active" : ""}`}
            onClick={props.onClick}
            title={props.title}
        >
            <img className="svg-icon" src={props.icon} alt="icon" />
        </button>
    );
}

export default ButtonWithIcon;