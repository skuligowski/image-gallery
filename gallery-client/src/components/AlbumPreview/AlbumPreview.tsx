import ImagePreview from "./ImagePreview";
import LazyLoadingGrid from "./LazyLoadingGrid";
import { useAlbum, useAlbumRoute } from "./useAlbum";
import style from './AlbumPreview.module.scss';

const AlbumPreview: React.FC = () => {
    useAlbumRoute();
    const { album, image, loading, error } = useAlbum();
    return (
        <div className={style.container}>
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
