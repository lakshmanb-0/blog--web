import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Header, Post, PostForm } from './components'
import Profile from './pages/profile/Profile.tsx'
import Search from './pages/search/Search.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="" element={<Header />} />
    <Route path="/new-story/" element={<PostForm type="create" />} />
    <Route path="/post/:postId" element={<Post />} />
    <Route path="/post/:postId/edit/:userId" element={<PostForm type="edit" />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/search" element={<Search />} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
