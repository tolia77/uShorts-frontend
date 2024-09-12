import { useAuth } from "../hooks/auth";
import {useState} from "react";
import {redirect} from "react-router-dom";
import {errorsToArray} from "../utils/responseHelpers";
import UnprocessableEntity from "../components/errors/UnprocessableEntity";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [entityErrors, setEntityErrors] = useState({});
    const auth = useAuth();
    function handleSubmit(e) {
        e.preventDefault()
        auth.signup(email, password).then(res => {
            redirect("/")
        }).catch((err) => {
            console.log(err.response)
            if(err.response.status === 422) {
                setEntityErrors(err.response.data)
            }
        })
    }
    return(
        <>
            <h1>Sign up</h1>
            <UnprocessableEntity errors={entityErrors} />
            <form onSubmit={handleSubmit}>
                <input required type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type={"submit"}>Sign up</button>
            </form>
        </>

    )
}