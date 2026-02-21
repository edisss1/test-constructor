import { Link } from "react-router"
import Button from "../components/UI/Button"
import Input from "../components/UI/Input"
import { useState } from "react"
import { useAuth } from "../components/Auth/AuthProvider"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        await login(email, password)
        setEmail("")
        setPassword("")
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-62.5 flex flex-col gap-4 items-center">
                <h1 className="text-3xl font-semibold">Login</h1>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-4"
                >
                    <Input
                        type="email"
                        placeholder="e.g. johndoe@example.com"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="w-full grid gap-2">
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link className="text-sm" to={"/"}>
                            Forgot Password?
                        </Link>
                    </div>
                    <Button type="submit">Login</Button>
                </form>
                <div className="flex gap-1">
                    <p className="text-sm">Don't have an account?</p>
                    <Link
                        className="text-sm text-primary underline"
                        to={"/signup"}
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default LoginPage
