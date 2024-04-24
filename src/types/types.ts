export type TypeCreatePost = {
    title: string
    content: string
    status: string,
    ownerName: string,
    ownerId: string,
    imageId: string
}

export type TypeUpdatePost = {
    title: string
    content: string
    status: string
    imageId: string
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
    ownerId: string,
    ownerName: string,
    status: string,
    $id: string,
    $createdAt: string,
    $updatedAt: string,
    $permissions: string[],
    $databaseId: string,
    $collectionId: string
    imageId: string
}