import ButtonWithIcon from "/src/modules/button-with-icon/ButtonWithIcon";
import mipsIcon from "/src/assets/icons/mipsFlowPanel.svg";
import statesIcon from "/src/assets/icons/statesFlowPanel.svg";
import tableIcon from "/src/assets/icons/tablePanel.svg";
import "./top-bar.css";
import { useFlowMIPS } from "../../contexts/FlowMIPSContext.jsx";

function TopBar({ currentPanel, setCurrentPanel }) {
    const mipsFlowPanel = 0;
    const statesFlowPanel = 1;
    const tablePanel = 2;

    const { infoPanelTypes, setActiveInfoPanel } = useFlowMIPS();
    const handleInfButtonClick = () => {
        setActiveInfoPanel(infoPanelTypes.about);
    };

    return (
        <nav className={"top-bar"}>
            <div className={"top-bar-left-wrapper"}>
                MIPS32
                <div className={"panel-buttons-wrapper"}>
                    <ButtonWithIcon
                        icon={mipsIcon}
                        onClick={() => setCurrentPanel(mipsFlowPanel)}
                        isActive={currentPanel === mipsFlowPanel}
                    />
                    <ButtonWithIcon
                        icon={statesIcon}
                        onClick={() => setCurrentPanel(statesFlowPanel)}
                        isActive={currentPanel === statesFlowPanel}
                    />
                    <ButtonWithIcon
                        icon={tableIcon}
                        onClick={() => setCurrentPanel(tablePanel)}
                        isActive={currentPanel === tablePanel}
                    />
                </div>
            </div>
            <div className={"top-bar-right-wrapper"}>
                <div className={"info-button"} onClick={handleInfButtonClick}>
                    i
                </div>
            </div>
        </nav>
    );
}

export default TopBar;
