import {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState
} from "react"
import type { User } from "../../types/User.type"
import { api } from "../../services/api"
import { useNavigate } from "react-router"

type AuthContextType = {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    signUp: (userName: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return authContext
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [accessToken, setAccessToken] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    // adding access token to requests
    useLayoutEffect(() => {
        const authInterceptor = api.interceptors.request.use((config) => {
            config.headers.Authorization =
                !(config as any)._retry && accessToken
                    ? `Bearer ${accessToken}`
                    : config.headers.Authorization

            return config
        })

        return () => {
            api.interceptors.request.eject(authInterceptor)
        }
    }, [accessToken])

    // refreshing token
    useEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config as any

                if (
                    error.response.status === 401 &&
                    !originalRequest._retry &&
                    originalRequest.url !== "/refresh"
                ) {
                    originalRequest._retry = true
                    try {
                        const response = await api.get("/refresh")
                        setAccessToken(response.data.token)
                        console.log("Refreshed token: ", response.data.token)

                        originalRequest.headers.Authorization = `Bearer ${response.data.token}`
                        originalRequest._retry = true

                        return api(originalRequest)
                    } catch {
                        setAccessToken(undefined)
                    }
                }
                return Promise.reject(error)
            }
        )

        return () => {
            api.interceptors.response.eject(refreshInterceptor)
        }
    }, [])

    useEffect(() => {
        const initAuth = async () => {
            try {
                setIsLoading(true)
                const res = await api.get("/refresh")
                console.log("Token refreshed: ", res.data.token)
                setAccessToken(res.data.token)

                const userRes = await api.get("/api/me")
                setUser(userRes.data.user as User)
                console.log("User: ", userRes.data.user)
            } catch {
                setIsLoading(false)
                setAccessToken(undefined)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }
        initAuth()
    }, [])

    useEffect(() => {
        console.log("isLoading ", isLoading)
    }, [isLoading])

    useEffect(() => {
        if (!user) return

        navigate("/dashboard")
    }, [user])

    const login = async (email: string, password: string) => {
        if (email.trim() === "" || password.trim() === "") return

        setIsLoading(true)

        const res = await api.post("/login", { email, password })
        console.log(api.getUri())
        setAccessToken(res.data.token)

        setUser(res.data.user as User)
        setIsLoading(false)
    }

    const signUp = async (
        userName: string,
        email: string,
        password: string
    ) => {
        if (
            userName.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
        )
            return
        setIsLoading(true)

        const res = await api.post("/signup", { userName, email, password })

        if (res.data) {
            await login(email, password)
        }

        setIsLoading(false)
    }

    const logout = async () => {
        await api.post("/logout")
        setAccessToken(undefined)
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{ user, isLoading, login, logout, signUp }}
        >
            {children}
        </AuthContext.Provider>
    )
}
