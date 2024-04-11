import conf from "./conf/conf"
import { createAccount, currentUser, login, logout } from "./appwrite/auth-appwrite"
import { createPost, deletePost, getPost, listDocuments, updatePost } from "./appwrite/database-appwrite"
import { createFile, getFilePreview, getFile, getFileView } from "./appwrite/storage-appwrite"
function App() {

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold ">{conf.APPWRITE_URL}</h1>
      <button className="font-bold" onClick={async () => console.log(await currentUser())}>curent</button>
      <button className="font-bold" onClick={async () => console.log(await createAccount('ramdom123@gmail.com', '90785634', 'Ramdom'))}>creataccount</button>
      <button className="font-bold" onClick={async () => console.log(await login('ramdom123@gmail.com', '90785634'))}>login</button>
      <button className="font-bold" onClick={async () => console.log(await logout())}>logout</button>
      <button className="font-bold" onClick={async () => console.log(await listDocuments())}>document</button>
      <button className="font-bold" onClick={async () =>
        console.log(await createPost({ props: { title: 'newpost', content: 'yesdinasfn', featuredImage: '8129-58120958120-512ge', status: true } }))
      }>createpost</button>
      <button className="font-bold" onClick={async () =>
        console.log(await getPost('661503917a8349cdeebc'))
      }>getPost</button>
      <button className="font-bold" onClick={async () =>
        console.log(await deletePost('661503917a8349cdeebc'))
      }>deltePost</button>
      <button className="font-bold" onClick={async () =>
        console.log(await updatePost({ props: { title: 'asfasfsaf', content: 'asd', status: false, featuredImage: '8129-58120958120-512ge', documentId: '6614f38db0015653da4a' } }))
      }>updatePost</button>
      <button className="font-bold" onClick={async () =>
        console.log(await getFile('6615167579846cd63bcf'))
      }>getimage</button>
      <button className="font-bold" onClick={async () =>
        console.log(await getFilePreview('66151ad5933c85d0e68f'))
      }>getimageprevoew</button>
      <button className="font-bold" onClick={async () =>
        console.log(await getFileView('6615167579846cd63bcf'))
      }>getfile</button>
      <input type="file" name="" id="" onChange={async (e) => console.log(await createFile(e.target.files[0]))
      } />
      <h1 className="font-bold">{import.meta.env.VITE_APPWRITE}</h1>
    </div>
  )
}

export default App
