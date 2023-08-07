import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Config } from '../../types/api';
import { RootState } from '../store';

export interface ConfigState {
  config: Config | undefined;
  loading: boolean;
  error?: string;
}

const initialState: ConfigState = {
  config: undefined,
  loading: false,
};

export const fetchConfig = createAsyncThunk('api/config', async () => {
  return (await (await fetch('/api/config')).json()) as Config;
});

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const configReducer = configSlice.reducer;
export const selectConfig = (rootState: RootState) => rootState.config;
