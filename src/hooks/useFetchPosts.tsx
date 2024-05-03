import { listDocuments } from "@/appwrite/database-appwrite";
import { setLoading, setPosts } from "@/store";
import { setCount } from "@/store/loadingSlice";
import { useDispatch } from "react-redux";

export const useFetchPosts = () => {
    const dispatch = useDispatch()

    return async (userId?: string, searchQuery?: string, take?: number, skip?: number) => {
        dispatch(setLoading(true))
        try {
            let postData = await listDocuments(userId, searchQuery, take, skip)
            dispatch(setCount(postData.total))
            if (postData && (userId || searchQuery)) {
                let data = postData.documents
                return data ?? []
            }
            dispatch(setPosts(postData.documents))
        } catch (error) {
            console.log('fetch posts', error);
        }
        finally {
            dispatch(setLoading(false))
        }
    };

}