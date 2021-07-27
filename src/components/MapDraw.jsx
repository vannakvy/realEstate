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
 Tooltip,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import FormProvice from './FormProvice';
import { FaMapMarkedAlt } from 'react-icons/fa';
import './assets/leaflet.css';
import './assets/leaflet.draw.css';
import geoJson from './geo.json';
import geoDisJson from './geoDis.json';
import colorJson from './color.json';
import SimpleModal from './CreateLand';

// Material components
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';

import { Land as sellLand } from './Api';
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

export const MapDraw = (props) => {
 const classes = useStyles(props);
 const editRef = useRef();
 const [mapLayers, setMapLayers] = useState([]);
 const [posi, setPosi] = useState({
  posi: [12.828670020800967, 105.59334644545868],
  zoom: 8,
 });
 const [satellite, setSatellite] = useState(false);
 const [addr, setAddr] = useState({ pro: '', dis: '', com: '' });
 const [land, setLand] = useState([]);
 const [searchId, setSearchId] = useState('');
 const [keyId, setKeyId] = useState('');
 const [mapJson, setMapJson] = useState({});
 const [zo, setZo] = useState(8);
 const [onCreateL, setOnCreateL] = useState(false);

 useEffect(() => {
  if (searchId) {
   const searched = sellLand.filter((s) => {
    return s.idLand == searchId;
   });
   setLand(searched);
   if (searched.length) {
    setPosi({
     ...posi,
     posi: [searched[0].coordinates[0].lat, searched[0].coordinates[0].lng],
     zoom: 16,
    });
    setSatellite(true);
   }
  } else {
   if (addr.pro && addr.dis && addr.com) {
    setLand(
     sellLand.filter((s) => {
      return s.addr.com === addr.com;
     })
    );
   } else if (addr.pro && addr.dis) {
    setLand(
     sellLand.filter((s) => {
      return s.addr.dis === addr.dis;
     })
    );
   } else if (addr.pro) {
    setLand(
     sellLand.filter((s) => {
      return s.addr.pro === addr.pro;
     })
    );
   } else {
    setLand(sellLand);
   }
  }
 }, [addr, searchId]);

 useEffect(() => {
  if (zo === 8) {
   setMapJson(geoJson);
  } else {
   setMapJson(geoDisJson);
  }
  console.log(zo);
 }, [zo]);

 const _onCreated = (e) => {
  console.log(e);
  const { layerType, layer } = e;
  if (layerType === 'polygon') {
   const { _leaflet_id } = layer;
   console.log(layer);
   setMapLayers((layers) => [
    ...layers,
    { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
   ]);
  }

  setOnCreateL(true);
 };
 const _onEdited = (e) => {
  console.log(e);
 };
 const _onDeleted = (e) => {
  console.log(e);
 };

 const gotoMap = (lan) => {
  const l = lan.coordinates[0];
  setPosi({ ...posi, posi: [l.lat, l.lng], zoom: 17 });
 };

 const searchHandler = (e) => {
  setKeyId(e.target.value);
 };
 const searchSubmit = (e) => {
  e.preventDefault();
  setSearchId(keyId);
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
   <div className="position-relative px-3 my-1 w-100">
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
      <EditControl
       ref={editRef}
       position="topright"
       onCreated={_onCreated}
       onEdited={_onEdited}
       onDeleted={_onDeleted}
       draw={{
        rectangle: false,
        circle: false,
        polyline: false,
        circlemarker: false,
        marker: false,
        polygon: {
         allowIntersection: false,
         shapeOptions: {
          color: '#ff0000',
         },
        },
       }}
      />
      {land &&
       land.map((l) => (
        <div key={l.idLand}>
         {zo >= 15 ? (
          <Polygon
           onClick={() =>
            setPosi({
             ...posi,
             posi: [l.coordinates[0].lat, l.coordinates[0].lng],
             zoom: 16,
            })
           }
           className="bg-light"
           positions={l.coordinates}
          >
           <Tooltip direction="top">
            <PupupCom />
           </Tooltip>
          </Polygon>
         ) : (
          <Marker
           onClick={() =>
            setPosi({
             ...posi,
             posi: [l.coordinates[0].lat, l.coordinates[0].lng],
             zoom: 16,
            })
           }
           position={[l.coordinates[0].lat, l.coordinates[0].lng]}
          ></Marker>
         )}
        </div>
       ))}
     </FeatureGroup>
     {/* {satellite ? ( */}

     <ReactLeafletGoogleLayer
      googleMapsLoaderConf={{
       KEY: 'AIzaSyCLpho9FZOn3PUIt7Pm8R6GPTIQQrJ1_1M',
      }}
      type={'hybrid'}
      h
     />
     {/* ) : null} */}

     <GeoJSON data={mapJson} onEachFeature={onEachFeature} style={style} />
    </Map>

    <button
     onClick={() => setSatellite(!satellite)}
     className={`position-absolute btn ${satellite ? 'btn-light' : 'btn-dark'}`}
     style={{ bottom: 20, right: 20 }}
    >
     <FaMapMarkedAlt />
    </button>
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
   <SimpleModal onCreateL={onCreateL} setOnCreateL={setOnCreateL} />
   <pre>{JSON.stringify(mapLayers, 0, 2)}</pre>
  </div>
 );
};

export default MapDraw;
