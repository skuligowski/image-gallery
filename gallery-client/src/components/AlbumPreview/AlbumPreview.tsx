import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { albumNotFound, fetchAlbum, selectCurrentAlbum, selectImage } from "../../state/albums/albumSlice";
import style from './AlbumPreview.module.scss';
import { useMatches, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { parsePermalink } from '../parsePermalink';
import { Album, Image } from '../../types/api.d';
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";


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
    const { album, image, loading, error } = useAlbum();
    return <div className={style.container}>
        {loading ? <div>Album is loading</div> : null}
        {error ? <div>{error}</div> : null}
        {!loading && album && !error ? (
            <ImagesGrid album={album} images={album.images} />
        ) : null}
        {image ? <div>Selected image: {image.filename} </div> : null}
    </div>
}

const ImagesGrid: React.FC< {album: Album, images: Image[] }> = ({ album, images }) => {
    let navigate = useNavigate();
    let gridRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        new Masonry( gridRef.current as HTMLElement, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            gutter: 10,
            horizontalOrder: true,
            initLayout: true,
        });
        const applyLoaded: ImagesLoaded.ImagesLoadedListener = (_instance, image) => {
            setTimeout(() => {
                image?.img.parentElement?.classList.add('loaded');
            }, Math.random()*300);
        };
        const imgsLoaded = imagesLoaded(gridRef.current as HTMLElement);
        imgsLoaded.on('progress', applyLoaded);
        return () => {
            imgsLoaded.off('progress', applyLoaded);
        };
    }, []);

    const previewImage = (image: Image) => {
        navigate(album?.permalink + '/' + image.filename);
    }

    return (
        <div className="grid" ref={gridRef}>
           {images.map(image => (
            <div className="grid-item" key={image.filename} onClick={() => previewImage(image)}>
                <div className="image-wrapper" style={{paddingBottom: `${image.height/image.width*100}%`}}>
                    <img src={`/library${image.thumbUrl || image.url}`} />
                </div>
            </div>
            ))}
        </div>
    );
}

export default AlbumPreview;
