import React, { Component } from 'react';
import L from 'leaflet';
import { MapContainer, GeoJSON, useMap, useMapEvent } from 'react-leaflet';
import mapData from './../data/countries.json';
import 'leaflet/dist/leaflet.css';

// Set default value for no selection
window.selected = '</b><i>Click a country</i><b>';

// Custom Components
let info = L.control();
info.onAdd = function (map) {
 this.div = L.DomUtil.create('div', 'info');
 this.div.innerHTML = '<h4>Current Selection</h4><i>Click a country</i><br />';
 return this.div;
};
info.update = function (props) {
 this.div.innerHTML = '<h4>Current Selection</h4><b>' + props + '</b><br />';
};

function InfoBox() {
 // Add to the map
 const map = useMap();
 info.addTo(map);

 // Update text to display selected country
 useMapEvent('click', () => {
  info.update(window.selected);
 });
 return null;
}

function TileLayer() {
 const map = useMap();
 const mapboxAccessToken = TOKEN_HERE;

 // Set default values for the map
 React.useEffect(() => {
  new L.TileLayer(
   'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' +
    mapboxAccessToken,
   {
    tileSize: 512,
    zoomOffset: -1,
   }
  ).addTo(map);
 }, [map]);

 return null;
}

// Create Map
class MyMap extends Component {
 state = { selectedCountry: null };

 geoStyle = {
  stroke: false,
  fillOpacity: 0,
 };

 // Highlight the selected country
 highlightCountry = (e) => {
  if (this.state.selectedCountry) {
   this.state.selectedCountry.setStyle(this.geoStyle);
  }
  info.update(this.state.selectedCountry);
  this.setState({ selectedCountry: e.target });
  window.selected = e.target.feature.properties.ADMIN;
  var layer = e.target;
  layer.setStyle({
   stroke: true,
   weight: 3,
   color: '#666',
   dashArray: '',
   fillOpacity: 0.7,
  });

  layer.bringToFront();
 };

 onEachCountry = (country, layer) => {
  layer.on({
   click: this.highlightCountry,
  });
 };

 render() {
  return (
   <div>
    <h1 style={{ textAlign: 'center' }}>My Map</h1>
    <MapContainer style={{ height: '80vh' }} zoom={2} center={[30, 0]}>
     <GeoJSON
      style={this.geoStyle}
      data={mapData.features}
      onEachFeature={this.onEachCountry}
     />
     <TileLayer />
     <InfoBox />
    </MapContainer>
   </div>
  );
 }
}

export default MyMap;
