import { Link } from "react-router"
import Button from "../components/UI/Button"
import Input from "../components/UI/Input"
import { useState } from "react"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full max-w-62.5 flex flex-col gap-4 items-center">
                <h1 className="text-3xl font-semibold">Sign Up</h1>

                <form className="w-full flex flex-col gap-4">
                    <Input
                        type="text"
                        placeholder="e.g. John Doe"
                        label="Name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="e.g. johndoe@example.com"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Enter your password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Input
                        type="password"
                        placeholder="Confirm your password"
                        label="Confirmed password"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit">Sign Up</Button>
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
export default LoginPage
