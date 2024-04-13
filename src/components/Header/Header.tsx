import { listDocuments } from "@/appwrite/database-appwrite";
import { getFilePreview } from "@/appwrite/storage-appwrite";
import { TypePost } from "@/types/types";
import { useEffect, useState } from "react";

const Header = () => {
    const [data, setData] = useState<TypePost[]>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let user = await listDocuments()
                console.log(user);

                if (user) {
                    setData(user.documents);
                }
            } catch (error) { }
            finally {
                // setLoading(false);
            }
        };
        fetchData()
    }, []);

    console.log(data);


    return (
        <header>
            {data.map(el => (
                <>
                    <img src={getFilePreview(el.$id)} alt="" />
                    {/* <img src={getFileView(el?.$id!)} alt="" /> */}
                </>

            ))}
        </header>
    );
};

export default Header;
