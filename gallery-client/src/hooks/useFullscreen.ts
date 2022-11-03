import fscreen from "fscreen";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectLayout, updateLayout } from "../state/layout/layoutSlice";

export function useFullscreen() {
    const dispatch = useAppDispatch();
    const { fullscreen } = useAppSelector(selectLayout);
    const toggleFullscreen = useCallback(() => {
        if (fscreen.fullscreenElement) {
            fscreen.exitFullscreen();
            setTimeout(() => dispatch(updateLayout()), 200);
        } else {
            fscreen.requestFullscreen(document.documentElement);
            setTimeout(() => dispatch(updateLayout()), 200);
        }
    }, []);
    return { toggleFullscreen, isFullscreen: fullscreen };
}