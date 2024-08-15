import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {refreshRequest} from "./auth";

export const backendInstance = axios.create({
    baseURL: "http://127.0.0.1:3000"
})

backendInstance.interceptors.request.use((config) => {
    //TODO: handle errors
    console.log("INTERCEPTOR")
    console.log(config.url)
    if (config.url !== "refresh") {
        const accessToken = Cookies.get("access_token");
        const refreshToken = Cookies.get("refresh_token");
        //console.log(accessToken)
        //console.log(refreshToken)
        if (refreshToken && !accessToken) {
            console.log(`OLD: ${accessToken}`);
            //console.log(jwtDecode(accessToken).exp)
            console.log(Date.now() / 1000)
            refreshRequest(refreshToken).then(res => {
                const newToken = res.data["Access-Token"]
                console.log(`NEW: ${newToken}`);
                const accessExp = new Date(jwtDecode(newToken).exp * 1000);
                Cookies.set("access_token", `Bearer ${newToken}`, {secure: true, expires: accessExp});
                config.headers.set("Authorization", `Bearer ${accessToken}`);
            })
        }
    }
    return config
})