import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {refreshRequest} from "./auth";

export const backendInstance = axios.create({
    baseURL: "http://127.0.0.1:3000"
})

backendInstance.interceptors.request.use(async (config) => {
    //TODO: handle errors
    if (config.url !== "refresh") {
        const accessToken = Cookies.get("access_token");
        const refreshToken = Cookies.get("refresh_token");
        if (refreshToken && !accessToken) {
            let res = await refreshRequest(refreshToken)
            const newToken = res.data["Access-Token"]
            const accessExp = new Date(jwtDecode(newToken).exp * 1000);
            Cookies.set("access_token", `Bearer ${newToken}`, {secure: true, expires: accessExp});
            config.headers["Authorization"] = `Bearer ${newToken}`
        }
    }
    return config
})