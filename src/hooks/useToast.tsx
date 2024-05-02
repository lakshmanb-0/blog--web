import { message } from 'antd';

const useToast = () => {
    return (type: string, text: string) => {
        switch (type) {
            case 'error':
                message.error(text);
                break;
            case 'success':
                message.success(text);
                break;
            case 'warning':
                message.warning(text);
                break;
            case 'info':
                message.info(text);
                break;
            default:
                message.info(text);
        }
    }
};

export default useToast;