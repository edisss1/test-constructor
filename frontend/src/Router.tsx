import { Route, Routes } from "react-router"

import { lazy } from "react"
import NewTestPage from "./pages/NewTestPage"

const LoginPage = lazy(() => import("./pages/LoginPage"))
const SignUpPage = lazy(() => import("./pages/SignUpPage"))
const DashboardPage = lazy(() => import("./pages/DashboardPage"))
const ProtectedRoute = lazy(() => import("./components/Auth/ProtectedRoute"))

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/new-test" element={<NewTestPage />} />
            <Route path="*" element={<div>404</div>} />
        </Routes>
    )
}
export default Router
