import AlbumsDirectory from "../AlbumsDirectory/AlbumsDirectory";
import SidePanelToggle from "../Buttons/SidePanelToggle";
import style from "./SidePanel.module.scss";
import { useSidePanel } from './useSidePanel';
import { useTranslation } from 'react-i18next';

const SidePanel: React.FC = () => {
    const { animationClass, onAnimationEnd } = useSidePanel();
    const { t } = useTranslation();
    
    return (
        <div className={`${style.container} ${animationClass}`} onAnimationEnd={onAnimationEnd}>
            <div className={style.content}>
                <div className={style.tabs}>
                    <nav>
                        <div className={`${style.tab} ${style.active}`}>{t('Albums')}</div>
                        <div className={style.tab}>{t('Images')}</div>
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