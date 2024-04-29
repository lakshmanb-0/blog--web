import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserBar from './UserBar'
import { getFilePreview } from '@/appwrite/storage-appwrite'
import { TypePost } from '@/types/types'
import { setSinglePost } from '@/store'

type Props = {
    data: TypePost
}
const PostCard: React.FC<Props> = ({ data }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlePostEvent = () => {
        dispatch(setSinglePost(data))
        navigate(`/post/${data.$id}`)
    }

    const handleContentData = () => {
        const content = `${data?.content ?? ''}`;
        const contentWithoutTags = content.replace(/<[^>]*>/g, '').replace(/&([^;]+);/g, ' '); // Remove HTML tags
        return contentWithoutTags.substring(0, 800);
    }

    return (
        <div key={data.$id} className="cursor-pointer py-10" onClick={(handlePostEvent)}>
            <UserBar post={data} variant='horizontal' />
            <div className="flex gap-4" >
                <div className="overflow-hidden flex-1">
                    <h1 className="font-bold text-lg py-2">{data.title}</h1>
                    <p className="line-clamp-3 text-base">{handleContentData()}</p>
                </div>
                {data.imageId && <img src={getFilePreview(data.imageId)} alt="" className="size-40 object-cover" />}
            </div>
        </div>
    )
}

export default PostCard