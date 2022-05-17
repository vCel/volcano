import { useEffect, useState  } from "react";
import { useSearchParams } from "react-router-dom";
import { GetVolcanoData } from "../api/volcano_api";
import { Map, Marker } from 'pigeon-maps';

// There is an error when after a new user has been registered, there is no token
// Which then breaks this entire page

function Volcano() {
    const [searchParams] = useSearchParams();
    const volcano_id = searchParams.get("id");

    const [volcanoData, setData] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

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
                        <li><span>Summit:</span> {volcanoData.summit}m</li>
                        <li><span>Elevation:</span> {volcanoData.elevation}m</li>
                    </ul>
                </div>
                <div className="volcano__map">
                    {isLoaded ? <CreateMap coordinates={[parseFloat(volcanoData.latitude), parseFloat(volcanoData.longitude)]}/> : <></>}
                </div>
            </div>
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
            <Marker width={50} anchor={coordinates} color={"tomato"}/>
        </Map>
    )

}

export default Volcano;