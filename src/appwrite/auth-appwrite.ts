import { account, uniqueId } from "./index"

export const currentUser = async () => {
    try {
        return await account.get()
    } catch (error) {
        // throw error
    }
    return null
}

export const createAccount = async (email: string, password: string, name: string) => {
    try {
        let userAccount = await account.create(uniqueId(), email, password, name);
        if (userAccount) {
            await login(email, password)
        } else {
            console.log('error while create account');
            return userAccount
        }
    } catch (error) {
        throw error
    }
}

export const login = async (email: string, password: string) => {
    try {
        let userAccount = await account.createEmailPasswordSession(email, password);
        if (userAccount) {
            return userAccount
        } else {
            console.log('no user found');
        }
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        return await account.deleteSessions();
    } catch (error) {
        throw error
    }
}
