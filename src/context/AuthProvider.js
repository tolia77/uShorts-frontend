import React, {useState} from 'react';
import {useCookies} from "react-cookie";
import {loginRequest} from "../services/backend/auth";
import {jwtDecode} from "jwt-decode";
export const AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies(["jwt"])
    const [token, setToken] = useState(cookies.jwt || "")
    function login(email, password) {
        console.log("provider login");
        loginRequest(email, password).then((res) => {
            const jwt = res.data["Authorization"]
            console.log(jwtDecode(jwt).exp)
            const exp = new Date(jwtDecode(jwt).exp * 1000);
            setToken(jwt);
            setCookie("jwt", `Bearer ${jwt}`, {path: '/', secure: false});
        })
    }
    return <AuthContext.Provider value={{token, login}}>{children}</AuthContext.Provider>
}