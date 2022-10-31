import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from '../../types/api.d';

export interface UserState {
    authenticated: boolean;
    user: User | undefined;
    refLocation?: string;
    loading: boolean;
    loginError?: string;
    userError?: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface FetchUserData {
    refLocation?: string;
}

const initialState: UserState = {
    authenticated: false,
    user: undefined,
    loading: false,
}

export const fetchUser = createAsyncThunk(
    'api/user',
    async ({ refLocation }: FetchUserData, { rejectWithValue }) => {
        const response = await fetch(`/api/user`);
        if (response.status === 401) {
            return rejectWithValue({ refLocation });
        } 
        return await response.json();
    }
);

export const loginUser = createAsyncThunk(
    'api/login',
    async ({username, password}: LoginData) => {
        const response = await fetch('/api/login', { 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }), 
            method: 'POST'
        });
        const jsonResponse = await response.json() as User;
        return jsonResponse;
    }
);

export const logoutUser = createAsyncThunk(
    'api/logout', 
    async () => {
        const response = await fetch('/api/logout', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return await response.text();
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = undefined;
                state.authenticated = false;
                state.refLocation = undefined;
            })
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true;
                state.userError = undefined;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.refLocation = (action.payload as any).refLocation;
                state.loading = false;
                state.userError = action.error.message;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.authenticated = true;
                state.user = action.payload;
                state.userError = undefined;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.loginError = undefined;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.error.message;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.authenticated = true;
                state.user = action.payload;
                state.loginError = undefined;
                state.userError = undefined;
            });
    }
});

export const userReducer = userSlice.reducer;
export const selectUser = (rootState: RootState): UserState => rootState.user;

