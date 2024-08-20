import {backendInstance} from "./config";

const api = backendInstance
export async function profilesIndexRequest(jwt) {
    return await api.get("profiles", {
        headers: {
            Authorization: jwt,
        }
    })
}