import BasicButton from "../basic-button/BasicButton.jsx";
import "./side-panel.css"
import {useDnD} from "./DnDContext.jsx";
import {DnDButtonsMips, DnDButtonsStates} from "../dnd-button/DnDButton.jsx";
import {themes} from "../../common-data/settings.js";
import {useThemeContext} from "../../hooks/ThemeContext.jsx";
import BasicInputSmall from "../basic-input-small/BasicInputSmall.jsx";
import BasicSelect from "../basic-select/BasicSelect.jsx";

export default function SidePanel(props) {
    const { theme, setThemeMode } = useThemeContext();
    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    const title = setTitle(props.currentPanel);

    return (
        <aside className="side-panel">
            <div className="side-panel-section-title">
                {title}
            </div>
            <div className={"dnd-nodes"}>
                <div className="side-panel-section-title">
                    Nodos
                </div>
                <div className={"side-panel-dnd-buttons-wrapper"}>
                    {props.currentPanel === 0 && (
                        <DnDButtonsMips
                            colorMode={props.theme}
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
                <label htmlFor="theme">
                    Tema:
                    <BasicSelect
                        id="theme"
                        value={theme}
                        onChange={(e) => setThemeMode(e.target.value)}
                    >
                        <option value={themes.light}>Claro</option>
                        <option value={themes.dark}>Oscuro</option>
                    </BasicSelect>
                </label>

            </div>
            <div className={"settings"}>
                <div className="side-panel-section-title">
                    Ajustes
                </div>
                <div className={"grid-settings"}>
                    Grid:
                    <BasicInputSmall
                        type={"number"}
                        min={10}
                        step={10}
                        onChange={props.onChangeGrid}
                        value={props.settings.grid.gap}
                        inputMode="numeric"
                    ></BasicInputSmall>
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