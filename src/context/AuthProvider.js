import React, {useState} from 'react';
import {loginRequest, logoutRequest, signupRequest} from "../services/backend/auth";
import {jwtDecode} from "jwt-decode";
import useCookie from "../hooks/cookies";
export const AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {
    const {
        value: accessToken,
        setCookie: setAccessCookie,
        removeCookie: removeAccessCookie
    } = useCookie("access_token");
    const {
        value: refreshToken,
        setCookie: setRefreshCookie,
        removeCookie: removeRefreshCookie,
    } = useCookie("refresh_token");

    async function login(email, password) {
        let res = await loginRequest(email, password)
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
    async function logout() {
        await logoutRequest(refreshToken)
        removeAccessCookie()
        removeRefreshCookie()
    }

    function isSignedIn() {
        return !!refreshToken;
    }

    function saveTokens(jwt_access, jwt_refresh) {
        saveAccessToken(jwt_access);
        saveRefreshToken(jwt_refresh);
    }

    function saveAccessToken(jwt_access) {
        const accessExp = new Date(jwtDecode(jwt_access).exp * 1000);
        setAccessCookie(`Bearer ${jwt_access}`, accessExp);
    }

    function saveRefreshToken(jwt_refresh) {
        const refreshExp = new Date(jwtDecode(jwt_refresh).exp * 1000);
        setRefreshCookie(`Bearer ${jwt_refresh}`, refreshExp);
    }

    return <AuthContext.Provider value={{accessToken, refreshToken, login, signup, logout, isSignedIn}}>{children}</AuthContext.Provider>
}