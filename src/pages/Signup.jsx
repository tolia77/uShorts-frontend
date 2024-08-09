import {signupRequest} from "../services/backend/auth";
import {useState} from "react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    function handleSubmit(e) {
        e.preventDefault()
        signupRequest(email, password).then((res) => {
            setToken(res.data["Authorization"]);
        }).catch((err) => {
            console.log(err);
        })
    }
    return(
        <>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type={"submit"}>Sign up</button>
            </form>
        </>

    )
}