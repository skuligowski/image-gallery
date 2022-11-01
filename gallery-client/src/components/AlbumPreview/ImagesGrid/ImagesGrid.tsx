import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Album, Image } from '../../../types/api.d';
import { useMasonry } from "../../Commons/MasonryLayout/useMasonry";
import style from './ImagesGrid.module.scss';

const ImagesGrid: React.FC< {album: Album, images: Image[] }> = ({ album, images }) => {
    let navigate = useNavigate();
    const gridRef = useRef<HTMLDivElement | null>(null);
    const { onImageLoad } = useMasonry(gridRef, '.grid-item', [images]);

    const previewImage = (image: Image) => {
        navigate(album?.permalink + '/' + image.filename);
    }

    return (
        <div className={style.grid} ref={gridRef}>
           {images.map(image => (
            <div className="grid-item" key={image.filename} onClick={() => previewImage(image)}>
                <div className="image-wrapper" style={{paddingBottom: `${image.height/image.width*100}%`}}>
                    <img src={`/library${image.thumbUrl || image.url}`} onLoad={onImageLoad}/>
                </div>
            </div>
            ))}
        </div>
    );
}

export default ImagesGrid;