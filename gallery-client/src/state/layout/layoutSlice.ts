import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { fetchAlbums } from "../albums/albumsSlice";
import { RootState } from "../store";
import { fetchUser, logoutUser } from '../user/userSlice';

export interface LayoutState {
    loading: boolean;
    callsCount: number;
    sidePanel: boolean;
    sidePanelAniamationEnd: boolean | undefined;
}

const initialState: LayoutState = {
    loading: false,
    callsCount: 0,
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
        resetLayout: (state) => {
            state.loading = false;
            state.callsCount = 0;
            state.sidePanel = true;
            state.sidePanelAniamationEnd = undefined;
        }
    },
    extraReducers: (builder) => 
        builder
            .addMatcher(isPending(fetchUser, fetchAlbums, logoutUser), (state) => {
                state.callsCount += 1;
                state.loading = true;
            })
            .addMatcher(isFulfilled(fetchUser, fetchAlbums, logoutUser), (state) => {
                if (state.callsCount != 0) {
                    state.callsCount -= 1;
                    state.loading = state.callsCount > 0;
                }
            })
            .addMatcher(isRejected(fetchUser, fetchAlbums, logoutUser), (state) => {
                if (state.callsCount != 0) {
                    state.callsCount -= 1;
                    state.loading = state.callsCount > 0;
                }
            })
});

export const { resetLayout, toggleSidePanel, finishSidePanelAnimation } = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
export const selectLayout = (rootState: RootState): LayoutState => rootState.layout;
