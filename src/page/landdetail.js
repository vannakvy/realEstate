import React, { useState, useEffect, Fragment } from 'react';

import '../static/mapScreen.css';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLandById } from '../actions/landActions';
import MapDrawShare from '../components/MapDrawShare';

const LandDetail = (props) => {
 const { id } = useParams();
 const dispatch = useDispatch();

 const [posi, setPosi] = useState([12.5657, 104.991]);
 const [zoom, setZoom] = useState(8);
 const [landList, setLandList] = useState([]);

 const { landById } = useSelector((state) => state.landById);
 useEffect(() => {
  dispatch(getLandById(id));
 }, [dispatch, id]);

 useEffect(() => {
  setLandList([]);
  setZoom(8);
  if (
   landById !== undefined &&
   landById !== {} &&
   landById.id &&
   landById.coordinates &&
   landById.coordinates[0]
  ) {
   setLandList([landById]);
   setPosi([landById.coordinates[0].lat, landById.coordinates[0].lng]);
   setZoom(19);
  }
 }, [landById]);

 return (
  <Fragment>
   <MapDrawShare landList={landList} edit={false} zoom={zoom} pos={posi} />
   <h5 className="mt-3 text-center fw-bold">ព័ត៌មានអំពីក្បាលដី</h5>
   <div className="row w-100 mt-2">
    <div className="col-md-6">
     <div className="bg-light rounded overflow-hidden shadow-sm">
      <div className="bg-dark text-light text-center p-2 fs-6 fw-bold">
       ព័ត៌មានបន្ថែម
      </div>
      <div className="w-100">
       <div className="row p-3 w-100">
        <h6 className="col-3 py-2 fw-bold">ID</h6>
        <h6 className="col-9 py-2">{landById && landById.id}</h6>
        <h6 className="col-3 py-2 fw-bold">ម្ចាស់ដី</h6>
        <h6 className="col-9 py-2">
         {landById && landById.owner && landById.owner.ownerId}
        </h6>
        <h6 className="col-3 py-2 fw-bold">ក្បាលដី</h6>
        <h6 className="col-9 py-2">{landById && landById.idLand}</h6>
        <h6 className="col-3 py-2 fw-bold">ស្ថានភាព</h6>
        <h6 className="col-9 py-2">{landById && landById.landType}</h6>
        <h6 className="col-3 py-2 fw-bold">ទំហំ</h6>
        <h6 className="col-9 py-2">
         {landById && landById.owner && landById.owner.size}
        </h6>
        <h6 className="col-3 py-2 fw-bold">អាស័យដ្ឋាន</h6>
        <h6 className="col-9 py-2">
         ភូមិ{landById && landById.add && landById.add.vil}​ ឃុំ
         {landById && landById.add && landById.add.com} ស្រុក​
         {landById && landById.add && landById.add.dis} ខេត្ដ
         {landById && landById.add && landById.add.pro}
        </h6>
       </div>
      </div>
     </div>
    </div>
    <div className="col-md-6">
     <div className="bg-light rounded overflow-hidden shadow-sm">
      <div className="bg-dark text-light text-center p-2 fs-6 fw-bold">
       រូបភាពដី
      </div>
      <div className="w-100 text-center" style={{ minHeight: '240px' }}>
       {landById &&
        landById.img &&
        landById.img.map((img) => (
         <img
          width="240px"
          key={img.name}
          className="mx-1 my-1"
          src={img.url}
          alt={img.name}
         />
        ))}

       {landById && landById.img && landById.img.length === 0 ? (
        <h6 className="mt-5 pt-5 fw-bold">មិនទាន់មានរូបភាពនៅឡើយ</h6>
       ) : null}
      </div>
     </div>
    </div>
   </div>
  </Fragment>
 );
};

export default LandDetail;
