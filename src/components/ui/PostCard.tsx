import { setSinglePost } from '@/store/postSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserBar from './UserBar'
import { getFilePreview, getFileView } from '@/appwrite/storage-appwrite'
import { TypePost } from '@/types/types'

const PostCard = ({ data }: { data: TypePost }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlePostEvent = () => {
        dispatch(setSinglePost(data))
        navigate(`/post/${data.$id}`)
    }
    const handleContentData = () => {
        const content = `${data?.content ?? ''}`;
        const contentWithoutTags = content.replace(/<[^>]*>/g, '').replace(/&([^;]+);/g, ' '); // Remove HTML tags
        const first100Characters = contentWithoutTags.substring(0, 800);
        return first100Characters
    }
    // console.log(getFilePreview(data.$id));

    return (
        <div key={data.$id} className="cursor-pointer py-10">
            <UserBar post={data} variant='horizontal' />
            <div className="flex gap-4" onClick={handlePostEvent}>
                <div className="overflow-hidden flex-1">
                    <h1 className="font-bold text-lg py-2">{data.title}</h1>
                    <p className="line-clamp-5 text-base">{handleContentData()}</p>
                </div>
                {data.imageId && <img src={getFileView(data.imageId)} alt="" className="size-40 object-cover" />}
                {/* <img src={getFileView(data?.$id!)} alt="" className='size-40 object-cover' /> */}

            </div>

            {/* <img src={getFileView(data?.$id!)} alt="" /> */}
        </div>
    )
}

export default PostCard