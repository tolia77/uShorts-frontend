import {useState} from "react";
import {profilesCreateRequest} from "../../services/backend/profiles";
import {useAuth} from "../../hooks/auth";
import {useNavigate} from "react-router-dom";
import UnprocessableEntity from "../../components/errors/UnprocessableEntity";

export default function ProfilesCreate() {
    const auth = useAuth()
    const navigate = useNavigate();
    const [entityErrors, setEntityErrors] = useState({});
    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        formData.append('profile[name]', formData.get('name'));
        formData.append('profile[avatar]', formData.get('avatar'));
        formData.delete('name');
        formData.delete('avatar');

        profilesCreateRequest(auth.accessToken, formData).then(res => {
            navigate("/profiles/" + res.data.profile.name)
        }).catch(err => {
            if(err.response.status === "422") {
                setEntityErrors(err.response.data)
            }
            else {
                throw err;
            }
        })
    }
    return (
        <>
            <UnprocessableEntity errors={entityErrors}/>
            <h1>Create Profile</h1>
            <form onSubmit={handleSubmit}>
                <input required name="name"/>
                <input name="description"/>
                <input name="avatar" type={"file"}></input>
                <button type={"submit"}>Create Profile</button>
            </form>
        </>
    )
}