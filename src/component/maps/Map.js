import React from "react";
import { MapContainer as LeafletMap, TileLayer,LayersControl } from "react-leaflet";
import "./Map.css";




// allHospitalInfos
function Map({ district, casesType, center, zoom }) {

  
  return (
    <div className="map ">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    
      </LeafletMap>
    </div>
  );
}

export default Map;
