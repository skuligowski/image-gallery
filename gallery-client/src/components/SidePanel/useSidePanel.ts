import style from "./SidePanel.module.scss";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { updateLayout, selectLayout, toggleSidePanel } from "../../state/layout/layoutSlice";
import { useState } from "react";

export const useSidePanel = () => {
    const [initial, setInitial] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const { sidePanel } = useAppSelector(selectLayout);
    const animationClass = (sidePanel && initial) ? '' : sidePanel ? style.expand : style.hidden;
    if (!sidePanel && initial) {
        setInitial(false);
    }
    const onAnimationEnd = () => dispatch(updateLayout());
    return { sidePanel, animationClass, onAnimationEnd };
} 

export const useSidePanelToggle = () => {
    const dispatch = useAppDispatch();
    return () => {
        dispatch(toggleSidePanel());
    }
}

