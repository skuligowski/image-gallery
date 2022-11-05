import style from './SidePanelToggle.module.scss';
import IconButton from "./IconButton";
import { useLayout, useToggleSidePanel } from "../../hooks/useLayout";

const SidePanelToggle: React.FC = () => {
    const toggle = useToggleSidePanel()
    const { sidePanel } = useLayout();
    return (
        <IconButton className={style.toggle} onClick={() => toggle()}>
            { sidePanel ? (
                <svg width="24px" height="24px" viewBox="0 0 24 24">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M12 5v14h7V5h-7zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
                    </g>
                </svg>
            ) : (
                <svg width="24px" height="24px" viewBox="0 0 24 24">
                    <g>
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M11 5H5v14h6V5zm2 0v14h6V5h-6zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
                    </g>
                </svg>
            )}
        </IconButton>
    )
}

export default SidePanelToggle;