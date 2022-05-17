import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate();

    try {
        localStorage.removeItem("token");
    }
    catch {
        console.log("token not found");
    }

    useEffect(() => {
        navigate('/');
        window.dispatchEvent(new Event('storage'))
    }, [navigate])

    
    return (
        <div>
            Logging out...
        </div>
    );
}

export default Logout;