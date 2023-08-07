import { useState } from 'react';

const step: number = 5;

export function usePageOffset<T>(images: T[]): [T[], boolean, () => void] {
  const [, setOffset] = useState<number>(step);
  const [imagesSlice, setImagesSlice] = useState<T[]>(images.slice(0, step));
  const next = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + step;
      setImagesSlice(images.slice(0, newOffset));
      return newOffset;
    });
  };
  return [imagesSlice, imagesSlice.length === images.length, next];
}
