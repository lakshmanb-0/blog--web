import { RootState } from "./store";
import { login, logout } from "./authSlice";
import { setLoading } from "./loadingSlice";
import { setPosts, setSinglePost, removePost, addPost } from "./postSlice";


export { type RootState, login, logout, setLoading, setPosts, setSinglePost, removePost, addPost }