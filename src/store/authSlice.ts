import { TypeUser } from "@/types/types"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loggedIn: false as boolean,
    user: {
        $id: '',
        $createdAt: '',
        name: '',
        email: '',
        phone: '',
        accessedAt: '',
    } as TypeUser,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggedIn = true
            state.user = action.payload
        },
        logout: (state) => {
            state.loggedIn = false
            state.user = {
                $id: '',
                $createdAt: '',
                name: '',
                email: '',
                phone: '',
                accessedAt: '',
            }
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer