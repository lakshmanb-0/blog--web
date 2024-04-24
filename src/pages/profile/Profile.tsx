import { listDocuments } from "@/appwrite/database-appwrite";
import PostCard from "@/components/ui/PostCard";
import { setLoading } from "@/store/loadingSlice";
import { RootState } from "@/store/store";
import { TypePost } from "@/types/types";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
    const [posts, setPosts] = useState<any>()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)

    useEffect(() => {
        // if (posts.length > 0) return
        const fetchData = async () => {
            dispatch(setLoading(true))
            try {
                let postData = await listDocuments(user.$id)
                console.log(postData);
                console.log(user.$id);
                if (postData) {
                    let data = postData.documents
                    setPosts(data ?? [])
                }
            } catch (error) {
                console.log('fetch posts', error);
            }
            finally {
                dispatch(setLoading(false))
            }
        };
        user.name && fetchData()
    }, [user]);

    return (
        <div>
            {posts?.map((el: TypePost) => (
                <PostCard key={el.$id} data={el} />
            ))}
            {posts?.length === 0 && <p>No posts available create one</p>}
        </div>
    )
}

export default Profile