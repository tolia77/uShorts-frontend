import {Link} from "react-router-dom";

export default function Header() {
    return(
        <nav>
            <h1>Header</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
            <Link to="/profiles">Profiles</Link>
        </nav>
    )
}