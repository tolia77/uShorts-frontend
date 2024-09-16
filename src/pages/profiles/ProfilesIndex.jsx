import {useAuth} from "../../hooks/auth";
import {useEffect, useState} from "react";
import {profilesIndexRequest} from "../../services/backend/profiles";
import ErrorComponent from "../../components/errors/ErrorComponent";

export default function ProfilesIndex() {
    const [error, setError] = useState({status: null, text: null});
    const [userList, setUserList] = useState([]);
    const auth = useAuth()
    useEffect(() => {
        profilesIndexRequest(auth.accessToken).then(res => {
            console.log(res)
        }).catch(err => {
            setError({status: err.response.status, text: err.response.message})
        });
    }, [])
    return(
        <>
            {(error.status && error.text) && <ErrorComponent status={error.status} text={error.text}/>}
        </>
    )
}