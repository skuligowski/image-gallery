import { useAlbum } from "../AlbumPreview/useAlbum";
import SidePanelToggle from "../SidePanel/SidePanelToggle";
import style from './NavigationPanel.module.scss';

const Breadcrumb: React.FC = () => {
    const { album, image } = useAlbum();
    return (
        <div className={style.breadcrumb}>
            <SidePanelToggle />
            {image ? 
                <div>{album?.name} {'>'} {image?.filename}</div>
                :
                <div>{album?.name}</div> }    
        </div>
    );
}

export default Breadcrumb;