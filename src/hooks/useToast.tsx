import { message } from 'antd';
import { useCallback } from 'react';

const useToast = () => {
    const showMessage = useCallback((type: string, text: string) => {
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
    }, []);

    return showMessage;
};

export default useToast;