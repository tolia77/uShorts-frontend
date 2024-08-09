import {useState} from "react";
import {useAuth} from "../hooks/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth()
    function handleSubmit(e) {
        e.preventDefault()
        console.log("submit")
        auth.login(email, password)
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type={"submit"}>Login</button>
            </form>

            <h1>{auth.token}</h1>
        </>
    )
}