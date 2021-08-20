import React, { useRef, useState } from 'react';
import L from 'leaflet';
import {
 Map,
 FeatureGroup,
 TileLayer,
 Polygon,
 Popup,
 Marker,
 GeoJSON,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

import './assets/leaflet.css';
import './assets/leaflet.draw.css';
import geoJson from './geo.json';
import colorJson from './color.json';
import SimpleModal from './CreateLand';

// Material components
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import PupupCom from './PupupCom.jsx';

const useStyles = makeStyles((theme) => ({
 map: {
  height: `calc(90vh - 90px)`,
  width: '100%',
  zIndex: 0,
 },
 buttonWrapper: {
  zIndex: 1,
  position: 'absolute',
  bottom: theme.spacing(2),
  marginLeft: '30%',
  marginBottom: '8%',
  transform: 'translateX(-50%)',
 },
 headerWrapper: {
  zIndex: 1,
  marginLeft: theme.spacing(3),
  marginTop: theme.spacing(1),
 },
}));

export const MapDrawShare = (props) => {
 const { landList, edit, zoom = 8, pos = [12.5657, 104.991] } = props;
 const classes = useStyles(props);
 const editRef = useRef();
 const [mapLayers, setMapLayers] = useState([]);
 const [posi, setPosi] = useState({
  posi: [12.5657, 104.991],
  zoom: zoom,
 });

 const [addr, setAddr] = useState({ pro: '', dis: '', com: '' });
 const [land, setLand] = useState([]);
 const [searchId, setSearchId] = useState('');
 const [keyId, setKeyId] = useState('');
 const [mapJson, setMapJson] = useState({});
 const [zo, setZo] = useState(8);
 const [onCreateL, setOnCreateL] = useState(false);

 useEffect(() => {
  setLand(landList);
  setPosi({ ...posi, posi: pos, zoom: zoom });
  setZo(zoom);
 }, [landList, zoom, pos]);

 useEffect(() => {
  setMapJson(geoJson);
 }, [zo]);

 const _onCreated = (e) => {
  const { layerType, layer } = e;
  if (layerType === 'polygon') {
   const items = [];
   layer.getLatLngs()[0].forEach((la) => {
    items.push({ lat: la.lat, lng: la.lng });
   });
   setMapLayers(items);
  }
  setOnCreateL(true);
 };
 const _onEdited = (e) => {
  const { layers } = e;
  const items = [];

  layers.getLayers()[0]._latlngs[0].forEach((la) => {
   items.push({ lat: la.lat, lng: la.lng });
  });
 };
 const _onDeleted = (e) => {
  console.log(e);
 };

 const gotoMap = (lan) => {
  const l = lan.coordinates[0];
  setPosi({ ...posi, posi: [l.lat, l.lng], zoom: 17 });
 };

 delete L.Icon.Default.prototype._getIconUrl;
 L.Icon.Default.mergeOptions({
  iconRetinaUrl:
   'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl:
   'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl:
   'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
 });

 const highlightFeature = (e) => {
  var layer = e.target;
  layer.setStyle({
   fillColor: 'transparent',
   fillOpacity: 0,
  });
 };

 const resetHighlight = (e) => {
  var layer = e.target;
  layer.setStyle({
   fillColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
   fillOpacity: 0.3,
  });
 };

 const clickToFeature = (e, layer) => {
  var laye = e.target;
  console.log('I clicked on ', laye);
  laye.setStyle({
   fillColor: 'yellow',
   fillOpacity: 1,
  });

  layer.setStyle({
   fillColor: 'transparent',
   fillOpacity: 0,
  });
  let lat1 = (layer._bounds._northEast.lat + layer._bounds._southWest.lat) / 2;
  let lng1 = (layer._bounds._northEast.lng + layer._bounds._southWest.lng) / 2;

  setPosi({
   ...posi,
   posi: [lat1, lng1],
   zoom: zo > 10 ? zo : 10,
  });
  console.log(zo);
 };

 const onEachFeature = (feature, layer) => {
  layer.setStyle({
   fillColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
  });
  layer.on({
   click: (e) => clickToFeature(e, layer),
   mouseover: (e) => highlightFeature(e),
   mouseout: (e) => resetHighlight(e),
  });
 };

 const getColor = (d) => {
  // now uses palette from google material design: https://material.io/guidelines/style/color.html#color-color-palette
  var material_design_color_idx = [
   '50',
   '100',
   '200',
   '300',
   '400',
   '500',
   '600',
   '700',
   '800',
   '900',
  ];
  var palette = new Array(material_design_color_idx.length);
  var i;
  for (i = 0; i < material_design_color_idx.length; i++) {
   palette[i] = colorJson['pink'][material_design_color_idx[i]];
  }
  for (i = 1; i <= palette.length; i++) {
   // values of the property are between -10,0 and 10.0
   if (d < -10.0 + (i * (10.0 - -10.0)) / palette.length) {
    return palette[i - 1];
   }
  }
 };

 const style = (feature) => {
  return {
   //  fillColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
   weight: 3,
   opacity: 1,
   color: 'white',
   dashArray: '3',
   fillOpacity: 0.3,
  };
 };

 return (
  <div>
   {/* <div className="row w-100"> */}
   <div className="position-relative shadow w-100 p-1 bg-light rounded">
    <Map
     center={posi.posi}
     zoom={posi.zoom}
     zoomControl={true}
     className={classes.map}
     onzoomstart={(e) => setZo(e.target._zoom)}
     onzoomend={(e) => setZo(e.target._zoom)}
    >
     <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
     />

     <FeatureGroup>
      {land &&
       land !== [] &&
       land.map((l) => (
        <div key={l.id}>
         {zo >= 14 ? (
          <Polygon
           onClick={() =>
            setPosi({
             ...posi,
             posi: [l.coordinates[0].lat, l.coordinates[0].lng],
             zoom: 18,
            })
           }
           className="bg-light"
           positions={l.coordinates}
          >
           <Popup direction="top">
            <PupupCom land={l} />
           </Popup>
          </Polygon>
         ) : (
          <Marker
           onClick={() =>
            setPosi({
             ...posi,
             posi: [l.coordinates[0].lat, l.coordinates[0].lng],
             zoom: 18,
            })
           }
           position={[l.coordinates[0].lat, l.coordinates[0].lng]}
          ></Marker>
         )}
        </div>
       ))}
     </FeatureGroup>

     <ReactLeafletGoogleLayer
      // googleMapsLoaderConf={{
      //  KEY: 'AIzaSyCLpho9FZOn3PUIt7Pm8R6GPTIQQrJ1_1M',
      // }}
      type={'hybrid'}
      h
     />

     <GeoJSON data={mapJson} onEachFeature={onEachFeature} style={style} />
    </Map>
   </div>
   {/* <div className="col-3 mt-3">
     <form onSubmit={searchSubmit}>
      <div className="input-group mb-3">
       <span
        className="input-group-text"
        id="basic-addon1"
        style={{ cursor: 'pointer' }}
        onClick={searchSubmit}
       >
        <FaMapMarkedAlt />
       </span>
       <input
        type="text"
        value={keyId}
        onChange={searchHandler}
        className="form-control"
        placeholder="Land ID"
       />
      </div>
      <input type="submit" value="search" className="" hidden />
     </form>
     <FormProvice setPosi={setPosi} posi={posi} addr={addr} setAddr={setAddr} />
     <p>{land.length ? `មាន(${land.length})` : 'មិនមានទីតាំងដី'}</p>
     {land &&
      land.map((l) => (
       <div
        key={l.idLand}
        className={`px-3 py-3 mb-1 text-dark rounded`}
        style={{ cursor: 'pointer', background: 'rgb(201, 201, 201)' }}
        onClick={() => gotoMap(l)}
       >
        <FaMapMarkedAlt /> ID: {l.idLand} / {l.addr.pro}-{l.addr.dis}-
        {l.addr.com}
       </div>
      ))}
    </div> */}
   {/* </div> */}
   <SimpleModal open={onCreateL} setOpen={setOnCreateL} latLng={mapLayers} />
   {/* <pre>{JSON.stringify(mapLayers, 0, 2)}</pre> */}
  </div>
 );
};

export default MapDrawShare;
