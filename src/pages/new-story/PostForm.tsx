import { createPost } from "@/appwrite/database-appwrite";
import { createFile } from "@/appwrite/storage-appwrite";
import { PostEditor } from "@/components";
import useToast from "@/hooks/useToast";
import { Button, Form, Input, Select, Spin, Upload } from "antd"
import { useRef, useState } from "react";

const PostForm = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false);
    const showToast = useToast()
    const editorRef = useRef<any>(null);

    const handleSubmit = async (data: { title: string, status: string, upload: any }) => {
        setLoading(true)
        console.log(data);
        try {
            let props = {
                title: data.title,
                content: editorRef.current.getContent(),
                status: data.status
            }
            if (editorRef.current) {
                let post = await createPost(props);
                data.upload && await createFile(post?.$id!, data.upload[0].originFileObj);
                if (post) showToast('success', 'Post created'); form.resetFields()
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
            <Form form={form} onFinish={handleSubmit} className="px-4 py-10">
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
                    <Upload listType="picture-card" name='Upload' accept='image/*'
                        maxCount={1}
                        beforeUpload={() => false}
                        showUploadList={{
                            showPreviewIcon: false,
                        }}
                    >
                        Upload
                    </Upload>
                </Form.Item>

                <PostEditor editorValue={editorRef} />

                <Form.Item name='status' initialValue='public' label='Status'>
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