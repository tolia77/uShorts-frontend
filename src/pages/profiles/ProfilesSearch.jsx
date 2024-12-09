import {useAuth} from "../../hooks/auth";
import {useEffect, useState} from "react";
import {profilesSearchRequest} from "../../services/backend/profiles";
import Profile from "../../components/Profile";
import {useSearchParams} from "react-router-dom";

export default function ProfilesSearch() {
    const [searchParams] = useSearchParams();
    const key = searchParams.get("key");
    const page = searchParams.get("page");
    const auth = useAuth()
    const [profiles, setProfiles] = useState([])
    const [error, setError] = useState(null)
    if(error) throw error;
    useEffect(() => {
        profilesSearchRequest(auth.accessToken, key, page).then(res => {
            setProfiles(res.data)
        }).catch(err => setError(err))
    }, [])
    return(
        <>
            {profiles && profiles.map((profile) => {
                return <Profile profile={profile} key={"profile-" + profile.id}/>
            })}
        </>
    )
}