import React, { useState } from "react";
import { Map, Marker } from 'pigeon-maps';


export const GetMap = ({coordinates}) => {
    const height = 300, width = 50;
    const [centre, setCentre] = useState(coordinates);
    const [zoom, setZoom] = useState(11);

    return (
        <Map
            height={height}
            center={centre}
            zoom={zoom}
            onBoundsChanged={({ centre, zoom }) => {
                setCentre(centre);
                setZoom(zoom);
            }}
        />
    )
}