import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface LayoutState {
    sidePanel: boolean;
    sidePanelAniamationEnd: boolean | undefined;
}

const initialState: LayoutState = {
    sidePanel: true,
    sidePanelAniamationEnd: undefined,
}

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        toggleSidePanel: (state) => {
            state.sidePanel = !state.sidePanel;
            state.sidePanelAniamationEnd = false;
        },
        finishSidePanelAnimation: (state) => {
            state.sidePanelAniamationEnd = true;
        },
    }
});

export const { toggleSidePanel, finishSidePanelAnimation } = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
export const selectLayout = (rootState: RootState): LayoutState => rootState.layout;
