import style from './ImagePreview.module.scss';
import { useAlbum } from './useAlbum';
import { useAppDispatch } from '../../state/hooks';
import { selectImage } from '../../state/albums/albumSlice';

const ImagePreview: React.FC = () => {
    const { album, image } = useAlbum();
    const dispatch = useAppDispatch();
    const prevImage = () => {
        const index = album?.images.findIndex(item => item.filename === image?.filename)
        if (index !== undefined && index > -1 && album?.images[index - 1] !== undefined) {
            dispatch(selectImage(album.images[index - 1]));
        }
    }
    const nextImage = () => {
        const index = album?.images.findIndex(item => item.filename === image?.filename);
        if (index !== undefined && index > -1 && album?.images[index + 1] !== undefined) {
            dispatch(selectImage(album.images[index + 1]));
        }
    }
    const close = () => {
        dispatch(selectImage(undefined));
    }
    return (
        <div className={style.container}>
            <div className={style.imageFrame}>
                <img src={`/library/${image?.url}`} />
            </div>
            <div className={style.navigation}>
                <div className={style.actions}>
                    <a className={style.navButton} onClick={close}>X</a>
                </div>
                <a className={`${style.navButton} ${style.prev}`} onClick={prevImage}>Left</a>
                <a className={`${style.navButton} ${style.next}`} onClick={nextImage}>Right</a>
            </div>
        </div>
    );
}

export default ImagePreview;