import {backendInstance} from "./config";

const api = backendInstance;

export async function loginRequest(email, password) {
    return await api.post("login", {
        email: email,
        password: password,
    })
}

export async function signupRequest(email, password) {
    return await api.post("signup", {
        email: email,
        password: password,
    })
}