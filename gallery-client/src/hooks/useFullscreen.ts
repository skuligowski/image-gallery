import fscreen from "fscreen";
import { useCallback, useState } from "react";

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const toggleFullscreen = useCallback(() => {
        if (fscreen.fullscreenElement) {
            fscreen.exitFullscreen();
            setIsFullscreen(false);
        } else {
            fscreen.requestFullscreen(document.documentElement);
            setIsFullscreen(true);
        }
    }, []);
    return { toggleFullscreen, isFullscreen };
}