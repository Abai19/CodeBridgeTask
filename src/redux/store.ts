import { configureStore } from '@reduxjs/toolkit'
import newsListSlice from "./newsListSlice";

export const store = configureStore({
    reducer: {
        newsList: newsListSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
