import { useAlbum } from "../AlbumPreview/useAlbum";
import ImageControl from "./ImageControl";
import style from './ClientNavigationPanel.module.scss';
import Breadcrumb from './Breadcrumb';
import CurrentUser from './CurrentUser';
import SidePanelToggle from "../../shared/Buttons/SidePanelToggle";
import FullScreenButton from '../../shared/Buttons/FullScreenButton';
import DownloadButton from "../../shared/Buttons/DownloadButton";
import EditButton from "../../shared/Buttons/EditButton";
import { useUser } from "../../../hooks/useUser";
import NavigationPanel from "../../shared/NavigationPanel/NavigationPanel";
import { NavSeparator } from "../../shared/NavigationPanel/NavSeparator";

const ClientNavigationPanel: React.FC = () => {
    const { user } = useUser();
    const { album, image } = useAlbum();
    return (
        <NavigationPanel 
            left={
                <>
                    <SidePanelToggle />
                    <NavSeparator />
                    <Breadcrumb />
                </>
            }
            right={
                <>
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
                </>
            } />
    );
}

export default ClientNavigationPanel;