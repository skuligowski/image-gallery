import SidePanelToggle from "../Buttons/SidePanelToggle";
import style from "./SidePanel.module.scss";
import { useSidePanel } from './useSidePanel';
import { useTranslation } from 'react-i18next';

const SidePanel: React.FC<{ children: React.ReactElement, title: string }> = ({ children, title }) => {
    const { animationClass, onAnimationEnd } = useSidePanel();
    return (
        <div className={`${style.container} ${animationClass}`} onAnimationEnd={onAnimationEnd}>
            <div className={style.content}>
                <div className={style.tabs}>
                    <nav>
                        <div className={`${style.tab} ${style.active}`}>{title}</div>
                    </nav>
                    <div className={style.sidePanelToggle}>
                        <SidePanelToggle />
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default SidePanel;