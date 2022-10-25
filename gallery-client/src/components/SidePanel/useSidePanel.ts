import style from "./SidePanel.module.scss";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { finishSidePanelAnimation, selectLayout, toggleSidePanel } from "../../state/layout/layoutSlice";
import { useEffect } from "react";

export const useSidePanel = () => {
    const dispatch = useAppDispatch();
    const { sidePanel, sidePanelAniamationEnd } = useAppSelector(selectLayout);
    const animationClass = ((sidePanel && sidePanelAniamationEnd === undefined) ? '' : 
        sidePanel ? style.expand : style.hidden);
    const handleAnimationEnd = () => dispatch(finishSidePanelAnimation());
    return { animationClass, handleAnimationEnd };
} 

export const useSidePanelToggle = () => {
    const dispatch = useAppDispatch();
    return () => {
        dispatch(toggleSidePanel());
    }
}

export const useSidePanelAnimationEnd = (callback: () => void) => {
    const { sidePanelAniamationEnd } = useAppSelector(selectLayout);
    useEffect(() => {
        if (sidePanelAniamationEnd) {
            callback();
        }
    }, [ sidePanelAniamationEnd ]);
}