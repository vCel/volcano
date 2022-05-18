const API_URL = "http://sefdb02.qut.edu.au:3001";


// Gets the User from the API
export const GetUser = async (title, details, navigate) => {
    const url = `${API_URL}/user/${title.toLowerCase()}`;
    console.log(url);
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
    ).then(res => {if (!res.ok) { throw Error(res.status)} return res.json() })
    .then(data => { title === 'login' ? localStorage.setItem('token', data.token) : 
                                        GetUser('login', details, navigate) })
    .then(data => {navigate('/'); window.dispatchEvent(new Event('storage'))} )
    // Error Catching                                    
    .catch(error => { if (error.message === '401') alert("Invalid Email or Password")
                    else if (error.message === '404') alert("404: Broken code?")
                    else if (error.message === '409') alert("User already exists") })
}


// Gets the List of Volcanoes with selected country and range using the API
export const GetVolcanoes = async (country, range) => {
    const url = `${API_URL}/volcanoes?country=${country}&populatedWithin=${range}km`;
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
    // .then(res => res.map(data => ({
    //     name: data.name,
    //     country: data.country,
    //     region: data.region,
    //     subregion: data.subregion,
    //     last_eruption: data.last_eruption,
    //     summit: data.summit,
    //     elevation: data.elevation,
    //     latitude: data.latitude,
    //     longitude: data.longitude,
    //     population: {
    //         "5km": data.population_5km,
    //         "10km": data.population_10km,
    //         "30km": data.population_30km,
    //         "100km": data.population_100km
    //     }
    // })));
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
