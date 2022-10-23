import LazyLoadingGrid from "./LazyLoadingGrid";
import { useAlbum } from "./useAlbum";

const AlbumPreview: React.FC = () => {
    const { album, image, loading, error } = useAlbum();
    return (
        <>
            {loading ? <div>Album is loading</div> : null}
            {error ? <div>{error}</div> : null}
            {!loading && album && !error ? (
                <LazyLoadingGrid album={album} images={album.images} />
            ) : null}
            {image ? <div>Selected image: {image.filename} </div> : null}
        </>
    );
}

export default AlbumPreview;
