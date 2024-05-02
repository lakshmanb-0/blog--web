import { deleteFile, getFilePreview } from '@/appwrite/storage-appwrite';
import { Avatar, Button, Popconfirm } from 'antd';
import { TypePost } from '@/types/types';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '@/appwrite/database-appwrite';
import { RootState, removePost } from '@/store';
import { userFirstTwoLetters } from '@/conf/utils';

type Props = {
    post: TypePost
}

const UserBar: React.FC<Props> = ({ post }) => {
    const { user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleEditDocument = async () => {
        navigate(`/post/${post.$id}/edit/${post.ownerId}`, { state: { ...post } })
    }

    const handleDeleteDocument = async () => {
        await deletePost(post.$id!)
        post.imageId && await deleteFile(post.imageId) // delete image
        dispatch(removePost(post.$id!))
        navigate('/')
    }

    return post.$id && (
        <section className='flex items-center gap-3 py-2 flex-wrap'>
            <div className='flex items-center gap-3'>
                <Avatar src={getFilePreview(post.ownerId) ?? ''} className="uppercase" size={35}>{userFirstTwoLetters(post.ownerName)}</Avatar>
                <h1 className='truncate capitalize'>{post.ownerName}</h1>
                <p className='text-[#707070] text-sm'>{moment(post.$createdAt).format('LL')}</p>
            </div>
            {
                post.ownerId == user.$id && (
                    <div className='ml-auto flex gap-2 '>
                        <Button onClick={handleEditDocument} type='dashed' className='  cursor-pointer' title='Edit'>
                            Edit
                        </Button>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={handleDeleteDocument}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger type='dashed'>Delete</Button>
                        </Popconfirm>
                    </div>
                )
            }
        </section>
    )
}

export default UserBar