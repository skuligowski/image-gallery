import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { albumReducer } from './albums/albumSlice';
import { albumsReducer } from './albums/albumsSlice';
import { layoutReducer } from './layout/layoutSlice';

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    album: albumReducer,
    layout: layoutReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
