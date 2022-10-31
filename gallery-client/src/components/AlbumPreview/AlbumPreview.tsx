import ImagePreview from "./ImagePreview/ImagePreview";
import LazyLoadingGrid from "./ImagesGrid/LazyLoadingGrid";
import { useAlbum, useAlbumRoute } from "./useAlbum";
import style from './AlbumPreview.module.scss';
import NavigationPanel from '../NavigationPanel/NavigationPanel';
import { Loader } from "../Loader/Loader";

const AlbumPreview: React.FC = () => {
    useAlbumRoute();
    const { album, image, loading, error } = useAlbum();
    return (
        <div className={style.container}>
            <NavigationPanel />
            { loading ? (
                <Loader />
            ) : (
                error || !album ? (
                    <div>{error}</div>
                ) : (
                    <>
                        <LazyLoadingGrid album={album} images={album.images} />
                        {image ? <ImagePreview /> : null}
                    </>
                )
            )}
        </div>
    );
}

export default AlbumPreview;
