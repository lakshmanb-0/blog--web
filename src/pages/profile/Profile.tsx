import PostCard from "@/components/ui/PostCard";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { RootState } from "@/store/store";
import { TypePost } from "@/types/types";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const Profile = () => {
    const [posts, setPosts] = useState<any>()
    const user = useSelector((state: RootState) => state.auth.user)
    const fetchPosts = useFetchPosts()

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetchPosts(user.$id)
            setPosts(data)
        }

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