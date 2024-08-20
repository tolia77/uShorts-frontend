import {useAuth} from "../../hooks/auth";
import {useEffect} from "react";
import {profilesIndexRequest} from "../../services/backend/profiles";

export default function ProfilesIndex() {
    const auth = useAuth()
    console.log(`TOKEN: ${auth.accessToken}`);
    useEffect(() => {
        profilesIndexRequest(auth.accessToken).then(res => {
            console.log(res)
        }).catch(err => console.log(err));
    }, [])
}