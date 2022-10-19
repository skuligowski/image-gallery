import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Album } from "../../types/api";
import { RootState } from "../store";

export interface AlbumsState {
    albums: Album[];
    loading: boolean;
    error?: string;
}

const initialState: AlbumsState = {
    albums: [],
    loading: true,
}

export const fetchAlbums = createAsyncThunk(
    'api/albums',
    async () => {
        const albums = await (await fetch('api/albums')).json() as Album[];
        return albums;
    }
);

const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.loading = false;
                state.albums = action.payload;
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (rootState: RootState) => rootState.albums;