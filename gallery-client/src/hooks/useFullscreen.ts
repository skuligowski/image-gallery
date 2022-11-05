import fscreen from "fscreen";
import { useCallback } from "react";
import { useLayout, useUpdateLayout } from "./useLayout";

export function useFullscreen() {
    const { fullscreen } = useLayout();
    const updateLayout = useUpdateLayout();
    const toggleFullscreen = useCallback(() => {
        if (fscreen.fullscreenElement) {
            fscreen.exitFullscreen();
            updateLayout(200);
        } else {
            fscreen.requestFullscreen(document.documentElement);
            updateLayout(200);
        }
    }, []);
    return { toggleFullscreen, isFullscreen: fullscreen };
}