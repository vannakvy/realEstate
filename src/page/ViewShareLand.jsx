import React, { useEffect } from 'react';
import logo from '../asset/logoo.png';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getShareLandById } from '../actions/SharingActions';
import dateFormat from 'dateformat';
import { useState } from 'react';
import db from '../firebase/db';
import MapDrawShare from '../components/MapDrawShare';
import ImgView from '../component/imgView';

const ViewShareLand = () => {
 const { id } = useParams();
 const dispatch = useDispatch();
 const [land, setLand] = useState([]);
 const [landById, setLandById] = useState({});
 const [posi, setPosi] = useState([12.5657, 104.991]);
 const [zoom, setZoom] = useState(8);

 const { userInformation: login } = useSelector((state) => state.userLogin);
 const { shareLandId, loading } = useSelector((state) => state.shareLandId);

 useEffect(() => {
  dispatch(getShareLandById(id));
 }, [dispatch, id]);

 useEffect(() => {
  if (
   shareLandId &&
   shareLandId.landID &&
   shareLandId.expireAt >= new Date().getTime()
  ) {
   try {
    let ref = db.collection('landList').doc(shareLandId.landID);
    ref.onSnapshot((queryS) => {
     if (queryS.data()) {
      setLand([{ ...queryS.data(), id: id }]);
      setLandById({ ...queryS.data(), id: id });
      setZoom(18);
      setPosi([
       queryS.data().coordinates[0].lat,
       queryS.data().coordinates[0].lng,
      ]);
     }
    });
   } catch (error) {
    alert(error.message);
   }
  }
 }, [shareLandId]);

 console.log(landById);

 return (
  <div>
   <div className="text-center bg-light mb-2">
    <img width="200px" src={logo} alt="" />
   </div>
   <div className={`${login ? 'container-fuild' : 'container-xl'}`}>
    {loading ? (
     <h5 className="text-center mt-5">loading...</h5>
    ) : shareLandId && shareLandId.expireAt >= new Date().getTime() ? (
     <>
      <MapDrawShare landList={land} edit={false} pos={posi} zoom={zoom} />
      <h4 className="mt-3 text-center fw-bold">ព័ត៌មានអំពីក្បាលដី</h4>
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
        <div className="bg-light rounded overflow-hidden shadow-sm mt-2">
         <div className="bg-dark text-light text-center p-2 fs-6 fw-bold">
          Sharing
         </div>
         <div className="w-100">
          <div className="row p-3 w-100">
           <h6 className="col-3 py-2 fw-bold">អតិថិជន</h6>
           <h6 className="col-9 py-2">{shareLandId && shareLandId.customer}</h6>
           <h6 className="col-3 py-2 fw-bold">រយៈពេល</h6>
           <h6 className="col-9 py-2">
            {shareLandId && shareLandId.duration} ថ្ងៃ
           </h6>
           <h6 className="col-3 py-2 fw-bold">ស្ថានភាព</h6>
           <h6 className="col-9 py-2">
            {shareLandId?.expireAt < new Date().getTime()
             ? 'expired'
             : 'Sharing'}
           </h6>
           <h6 className="col-3 py-2 fw-bold">ថ្ងៃអស់សុពលភាព</h6>
           <h6 className="col-9 py-2">
            {dateFormat(
             shareLandId?.expireAt,
             'dddd, mmmm dS, yyyy, h:MM:ss TT'
            )}
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
         <div className="w-100 text-center" style={{ minHeight: '300px' }}>
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
      <ImgView />
     </>
    ) : (
     <h5 className="mt-5 text-center">Link នេះបានអស់សុពលភាពហើយ</h5>
    )}
   </div>
  </div>
 );
};

export default ViewShareLand;
