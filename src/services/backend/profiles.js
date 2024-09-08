import {backendInstance} from "./config";

const api = backendInstance
export async function profilesIndexRequest(jwt) {
    return await api.get("profiles", {
        headers: {
            Authorization: jwt,
        }
    })
}

export async function profilesShowRequest(jwt, name) {
    return await api.get(`profiles/${name}`, {
        headers: {
            Authorization: jwt,
        }
    })
}