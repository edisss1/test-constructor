import { Navigate } from "react-router"
import { useAuth } from "./AuthProvider"

type ProtectedRouteProps = {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/" replace />
    }

    return children
}
export default ProtectedRoute
