import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GetVolcanoData } from "../api/volcano_api";
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

function Volcano() {
    const [searchParams] = useSearchParams();
    const volcano_id = searchParams.get("id");

    const [volcanoData, setData] = useState([]);
    const [showChart, setVisible] = useState(false);
    const [isLoaded, setLoaded] = useState(false);

    const [loggedIn] = useState(localStorage.hasOwnProperty('token'));

    useEffect(() => {
        GetVolcanoData(volcano_id)
        .then(data => {
            setData(data);
            if (!isNaN(volcanoData.latitude)) setLoaded(true);
        }).catch(error => console.log(error))
    }, [volcano_id, volcanoData.latitude]);

    return (
        <div>
            <h1 className="volcano__title">{volcanoData.name}</h1>
            <div className="volcano__panel">
                <div className="volcano__details">
                    <h2>Volcano Details</h2>
                    <ul>
                        <li><span>Country:</span> {volcanoData.country}</li>
                        <li><span>Region:</span> {volcanoData.region}</li>
                        <li><span>Subregion:</span> {volcanoData.subregion}</li>
                        <li><span>Last Eruption:</span> {volcanoData.last_eruption}</li>
                        <li><span>Summit:</span> {volcanoData.summit} m</li>
                        <li><span>Elevation:</span> {volcanoData.elevation} ft</li>
                    </ul>
                    <h2>Population Density</h2>
                    { loggedIn ? 
                    <button id="population-chart" onClick={() => setVisible(true)}>View Chart</button> : 
                    <p id="log-message">Please Log In to see the population density.</p> }
                    
                </div>
                <div className="volcano__map">
                    {/* Checks if the data is loaded */}
                    { isLoaded && <CreateMap coordinates={[parseFloat(volcanoData.latitude), parseFloat(volcanoData.longitude)]}/> }
                </div>
                    
            </div>
            { showChart && <CreateChart data={[
                        {Distance: '5km', Population: volcanoData.population_5km},
                        {Distance: '10km', Population: volcanoData.population_10km},
                        {Distance: '30km', Population: volcanoData.population_30km},
                        {Distance: '100km', Population: volcanoData.population_100km},
            ]} setVisible={setVisible} /> }
        </div>
    );
}

const CreateMap = ({coordinates}) => {
    const [centre, setCentre] = useState(coordinates);
    const [zoom, setZoom] = useState(9);

    return (
        <Map
            height={500}
            width={700}
            defaultCenter={centre}
            center={centre}
            zoom={zoom}
            onBoundsChanged={({ centre, zoom }) => {
                setCentre(centre);
                setZoom(zoom);
            }}
        >
            <ZoomControl/>
            <Marker width={50} anchor={coordinates} color={"tomato"}/>
        </Map>
    )
}

const CreateChart = ({data, setVisible}) => (
    <div className="chart__panel" onClick={() => setVisible(false)}>
        <div className="chart">
            <ResponsiveContainer width="100%" height="100%" minHeight={300} minWidth={400}>
            <BarChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 10,
                }}
            >
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="Distance" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Population" fill="tomato" />
            </BarChart>
        </ResponsiveContainer>
        
        </div>
        <div id="close-message">Click anywhere to close</div>
    </div>
)





export default Volcano;