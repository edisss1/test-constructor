import { Link } from "react-router"
import Button from "../components/UI/Button"
import Input from "../components/UI/Input"
import { useState } from "react"
import EyeOpenIcon from "../assets/icons/EyeOpenIcon"
import EyeClosedIcon from "../assets/icons/EyeClosedIcon"
import { useAuth } from "../components/Auth/AuthProvider"

const SignUpPage = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const { signUp } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (password !== confirmedPassword) return
        e.preventDefault()

        await signUp(userName, email, password).then(() => {})
        setUserName("")
        setEmail("")
        setPassword("")
        setConfirmedPassword("")
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-75 flex flex-col gap-4 items-center">
                <h1 className="text-3xl font-semibold">Sign Up</h1>

                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-4"
                >
                    <Input
                        type="text"
                        placeholder="e.g. John Doe"
                        label="Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="e.g. johndoe@example.com"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type={isShowPassword ? "text" : "password"}
                        onClick={
                            isShowPassword
                                ? () => setIsShowPassword(false)
                                : () => setIsShowPassword(true)
                        }
                        placeholder="Enter your password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={
                            isShowPassword ? <EyeClosedIcon /> : <EyeOpenIcon />
                        }
                    />
                    <Input
                        type={isShowPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        label="Confirmed password"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                    <Button
                        disabled={password !== confirmedPassword}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form>
                <div className="flex gap-1">
                    <p className="text-sm">Already have an account?</p>
                    <Link className="text-sm text-primary underline" to={"/"}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default SignUpPage
