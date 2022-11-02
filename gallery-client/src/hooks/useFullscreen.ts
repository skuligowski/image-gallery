import fscreen from "fscreen";
import { useCallback } from "react";

export function useFullscreen() {
    return useCallback(() => {
        if (fscreen.fullscreenElement) {
           fscreen.exitFullscreen();
        } else {
          fscreen.requestFullscreen(document.documentElement);
        }
    }, []);
}