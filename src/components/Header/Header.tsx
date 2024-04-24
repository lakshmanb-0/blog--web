import { listDocuments } from "@/appwrite/database-appwrite";
import { setLoading } from "@/store/loadingSlice";
import { setPosts } from "@/store/postSlice";
import { RootState } from "@/store/store";
import { TypePost } from "@/types/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../ui/PostCard";
const Header = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state: RootState) => state.post.posts)

    useEffect(() => {
        if (posts.length > 0) return
        else {
            const fetchData = async () => {
                dispatch(setLoading(true))
                try {
                    let postData = await listDocuments()
                    console.log(postData);

                    if (postData) {
                        dispatch(setPosts(postData.documents))
                    }
                } catch (error) {
                    console.log('fetch posts', error);
                }
                finally {
                    dispatch(setLoading(false))
                }
            };
            fetchData()
        }
    }, []);

    return (
        <header className="grid md:grid-cols-2 gap-5">
            {posts?.map((el: TypePost) => (
                <PostCard key={el.$id} data={el} />
            ))}
        </header>
    );
};

export default Header;
