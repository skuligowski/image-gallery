import { useEffect, useRef } from "react";

export function useEffectSkippedFirst(effect: React.EffectCallback, deps?: React.DependencyList | undefined): void {
    const isMountRef = useRef(true);
    useEffect(() => {
        if (!isMountRef.current) {
            effect();
        }
        isMountRef.current = false;
    }, deps);
}