import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image, Album } from "../../types/api";
import { AppThunk, RootState } from "../store";

export interface AlbumState {
    album: Album | undefined;
    images: Image[],
    loading: boolean;
    error?: string;
}

const initialState: AlbumState = {
    album: undefined,
    images: [],
    loading: false,
}

export const fetchAlbum = createAsyncThunk(
    'api/album',
    async (album: Album) => {
        const images = await (await fetch(`api/albums/${album.id}/images`)).json() as Image[];
        return images;
    }
);

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers: {
        setAlbum: (state, action: PayloadAction<Album>) => {
            state.album = action.payload;
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbum.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAlbum.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload;
            })
            .addCase(fetchAlbum.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

const { setAlbum } = albumSlice.actions;

export const selectAlbum = (album: Album): AppThunk => async (dispatch, getState) => {
    dispatch(setAlbum(album))
    dispatch(fetchAlbum(album));
}


export const albumReducer = albumSlice.reducer;
export const selectCurrentAlbum = (rootState: RootState): AlbumState => rootState.album;