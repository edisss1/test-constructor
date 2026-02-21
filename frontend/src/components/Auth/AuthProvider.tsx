import { createContext, useContext, useLayoutEffect, useState } from "react"
import type { User } from "../../types/User.type"
import { api } from "../../services/api"

type AuthContextType = {
    user: User | null
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

    useLayoutEffect(() => {
        const refreshInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config as any

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true
                    try {
                        const response = await api.get("/api/refresh")
                        setAccessToken(response.data.token)

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

        await api.post("/signup", { userName, email, password })
    }

    const login = async (email: string, password: string) => {
        if (email.trim() === "" || password.trim() === "") return

        const res = await api.post("/login", { email, password })
        console.log(api.getUri())
        setAccessToken(res.data.token)

        const userRes = await api.get("/api/me")

        setUser(userRes.data as User)
    }

    const logout = async () => {
        await api.post("/logout")
        setAccessToken(undefined)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}
