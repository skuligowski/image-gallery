import Masonry from "masonry-layout";
import { MutableRefObject, useEffect, useRef } from "react";
import { useSidePanelAnimationEnd } from "../../SidePanel/useSidePanel";

export function useMasonry(gridRef: MutableRefObject<HTMLDivElement | null>, itemSelector: string, deps: any[]) {
    const masonryRef = useRef<Masonry | null>(null);
    useEffect(() => {
        masonryRef.current = new Masonry( gridRef.current as HTMLElement, {
            itemSelector,
            columnWidth: itemSelector,
            gutter: 10,
            horizontalOrder: true,
            fitWidth: true,
            initLayout: true,
        });
    }, deps);
    useSidePanelAnimationEnd(() =>  masonryRef.current?.layout && masonryRef.current.layout());

    const onImageLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
        setTimeout(() => {
            (e.target as HTMLImageElement).parentElement?.classList.add('loaded');
        }, Math.random()*300);
    }
    return { onImageLoad };
}