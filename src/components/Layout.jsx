import Header from "./Header";
import {Outlet} from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
export default function Layout({ children }) {
    return(
        <>
            <AuthProvider>
                <Header/>
                <main>
                    <Outlet></Outlet>
                </main>
            </AuthProvider>

        </>
    )
}