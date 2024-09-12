import {useState} from "react";
import {useAuth} from "../hooks/auth";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    const auth = useAuth()
    function handleSubmit(e) {
        e.preventDefault()
        auth.login(email, password).then(res =>{
            navigate("/")
        }).catch((err) => {
            console.log(err);
            if(err.response.status === 404) {
                setStatus("Incorrect email");
            }
            else if(err.response.status === 401) {
                setStatus("Wrong password");
            }
            else {
                setStatus(err.response.data.toString() || err.response.statusText);
            }
        })
    }

    return (
        <>
            <h1>Login</h1>
            <p>{status}</p>
            <form onSubmit={handleSubmit}>
                <input required type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input required type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type={"submit"}>Login</button>
            </form>

            <h1>{auth.token}</h1>
        </>
    )
}