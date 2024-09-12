import {useState} from "react";
import {profilesCreateRequest} from "../../services/backend/profiles";
import {useAuth} from "../../hooks/auth";
import {useNavigate} from "react-router-dom";
import ErrorComponent from "../../components/errors/ErrorComponent";
import UnprocessableEntity from "../../components/errors/UnprocessableEntity";

export default function ProfilesCreate() {
    const auth = useAuth()
    const navigate = useNavigate();
    const [error, setError] = useState({status: "", text: ""});
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
                console.log(err)
                setEntityErrors(err.response.data)
            }
        })
    }
    return (
        error.status && error.text ?
            <ErrorComponent status={error.status} text={error.text}/> :
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