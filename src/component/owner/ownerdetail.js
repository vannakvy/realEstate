import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table, message, Divider, Image } from 'antd';
import { PlusOutlined, EditOutlined, MailFilled } from '@ant-design/icons';
import MapDraw from '../../components/MapDraw';

import LandTable from '../land/LandTable';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../../actions/authAction';
import { getLandById, getLandByUser } from '../../actions/landActions';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { LAND_BY_ID_RES } from '../../constants/land';
import { Card, CardContent } from '@material-ui/core';
import numeral from 'numeral';
import InfoBox from '../maps/InfoBox';
import Profile from '../../asset/profile.png';
import { SiGmail } from 'react-icons/si';
import { FaTelegram, FaPhone } from 'react-icons/fa';
import { ImFacebook2 } from 'react-icons/im';

function OwnerDetail() {
 const { id } = useParams();
 const dispatch = useDispatch();
 const { userAccount } = useSelector((state) => state.userAccountById);
 const { landListByUser, loading } = useSelector(
  (state) => state.landListByUser
 );
 const { landById } = useSelector((state) => state.landById);

 const location = useLocation();
 const query = queryString.parse(location.search);
 const landId = query.landId || '';
 const [land, setLand] = useState([]);
 const [posi, setPosi] = useState([12.5657, 104.991]);
 const [zoom, setZoom] = useState(8);

 useEffect(() => {
  dispatch(getUserById(id));
  dispatch(getLandByUser(id));
 }, [dispatch, id]);

 useEffect(() => {
  dispatch({ type: LAND_BY_ID_RES });
  if (landId) {
   dispatch({ type: LAND_BY_ID_RES });
   dispatch(getLandById(landId));
  }
 }, [landId]);

 useEffect(() => {
  setLand([]);
  setZoom(8);
  if (
   landById !== undefined &&
   landById !== {} &&
   landById.id &&
   landById.coordinates &&
   landById.coordinates[0]
  ) {
   setLand([landById]);
   setPosi([landById.coordinates[0].lat, landById.coordinates[0].lng]);
   setZoom(18);
  }
 }, [landById]);

 const findStateLand = (arr, state) => {
  let newArr = arr?.filter((a) => a?.landType === state);
  return newArr?.length;
 };

 return (
  <>
   <h6 className="fw-bold">ព័ត៌មានម្ចាស់ដី</h6>
   <span>/​​ ទំព័រដើម</span>
   <div className="app">
    <div className="app__left">
     <div className="app__stats">
      <InfoBox
       bg="rgb(93,169,221)"
       title="ដីសរុប"
       total={numeral(landListByUser?.length).format('0,0')}
      />
      <InfoBox
       bg="rgb(255,195,172)"
       title="ដីបានដាក់លក់"
       total={numeral(findStateLand(landListByUser, 'ដាក់លក់')).format('0,0')}
      />
      <InfoBox
       bg="rgb(250,108,126)"
       title="ដីមិនទាន់បានដាក់លក់"
       total={numeral(findStateLand(landListByUser, 'មិនដាក់លក់')).format(
        '0,0'
       )}
      />
     </div>
     <h6 className="fw-bold">តារាងព័ត៌មានដី</h6>
     <LandTable
      landOwner={true}
      landListByUser={landListByUser}
      loading={loading}
     />
    </div>
    <div className="app__right">
     <Card style={{ marginTop: '10px', width: '350px' }}>
      <CardContent>
       <div className="app__information w-100">
        <div className="d-flex">
         <img
          className="mx-auto my-3 rounded-circle"
          src={userAccount?.imgUrl?.url || Profile}
          width="100"
          height="100"
          style={{ objectFit: 'cover' }}
          alt=""
         />
        </div>
        <hr />

        <div className="w-100 d-flex mb-2">
         <div style={{ width: '100px' }}>ឈ្មោះ</div>
         <div>៖ {userAccount?.name}</div>
        </div>
        <div className="w-100 d-flex mb-2">
         <div style={{ width: '100px' }}>ភេទ</div>
         <div>៖ {userAccount?.gender}</div>
        </div>
        <div className="w-100 d-flex mb-2">
         <div style={{ width: '100px' }}>អាយុ</div>
         <div>៖ {userAccount?.age}​ឆ្នាំ</div>
        </div>
       </div>
       <br />
       <strong>អាស័យដ្ឋាន</strong>
       <p>
        {userAccount?.vil} {userAccount?.com} {userAccount?.dis}{' '}
        {userAccount?.pro}
       </p>
       <strong>ទំនាក់ទំនង</strong>
       <div className="w-100 d-flex mb-2">
        <div style={{ width: '100px' }}>
         <FaPhone color="blur" /> ទូរស័ព្ទ
        </div>
        <div>៖ {userAccount?.phone}</div>
       </div>
       <div className="w-100 d-flex mb-2">
        <div style={{ width: '100px' }}>
         <SiGmail style={{ color: 'red' }} /> អ៊ីម៉ែល
        </div>
        <div>៖ {userAccount?.email}</div>
       </div>
       <div className="w-100 d-flex mb-2">
        <div style={{ width: '100px' }}>
         <ImFacebook2 color="rgb(0,67,165)" /> ហ្វេសបុក
        </div>
        <div>៖ {userAccount?.facebook}</div>
       </div>
       <div className="w-100 d-flex mb-2">
        <div style={{ width: '100px' }}>
         <FaTelegram style={{ color: 'rgb(0,191,255' }} /> តេលេក្រាម
        </div>
        <div>៖ {userAccount?.telegram}</div>
       </div>
      </CardContent>
     </Card>
    </div>
   </div>
   {/* <h6 className="fw-bold">ផែនទីបង្ហាញទីតាំងដី</h6>
   <MapDraw landList={land} edit={false} zoom={zoom} pos={posi} />

   <div>
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
   </div> */}
  </>
 );
}

export default OwnerDetail;
