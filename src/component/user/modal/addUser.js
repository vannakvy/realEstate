import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserType, signUp } from '../../../actions/authAction';
import profile from '../../../asset/profile.png';
import Message from '../../Message';
import { storageRef } from '../../../firebase/db';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import Progress from '../../Progress';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function AddUser({ open, setOpen, fromUser = false }) {
 const [image, setImage] = useState({ url: '', name: '' });
 const [progress, setProgress] = useState(0);
 const dispatch = useDispatch();
 let [form] = Form.useForm();

 const { success, loading, error } = useSelector((state) => state.userRegister);
 const { userTypes } = useSelector((state) => state.userTypes);

 useEffect(() => {
  if (success) {
   setOpen(false);
   form.resetFields();
  }
 }, [success]);
 useEffect(() => {
  dispatch(getUserType());
 }, [dispatch]);

 const onFinish = (values) => {
  dispatch(signUp({ ...values, imgUrl: image }));
  // form.resetFields();
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
   title={fromUser ? 'បញ្ចូលម្ចាស់ដីថ្មី' : 'បញ្ចូលអ្នកប្រើប្រាស់ថ្មី'}
   visible={open}
   onOk={() => setOpen(false)}
   onCancel={() => setOpen(false)}
   footer={null}
  >
   <Form
    form={form}
    name="addUser"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    fields={
     fromUser
      ? [
         {
          name: ['role'],
          value: 'LANDOWNER',
         },
        ]
      : []
    }
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
      <h6 className="text-center fw-bold">ទិន្នន័យផ្ទាល់ខ្លួន</h6>
      {error && (
       <Message variant="danger">
        <p className="text-center fw-bold p-0 m-0">{error}</p>
       </Message>
      )}
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="name"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input prefix={<UserOutlined />} placeholder="ឈ្មោះពេញ" />
      </Form.Item>
     </Col>
     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="nameID"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="លេខអត្តសញ្ញាប័ត្រ" />
      </Form.Item>
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="gender"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="ភេទ" />
      </Form.Item>
     </Col>
     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="age"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="អាយុ" />
      </Form.Item>
     </Col>
     <Col xs={24}>
      <h6 className="text-center fw-bold">អាស័យដ្ឋាន</h6>
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="vil"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="ភូមិ" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="com"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="ឃុំ/សង្កាត់" style={{ width: '100%' }} />
      </Form.Item>
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="dis"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="ស្រុក/ខណ្ឌ" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="pro"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="ខេត្ដ/ក្រុង" style={{ width: '100%' }} />
      </Form.Item>
     </Col>
     <Col xs={24}>
      <h6 className="text-center fw-bold">ទំនាក់ទំនង</h6>
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item name="email">
       <Input placeholder="អ៊ីម៉ែល" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item name="phone">
       <Input placeholder="លេខទូរស័ព្ទ" style={{ width: '100%' }} />
      </Form.Item>
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item name="facebook">
       <Input placeholder="គណនីហ្វេសបុក" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item name="telegram">
       <Input placeholder="តេលេក្រាម" style={{ width: '100%' }} />
      </Form.Item>
     </Col>

     <Col xs={24}>
      <h6 className="text-center fw-bold">ការកំណត់</h6>
     </Col>

     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="role"
       hidden={fromUser}
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Select
        placeholder="តួនាទី"
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

     <Col
      xs={24}
      md={{ span: fromUser ? 24 : 11, offset: fromUser ? null : 1 }}
     >
      <Form.Item
       name="password"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input.Password placeholder="លេខកូដសម្ងាត់" style={{ width: '100%' }} />
      </Form.Item>
     </Col>
     <Col xs={24}>
      <Button
       loading={loading}
       htmlType="submit"
       type="primary"
       style={{ width: '100%' }}
      >
       បញ្ចូលទិន្នន័យ
      </Button>
     </Col>
    </Row>
   </Form>
  </Modal>
 );
}
