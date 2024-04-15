import { Client, Account, Databases, Storage, ID, } from "appwrite";
import conf from '../conf/conf'


export const client = new Client();
client
    .setEndpoint(conf.APPWRITE_URL)
    .setProject(conf.APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const uniqueId = () => ID.unique()
