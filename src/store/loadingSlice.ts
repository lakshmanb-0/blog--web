import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false as boolean,
    count: 0 as number
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setCount(state, action) {
            state.count = action.payload
        }
    }
})

export const { setLoading, setCount } = loadingSlice.actions
export default loadingSlice.reducer