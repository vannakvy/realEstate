import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Image } from 'antd';
import { Redirect, useHistory } from 'react-router-dom';
import Logo from '../asset/logoo.png';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authAction';
import Loader from '../component/Loader';
import Message from '../component/Message';

export default function Login() {
 const history = useHistory();
 const dispatch = useDispatch();
 const { userInformation, loading, error } = useSelector(
  (state) => state.userLogin
 );

 const onFinish = (values) => {
  dispatch(login(values.email, values.password));
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 };

 const submitLogin = (e) => {
  e.preventDefault();
  dispatch(login(e.target.name.value, e.target.password.value));
 };

 useEffect(() => {
  if (userInformation) {
   history.push('/');
  }
 }, [userInformation]);

 return (
  <>
   <img
    className="mt-5"
    src={Logo}
    style={{ width: 150, margin: '0 auto' }}
    alt=""
   />
   <div className="bg-light mx-auto p-4 round" style={{ width: 400 }}>
    <h6 className="text-center fw-bold mt-4 mb-4">ចូលទៅកាន់គណនីរបស់អ្នក</h6>
    {error && (
     <Message variant="danger">
      <p className="fw-bold text-center m-0 p-0">{error}</p>
     </Message>
    )}
    <form onSubmit={submitLogin}>
     <div className="mb-3">
      <input
       type="text"
       name="name"
       className="form-control"
       placeholder="ឈ្មោះអ្នកប្រើប្រាស់"
       required
      />
     </div>
     <div className="mb-3">
      <input
       type="password"
       name="password"
       className="form-control"
       placeholder="ពាក្យសម្ងាត់"
       required
      />
     </div>
     {/* <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" />
      <label className="form-check-label">ចងចាំខ្ញុំ</label>
     </div> */}
     <button type="submit" className="btn btn_color w-100 fw-bold my-3">
      <p className="m-0 p-0">{loading ? <Loader /> : 'ចូល'}</p>
     </button>
    </form>
   </div>
  </>
 );
}
