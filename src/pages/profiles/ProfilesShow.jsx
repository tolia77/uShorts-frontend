import {useParams} from "react-router-dom";
import {useAuth} from "../../hooks/auth";
import {useEffect, useState} from "react";
import {profilesShowRequest} from "../../services/backend/profiles";
import Profile from "../../components/Profile";

export default function ProfilesShow({params}) {
    const {name} = useParams()
    const auth = useAuth()
    const [profile, setProfile] = useState({})
    useEffect(() => {
        profilesShowRequest(auth.token, name).then(res =>{
            setProfile(res.data)
        })
    }, [])
    return(
        <>
            <Profile profile={profile}/>
        </>
    )
}