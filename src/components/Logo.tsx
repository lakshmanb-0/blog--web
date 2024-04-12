
const Logo = ({ width = 90 }) => {
    return (
        <div style={{ width: `${width}px` }}>
            <img src="/logo.png" alt="logo" className="w-full h-full" />
        </div>
    )
}

export default Logo