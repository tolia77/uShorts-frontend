import {useParams} from "react-router-dom";
import {useAuth} from "../../hooks/auth";
import {useEffect, useState} from "react";
import {profilesShowRequest} from "../../services/backend/profiles";
import Profile from "../../components/Profile";
import ErrorComponent from "../../components/errors/ErrorComponent";

export default function ProfilesShow() {
    const {name} = useParams()
    const auth = useAuth()
    const [profile, setProfile] = useState({})
    const [error, setError] = useState({status: null, text: null});
    useEffect(() => {
        profilesShowRequest(auth.token, name).then(res => {
            setProfile(res.data)
        }).catch(err => {
            setError({status: err.response.status, text: (err.response.data !== " " ? err.response.data : err.response.statusText)})
        })
    }, [])
    return(
        <>
            {(error.status && error.text) && <ErrorComponent status={error.status} text={error.text}/>}
            <Profile profile={profile}/>
        </>
    )
}