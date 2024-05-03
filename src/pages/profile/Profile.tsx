import PostCard from "@/components/ui/PostCard";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { RootState } from "@/store/store";
import { TypePost } from "@/types/types";
import { Pagination } from "antd";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const Profile = () => {
    const [posts, setPosts] = useState<any>()
    const { count } = useSelector((state: RootState) => state.loading)
    const user = useSelector((state: RootState) => state.auth.user)
    const fetchPosts = useFetchPosts()
    const [limit, setLimit] = useState({
        skip: sessionStorage.getItem('profileLimit') ? JSON.parse(sessionStorage.getItem('profileLimit') as string).skip : 0,
        take: sessionStorage.getItem('profileLimit') ? JSON.parse(sessionStorage.getItem('profileLimit') as string).take : 10
    })

    useEffect(() => {
        sessionStorage.removeItem('limit')
        const fetchData = async () => {
            let data = await fetchPosts(user.$id, undefined, limit.take, limit.skip)
            setPosts(data)
        }
        user.name && fetchData()
        sessionStorage.setItem('profileLimit', JSON.stringify(limit))
    }, [limit, user])

    const paginationChange = (page: number) => {
        console.log('change', page);
        setLimit({ skip: (page - 1) * limit.take, take: limit.take })
    }

    return (
        <div>
            {posts?.map((el: TypePost) => (
                <PostCard key={el.$id} data={el} />
            ))}
            {posts?.length === 0 && <p>No posts available create one</p>}
            {count > 10 && <Pagination
                className="w-full text-center py-5"
                simple
                defaultCurrent={limit.skip / limit.take + 1}
                total={count}
                onChange={paginationChange}
            />}
        </div>
    )
}

export default Profile