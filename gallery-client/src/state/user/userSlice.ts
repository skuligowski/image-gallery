import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from '../../types/api.d';

export interface UserState {
    user: User | undefined;
    refLocation?: string;
    loading: boolean;
    error?: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface FetchUserData {
    refLocation?: string;
}

const initialState: UserState = {
    user: undefined,
    loading: true,
}

export const fetchUser = createAsyncThunk(
    'api/user',
    async ({ refLocation }: FetchUserData, { rejectWithValue }) => {
        const response = await fetch(`/api/user`);
        if (response.status === 401) {
            console.log('rejected');
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
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = undefined;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.refLocation = (action.payload as any).refLocation;
            })
            .addMatcher(isPending(fetchUser, loginUser), (state, action) => {
                state.loading = true;
                state.user = undefined;
                state.error = undefined;
            })
            .addMatcher(isFulfilled(fetchUser, loginUser), (state, action) => {
                console.log('User fullfiled', action.payload);
                state.loading = false;
                state.user = action.payload;
            })
            .addMatcher(isRejected(fetchUser, loginUser), (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const userReducer = userSlice.reducer;
export const selectUser = (rootState: RootState): UserState => rootState.user;

