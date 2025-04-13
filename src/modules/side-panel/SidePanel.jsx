import BasicButton from "../basic button/BasicButton.jsx";
import "./side-panel.css"
import {useDnD} from "./DnDContext.jsx";
import {DnDButtonsMips, DnDButtonsStates} from "../dnd-button/DnDButton.jsx";
import {useTheme} from "../../hooks/useTheme.jsx";
import {colorModes} from "../../common-data/settings.js";

export default function SidePanel(props) {
    const { theme, setThemeMode } = useTheme();

    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    const title = setTitle(props.currentPanel);

    return (
        <aside className="side-panel">
            <div>
                {title}
            </div>
            <div>
                <div className="side-panel-section-title">
                    Nodos
                </div>
                <div className={"side-panel-dnd-buttons-wrapper"}>
                    {props.currentPanel === 0 && (
                        <DnDButtonsMips
                            colorMode={theme}
                            onDragStart={onDragStart}
                        />
                    )}
                    {props.currentPanel === 1 && (
                        <DnDButtonsStates
                            onDragStart={onDragStart}
                        />
                    )}
                </div>

            </div>
            <div className={"values"}>
                <div className="side-panel-section-title">
                    Valores
                </div>
                <div>x: {props.settings.grid.x} y: {props.settings.grid.y}</div>
                <div>g: {props.settings.grid.gap} o: {props.settings.grid.offset}</div>
            </div>
            <div className={"color-settings"}>
                <label htmlFor="colorMode">
                    Choose Color Mode:
                    <select
                        id="colorMode"
                        value={theme}
                        onChange={(e) => setThemeMode(e.target.value)}
                    >
                        <option value={colorModes.light}>Light</option>
                        <option value={colorModes.dark}>Dark</option>
                    </select>
                </label>

            </div>
            <div className={"settings"}>
                <div className="side-panel-section-title">
                    Ajustes
                </div>
                <div className={"grid-settings"}>
                    Grid:
                    <input
                        id={"grid"}
                        type={"number"}
                        min={10}
                        step={10}
                        onChange={props.onChangeGrid}
                        value={props.settings.grid.gap}
                        inputMode="numeric"
                    ></input>
                </div>
            </div>

            <BasicButton onClick={props.onClickResetButton}>Reiniciar Ajustes</BasicButton>
        </aside>
    );
}

function setTitle(currentPanel) {
    if (currentPanel === 0) {
        return "Diagrama de circuito"
    } else if (currentPanel === 1) {
        return "Diagrama de estados"
    }
}