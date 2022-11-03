import { useEffect } from "react";
import { useAppSelector } from "../state/hooks";
import { selectLayout } from "../state/layout/layoutSlice";

export const useLayoutUpdate = (callback: () => void) => {
    const { layoutUpdated } = useAppSelector(selectLayout);
    useEffect(() => {
        if (layoutUpdated) {
            console.log('layout refresh');
            callback();
        }
    }, [ layoutUpdated ]);
}