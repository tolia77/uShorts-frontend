import {Link} from "react-router-dom";
import {useAuth} from "../hooks/auth";

export default function Header() {
    const auth = useAuth();
    return(
        <nav style={{backgroundColor: "gray"}}>
            <h1>Header</h1>
            {
                auth.isSignedIn() ?
                <>
                    <p>welcome</p>
                    <button onClick={auth.logout}>log out</button>
                </> :
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign up</Link>
                </>
            }
            <Link to="/profiles">Profiles</Link>
        </nav>
    )
}