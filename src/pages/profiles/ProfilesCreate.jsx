import {useState} from "react";
import {profilesCreateRequest} from "../../services/backend/profiles";
import {useAuth} from "../../hooks/auth";

export default function ProfilesCreate() {
    const auth = useAuth()
    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append('profile[name]', formData.get('name'));
        formData.append('profile[avatar]', formData.get('avatar'));
        formData.delete('name');
        formData.delete('avatar');

        profilesCreateRequest(auth.accessToken, formData).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <h1>Create Profile</h1>
            <form onSubmit={handleSubmit}>
                <input name="name"/>
                <input name="description"/>
                <input name="avatar" type={"file"}></input>
                <button type={"submit"}>Create Profile</button>
            </form>
        </>
    )
}