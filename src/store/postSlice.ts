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
        },
        addPost: (state, action) => {
            state.posts = [action.payload, ...state.posts.filter(el => el.$id !== action.payload.$id)]
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(el => el.$id !== action.payload)
        }
    }
})

export const { setPosts, setSinglePost, removePost, addPost } = postSlice.actions
export default postSlice.reducer