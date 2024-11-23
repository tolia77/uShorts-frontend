import {useAuth} from "../../hooks/auth";
import {useEffect, useState} from "react";
import {profilesIndexRequest} from "../../services/backend/profiles";

export default function ProfilesIndex() {
    const auth = useAuth()
    const [error, setError] = useState(null)
    const [profiles, setProfiles] = useState([])
    if(error) throw error
    useEffect(() => {
        profilesIndexRequest(auth.accessToken).then(res => {
            console.log(res)
            setProfiles(res.data.data)
        }).catch(err =>{
            setError(err)
        })
    }, []);
    return(
        <>
            <h1>Profiles</h1>
        </>
    )
}