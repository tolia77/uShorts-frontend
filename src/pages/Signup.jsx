import { useAuth } from "../hooks/auth";
import {useState} from "react";
import {redirect} from "react-router-dom";
import UnprocessableEntity from "../components/errors/UnprocessableEntity";
import ErrorComponent from "../components/errors/ErrorComponent";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [entityErrors, setEntityErrors] = useState({});
    const [error, setError] = useState({status: "", text: ""});
    const auth = useAuth();
    function handleSubmit(e) {
        e.preventDefault()
        auth.signup(email, password).then(res => {
            redirect("/")
        }).catch((err) => {
            if(err.response.status === 422) {
                setEntityErrors(err.response.data)
            }
            else {
                setError({status: err.response.status, text: err.response.data});
            }
        })
    }
    return(
        <>
            <h1>Sign up</h1>
            <UnprocessableEntity errors={entityErrors} />
            {(error.status && error.text) && <ErrorComponent status={error.status} text={error.text}/>}
            <form onSubmit={handleSubmit}>
                <input required type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type={"submit"}>Sign up</button>
            </form>
        </>

    )
}