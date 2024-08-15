import React, {useState} from 'react';
import {useCookies} from "react-cookie";
import {loginRequest, refreshRequest, signupRequest} from "../services/backend/auth";
import {jwtDecode} from "jwt-decode";
export const AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies(["access_token", "refresh_token"]);
    const [accessToken, setAccessToken] = useState(cookies.access_token || "")
    const [refreshToken, setRefreshToken] = useState(cookies.refresh_token || "")
    async function login(email, password) {
        let res = await loginRequest(email, password)
        //console.log(res.data);
        const jwt_access = res.data["Access-Token"]
        const jwt_refresh = res.data["Refresh-Token"]
        saveTokens(jwt_access, jwt_refresh)
    }
    async function signup(email, password) {
        let res = await signupRequest(email, password)
        const jwt_access = res.data["Access-Token"]
        const jwt_refresh = res.data["Refresh-Token"]
        saveTokens(jwt_access, jwt_refresh)
    }

    function logout() {
        removeCookie("access_token");
        removeCookie("refresh_token");
        setAccessToken(null);
        setRefreshToken(null);
    }

    async function refreshAccessToken() {
        let res = await refreshRequest()
        const jwt_access = res.data["Access-Token"]
        saveAccessToken(jwt_access)
    }

    function isSignedIn() {
        return accessToken && refreshToken;
    }

    function tokenIsExpired() {
        const accessExp = new Date(jwtDecode(accessToken).exp * 1000);
        return accessExp < Date.now()
    }

    function saveTokens(jwt_access, jwt_refresh) {
        saveAccessToken(jwt_access);
        saveRefreshToken(jwt_refresh);
    }

    function saveAccessToken(jwt_access) {
        const accessExp = new Date(jwtDecode(jwt_access).exp * 1000);
        setAccessToken(`Bearer ${jwt_access}`)
        setCookie("access_token", `Bearer ${jwt_access}`, {path: '/', secure: true, expires: accessExp});
    }

    function saveRefreshToken(jwt_refresh) {
        const refreshExp = new Date(jwtDecode(jwt_refresh).exp * 1000);
        setRefreshToken(`Bearer ${jwt_refresh}`);
        setCookie("refresh_token", `Bearer ${jwt_refresh}`, {path: '/', secure: true, expires: refreshExp});
    }

    return <AuthContext.Provider value={{accessToken, refreshToken, login, signup, refreshAccessToken, logout, isSignedIn, tokenIsExpired}}>{children}</AuthContext.Provider>
}