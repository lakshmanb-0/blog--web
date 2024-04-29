import { TypePost } from "@/types/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, } from "@/store";
import { PostCard } from "../";
import { useFetchPosts } from "@/hooks/useFetchPosts";

const Header = () => {
    const { posts } = useSelector((state: RootState) => state.post)
    const fetchPosts = useFetchPosts()

    useEffect(() => {
        if (posts.length > 0) return
        fetchPosts()
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
