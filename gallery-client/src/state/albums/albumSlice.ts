import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image, AlbumResponse } from "../../types/api";
import { RootState } from "../store";

export interface AlbumState {
    album: AlbumResponse | undefined;
    image: Image | undefined;
    loading: boolean;
    error?: string;
}

const initialState: AlbumState = {
    album: undefined,
    image: undefined,
    loading: false,
}

export const fetchAlbum = createAsyncThunk(
    'api/album',
    async (permalink: string) => {
        const images = await (await fetch(`/api/album?permalink=${permalink}`)).json() as AlbumResponse;
        return images;
    }
);

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        selectImage: (state, action: PayloadAction<Image | undefined>) => {
            state.image = action.payload;
        },
        albumNotFound: (state) => {
            state.album = undefined;
            state.image = undefined;
            state.error = 'Album was not found';
        },
        resetAlbum: (state) => {
            state.album = undefined;
            state.image = undefined;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbum.pending, (state) => {
                state.loading = true;
                state.image = undefined;
                state.error = undefined;
            })
            .addCase(fetchAlbum.fulfilled, (state, action) => {
                state.loading = false;
                state.image = undefined;
                state.album = action.payload;
            })
            .addCase(fetchAlbum.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const { selectImage, albumNotFound, resetAlbum } = albumSlice.actions;
export const albumReducer = albumSlice.reducer;
export const selectCurrentAlbum = (rootState: RootState): AlbumState => rootState.album;
