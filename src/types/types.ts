export type TypeCreatePost = {
    title: string
    content: string
    featuredImage: string
    status: boolean
}

export type TypeUpdatePost = {
    title: string
    content: string
    featuredImage: string
    status: boolean
    documentId: string
}

export type TypeUser = {
    $id: string
    $createdAt: string
    // $updatedAt: string
    name: string
    // registration: string
    // status: boolean
    // passwordUpdate: string
    email: string
    phone: string
    // emailVerification: boolean
    // phoneVerification: boolean
    accessedAt: string
}