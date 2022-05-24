const API_URL = "http://sefdb02.qut.edu.au:3001";

// Gets the User from the API
export const GetUser = async (title, details, navigate) => {
    const url = `${API_URL}/user/${title.toLowerCase()}`; // URL based on the page
    
    await fetch (
        url, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            // mike@gmail.com | password
            body: JSON.stringify({email: details.email, password: details.password})
        }
    ).then(res => { if (!res.ok) { throw Error(res.status)} return res.json() }) // Throw an error if the response is not ok
    // Checks whether 'login' has been passed and if it is, then set a token to the storage, otherwise login.
    .then(data => { title === 'login' ? localStorage.setItem('token', data.token) : 
                                        GetUser('login', details, navigate) })
    .then(data => { navigate('/'); window.dispatchEvent(new Event('storage')) }) // Navigate to home after login

    // Catching errors based on each message                                    
    .catch(error => { switch (error.message) {
                    case '400': alert("Request body incomplete, both email and password are required"); break;
                    case '401': alert("Incorrect Email or Password"); break;  
                    case '404': alert("Error 404"); break;
                    case '409': alert("User already exists"); break; 
                    default: console.log(error)}})
}


// Gets the List of Volcanoes with selected country and range using the API
export const GetVolcanoes = async (country, range) => {
    // Checks whether it requires 'populatedWithin'
    const url = range === 0 ? `${API_URL}/volcanoes?country=${country}` : `${API_URL}/volcanoes?country=${country}&populatedWithin=${range}km`;
    const token = localStorage.getItem("token");

    return await fetch (
        url, {
        method: "GET",
        headers: token !== null ? {
            "accept": "application/json",
            Authorization: `Bearer ${token}`
        } : {}
    })
    .then(res => res.json())
    .then(res => res.map(volcano => ({
        id: volcano.id,
        name: volcano.name,
        country: volcano.country,
        region: volcano.region,
        subregion: volcano.subregion
    })));
}


// Gets the Data of the individual volcano
export const GetVolcanoData = async (id) => {
    const url = `${API_URL}/volcano/${id}`
    const token = localStorage.getItem("token");

    return await fetch(url, {
        method: "GET",
        headers: token !== null ? {
            "accept": "application/json",
            Authorization: `Bearer ${token}`
        } : {}
    }).then(res => res.json())
    .then(res => res)
}


// Gets the Countries from the API for the Filtering
export const GetCountries = () => {
    const url = `${API_URL}/countries`;
    const token = localStorage.getItem("token");

    const countries = [];

    fetch(url, {
        method: "GET",
        headers: token !== null ? {
            "accept": "application/json",
            Authorization: `Bearer ${token}`
        } : {}
    })
    .then(res => res.json())
    .then(res => res.map(data => countries.push({
        value: data.toLowerCase(), 
        label: data})));

    return countries;
}
