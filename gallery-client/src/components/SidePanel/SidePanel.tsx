import AlbumsDirectory from "../AlbumsDirectory/AlbumsDirectory";
import SidePanelToggle from "../Buttons/SidePanelToggle";
import style from "./SidePanel.module.scss";
import { useSidePanel } from './useSidePanel';

const SidePanel: React.FC = () => {
    const { animationClass, onAnimationEnd } = useSidePanel();
    
    return (
        <div className={`${style.container} ${animationClass}`} onAnimationEnd={onAnimationEnd}>
            <div className={style.content}>
                <div className={style.tabs}>
                    <nav>
                        <div className={`${style.tab} ${style.active}`}>Albums</div>
                        <div className={style.tab}>Images</div>
                    </nav>
                    <div className={style.sidePanelToggle}>
                        <SidePanelToggle />
                    </div>
                </div>
                <AlbumsDirectory />
            </div>
        </div>
    );
}

export default SidePanel;