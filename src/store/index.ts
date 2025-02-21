import { configureStore } from '@reduxjs/toolkit';
import { postSlice } from './slices/apiPost';

export const store = configureStore({
    reducer: {
        [postSlice.reducerPath]: postSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>