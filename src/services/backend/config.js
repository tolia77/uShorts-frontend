import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {refreshRequest} from "./auth";

export const backendInstance = axios.create({
    baseURL: "http://127.0.0.1:3000"
})

backendInstance.interceptors.request.use((config) => {
    //TODO: handle errors
    console.log(`INTERCEPTOR: ${config.url}`)
    if (config.url !== "refresh") {
        const accessToken = Cookies.get("access_token");
        const refreshToken = Cookies.get("refresh_token");
        if (refreshToken && !accessToken) {
            refreshRequest(refreshToken).then(res => {
                const newToken = res.data["Access-Token"]
                const accessExp = new Date(jwtDecode(newToken).exp * 1000);
                Cookies.set("access_token", `Bearer ${newToken}`, {secure: true, expires: accessExp});
                config.headers["Authorization"] = `Bearer ${newToken}`
                console.log(newToken);
                console.log(config.headers.get("Authorization"));
            }).catch(err =>{
                console.log(`REFRESH ERROR: ${err}`)
            })
        }
    }
    return config
})