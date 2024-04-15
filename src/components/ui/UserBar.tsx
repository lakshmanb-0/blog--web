import { getFileView } from '@/appwrite/storage-appwrite';
import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react'
import { UserFirstTwoLetters } from '../Navbar/Navbar';
import { TypePost } from '@/types/types';
import moment from 'moment'
// import moment from 'moment-timezone';

const UserBar = ({ post, variant }: { post: TypePost, variant: string }) => {
    const [userId, setUserId] = useState<string>('')

    useEffect(() => {
        setUserId(post.$permissions && post?.$permissions[0]?.split('"')[1].split(':')[1])
    }, [post])


    return post.$id && (
        <section className='flex items-center gap-3'>
            <div>
                <Avatar src={getFileView(userId ?? '')} className="uppercase" size={40}>{UserFirstTwoLetters(post.userName ?? '')}</Avatar>
            </div>
            <div className={`flex items-center  ${variant == 'vertical' ? 'flex-col' : 'gap-3'}`}>
                <h1>{post.userName}</h1>
                <p className='text-[#707070] text-sm'>{moment(post.$createdAt).format('LL')}</p>
                {/* <p className='text-[#707070]'>{moment(post.$createdAt).format('hh mm ')}</p> */}

            </div>
        </section>
    )
}

export default UserBar