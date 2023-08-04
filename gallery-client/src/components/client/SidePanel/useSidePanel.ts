import style from "./SidePanel.module.scss";
import { useLayout, useUpdateLayout } from "../../../hooks/useLayout";
import { useState } from "react";
import { useEffectSkippedFirst } from "../../../hooks/useEffect";

export const useSidePanel = () => {
    const updateLayout = useUpdateLayout();
    const [touched, setTouched] = useState<boolean>(false);
    const { sidePanel } = useLayout();
    useEffectSkippedFirst(() => {
        setTouched(true);
    }, [sidePanel]);
    let animationClass = sidePanel ? style.expand : style.hidden;
    if (!touched) {
        animationClass += ` ${style.noAnimation}`;
    }
    const onAnimationEnd = () => updateLayout();
    return { sidePanel, animationClass, onAnimationEnd };
} 

