export type TypeCreatePost = {
    title: string
    content: string
    status: string,
    userName: string
}

export type TypeUpdatePost = {
    title: string
    content: string
    status: string
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
export type TypePost = {
    title: string,
    content: string,
    userName: string,
    status: string,
    $id: string,
    $createdAt: string,
    $updatedAt: string,
    $permissions: string[],
    $databaseId: string,
    $collectionId: string
}