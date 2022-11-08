import style from './SidePanelToggle.module.scss';
import IconButton from "./IconButton";
import { useLayout, useToggleSidePanel } from "../../hooks/useLayout";

const SidePanelToggle: React.FC = () => {
    const toggle = useToggleSidePanel()
    const { sidePanel } = useLayout();
    return (
        <IconButton className={style.toggle} onClick={() => toggle()}>
            { sidePanel ? (
                <svg width="24px" height="24px" viewBox="0 0 24 24" style={{ transform: 'scale(1.)' }}>
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 8h-9m9 4H4m0 0 3-3m-3 3 3 3m13 1h-9"/>
                </svg>
            ) : (
                <svg width="24px" height="24px" viewBox="0 0 24 24" style={{ transform: 'scale(1.2)' }}>
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h9m-9 4h16m0 0-3-3m3 3-3 3M4 16h9"/>
                </svg>
            )}
        </IconButton>
    )
}

export default SidePanelToggle;