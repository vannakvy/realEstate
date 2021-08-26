import React, { useState } from 'react';
import { Modal, Form, Input, Row, Col, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { createShareLand } from '../../../actions/SharingActions';
import db from '../../../firebase/db';
import Loader from '../../Loader';
import dateFormat from 'dateformat';
import { DOMAIN_NAME } from '../../../constants/var';
import { BsClipboardData } from 'react-icons/bs';
import copy from 'copy-to-clipboard';

export default function AddSharingFromLand({ open, setOpen, land }) {
 const dispatch = useDispatch();
 const [createShare, setCreateShare] = useState({});
 const [loading, setLoading] = useState(false);
 const [shareCreate, setShareCreate] = useState({
  landID: land,
  duration: '',
  customer: '',
  type: 'Public',
  pass: '',
 });

 const { userInformation } = useSelector((state) => state.userLogin);

 const shareHandler = async (e, data) => {
  e.preventDefault();
  setLoading(true);
  try {
   const shareData = await db.collection('shareLand').add({
    landID: data.landID,
    duration: data.duration,
    customer: data.customer,
    type: data.type,
    pass: data.pass || '',
    createAt: new Date().getTime(),
    expireAt:
     new Date().getTime() + (data.duration > 0 ? data.duration : 0) * 86400000,
    createBy: userInformation.uid,
   });
   if (shareData) {
    shareData.onSnapshot((data) => {
     console.log(data.data());
     setCreateShare({ ...data.data(), id: shareData.id });
    });

    message.success('បង្កើត Sharing ជោគជ័យ');
    setLoading(false);
   }
  } catch (error) {
   message.error(error.message);
   setLoading(false);
  }
 };

 console.log(createShare);

 const onChangeShare = (e) => {
  setShareCreate({ ...shareCreate, [e.target.name]: e.target.value });
 };

 return (
  <Modal
   title="បង្កើតដី Sharing"
   visible={open}
   onOk={() => {
    setOpen(false);
    setCreateShare({});
   }}
   onCancel={() => {
    setOpen(false);
    setCreateShare({});
   }}
   footer={null}
  >
   {loading ? (
    <div className="p-5 text-center fw-bold">
     <Loader />
    </div>
   ) : createShare && !createShare.id ? (
    <form onSubmit={(e) => shareHandler(e, shareCreate)}>
     <Row>
      <input type="text" readOnly className="form-control mb-2" value={land} />
      <Col xs={24} md={{ span: 11 }}>
       <input
        type="text"
        value={shareCreate.customer}
        onChange={onChangeShare}
        name="customer"
        className="form-control"
        placeholder="អតិថិជន"
        required
       />
      </Col>

      <Col xs={24} md={{ span: 11, offset: 2 }}>
       <input
        type="number"
        min="1"
        className="form-control"
        placeholder="រយៈពេល(ថ្ងៃ)"
        required
        value={shareCreate.duration}
        onChange={onChangeShare}
        name="duration"
       />
      </Col>

      <Col xs={24} md={{ span: 11 }}>
       <select
        className="form-select mt-2"
        value={shareCreate.type}
        name="type"
        onChange={onChangeShare}
        required
       >
        <option value="Public">Public</option>
        <option value="Private">Private</option>
       </select>
      </Col>

      {shareCreate.type === 'Private' && (
       <Col xs={24} md={{ span: 11, offset: 2 }}>
        <input
         type="password"
         className="form-control mt-2"
         placeholder="ពាក្យសម្ងាត់"
         value={shareCreate.pass}
         required
         name="pass"
         onChange={onChangeShare}
         required
        />
       </Col>
      )}

      <Col xs={24}>
       <button
        type="submit"
        className="btn btn_color mt-2"
        style={{ width: '100%' }}
       >
        បញ្ចូលទិន្នន័យ
       </button>
      </Col>
     </Row>
    </form>
   ) : (
    <>
     <h6 className="text-center fw-bold">ទិន្នន័យដែលបាន Share</h6>
     <p>ក្បាល់ដី៖ {createShare?.landID}</p>
     <p>រយៈពេល៖ {createShare?.duration}ថ្ងៃ</p>
     <p>អតិថិជន៖ {createShare?.customer}</p>
     <p>
      ស្ថានភាព៖{' '}
      {createShare?.expireAt < new Date().getTime() ? 'expired' : 'Sharing'}
     </p>
     <p>
      ថ្ងៃអស់សុពលភាព៖{' '}
      {dateFormat(createShare?.expireAt, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}
     </p>
     <p>សម្រាប់អ្នកប្រើប្រាស់៖ {createShare?.type}</p>
     {createShare?.pass && <p>លេខសម្ងាត់៖ {createShare?.pass}</p>}
     <p className="text-center fw-bold">តំណភ្ជាប់​-Link</p>
     <p className="text-center">{`${DOMAIN_NAME}/shareland/${createShare?.id}/view`}</p>
     <div className="text-center">
      <span
       className="p-2 rounded btn_color"
       style={{ cursor: 'pointer' }}
       onClick={() => {
        copy(`${DOMAIN_NAME}/shareland/${createShare?.id}/view`);
        message.success('Link Copied!');
       }}
      >
       <BsClipboardData style={{ fontSize: 30 }} />
       <span>Copy</span>
      </span>
     </div>
    </>
   )}
  </Modal>
 );
}
