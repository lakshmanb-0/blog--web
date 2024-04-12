import { account, uniqueId } from "./index"

export const currentUser = async () => {
    try {
        return await account.get()
    } catch (error) {
        throw error
    }
    return null
}

export const createAccount = async (email: string, password: string, name: string) => {
    try {
        let userAccount = await account.create(uniqueId(), email, password, name);
        if (userAccount) {
            return await userLogin(email, password)
        } else {
            console.log('error while create account');
            return userAccount
        }
    } catch (error) {
        throw error
    }
}

export const userLogin = async (email: string, password: string) => {
    try {
        let userAccount = await account.createEmailPasswordSession(email, password);
        console.log(userAccount);

        if (userAccount) {
            return currentUser()
        } else {
            console.log('no user found');
        }
    } catch (error) {
        throw error
    }
}

export const userLogout = async () => {
    try {
        return await account.deleteSessions();
    } catch (error) {
        throw error
    }
}
