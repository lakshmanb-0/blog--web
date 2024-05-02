import { Logo, AuthModal } from "../index"
import { useCallback, useState } from "react"
import { LuPenSquare, IoPersonOutline } from "../reactIcons";
import { type MenuProps, Avatar, Button, Dropdown, Input } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogout } from "@/appwrite/auth-appwrite";
import { getFilePreview } from "@/appwrite/storage-appwrite";
import { useDispatch, useSelector } from "react-redux"
import { RootState, logout } from "@/store";
import { userFirstTwoLetters } from "@/conf/utils";


const Navbar: React.FC = () => {
    const { loggedIn, user } = useSelector((state: RootState) => state.auth)
    const [type, setType] = useState<{ title: string, type: string }>({ title: '', type: '' })
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    const [searchInput, setSearchInput] = useState<string>(query ?? '')
    const { Search } = Input;


    const handleModalOpen = (title: string, type: string) => {
        setType({ title: title, type: type });
        setIsModalOpen(true);
    }

    const handleLogout = async () => {
        await userLogout()
        dispatch(logout())
        navigate('/')
    }

    const changeModalOpen = useCallback(() => {
        setIsModalOpen(false)
    }, [setIsModalOpen])

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

    const handleSubmit = () => {
        navigate(`/search?q=${searchInput}`)
    }

    return (
        <nav className="flex items-center justify-between max-w-[1600px] mx-auto px-2">
            <section className="flex items-center gap-4">
                <Logo width={100} />
                <Search
                    placeholder="Search"
                    style={{ width: 200 }}
                    value={searchInput}
                    onSearch={handleSubmit}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </section>
            <section className="flex items-center gap-4">
                <Button
                    type="text"
                    className="text-lg flex items-center"
                    icon={<LuPenSquare size={20} />}
                    onClick={() => !loggedIn
                        ? handleModalOpen('Create an account to start writing', 'Sign up')
                        : navigate('/new-story')}
                >
                    Write
                </Button>
                {!!loggedIn
                    ? <Dropdown menu={{ items }}>
                        <Avatar src={getFilePreview(user.$id)} className="uppercase">{userFirstTwoLetters(user.name)}</Avatar>
                    </Dropdown>
                    : <>
                        <Button className="rounded-lg bg-black" type="primary" onClick={() => handleModalOpen('Join Us', 'Sign up')}>Sign up</Button>
                        <Button className="rounded-lg" type="text" onClick={() => handleModalOpen('Welcome back', 'Sign in')}>Sign in</Button>
                        <AuthModal type={type} isModalOpen={isModalOpen} changeModalOpen={changeModalOpen} />
                    </>
                }
            </section>
        </nav>
    )
}

export default Navbar;

