import { useState } from "react";
import { Image } from '../../types/api.d';

const step: number = 5;

export function usePageOffset(images: Image[]): [Image[], boolean, () => void] {
    const [, setOffset] = useState<number>(step);
    const [imagesSlice, setImagesSlice] = useState<Image[]>(images.slice(0, step));
    const next = () => {
        setOffset(currentOffset => {
            const newOffset = currentOffset + step;
            setImagesSlice(images.slice(0, newOffset));
            return newOffset;
        });    
    }
    return [imagesSlice, imagesSlice.length === images.length, next];
}