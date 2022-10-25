import ImagePreview from "./ImagePreview";
import LazyLoadingGrid from "./LazyLoadingGrid";
import { useAlbum, useAlbumRoute } from "./useAlbum";
import style from './AlbumPreview.module.scss';
import { useSidePanelToggle } from "../SidePanel/useSidePanel";

const AlbumPreview: React.FC = () => {
    useAlbumRoute();
    const { album, image, loading, error } = useAlbum();
    const toggle = useSidePanelToggle();

    return (
        <div className={style.container}>
            <div className={style.albumHeader}>
                <div className={style.albumName}><div onClick={toggle}>XXX</div> {album?.name}</div>                        
            </div>
            {loading ? <div>Album is loading</div> : null}
            {error ? <div>{error}</div> : null}
            {!loading && album && !error ? (
                <LazyLoadingGrid album={album} images={album.images} />
            ) : null}
            {image ? <ImagePreview /> : null}
        </div>
    );
}

export default AlbumPreview;
