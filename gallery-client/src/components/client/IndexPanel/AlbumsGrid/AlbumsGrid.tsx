import { useNavigate } from "react-router-dom";
import { Album } from "../../../../types/api";
import style from './AlbumsGrid.module.scss';
import { useMasonry } from '../../../shared/MasonryLayout/useMasonry';
import { useRef } from "react";

const AlbumsGrid: React.FC<{ albums: Album[] }> = ({ albums }) => {
    let navigate = useNavigate();
    const gridRef = useRef<HTMLDivElement | null>(null);
    const { onImageLoad } = useMasonry(gridRef, '.grid-item', [albums]);
    
    const loadAlbum = (album: Album) => {
        navigate(`/albums/${album?.permalink}`);
    }

    return (
        <div className={style.grid} ref={gridRef}>
           {albums.map(album => (
            <div className="grid-item" key={album.permalink} onClick={() => loadAlbum(album)}>
                <div className="image-wrapper" style={{paddingBottom: '100%'}}>
                    <img src={`/library${album.thumbUrl}`} onLoad={onImageLoad}/>
                </div>
                <div>{album.name}</div>
            </div>
            ))}
        </div>
    );
}

export default AlbumsGrid;