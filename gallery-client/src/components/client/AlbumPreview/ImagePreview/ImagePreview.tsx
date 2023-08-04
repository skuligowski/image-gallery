import style from './ImagePreview.module.scss';
import { useAlbum } from '../useAlbum';
import NavigationPanel from '../../NavigationPanel/NavigationPanel';

const ImagePreview: React.FC = () => {
    const { image } = useAlbum();
    return (
        <div className={style.container}>
            <NavigationPanel />
            <div className={style.imageFrame}>
                <img src={`/library/${image?.url}`} />
            </div>
        </div>
    );
}

export default ImagePreview;