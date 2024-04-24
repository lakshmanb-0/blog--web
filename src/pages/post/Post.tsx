import { getPost } from "@/appwrite/database-appwrite";
import { getFile, getFileView } from "@/appwrite/storage-appwrite";
import { setLoading } from "@/store/loadingSlice";
import { setSinglePost } from "@/store/postSlice";
import { RootState } from "@/store/store"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import './postStyles.css'
import UserBar from "@/components/ui/UserBar";

const Post = () => {
    const post = useSelector((state: RootState) => state.post.singlePost);
    const { postId } = useParams()
    const dispatch = useDispatch()

    console.log(post);

    useEffect(() => {
        window.scrollTo(0, 0)
        if (Object.keys(post).length > 0) return
        else {
            dispatch(setLoading(true))
            const fetchPost = async () => {
                console.log(postId);
                let data = await getPost(postId ?? '')
                data && dispatch(setSinglePost(data))
            }
            fetchPost()
            dispatch(setLoading(false))
        }
    }, [])

    return (
        <section className="flex flex-col items-center max-w-3xl mx-auto ">
            <h1 className="text-4xl sm:text-5xl font-extrabold py-5 text-center">{post.title ?? ''}</h1>
            <UserBar post={post} variant='vertical' />
            {post.imageId && <img src={getFileView(post.imageId ?? '')} alt="" className="py-5" />}
            <section className="w-full px-3 text-lg sm:text-xl postStyle">
                {parse(`${post?.content ?? ''}`)}
            </section>
        </section >
    )
}

export default Post