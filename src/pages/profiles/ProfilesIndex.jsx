import {useAuth} from "../../hooks/auth";
import {useEffect} from "react";
import {profilesIndexRequest} from "../../services/backend/profiles";

export default function ProfilesIndex() {
    const auth = useAuth()
    useEffect(() => {
        profilesIndexRequest(auth.token).then(res => {
            console.log(res)
        }).catch(err => console.log(err));
    }, [])
}