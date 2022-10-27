import { useSidePanelToggle } from "./useSidePanel";
import style from './SidePanelToggle.module.scss';
import IconButton from "../Buttons/IconButton";
import { useAppSelector } from "../../state/hooks";
import { selectLayout } from "../../state/layout/layoutSlice";

const SidePanelToggle: React.FC = () => {
    const toggle = useSidePanelToggle()
    const { sidePanel } = useAppSelector(selectLayout);
    return (
        <IconButton className={`${style.toggle} ${sidePanel ? '' : style.hidden}`} onClick={toggle}>
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
                <rect width="16" height="16" id="icon-bound" fill="none" />
                <path id="expand-from-left" d="M16,16L0,16L0,0L16,0L16,16ZM4,2L4,14L14,14L14,2L4,2ZM5.586,5.414L8.172,8L5.586,10.586L7,12L11,8L7,4L5.586,5.414Z" />
            </svg>
        </IconButton>
    )
}

export default SidePanelToggle;