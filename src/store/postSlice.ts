import { TypePost } from "@/types/types"
import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    singlePost: {} as TypePost,
    posts: [] as TypePost[]
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setSinglePost: (state, action) => {
            state.singlePost = action.payload
        },
        setPosts: (state, action) => {
            state.posts = [...action.payload]
        }
    }
})

export const { setPosts, setSinglePost } = postSlice.actions
export default postSlice.reducer