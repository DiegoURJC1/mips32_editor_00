import "./basic-input-small.css"
export default function BasicInputSmall(props) {
    return (
        <input
            className={"input-small"}
            type={props.type}
            minLength={props.minLength}
            maxLength={props.maxLength}
            step={props.step}
            min={props.min}
            max={props.max}
            value={props.value}
            onChange={(props.onChange)}
            style={props.style}
            placeholder={props.placeholder}
        >
        </input>
    );
}