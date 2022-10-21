import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { albumNotFound, fetchAlbum, selectCurrentAlbum, selectImage } from "../../state/albums/albumSlice";
import style from './AlbumPreview.module.scss';
import { useMatches, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { parsePermalink } from '../parsePermalink';
import { Image } from '../../types/api.d';

function useMatchedPermalink(): string | undefined {
    const matches = useMatches();
    return (matches.length && matches[0].params['*']) ? matches[0].params['*'] : undefined;
}

function useAlbumPermalink() {
    const permalink = useMatchedPermalink();
    const {album, image} = useMemo(() => {
        return permalink ? parsePermalink(permalink)  : {album: undefined, image: undefined};
    }, [permalink]);
    return {albumPermalink: album, imagePermalink: image};
}

function useAlbum() {
    const dispatch = useAppDispatch();
    const {albumPermalink, imagePermalink} = useAlbumPermalink();
    console.log(albumPermalink, imagePermalink);
    useEffect(() => {
        if (!albumPermalink) {
            dispatch(albumNotFound());
        } else {
            dispatch(fetchAlbum(albumPermalink || ''));
        }
    }, [albumPermalink])
    const { album, image, loading, error } = useAppSelector(selectCurrentAlbum);
    useEffect(() => {
        if (album) {
            if (imagePermalink) {
                dispatch(selectImage(album.images.find(image => image.filename === imagePermalink)));
            } else {
                dispatch(selectImage(undefined));
            }
        }
    }, [album, imagePermalink]);
    return { album, image, loading, error };
}

const AlbumPreview: React.FC = () => {
    let navigate = useNavigate();
    const { album, image, loading, error } = useAlbum();
    const previewImage = (image: Image) => {
        navigate(album?.permalink + '/' + image.filename);
    }
    return <div className={style.container}>
        {loading ? <div>Album is loading</div> : null}
        {error ? <div>{error}</div> : null}
        {!loading && album && !error ? 
            album.images.map(image => <div className={style.image} key={image.filename} onClick={() => previewImage(image)}><img src={`/library${image.thumbUrl || image.url}`} width="200" /></div>)
        : null}
        {image ? <div>Selected image: {image.filename} </div> : null}
    </div>
}

export default AlbumPreview;
