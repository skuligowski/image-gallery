import ImagePreview from "./ImagePreview/ImagePreview";
import { useAlbum, useAlbumRoute } from "./useAlbum";
import style from './AlbumPreview.module.scss';
import NavigationPanel from '../NavigationPanel/NavigationPanel';
import { Loader } from "../../shared/Loader/Loader";
import ImagesGrid from "./ImagesGrid/ImagesGrid";
import { Image } from '../../../types/api';
import LazyLoadingGrid from "../../shared/LazyLoadingGrid/LazyLoadingGrid";

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
                        <LazyLoadingGrid<Image> 
                            render={images => <ImagesGrid album={album} images={images}/>} 
                            items={album.images} 
                        />
                        {image ? <ImagePreview /> : null}
                    </>
                )
            )}
        </div>
    );
}

export default AlbumPreview;
