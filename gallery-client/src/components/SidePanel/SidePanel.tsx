import AlbumsDirectory from "../AlbumsDirectory/AlbumsDirectory";
import style from "./SidePanel.module.scss";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { finishSidePanelAnimation, selectLayout } from "../../state/layout/layoutSlice";
import { useSidePanel } from './useSidePanel';

const SidePanel: React.FC = () => {
    const { animationClass, handleAnimationEnd } = useSidePanel();
    
    return (
        <div className={`${style.container} ${animationClass}`} onAnimationEnd={handleAnimationEnd}>
            <div className={style.content}>
                <div className={style.tabs}>
                    <nav>
                        <div className={`${style.tab} ${style.active}`}>Albums</div>
                        <div className={style.tab}>Images</div>
                    </nav>
                </div>
                <AlbumsDirectory />
            </div>
        </div>
    );
}

export default SidePanel;