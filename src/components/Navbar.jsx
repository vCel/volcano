import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
    const [loggedIn, setLoggedIn] = useState(localStorage.hasOwnProperty('token'));

    const register = (<li id="account"><Link to = "/register">Register</Link></li>)
    const login = <li id="account"><Link to = "/login">Login</Link></li>
    const logout = <li id="logout"><Link to = "/logout">Logout</Link></li>

    // Check if token has been added or removed
    window.addEventListener('storage', () => setLoggedIn(localStorage.hasOwnProperty('token')));
    
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to = "/">Home</Link>
                </li>
                <li>
                    <Link to = "/volcanoes">Volcano List</Link>
                </li>
                {/* Checks if the user is logged in then shows the buttons accordingly */}
                { loggedIn ? logout : register }
                { !loggedIn && login }
            
            </ul>
        </nav>
    );
}

export default Navbar;