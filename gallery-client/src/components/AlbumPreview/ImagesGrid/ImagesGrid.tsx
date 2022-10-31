import Masonry from "masonry-layout";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Album, Image } from '../../../types/api.d';
import { useSidePanelAnimationEnd } from "../../SidePanel/useSidePanel";
import style from './ImagesGrid.module.scss';

const ImagesGrid: React.FC< {album: Album, images: Image[] }> = ({ album, images }) => {
    let navigate = useNavigate();
    const gridRef = useRef<HTMLDivElement | null>(null);
    const masonryRef = useRef<Masonry | null>(null);
    useEffect(() => {
        masonryRef.current = new Masonry( gridRef.current as HTMLElement, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            gutter: 10,
            horizontalOrder: true,
            fitWidth: true,
            initLayout: true,
        });
    }, [images]);
    useSidePanelAnimationEnd(() =>  masonryRef.current?.layout && masonryRef.current.layout());
    
    const previewImage = (image: Image) => {
        navigate(album?.permalink + '/' + image.filename);
    }

    const onLoadHandler: React.ReactEventHandler<HTMLImageElement> = (e) => {
        setTimeout(() => {
            (e.target as HTMLImageElement).parentElement?.classList.add('loaded');
        }, Math.random()*300);
    }

    return (
        <div className={style.grid} ref={gridRef}>
           {images.map(image => (
            <div className="grid-item" key={image.filename} onClick={() => previewImage(image)}>
                <div className="image-wrapper" style={{paddingBottom: `${image.height/image.width*100}%`}}>
                    <img src={`/library${image.thumbUrl || image.url}`} onLoad={onLoadHandler}/>
                </div>
            </div>
            ))}
        </div>
    );
}

export default ImagesGrid;