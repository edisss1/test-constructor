import UserIcon from "../../assets/icons/UserIcon"

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-12 py-2 bg-primary-200">
            <h2 className="text-lg font-semibold">Test constructor</h2>
            <UserIcon />
        </nav>
    )
}
export default Navbar
