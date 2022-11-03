import style from './LazyLoadingGrid.module.scss';
import { ReactElement, useEffect, useRef } from "react";
import { usePageOffset } from "./usePageOffset";
import { useAppSelector } from '../../../state/hooks';
import { selectLayout } from '../../../state/layout/layoutSlice';

interface SourceableProps<T> { 
    render: (items: T[]) => ReactElement<any>, 
    items: T[] 
};

function LazyLoadingGrid<T>({ render, items }: SourceableProps<T>): React.ReactElement<any, any> {
    const [itemsSlice, loaded, next] = usePageOffset(items);
    const { layoutUpdated } = useAppSelector(selectLayout);
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    const isBottom = (el: HTMLElement): boolean =>
        Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 200;
    const noScroll = (el: HTMLElement): boolean => el.scrollHeight === el.clientHeight;
    
    const handleScroll: React.UIEventHandler<HTMLElement> = (e) => 
        !loaded && isBottom(e.currentTarget) && next();
    const handleFillUp = (el: HTMLElement) => 
        !loaded && (noScroll(el) || isBottom(el)) && next();
    
    useEffect(() => {
        handleFillUp(containerRef.current as HTMLElement);
    }, [itemsSlice, layoutUpdated]);
    const girdItems = render(itemsSlice);

    return (
        <div className={style.container} onScroll={handleScroll} ref={containerRef}>
            {girdItems}
        </div>
    );
}

export default LazyLoadingGrid;