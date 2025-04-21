import "./basic-select.css"

export default function BasicSelect(props) {
    return (
        <select
            className={"basic-select"}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            style={props.style}
            disabled={props.disabled}
            required={props.required}
        >
            {props.children}
        </select>
    );
}