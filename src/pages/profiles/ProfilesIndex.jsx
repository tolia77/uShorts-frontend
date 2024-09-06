import {useAuth} from "../../hooks/auth";
import {useEffect, useState} from "react";
import {profilesIndexRequest} from "../../services/backend/profiles";
import Forbidden from "../../components/errors/Forbidden";

export default function ProfilesIndex() {
    const [forbidden, setForbidden] = useState(false);
    const [userList, setUserList] = useState([]);
    const auth = useAuth()
    useEffect(() => {
        profilesIndexRequest(auth.accessToken).then(res => {
            console.log(res)
        }).catch(err => {
            if(err.response.status === 403) {
                setForbidden(true);
            }
            console.log(err)
        });
    }, [])
    return(
        forbidden ? <Forbidden/> : <>

        </>
    )
}