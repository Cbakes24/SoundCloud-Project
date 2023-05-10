import { useMemo } from "react"
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

export default function HomeMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    })
    return <div>Map</div>
}
