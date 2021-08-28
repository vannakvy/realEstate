import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table, message, Divider } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../actions/authAction';
import { useParams } from 'react-router-dom';
import Profile from '../../asset/profile.png';
import { SiGmail } from 'react-icons/si';
import { FaTelegram, FaPhone } from 'react-icons/fa';
import { ImFacebook2 } from 'react-icons/im';
import EditUser from './modal/editUser';

const UserDetail = () => {
 const { id } = useParams();
 const [openEdit, setOpenEdit] = useState(false);
 const [userEdit, setUserEdit] = useState({});
 const dispatch = useDispatch();
 const {
  userAccount: user,
  loading,
  error,
 } = useSelector((state) => state.userAccountById);

 useEffect(() => {
  if (!user || user.name !== id) {
   dispatch(getUserById(id));
  } else {
   setUserEdit(user);
  }
 }, [dispatch, id, user]);

 return (
  <div>
   {user && <EditUser open={openEdit} setOpen={setOpenEdit} data={userEdit} />}
   <div className="container bg-light p-4 shadow-sm">
    <h6 className="fw-bold text-center">ព័ត៌មានគណនីបុគ្គលិក</h6>
    <Divider />
    <div className="text-center">
     <img
      className="rounded-circle"
      style={{ width: '250px', height: '250px', objectFit: 'cover' }}
      src={user?.imgUrl?.url || Profile}
      alt=""
     />
    </div>

    <Row>
     <Col className="box-detail" xs={24}>
      <table className="tavle detail-table">
       <tr>
        <td colSpan="2" className="fs-5 fw-bold">
         ព័ត៌មានគណនីបុគ្គលិកៈ
        </td>
       </tr>
       <tr>
        <td style={{ width: '40%' }}>ឈ្មោះសម្គល់</td>
        <td className="fw-bold fs-6" style={{ width: '60%' }}>
         ៖ <span className="ms-5"></span>
         {user?.name}
        </td>
       </tr>
       <tr>
        <td style={{ width: '40%' }}>ភេទ</td>
        <td className="fw-bold fs-6" style={{ width: '60%' }}>
         ៖ <span className="ms-5"></span>
         {user?.gender}
        </td>
       </tr>
       <tr>
        <td style={{ width: '40%' }}>អាយុ</td>
        <td className="fw-bold fs-6" style={{ width: '60%' }}>
         ៖ <span className="ms-5"></span>
         {user?.age} ឆ្នាំ
        </td>
       </tr>
       <tr>
        <td style={{ width: '40%' }}>តួនាទី</td>
        <td className="fw-bold fs-6" style={{ width: '60%' }}>
         ៖ <span className="ms-5"></span>
         {user?.role}
        </td>
       </tr>
       <tr>
        <td colSpan="2" className="fs-5 fw-bold">
         អាសយដ្ឋានៈ
        </td>
       </tr>
       <tr>
        <td colSpan="2" className=" fs-6">
         ភូមិ {user?.vil} ឃុំ/សង្កាត់ {user?.com} ស្រុក/ខណ្ឌ {user?.dis}{' '}
         ខេត្ដ/ក្រុង {user?.pro}
        </td>
       </tr>
       <tr>
        <td colSpan="2" className="fs-5 fw-bold">
         ទំនាក់ទំនងៈ
        </td>
       </tr>
       <tr>
        <td style={{ width: '40%' }}>
         <SiGmail style={{ color: 'red' }} />
         <span className="ms-3"></span>អ៊ីម៉ែល
        </td>
        <td className="fw-bold fs-6" style={{ width: '60%' }}>
         ៖ <span className="ms-5"></span>
         {user?.email}
        </td>
       </tr>
       <tr>
        <td style={{ width: '40%' }}>
         <FaPhone color="blur" />
         <span className="ms-3"></span>ទូរស័ព្ទ
        </td>
        <td className="fw-bold fs-6" style={{ width: '60%' }}>
         ៖ <span className="ms-5"></span>
         {user?.phone}
        </td>
       </tr>
       <tr>
        <td style={{ width: '40%' }}>
         <ImFacebook2 color="rgb(0,67,165)" />
         <span className="ms-3"></span>ហ្វេសបុក
        </td>
        <td className="fw-bold fs-6" style={{ width: '60%' }}>
         ៖ <span className="ms-5"></span>
         {user?.facebook}
        </td>
       </tr>
       <tr>
        <td style={{ width: '40%' }}>
         <FaTelegram style={{ color: 'rgb(0,191,255' }} />
         <span className="ms-3"></span>តេលេក្រាម
        </td>
        <td className="fw-bold fs-6" style={{ width: '60%' }}>
         ៖ <span className="ms-5"></span>
         {user?.telegram}
        </td>
       </tr>
      </table>
      <div className="text-center mt-2">
       <span
        className="btn btn-outline-info"
        onClick={() => {
         setUserEdit(user);
         setOpenEdit(true);
        }}
       >
        កែប្រែអ្នកប្រើប្រាស់​ <EditOutlined />
       </span>
      </div>
     </Col>
    </Row>
   </div>
  </div>
 );
};

export default UserDetail;
