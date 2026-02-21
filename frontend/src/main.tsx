import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { HashRouter } from "react-router"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import Router from "./Router.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <HashRouter>
            <Provider store={store}>
                <Router />
            </Provider>
        </HashRouter>
    </StrictMode>
)
