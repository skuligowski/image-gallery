import { useNavigate } from "react-router-dom";
import { useConfig } from "../../hooks/useConfig";
import { useAlbum } from "../AlbumPreview/useAlbum";
import SidePanelToggle from "../SidePanel/SidePanelToggle";
import style from './NavigationPanel.module.scss';

const Breadcrumb: React.FC = () => {
    const { album, image } = useAlbum();
    const { config } = useConfig();
    const navigate = useNavigate();
    const close = () => {
        navigate(`${album?.permalink}`)
    }
    return (
        <div className={style.breadcrumb}>
            <SidePanelToggle />
            {image ? 
                <div><span className={style.albumLink} onClick={close}>{album?.name}</span> {'>'} {image?.filename}</div>
                :
                <div>{album?.name || config?.galleryName || 'Gallery'}</div> }    
        </div>
    );
}

export default Breadcrumb;