import { configureStore } from '@reduxjs/toolkit';
import { postMiddleware, postReducer, postSlicePath } from './slices/post';

export const store = configureStore({
    reducer: {
        [postSlicePath]: postReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postMiddleware)
})

export type RootState = ReturnType<typeof store.getState>