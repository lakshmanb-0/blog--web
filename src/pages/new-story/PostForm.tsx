import { createPost, updatePost } from "@/appwrite/database-appwrite";
import { createFile, deleteFile, getFile, getFileView, updateFile } from "@/appwrite/storage-appwrite";
import { PostEditor } from "@/components";
import useToast from "@/hooks/useToast";
import { RootState, addPost, setSinglePost } from "@/store";
import { Button, Form, Input, Select, Spin, Upload } from "antd"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const PostForm = ({ type }: { type: 'create' | 'edit' }) => {
    const [form] = Form.useForm()
    const user = useSelector((state: RootState) => state.auth.user)
    const [loading, setLoading] = useState<boolean>(false);
    const showToast = useToast()
    const editorRef = useRef<any>(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        if (type === 'edit') {
            form.setFieldsValue(
                {
                    'title': location?.state?.title,
                    'status': location?.state?.status,
                    'upload': location?.state?.imageId
                        ? [
                            {
                                uid: 1,
                                size: 10,
                                url: getFileView(location?.state?.imageId),
                            }
                        ]
                        : [],
                }
            )
        }
        else {
            form.resetFields();
            form.setFieldValue('status', 'public');
        }
    }, [type])


    const handleSubmit = async (data: { title: string, status: string, upload: any }) => {
        setLoading(true)
        try {
            let props = {
                title: data.title,
                content: editorRef.current.getContent().toString(),
                status: data.status,
                ownerName: user.name,
                ownerId: user.$id,
                documentId: location?.state?.$id,
            }

            if (editorRef.current) {
                if (!!location?.state?.$id) { // update post
                    if (location?.state.ownerId != user.$id) return showToast('error', 'You are not authorized to update this post');
                    let ImageId = data?.upload?.[0]?.originFileObj && await updateFile(location?.state?.imageId, data?.upload?.[0]?.originFileObj);
                    let file = await getFile(location?.state?.imageId);
                    let post = await updatePost({ ...props, imageId: !!ImageId?.$id ? ImageId?.$id : !!file ? location?.state?.imageId : null });

                    if (post) {
                        showToast('success', 'post updated successfully');
                        form.resetFields();
                        dispatch(setSinglePost(post))
                        post.status === 'public' && dispatch(addPost(post))
                        navigate('/post/' + post?.$id)
                    }
                }

                else { //create post
                    let ImageId = data?.upload?.[0]?.originFileObj && await createFile(data.upload[0].originFileObj);
                    let post = await createPost({ ...props, imageId: ImageId?.$id });
                    if (post) {
                        showToast('success', 'Post created');
                        form.resetFields();
                        dispatch(setSinglePost(post))
                        post.status === 'public' && dispatch(addPost(post))
                        navigate('/post/' + post?.$id)
                    }
                }
            }
        } catch (error: any) {
            showToast('error', error.message)
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <Spin spinning={loading}>
            <Form form={form}
                onFinish={handleSubmit}
                className="px-4 py-10">
                <Form.Item
                    name='title'
                    rules={[
                        {
                            required: true,
                        },
                        {
                            max: 100,
                            message: 'Title must be less than 100 characters',
                        },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Title"
                        autoSize
                        variant="borderless"
                        className="text-xl sm:text-4xl font-bold"
                    />
                </Form.Item>

                <Form.Item
                    label='Featured Image'
                    name='upload'
                    valuePropName="fileList"
                    getValueFromEvent={e => e?.fileList}
                    rules={[
                        {
                            required: false,
                            validator(_, fileList) {
                                if (!fileList || fileList.length === 0) {
                                    return Promise.resolve(); // No file uploaded, validation passes
                                } else {
                                    let size = Math.floor(fileList[0].size / (1024 * 1024)); // File size in MB
                                    if (size < 5) {
                                        return Promise.resolve(); // File size is within limit
                                    }
                                    return Promise.reject('Image must be smaller than 5MB'); // File size exceeds limit
                                }
                            }
                        }
                    ]}
                >
                    <Upload listType="picture-card" name='Upload' accept='.png, .jpg, .jpeg'
                        maxCount={1}
                        beforeUpload={() => false}
                        showUploadList={{
                            showPreviewIcon: false,
                        }}
                        onRemove={async () => { !!location.state.imageId && await deleteFile(location?.state?.imageId) }}
                    >
                        Upload
                    </Upload>
                </Form.Item>
                <p className="text-xs text-[#a7a7a7]">{`(support only jpg, jpeg, png)`}</p>

                <PostEditor editorValue={editorRef} initialValue={location?.state?.content ?? ''} />

                <Form.Item name='status' label='Status'>
                    <Select
                        style={{ width: 120 }}
                        options={[
                            { value: 'public', label: 'Public' },
                            { value: 'private', label: 'Private' },
                        ]}
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            // loading={loading}
                            type="primary"
                            htmlType="submit"
                            className='w-full text-center py-2 mt-6 h-full'
                            disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length}
                        >
                            save
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default PostForm