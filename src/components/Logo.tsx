import { useNavigate } from "react-router-dom"

const Logo = ({ width = 90 }) => {
    const navigate = useNavigate()
    return (
        <div style={{ width: `${width}px` }} onClick={() => navigate('/')}>
            <img src="/logo.png" alt="logo" className="w-full h-full" />
        </div>
    )
}

export default Logo