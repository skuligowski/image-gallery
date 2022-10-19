import { useAppSelector } from "../app/hooks";
import { selectCurrentAlbum } from "../app/albums/albumSlice";
import style from './AlbumPreview.module.scss';

const AlbumPreview: React.FC = () => {
    const { images, loading } = useAppSelector(selectCurrentAlbum);

    return <div>
        {!loading ? 
            images.map(image => <div className={style.image} key={image.filename}><img src={`/library${image.thumbUrl || image.url}`} width="100" /></div>)
        : null}
    </div>;
}

export default AlbumPreview;