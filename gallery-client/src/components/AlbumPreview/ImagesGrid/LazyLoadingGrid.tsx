import style from './LazyLoadingGrid.module.scss';
import { useEffect, useRef } from "react";
import { Album, Image } from '../../../types/api.d';
import { usePageOffset } from "./usePageOffset";
import ImagesGrid from './ImagesGrid';

const LazyLoadingGrid: React.FC< { album: Album, images: Image[] }> = ({ album, images }) => {
    const [imagesSlice, loaded, next] = usePageOffset(images);
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    const isBottom = (el: HTMLElement): boolean =>
        Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 160;
    const noScroll = (el: HTMLElement): boolean => el.scrollHeight === el.clientHeight;
    
    const handleScroll: React.UIEventHandler<HTMLElement> = (e) => 
        !loaded && isBottom(e.currentTarget) && next();
    const handleFillUp = (el: HTMLElement) => 
        !loaded && (noScroll(el) || isBottom(el)) && next();
    
    useEffect(() => {
        handleFillUp(containerRef.current as HTMLElement);
    }, [imagesSlice]);

    return (
        <div className={style.container} onScroll={handleScroll} ref={containerRef}>
            <ImagesGrid album={album} images={imagesSlice} />
        </div>
    );
};

export default LazyLoadingGrid;