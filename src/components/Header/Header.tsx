import { listDocuments } from "@/appwrite/database-appwrite";
import { TypePost } from "@/types/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setLoading, setPosts } from "@/store";
import { PostCard } from "../";

const Header = () => {
    const { posts } = useSelector((state: RootState) => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        if (posts.length > 0) return

        const fetchData = async () => {
            dispatch(setLoading(true))
            try {
                let postData = await listDocuments()
                console.log(postData);

                postData && dispatch(setPosts(postData.documents))
            }
            catch (error) { console.log('fetch posts', error); }
            finally { dispatch(setLoading(false)) }
        };
        fetchData()
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
