import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { fetchAlbums } from "../albums/albumsSlice";
import { fetchConfig } from "../config/configSlice";
import { RootState } from "../store";
import { fetchUser, logoutUser } from '../user/userSlice';
import { isMobile } from "./isMobile";

export interface LayoutState {
    loading: boolean;
    fullscreen: boolean;
    callsCount: number;
    sidePanel: boolean;
    layoutUpdated: number;
}

const initialState: LayoutState = {
    loading: false,
    fullscreen: false,
    callsCount: 0,
    sidePanel: true,
    layoutUpdated: 0,
}

const layoutSlice = createSlice({
    name: 'layout',
    initialState: () => {
        return isMobile() ? {...initialState, sidePanel: false} : initialState;
    },
    reducers: {
        toggleSidePanel: (state, action) => {
            if (action.payload !== undefined) {
                state.sidePanel = action.payload;
            } else {
                state.sidePanel = !state.sidePanel;
            }
        },
        updateLayout: (state) => {
            state.layoutUpdated += 1;
        },
        resetLayout: (state) => {
            state.loading = false;
            state.callsCount = 0;
            state.sidePanel = true;
        }
    },
    extraReducers: (builder) => 
        builder
            .addMatcher(isPending(fetchUser, fetchAlbums, fetchConfig, logoutUser), (state) => {
                state.callsCount += 1;
                state.loading = true;
            })
            .addMatcher(isFulfilled(fetchUser, fetchAlbums, fetchConfig, logoutUser), (state) => {
                if (state.callsCount != 0) {
                    state.callsCount -= 1;
                    state.loading = state.callsCount > 0;
                }
            })
            .addMatcher(isRejected(fetchUser, fetchAlbums, fetchConfig, logoutUser), (state) => {
                if (state.callsCount != 0) {
                    state.callsCount -= 1;
                    state.loading = state.callsCount > 0;
                }
            })
});

export const { resetLayout, toggleSidePanel, updateLayout } = layoutSlice.actions;
export const layoutReducer = layoutSlice.reducer;
export const selectLayout = (rootState: RootState): LayoutState => rootState.layout;
