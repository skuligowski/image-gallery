import style from './ImagePreview.module.scss';
import { useAlbum } from './useAlbum';

const ImagePreview: React.FC = () => {
    const { image } = useAlbum();
    return <div className={style.container}>{image?.filename}</div>
}

export default ImagePreview;