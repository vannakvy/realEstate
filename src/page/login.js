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
  console.log(e.target.email.value, e.target.password.value);
  dispatch(login(e.target.email.value, e.target.password.value));
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
      <h6 className="fw-bold">{error}</h6>
     </Message>
    )}
    <form onSubmit={submitLogin}>
     <div className="mb-3">
      <input
       type="email"
       name="email"
       className="form-control"
       placeholder="អ៊ីម៉ែលអ្នកប្រើប្រាស់"
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
     <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
      <label className="form-check-label" for="exampleCheck1">
       ចងចាំខ្ញុំ
      </label>
     </div>
     <button
      type="submit"
      className="btn btn_color w-100 text-light fs-6 fw-bold"
     >
      {loading ? <Loader /> : 'ចូល'}
     </button>
    </form>
    <p className="text-primary text-center my-2">ភ្លេចពាក្យសម្ងាត់?</p>
    <p className="text-primary text-center">
     <span className="text-dark">មិនទាន់មានគណនី?</span>ចុះឈ្មោះ
    </p>
   </div>
   {/* <Row>
    <Col
     xs={{ span: 24 }}
     md={{ span: 16, offset: 4 }}
     lg={{ span: 12, offset: 6 }}
     xl={{ span: 6, offset: 10 }}
    >
     <div className="login-form">
      <div className="login-logo">
       <Image width={'100%'} src={Logo} preview={false} />
      </div>
      <h2 style={{ color: '#707070' }}>ការចូលគណនី</h2>
      <div className="line-shape"></div>
      <Form
       autoComplete="off"
       name="basic"
       // style={{margin:'20%'}}
       onFinish={onFinish}
       onFinishFailed={onFinishFailed}
      >
       <Form.Item
        // label="Username"
        name="email"
        rules={[
         {
          required: true,
          message: 'ត្រូវបំពេញប្រអប់ខាងលើ!',
         },
        ]}
       >
        <Input
         type="email"
         placeholder="ឈ្មោះសម្គាល់"
         className="login-input"
        />
       </Form.Item>

       <Form.Item
        // label="Password"
        name="password"
        rules={[
         {
          required: true,
          message: 'ត្រូវបំពេញប្រអប់ខាងលើ!',
         },
        ]}
       >
        <Input
         type="password"
         placeholder="លេខសម្ងាត់"
         className="login-input"
        />
       </Form.Item>

       <Form.Item>
        <Button
         type="primary"
         htmlType="submit"
         style={{ width: '100%', height: 'auto', fontSize: 20 }}
        >
         ចូល
        </Button>
       </Form.Item>
      </Form>
     </div>
    </Col>
   </Row> */}
  </>
 );
}
