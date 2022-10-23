import { selectCurrentAlbum } from "../../state/albums/albumSlice";
import { useAppSelector } from "../../state/hooks";
import ImagePreview from "./ImagePreview";
import LazyLoadingGrid from "./LazyLoadingGrid";
import { useAlbum, useAlbumRoute } from "./useAlbum";

const AlbumPreview: React.FC = () => {
    useAlbumRoute();
    const { album, image, loading, error } = useAlbum();
    return (
        <>
            {loading ? <div>Album is loading</div> : null}
            {error ? <div>{error}</div> : null}
            {!loading && album && !error ? (
                <LazyLoadingGrid album={album} images={album.images} />
            ) : null}
            {image ? <ImagePreview /> : null}
        </>
    );
}

export default AlbumPreview;
