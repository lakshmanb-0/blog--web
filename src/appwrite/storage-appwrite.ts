import conf from "@/conf/conf"
import { storage, uniqueId } from "./index"
import { ImageGravity } from "appwrite"

export const createFile = async (file) => {
    try {
        return await storage.createFile(conf.APPWRITE_BUCKET_ID, uniqueId(), file)
    } catch (error) {
        throw error
    }
}

export const getFile = async (fileId: string) => {
    try {
        return await storage.getFile(conf.APPWRITE_BUCKET_ID, fileId)
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