import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import Router from "./Router.tsx"
import { AuthProvider } from "./components/Auth/AuthProvider.tsx"

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </Provider>
    </BrowserRouter>
    //</StrictMode>
)
