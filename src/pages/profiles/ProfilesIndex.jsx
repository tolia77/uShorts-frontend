import {useAuth} from "../../hooks/auth";
import {useEffect, useState} from "react";
import {profilesIndexRequest} from "../../services/backend/profiles";
import Profile from "../../components/Profile";

export default function ProfilesIndex() {
    const auth = useAuth()
    const [error, setError] = useState(null)
    const [profiles, setProfiles] = useState([])
    if(error) throw error
    useEffect(() => {
        profilesIndexRequest(auth.accessToken).then(res => {
            setProfiles(res.data)
        }).catch(err =>{
            setError(err)
        })
    }, [auth.accessToken]);
    return(
        profiles && <>
            <h1>Profiles</h1>
            {profiles.map(profile => {
                return <Profile profile={profile} key={profile.id}/>
            })}
        </>
    )
}