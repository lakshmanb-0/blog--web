import conf from "./conf/conf";
import { createAccount, currentUser, userLogin, userLogout } from "./appwrite/auth-appwrite";
import {
  createPost,
  deletePost,
  getPost,
  listDocuments,
  updatePost,
} from "./appwrite/database-appwrite";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import { Navbar, Footer, Header } from "./components";
import type { RootState } from "./store/store";
import { Spin, message } from "antd";
// import { createFile, getFilePreview, getFile, getFileView } from "./appwrite/storage-appwrite"


function App() {
  const loggedIn = useSelector((state: RootState) => state.loggedIn)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const userCheck = async () => {
      try {
        let user = await currentUser();
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      } catch (error) { }
      finally {
        setLoading(false);
      }
    };
    userCheck()
  }, []);

  return (
    <div>
      <Navbar />
      {loading
        ? <div className="grid place-items-center w-full h-screen"> <Spin /> </div>
        : <Outlet />}
      <Footer />
      {contextHolder}
    </div>
    // <div className="flex flex-col gap-3">
    //   <h1 className="font-bold ">{conf.APPWRITE_URL}</h1>
    //   <button className="font-bold" onClick={async () => console.log(await currentUser())}>curent</button>
    //   <button className="font-bold" onClick={async () => console.log(await createAccount('ramdom123@gmail.com', '90785634', 'Ramdom'))}>creataccount</button>
    //   <button className="font-bold" onClick={async () => console.log(await login('ramdom123@gmail.com', '90785634'))}>login</button>
    //   <button className="font-bold" onClick={async () => console.log(await logout())}>logout</button>
    //   <button className="font-bold" onClick={async () => console.log(await listDocuments())}>document</button>
    //   <button className="font-bold" onClick={async () =>
    //     console.log(await createPost({ props: { title: 'newpost', content: 'yesdinasfn', featuredImage: '8129-58120958120-512ge', status: true } }))
    //   }>createpost</button>
    //   <button className="font-bold" onClick={async () =>
    //     console.log(await getPost('661503917a8349cdeebc'))
    //   }>getPost</button>
    //   <button className="font-bold" onClick={async () =>
    //     console.log(await deletePost('661503917a8349cdeebc'))
    //   }>deltePost</button>
    //   <button className="font-bold" onClick={async () =>
    //     console.log(await updatePost({ props: { title: 'asfasfsaf', content: 'asd', status: false, featuredImage: '8129-58120958120-512ge', documentId: '6614f38db0015653da4a' } }))
    //   }>updatePost</button>
    //   <button className="font-bold" onClick={async () =>
    //     console.log(await getFile('6615167579846cd63bcf'))
    //   }>getimage</button>
    //   <button className="font-bold" onClick={async () =>
    //     console.log(await getFilePreview('66151ad5933c85d0e68f'))
    //   }>getimageprevoew</button>
    //   <button className="font-bold" onClick={async () =>
    //     console.log(await getFileView('6615167579846cd63bcf'))
    //   }>getfile</button>
    //   <input type="file" name="" id="" onChange={async (e) => console.log(await createFile(e.target.files[0]))
    //   } />
    //   <h1 className="font-bold">{import.meta.env.VITE_APPWRITE}</h1>
    // </div>
  )
}

export default App;
