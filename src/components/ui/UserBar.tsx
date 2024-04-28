import { deleteFile, getFileView } from '@/appwrite/storage-appwrite';
import { Avatar, Button, Popconfirm } from 'antd';
import { userFirstTwoLetters } from '../Navbar/Navbar';
import { TypePost } from '@/types/types';
import moment from 'moment'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '@/appwrite/database-appwrite';
import { RootState, removePost } from '@/store';

type Props = {
    post: TypePost
    variant: string
}

const UserBar: React.FC<Props> = ({ post, variant }) => {
    const { user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const handleEditDocument = async () => {
        navigate(`/post/${post.$id}/edit/${post.ownerId}`, { state: { ...post } })
    }
    console.log(location);

    const handleDeleteDocument = async () => {
        console.log(post.$id);
        await deletePost(post.$id!)
        post.imageId && await deleteFile(post.imageId) // delete image
        dispatch(removePost(post.$id!))
        navigate('/')
    }

    return post.$id && (
        <section className='flex items-center gap-3'>
            <div>
                <Avatar src={getFileView(post.ownerId)} className="uppercase" size={40}>{userFirstTwoLetters(post.ownerName ?? '')}</Avatar>
            </div>
            <div className={`flex items-center  ${variant == 'vertical' ? 'flex-col' : 'gap-3'}`}>
                <h1>{post.ownerName}</h1>
                <p className='text-[#707070] text-sm'>{moment(post.$createdAt).format('LL')}</p>
            </div>
            {
                (location.pathname != `/` && post.ownerId == user.$id) && (
                    <div className='ml-auto'>
                        <button onClick={handleEditDocument}>edit</button>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={handleDeleteDocument}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </div>
                )
            }

        </section>
    )
}

export default UserBar