import {useParams} from "react-router-dom";
import {useAuth} from "../../hooks/auth";
import {useEffect, useState} from "react";
import {profilesShowRequest} from "../../services/backend/profiles";
import Profile from "../../components/Profile";

export default function ProfilesShow() {
    const {name} = useParams()
    const auth = useAuth()
    const [profile, setProfile] = useState({})
    const [error, setError] = useState(null);
    if(error) throw error;
    useEffect(() => {
        profilesShowRequest(auth.token, name).then(res => {
            setProfile(res.data)
        }).catch(err => {
            setError(err)
        })
    }, [])
    return(
        <>
            <Profile profile={profile}/>
        </>
    )
}