import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { setEditUser } from '../../../function/set';
import { useDispatch, useSelector } from 'react-redux';
import {
 getUserAccount,
 getUserType,
 login,
 signout,
 updateUserAccount,
} from '../../../actions/authAction';
import profile from '../../../asset/profile.png';
import Message from '../../Message';
import { storageRef } from '../../../firebase/db';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import Progress from '../../Progress';

const { Option } = Select;

export default function EditUser({ open, setOpen, data, fromUser = false }) {
 const [image, setImage] = useState({
  url: '',
  name: '',
 });
 const [progress, setProgress] = useState(0);
 const dispatch = useDispatch();
 let [form] = Form.useForm();

 const { success, loading, error } = useSelector(
  (state) => state.userAccountUpdate
 );
 const { userTypes } = useSelector((state) => state.userTypes);

 useEffect(() => {
  setProgress(0);
  if (data && data.imgUrl) {
   setImage({
    url: data.imgUrl.url || '',
    name: data.imgUrl.name || '',
   });
  }
  dispatch(getUserType());
 }, [data, dispatch]);

 useEffect(() => {
  if (success) {
   form.resetFields();
   setOpen(false);
  }
 }, [success]);

 const onFinish = (values) => {
  console.log(values);
  dispatch(updateUserAccount({ ...values, imgUrl: image }));
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 };

 async function uploadImg(e) {
  e.preventDefault();
  const date = new Date().getTime();
  const file = e.target.files[0];
  const uploadTask = storageRef.child(`profile/${date}-${file.name}`).put(file);
  uploadTask.on(
   'state_changed',
   (snapshot) => {
    // progrss function ....
    const progress = Math.round(
     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    setProgress(progress);
   },
   (error) => {
    // error function ....
    console.log(error);
   },
   () => {
    // complete function ....
    storageRef
     .child(`profile/${date}-${file.name}`)
     .getDownloadURL()
     .then((url) => {
      setImage({ url: url, name: `${date}-${file.name}` });
     });
   }
  );
 }

 return (
  <Modal
   title={fromUser ? '??????????????????????????????????????????' : '????????????????????????????????????????????????????????????'}
   visible={open}
   onOk={() => setOpen(false)}
   onCancel={() => setOpen(false)}
   footer={null}
  >
   <Form
    form={form}
    name="editUser"
    fields={[
     {
      name: ['name'],
      value: data.name,
     },
     {
      name: ['nameID'],
      value: data.nameID,
     },
     {
      name: ['gender'],
      value: data.gender,
     },
     {
      name: ['age'],
      value: data.age,
     },
     {
      name: ['vil'],
      value: data.vil,
     },
     {
      name: ['com'],
      value: data.com,
     },
     {
      name: ['dis'],
      value: data.dis,
     },
     {
      name: ['pro'],
      value: data.pro,
     },
     {
      name: ['email'],
      value: data.email,
     },
     {
      name: ['phone'],
      value: data.phone,
     },
     {
      name: ['facebook'],
      value: data.facebook,
     },
     {
      name: ['telegram'],
      value: data.telegram,
     },
     {
      name: ['role'],
      value: data.role,
     },
    ]}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
   >
    <Row>
     <Col xs={24}>
      <div className="w-100 text-center">
       <img
        className="rounded-circle"
        src={image?.url || profile}
        alt=""
        style={{
         marginBottom: '10px',
         width: '100px',
         height: '100px',
         objectFit: 'cover',
        }}
       />
       {image?.url && (
        <RiDeleteBack2Fill
         onClick={() => setImage({ url: '', name: '' })}
         className="position-absolute"
         color="red"
         style={{ fontSize: 20, cursor: 'pointer' }}
        />
       )}
       <div className="text-center w-100">
        <input
         type="file"
         onChange={uploadImg}
         className="mx-auto mb-2"
         style={{ maxWidth: 90 }}
        />
       </div>
       <div>{progress !== 0 && <Progress progress={progress} />}</div>
      </div>
     </Col>
     <Col xs={24}>
      <h6 className="text-center fw-bold">?????????????????????????????????????????????????????????</h6>
      {error && (
       <Message variant="danger">
        <p className="text-center fw-bold p-0 m-0">{error}</p>
       </Message>
      )}
     </Col>
     <Col md={{ span: 11 }}>
      <Form.Item
       name="name"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input disabled placeholder="????????????????????????" />
      </Form.Item>
     </Col>
     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="nameID"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="???????????????????????????????????????????????????" />
      </Form.Item>
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="gender"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="?????????" />
      </Form.Item>
     </Col>
     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="age"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="????????????" />
      </Form.Item>
     </Col>
     <Col xs={24}>
      <h6 className="text-center fw-bold">??????????????????????????????</h6>
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="vil"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="????????????" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="com"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="?????????/?????????????????????" style={{ width: '100%' }} />
      </Form.Item>
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="dis"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="???????????????/????????????" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="pro"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="???????????????/???????????????" style={{ width: '100%' }} />
      </Form.Item>
     </Col>
     <Col xs={24}>
      <h6 className="text-center fw-bold">??????????????????????????????</h6>
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item name="email">
       <Input placeholder="?????????????????????" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item name="phone">
       <Input placeholder="?????????????????????????????????" style={{ width: '100%' }} />
      </Form.Item>
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item name="facebook">
       <Input placeholder="????????????????????????????????????" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item name="telegram">
       <Input placeholder="???????????????????????????" style={{ width: '100%' }} />
      </Form.Item>
     </Col>

     <Col xs={24}>
      <h6 className="text-center fw-bold">????????????????????????</h6>
     </Col>

     <Col xs={24}>
      <Form.Item
       hidden={fromUser}
       name="role"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Select
        placeholder="??????????????????"
        style={{ width: '100%' }}
        disabled={fromUser}
       >
        {userTypes &&
         userTypes.map((userT) => (
          <Option key={userT.id} value={userT.name}>
           {userT.name}
          </Option>
         ))}
       </Select>
      </Form.Item>
     </Col>

     <Col xs={24}>
      <Form.Item
       name="password"
       className="text-center"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input.Password
        placeholder="???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
        style={{ width: '100%' }}
       />
      </Form.Item>
     </Col>
     <Col xs={24}>
      <Button
       loading={loading}
       htmlType="submit"
       type="primary"
       style={{ width: '100%' }}
      >
       ???????????????????????????????????????
      </Button>
     </Col>
    </Row>
   </Form>
  </Modal>
 );
}
