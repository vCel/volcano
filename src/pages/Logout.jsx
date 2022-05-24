import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

// Page to log the user out
function Logout() {
    const navigate = useNavigate();

    // Try to remove the token
    try {
        localStorage.removeItem("token");
    }
    catch {
        console.log("token not found");
    }

    useEffect(() => {
        navigate('/');
        window.dispatchEvent(new Event('storage')) // New event to inform that the user has been logged out
    }, [navigate])

    
    return (
        <div>
            Logging out...
        </div>
    );
}

export default Logout;