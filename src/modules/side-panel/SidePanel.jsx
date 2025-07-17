import BasicButton from "../basic-button/BasicButton.jsx";
import "./side-panel.css"
import {useDnD} from "./DnDContext.jsx";
import {DnDButtonsMips, DnDButtonsStates} from "../dnd-button/DnDButton.jsx";
import {themes} from "../../common-data/settings.js";
import {useThemeContext} from "../../contexts/ThemeContext.jsx";
import BasicInputSmall from "../basic-input-small/BasicInputSmall.jsx";
import BasicSelect from "../basic-select/BasicSelect.jsx";
import {useFlowMIPS} from "../../contexts/FlowMIPSContext.jsx";

export default function SidePanel(props) {
    const { theme, setThemeMode } = useThemeContext();
    const [_, setType] = useDnD();
    const {
        currentPanel,

        settings,
        handleUpdateSettingsGrid,
        handleResetSettings,
        handleMiniMapSwitchSettings,
    } = useFlowMIPS();
    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
    const title = setTitle(currentPanel);

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
                    {currentPanel === 0 && (
                        <DnDButtonsMips
                            colorMode={props.theme}
                            onDragStart={onDragStart}
                        />
                    )}
                    {currentPanel === 1 && (
                        <DnDButtonsStates
                            onDragStart={onDragStart}
                        />
                    )}
                </div>
            </div>

            <div className={"settings"}>
                <div className="side-panel-section-title">
                    Ajustes
                </div>
                <div className={"grid-settings"}>
                    Cuadrícula:
                    <BasicInputSmall
                        type={"number"}
                        min={10}
                        step={10}
                        onChange={handleUpdateSettingsGrid}
                        value={settings.grid.gap}
                        inputMode="numeric"
                        style={{width: '45%', margin: '5px'}}
                    ></BasicInputSmall>
                </div>
                <div className={"color-settings"}>
                    <label htmlFor="theme">
                        Tema:
                        <BasicSelect
                            id="theme"
                            value={theme}
                            onChange={(e) => setThemeMode(e.target.value)}
                            style={{margin: '5px'}}
                        >
                            <option value={themes.light}>Claro</option>
                            <option value={themes.dark}>Oscuro</option>
                        </BasicSelect>
                    </label>
                </div>
                <div className="minimap-toggle">
                    <label>
                        Mini mapa:
                        <BasicButton
                            style={{ margin: '5px', padding: "0.2em 0.4em", borderRadius: "0.4em" }}
                            onClick={handleMiniMapSwitchSettings}
                        >
                            {settings.minimap ? 'Desactivar' : 'Activar'}
                        </BasicButton>
                    </label>
                </div>
            </div>

            <BasicButton onClick={handleResetSettings}>Reiniciar Ajustes</BasicButton>
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