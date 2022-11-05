import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectLayout, toggleSidePanel, updateLayout } from "../state/layout/layoutSlice";
import { useEffectSkippedFirst } from "./useEffect";

export const useOnLayoutUpdated = (callback: () => void) => {
    const { layoutUpdated } = useAppSelector(selectLayout);    
    useEffectSkippedFirst(() => {
        console.log('layout refresh', layoutUpdated);
        callback();
    }, [ layoutUpdated ]);
}

export const useLayout = () => {
    return useAppSelector(selectLayout);
}

export const useUpdateLayout = () => {
    const dispatch = useAppDispatch();
    return useCallback((ms?: number) => {
        if (ms) {
            setTimeout(() => dispatch(updateLayout()), ms);
        } else {
            dispatch(updateLayout());
        }
    }, []);
}

export const useToggleSidePanel = () => {
    const dispatch = useAppDispatch();
    return useCallback((state?: boolean) => {
        dispatch(toggleSidePanel(state));
    }, []);
}