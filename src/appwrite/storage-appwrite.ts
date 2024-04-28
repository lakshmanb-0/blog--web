import conf from "@/conf/conf"
import { storage, uniqueId } from "./index"

export const createFile = async (file: any) => {
    console.log(file);
    try {
        return !!file && await storage.createFile(conf.APPWRITE_BUCKET_ID, uniqueId(), file)
    } catch (error) {
        throw error
    }
}

export const getFile = async (fileId: string) => {
    try {
        return await storage.getFile(conf.APPWRITE_BUCKET_ID, fileId)
    } catch (error) {
        console.log(error); // error
        return null
    }
}

export const updateFile = async (fileId: string, file: any) => {
    try {
        !!fileId && await deleteFile(fileId)
        console.log('delet');

        return await createFile(file)
    } catch (error) {
        throw error
    }
}


export const getFilePreview = (fileId: string) => {
    try {
        return storage.getFilePreview(conf.APPWRITE_BUCKET_ID, fileId, 600).href
    } catch (error) {
        throw error
    }
}

export const getFileView = (fileId: string) => {
    try {
        return storage.getFileView(conf.APPWRITE_BUCKET_ID, fileId).href
    } catch (error) {
        throw error
    }
}
export const deleteFile = async (fileId: string) => {
    try {
        return await storage.deleteFile(conf.APPWRITE_BUCKET_ID, fileId)
    } catch (error) {
        throw error
    }
}