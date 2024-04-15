import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import postReducer from './postSlice'
import loadingSlice from './loadingSlice';


const store = configureStore({
    reducer: {
        loading: loadingSlice,
        auth: authReducer,
        post: postReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch