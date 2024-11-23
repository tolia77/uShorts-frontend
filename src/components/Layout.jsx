import Header from "./Header";
import {Outlet} from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import ErrorBoundary from "./errors/ErrorBoundary";
export default function Layout({ children }) {
    return(
        <>
            <AuthProvider>
                <Header/>
                <ErrorBoundary>
                    <main>
                        <Outlet></Outlet>
                    </main>
                </ErrorBoundary>

            </AuthProvider>

        </>
    )
}