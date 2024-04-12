import React, { useEffect, useState } from 'react';
import { Modal as AntModal, Button, Form, Input, Upload } from 'antd';
import { createAccount, userLogin } from "@/appwrite/auth-appwrite";
import useToast from "@/hooks/useToast";
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { createFile } from '@/appwrite/storage-appwrite';

type TypeModalProps = {
    type: string,
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Modal: React.FC<TypeModalProps> = ({ type, isModalOpen, setIsModalOpen }) => {
    const [modalType, setModalType] = useState<string>(type);
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const showToast = useToast()
    const dispatch = useDispatch()

    //setting modal type
    useEffect(() => {
        setModalType(type)
    }, [type])

    //handle modal close
    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };

    useEffect(() => {
        setClientReady(true);
    }, []);

    const handleSubmit = async (data: { email: string, password: string, name: string }) => {
        setLoading(true);
        try {
            let userDetails;
            {
                modalType === 'Sign up'
                    ? userDetails = await createAccount(data.email, data.password, data.name)
                    : userDetails = await userLogin(data.email, data.password)
            }

            if (userDetails) {
                dispatch(login(userDetails))
                {
                    modalType === 'Sign up'
                        ? showToast('success', 'Account created successfully')
                        : showToast('success', 'Login success')
                }
                handleCancel()

            }
        } catch (error: any) {
            showToast('error', error.message)
        }
        finally {
            setLoading(false)
        }
    }
    const normFile = async (e: any) => {
        console.log('Upload event:', e);
        if (e.fileList) {
            await createFile(e.fileList[0])
        }
    };
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
                <h1 className='text-4xl w-full text-center py-3 uppercase font-bold' >{modalType}</h1>
                <Form form={form} onFinish={handleSubmit} className='py-5' labelCol={{ span: 7 }}>
                    {modalType === 'Sign up' && <Form.Item
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
                    <input type="file" name="" id="" onChange={(e) => console.log(e.target.files[0])
                    } />
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
                            },
                        ]}
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
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {modalType === 'Sign up' && <Form.Item
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
                    </Form.Item>}
                    <Form.Item
                        name="upload"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="longgggggggggggggggggggggggggggggggggg"
                    >
                        <Upload name="logo" listType="picture">
                            <Button >Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                loading={loading}
                                type="primary"
                                htmlType="submit"
                                className='w-full text-center py-2 mt-6 h-full'
                                disabled={
                                    !clientReady ||
                                    !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                }
                            >
                                {modalType}
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </section>
        </AntModal>
    );
};

export default Modal;