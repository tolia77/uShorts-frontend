import { useAuth } from "../hooks/auth";
import {useState} from "react";
import {redirect} from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const auth = useAuth();
    function handleSubmit(e) {
        e.preventDefault()
        auth.signup(email, password).then(res => {
            redirect("/")
        }).catch((err) => {
            console.log(err.response)
            if(err.response.status === 422) {
                let text = ""
                if(err.response.data.email) {
                    text += `Email: ${err.response.data.email.join(", ")}\n`
                }
                if(err.response.data.password) {
                    text += `Password: ${err.response.data.password.join(", ")}\n`
                }
                setStatus(text)
            }
        })
    }
    return(
        <>
            <h1>Sign up</h1>
            <p>{status}</p>
            <form onSubmit={handleSubmit}>
                <input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type={"submit"}>Sign up</button>
            </form>
        </>

    )
}