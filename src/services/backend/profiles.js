import {backendInstance} from "./config";

const api = backendInstance
export async function profilesIndexRequest(jwt) {
    return await api.get("profiles", {
        headers: {
            Authorization: jwt,
        }
    })
}

export async function profilesShowRequest(jwt, id) {
    return await api.get(`profiles/${id}`, {
        headers: {
            Authorization: jwt,
        }
    })
}