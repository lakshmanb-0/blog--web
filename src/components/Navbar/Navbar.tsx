import { Logo, Modal } from "../"
import { useState } from "react"
import { LuPenSquare, IoPersonOutline } from "../reactIcons";
import { Avatar, Button, Dropdown, Input } from 'antd';
import type { MenuProps } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "@/appwrite/auth-appwrite";

import { logout } from "@/store/authSlice";
import { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"


const Navbar: React.FC = () => {
    const loggedIn = useSelector((state: RootState) => state.loggedIn)
    const [searchInput, setSearchInput] = useState<string>("")
    const { Search } = Input;
    const [type, setType] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate()
    const handleModalOpen = (el: string) => {
        setType(el);
        setIsModalOpen(true);
    }

    const handleLogout = async () => {
        await userLogout()
        dispatch(logout())
        navigate('/')
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link to="/profile" className="flex items-center gap-1">
                    <IoPersonOutline size={20} /> <span>Profile</span>
                </Link>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: (
                <div onClick={handleLogout} className=" w-full h-full text-center space-y-1 inline">
                    <p>logout</p>
                    <p>{user.email}</p>
                </div>
            ),
        },]


    return (
        <nav className="flex items-center justify-between p-4">
            <section className="flex items-center gap-4">
                <Logo width={100} />
                <Search
                    placeholder="Search"
                    style={{ width: 200 }}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    allowClear
                />
            </section>
            <section className="flex items-center gap-4">
                <Button type="text" className="text-lg flex items-center" icon={<LuPenSquare size={20} />}>
                    Write
                </Button>
                {!loggedIn
                    ? (
                        <>
                            <Button className="rounded-lg bg-black" type="primary" onClick={() => handleModalOpen('Sign up')}>Sign up</Button>
                            <Button className="rounded-lg" type="text" onClick={() => handleModalOpen('Sign in')}>Sign in</Button>
                            <Modal type={type} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                        </>
                    )
                    : <Dropdown menu={{ items }}>
                        <Avatar src='https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'>LB</Avatar>
                    </Dropdown>
                }
            </section>
        </nav>
    )

}

export default Navbar