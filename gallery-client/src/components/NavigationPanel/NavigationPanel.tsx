import { useAlbum } from "../AlbumPreview/useAlbum";
import ImageControl from "./ImageControl";
import style from './NavigationPanel.module.scss';
import Breadcrumb from './Breadcrumb';
import CurrentUser from './CurrentUser';
import SidePanelToggle from "../Buttons/SidePanelToggle";
import BackButton from "../Buttons/BackButton";
import FullScreenButton from '../Buttons/FullScreenButton';
import DownloadButton from "../Buttons/DownloadButton";

const NavSeparator: React.FC = () => {
    return <div className={style.separator}></div>
}

const NavigationPanel: React.FC = () => {
    const { album, image } = useAlbum();
    return (
        <div className={style.navigation}>
            <div className={style.left}>
                <BackButton href={image ? `/albums/${album?.permalink}` : '/'} disabled={!album} />
                <NavSeparator />
                <Breadcrumb />
            </div>
            { image ? (
                <div className={style.center}>
                    <ImageControl />
                </div>
            ) : null}
            
            <div className={style.right}>
                { image ? (
                    <>
                        <DownloadButton />
                        <NavSeparator />
                    </>
                ) : null}
                <FullScreenButton />
                <SidePanelToggle />
                <NavSeparator />
                <CurrentUser />
            </div>
        </div>
    );
}

export default NavigationPanel;