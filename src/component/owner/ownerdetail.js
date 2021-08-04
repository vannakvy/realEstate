import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table, message, Divider, Image } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import MapDraw from '../../components/MapDraw';
import LandSideBar from '../landsidebar/landsidebar';
import LandTable from '../land/LandTable';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '../../actions/authAction';
import { getLandById, getLandByUser } from '../../actions/landActions';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { LAND_BY_ID_RES } from '../../constants/land';

function OwnerDetail() {
 const { id } = useParams();
 const dispatch = useDispatch();
 const { userAccount } = useSelector((state) => state.userAccountById);
 const { landListByUser } = useSelector((state) => state.landListByUser);
 const { landById } = useSelector((state) => state.landById);

 const location = useLocation();
 const query = queryString.parse(location.search);
 const landId = query.landId || '';
 const [land, setLand] = useState([]);

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
  if (landById !== undefined && landById !== {} && landById.id) {
   setLand([landById]);
  }
 }, [landById]);

 const findStateLand = (arr, state) => {
  let newArr = arr?.filter((a) => a?.landType === state);
  return newArr?.length;
 };

 return (
  <>
   <h2>ព័ត៌មានម្ចាស់ដី</h2>
   <Row>
    <Col md={10} xs={24}>
     <Row className="box-card">
      <Col xs={8} style={{ height: '100%' }}>
       <Image
        width="100%"
        // height={200}
        src="error"
        fallback="data:image/png;base64,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"
       />
      </Col>
      <Col className="box-detail" xs={14}>
       <span className="link">
        &emsp;
        <EditOutlined style={{ fontSize: 20 }} />
       </span>
       <table className="detail-table">
        <tr>
         <td style={{ width: '30%' }}>ID</td>
         <td style={{ width: '70%' }}>៖ {userAccount?.id}</td>
        </tr>
        <tr>
         <td>ឈ្មោះពេញ</td>
         <td>៖ {userAccount?.name}</td>
        </tr>
        <tr>
         <td>ទំនាក់ទំនង</td>
         <td>៖ {userAccount?.phone}</td>
        </tr>
        <tr>
         <td>អ៊ីម៉ែល</td>
         <td>៖ {userAccount?.email}</td>
        </tr>
        {/* <tr>
         <td>អាសយដ្ឋាន</td>
         <td>៖ {userAccount?.}</td>
        </tr> */}
       </table>
      </Col>
     </Row>
     {/* <Divider /> */}
    </Col>
    <Col md={14} xs={24}>
     <Row>
      <Col md={12} xs={24}>
       <div className="box-card box-detail">
        <h4>ដីសរុប </h4>
        <Divider />
        <p>
         <b>{landListByUser?.length} ក្បាល</b>
        </p>
       </div>
      </Col>
      <Col md={12} xs={24}>
       <div className="box-card box-detail">
        <h4>ដីលក់សរុប </h4>
        <Divider />
        <p>
         <b>{findStateLand(landListByUser, 'ដាក់លក់')} ក្បាល</b>
        </p>
       </div>
      </Col>
      <Col md={12} xs={24}>
       <div className="box-card box-detail">
        <h4>ដីមិនដាក់សរុប </h4>
        <Divider />
        <p>
         <b>{findStateLand(landListByUser, 'មិនដាក់លក់')} ក្បាល</b>
        </p>
       </div>
      </Col>
      <Col md={12} xs={24}>
       <div className="box-card box-detail">
        <h4>ដីសរុប </h4>
        <Divider />
        <p>
         <b>30 ក្បាល</b>
        </p>
       </div>
      </Col>
     </Row>
    </Col>

    <Col md={15}>
     <div className="box-card box-detail">
      <MapDraw landList={land} />
     </div>
    </Col>
    <Col md={9}>
     <div className="box-card box-detail">
      <LandTable landOwner={true} landListByUser={landListByUser} />
     </div>
    </Col>
   </Row>
  </>
 );
}

export default OwnerDetail;
