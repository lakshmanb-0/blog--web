import conf from "@/conf/conf";
import { databases, uniqueId } from "./index";
import { TypeCreatePost, TypeUpdatePost } from "@/types/types";
import { Query } from "appwrite";


export const listDocuments = async (userId?: string, search?: string, take?: number, skip?: number) => {
    try {
        // let query = Query.equal("status", "public")
        const response = await databases.listDocuments(conf.APPWRITE_DATABASE_ID, conf.APPWRITE_COLLECTION_ID,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(take ?? 10),
                Query.offset(skip ?? 0),
                userId
                    ? Query.equal('ownerId', `${userId}`)
                    : Query.equal('status', ['public']),

                search ? Query.search('title', search) : Query.equal('status', ['public']),
            ]
        );
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
            status: props.status,
            ownerName: props.ownerName,
            ownerId: props.ownerId,
            imageId: props?.imageId ?? null
        });
        return response
    } catch (error) {
        throw error
    }
}

export const updatePost = async (props: TypeUpdatePost) => {
    try {
        const response = await databases.updateDocument(conf.APPWRITE_DATABASE_ID, conf.APPWRITE_COLLECTION_ID, props.documentId, {
            title: props.title,
            content: props.content,
            status: props.status,
            imageId: props?.imageId ?? null
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
