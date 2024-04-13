import conf from "@/conf/conf";
import { databases, uniqueId } from "./index";
import { TypeCreatePost, TypeUpdatePost } from "@/types/types";
// import { Query } from "appwrite";


export const listDocuments = async () => {
    try {
        // let query = Query.equal("status", "public")
        const response = await databases.listDocuments(conf.APPWRITE_DATABASE_ID, conf.APPWRITE_COLLECTION_ID, [
            // Query.equal('title', 'hello world')
        ]);
        return response
    } catch (error) {
        throw error
    }
}

export const createPost = async (props: TypeCreatePost) => {
    try {
        const response = await databases.createDocument(conf.APPWRITE_DATABASE_ID, conf.APPWRITE_COLLECTION_ID, uniqueId(), {
            title: props.title,
            content: props.content,
            status: props.status
        });
        return response
    } catch (error) {
        throw error
    }
}

export const updatePost = async ({ props }: { props: TypeUpdatePost }) => {
    try {
        const response = await databases.updateDocument(conf.APPWRITE_DATABASE_ID, conf.APPWRITE_COLLECTION_ID, props.documentId, {
            title: props.title,
            content: props.content,
        });
        return response
    } catch (error) {
        throw error
    }
}

export const getPost = async (documentId: string) => {
    try {
        const response = await databases.getDocument(conf.APPWRITE_DATABASE_ID, conf.APPWRITE_COLLECTION_ID, documentId);
        return response
    } catch (error) {
        throw error
    }
}

export const deletePost = async (documentId: string) => {
    try {
        const response = await databases.deleteDocument(conf.APPWRITE_DATABASE_ID, conf.APPWRITE_COLLECTION_ID, documentId);
        return response
    } catch (error) {
        throw error
    }
}
