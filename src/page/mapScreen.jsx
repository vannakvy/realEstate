import React, { useState, useEffect, Fragment } from 'react';

import '../static/mapScreen.css';
import { Card, CardContent } from '@material-ui/core';

import InfoBox from '../component/maps/InfoBox';
import Table from '../component/maps/Table';
import numeral from 'numeral';
// import Map from "../component/covideComponents/Map";

import MapDraw from '../components/MapDraw';
import { useDispatch, useSelector } from 'react-redux';
import { getLandList } from '../actions/landActions';
import { BsGrid } from 'react-icons/bs';
import { NavLink, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { BsEye } from 'react-icons/bs';
import Loader from '../component/Loader';
import TotipCom from '../component/TotipCom';

const MapScreen = () => {
 const location = useLocation();
 const query = queryString.parse(location.search);
 const pro = query.pro || '';
 const [posi, setPosi] = useState([12.5657, 104.991]);
 const [zoom, setZoom] = useState(8);

 const dispatch = useDispatch();
 const { landList, loading } = useSelector((state) => state.landList);

 useEffect(() => {
  dispatch(getLandList(pro));
 }, [pro]);

 useEffect(() => {
  if (
   pro !== '' &&
   landList &&
   landList[0] &&
   landList[0].coordinates &&
   landList[0].coordinates[0]
  ) {
   setZoom(10);
   setPosi([landList[0].coordinates[0].lat, landList[0].coordinates[0].lng]);
  } else {
   setZoom(8);
   setPosi([12.5657, 104.991]);
  }
 }, [pro, landList]);

 const findStateLand = (arr, state) => {
  let newArr = arr?.filter((a) => a?.landType === state);
  return newArr?.length;
 };

 return (
  <Fragment>
   <h6 className="fw-bold">ទំព័រដើម</h6>
   <span>
    <BsGrid style={{ marginTop: -5 }} /> /​​ ទំព័រដើម
   </span>
   <div className="app">
    <div className="app__left">
     <div className="app__stats">
      <InfoBox
       bg="rgb(93,169,221)"
       title="ដីសរុប"
       total={numeral(landList?.length).format('0,0')}
      />
      <InfoBox
       bg="rgb(255,195,172)"
       title="ដីបានដាក់លក់"
       total={numeral(findStateLand(landList, 'ដាក់លក់')).format('0,0')}
      />
      <InfoBox
       bg="rgb(250,108,126)"
       title="ដីមិនទាន់បានដាក់លក់"
       total={numeral(findStateLand(landList, 'មិនដាក់លក់')).format('0,0')}
      />
     </div>

     <MapDraw landList={landList} edit={false} zoom={zoom} pos={posi} />
    </div>
    <div className="app__right">
     <Card style={{ marginTop: '10px', width: '350px' }}>
      <CardContent>
       <div className="app__information">
        <h5 className="covid_table fw-bold m-0 pb-0">
         {pro
          ? pro + `(${landList && landList !== undefined && landList.length})`
          : 'ដីតាមបណ្ដាខេត្ដ'}
        </h5>
        <hr className="p-0 mb-0" />
        <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
         {pro ? (
          <>
           <table className="table table-striped">
            <thead>
             <tr>
              <th>ក្បាលដី</th>
              <th>ស្ថានភាព</th>
              <th></th>
             </tr>
            </thead>
            <tbody>
             {loading ? (
              <tr>
               <td colspan="3" className="py-4 text-center">
                <Loader />
               </td>
              </tr>
             ) : (
              landList &&
              landList.map((l) => (
               <tr className="tr" key={l.id}>
                <td className="td">{l.idLand}</td>
                <td className="td">{l.landType}</td>
                <td className="td">
                 <TotipCom title="watch">
                  <NavLink to="/">
                   <BsEye />
                  </NavLink>
                 </TotipCom>
                </td>
               </tr>
              ))
             )}

             {landList && !loading && landList.length === 0 && (
              <tr>
               <td colspan="3" className="py-4 text-center fw-bold">
                មិនមានទីតាំងដី
               </td>
              </tr>
             )}
            </tbody>
           </table>
          </>
         ) : (
          <Table />
         )}
        </div>
        <div className="mt-2">
         {pro && <NavLink to="/">{`>>`} ដីទាំងអស់</NavLink>}
        </div>
       </div>
      </CardContent>
     </Card>
    </div>
   </div>
   {/* graph three datasets  */}
  </Fragment>
 );
};

export default MapScreen;
