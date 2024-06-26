import { getPost } from "@/appwrite/database-appwrite";
import { getFileView } from "@/appwrite/storage-appwrite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import './postStyles.css'
import { RootState, setLoading, setSinglePost } from "@/store";
import UserBar from "@/components/ui/UserBar";
import Prism from "prismjs";
import 'prismjs/themes/prism.css';

const Post = () => {
    const post = useSelector((state: RootState) => state.post.singlePost);
    const { postId } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        window.scrollTo(0, 0)
        Prism.highlightAll();

        if (Object.keys(post).length > 0) return

        dispatch(setLoading(true))
        const fetchPost = async () => {
            let data = await getPost(postId ?? '')
            data && dispatch(setSinglePost(data))
        }
        fetchPost()
        dispatch(setLoading(false))
    }, [])

    return (
        <section className="flex flex-col items-center max-w-3xl mx-auto px-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold py-5 text-center">{post.title ?? ''}</h1>
            <UserBar post={post} />
            {post.imageId && <img src={getFileView(post.imageId)} alt="" className="py-5" />}
            <section className="w-full px-3 text-lg sm:text-xl postStyle">
                {parse(`${post?.content ?? ''}`)}
            </section>
        </section >
    )
}

export default Post