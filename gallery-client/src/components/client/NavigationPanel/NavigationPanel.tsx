import { useAlbum } from "../AlbumPreview/useAlbum";
import ImageControl from "./ImageControl";
import style from './NavigationPanel.module.scss';
import Breadcrumb from './Breadcrumb';
import CurrentUser from './CurrentUser';
import SidePanelToggle from "../../shared/Buttons/SidePanelToggle";
import FullScreenButton from '../../shared/Buttons/FullScreenButton';
import DownloadButton from "../../shared/Buttons/DownloadButton";
import { useLayout } from "../../../hooks/useLayout";
import EditButton from "../../shared/Buttons/EditButton";
import { useUser } from "../../../hooks/useUser";

const NavSeparator: React.FC = () => {
    return <div className={style.separator}></div>
}

const NavigationPanel: React.FC = () => {
    const { user } = useUser();
    const { album, image } = useAlbum();
    const { sidePanel } = useLayout();
    return (
        <div className={`${style.navigation} ${sidePanel ? style.withSidePanel : ''}`}>
            <div className={style.left}>
                <SidePanelToggle />
                <NavSeparator />
                <Breadcrumb />
            </div>         
            <div className={style.right}>
                { image ? (
                    <>
                        <ImageControl prevClassName={style.prevButton} nextClassName={style.nextButton} />
                        <NavSeparator />
                        <DownloadButton />
                        <NavSeparator />
                    </>
                ) : null}
                {}
                { user?.admin ? (
                    <>
                        <EditButton />
                        <NavSeparator />
                    </>
                ) : null }
                <FullScreenButton />
                { !album ? (
                    <>
                        <NavSeparator />
                        <CurrentUser />
                    </>
                ) : null }
            </div>
        </div>
    );
}

export default NavigationPanel;