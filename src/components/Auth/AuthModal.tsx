import React, { useState } from 'react';
import { Modal as AntModal, Button, Form, Input, Upload } from 'antd';
import { createAccount, userLogin } from "@/appwrite/auth-appwrite";
import useToast from "@/hooks/useToast";
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { createFile } from '@/appwrite/storage-appwrite';
import { useNavigate } from 'react-router-dom';

type TypeModalProps = {
    type: { type: string, title: string },
    isModalOpen: boolean,
    changeModalOpen: () => void
}

const AuthModal: React.FC<TypeModalProps> = ({ type, isModalOpen, changeModalOpen }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const showToast = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //handle modal close
    const handleCancel = () => {
        form.resetFields() //reset form
        changeModalOpen();
    };

    const handleSubmit = async (data: { email: string, password: string, name: string, upload: any }) => {
        setLoading(true);
        try {
            let userDetails;
            if (type.type === 'Sign up') { // If sign up then create account 
                userDetails = await createAccount(data.email, data.password, data.name)
                data.upload && await createFile(data.upload[0].originFileObj); //image upload if image selected
            }
            else userDetails = await userLogin(data.email, data.password);  // else login

            if (userDetails) {
                dispatch(login(userDetails)) //store user in redux
                {
                    type.type === 'Sign up'
                        ? showToast('success', 'Account created successfully')
                        : showToast('success', 'Login success')
                } //show toast
                navigate('/')
                handleCancel() //close modal

            }
        } catch (error: any) {
            showToast('error', error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <AntModal
            centered
            open={isModalOpen}
            onCancel={handleCancel}
            keyboard
            mask
            footer={null}
            className='shadow-xl'
        >
            <section className='py-5'>
                <h1 className='text-3xl w-full text-center py-3 uppercase font-semibold' >{type.title}</h1>
                <Form form={form} onFinish={handleSubmit} className='py-5' labelCol={{ span: 7 }}>

                    {
                        type.type === 'Sign up' &&
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    }

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                validator(_, value) {
                                    if (value && value.length >= 8) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Password must be at least 8 characters long');
                                },
                            },]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {
                        type.type === 'Sign up' && (
                            <>
                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                {/* upload  */}
                                <Form.Item
                                    label="Profile Pic"
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
                                                    if (size < 2) {
                                                        return Promise.resolve(); // File size is within limit
                                                    }
                                                    return Promise.reject('Image must be smaller than 2MB'); // File size exceeds limit
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
                                    >
                                        Upload
                                    </Upload>
                                </Form.Item>
                                <p className="text-xs mt-1 text-[#a7a7a7]">{`(support only jpg, jpeg, png)`}</p>

                            </>
                        )}

                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                loading={loading}
                                type="primary"
                                htmlType="submit"
                                className='w-full text-center py-2 mt-6 h-full'
                                disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length}
                            >
                                {type.type}
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </section>
        </AntModal>
    );
};

export default React.memo(AuthModal);