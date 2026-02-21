import { Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    )
}
export default Router
