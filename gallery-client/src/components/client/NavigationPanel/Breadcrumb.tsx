import { useNavigate } from "react-router-dom";
import { useConfig } from "../../../hooks/useConfig";
import { useAlbum } from "../AlbumPreview/useAlbum";
import BackButton from "../../shared/Buttons/BackButton";
import style from './NavigationPanel.module.scss';

const PathSeparator: React.FC = () => {
    return <span>{' > '}</span>;
}

const Breadcrumb: React.FC = () => {
    const { album, image } = useAlbum();
    const { config } = useConfig();
    const navigate = useNavigate();
    const close = () => {
        navigate(`${album?.permalink}`)
    }
    return (
        <div className={style.breadcrumb}>
            {album ? (
                <>
                    <BackButton href="/albums" className={style.backButton}/>
                    <PathSeparator />
                    <span className={style.albumLink} onClick={close}>{album?.name}</span>
                </>
            ) : (
                <span className={style.defaultName}>{config?.galleryName || 'Gallery'}</span>
            ) }
            {image ? (
                <div className={style.filePart}>
                    <PathSeparator />
                    <span className={style.fileName}>{image?.filename}</span>
                </div>
            ) : null}
        </div>
    );
}

export default Breadcrumb;