import { TypePost } from "@/types/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, } from "@/store";
import { PostCard } from "../";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { Pagination } from "antd";

const Header = () => {
    const { posts } = useSelector((state: RootState) => state.post)
    const { count } = useSelector((state: RootState) => state.loading)
    const fetchPosts = useFetchPosts()
    const [limit, setLimit] = useState({
        skip: sessionStorage.getItem('limit') ? JSON.parse(sessionStorage.getItem('limit') as string).skip : 0,
        take: sessionStorage.getItem('limit') ? JSON.parse(sessionStorage.getItem('limit') as string).take : 10
    })

    useEffect(() => {
        sessionStorage.removeItem('profileLimit')
        fetchPosts(undefined, undefined, limit.take, limit.skip)
        sessionStorage.setItem('limit', JSON.stringify(limit))
    }, [limit])


    const paginationChange = (page: number) => {
        console.log('change', page);
        setLimit({ skip: (page - 1) * limit.take, take: limit.take })
    }

    return (
        <header className="grid gap-5">
            {posts?.map((el: TypePost) => (
                <PostCard key={el.$id} data={el} />
            ))}

            {count > 10 && <Pagination
                className="w-full text-center py-5"
                simple
                defaultCurrent={limit.skip / limit.take + 1}
                total={count}
                onChange={paginationChange}
            />}
        </header>
    );
};

export default Header;
