import React, { useContext } from 'react';
import { Modal, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../actions/authAction';
import { useSelector } from 'react-redux';
import db, { auth } from '../../../firebase/db';
const { Option } = Select;

export default function AddOwnerLand({
 open,
 setOpen,
 setOwnerId,
 setOwnerData,
}) {
 const dispatch = useDispatch();
 const { userInformation } = useSelector((state) => state.userLogin);
 const { userRegister } = useSelector((state) => state.userRegister);

 let [form] = Form.useForm();

 const onFinish = (values) => {
  auth
   .createUserWithEmailAndPassword(values.email, values.password)
   .then(async (res) => {
    await db
     .collection('account')
     .doc(res.user.uid)
     .set({
      name: values.name,
      createAt: new Date().getTime(),
      imgUrl: '',
      uid: res.user.uid,
      role: values.role,
      createdBy: userInformation.uid || '',
      email: res.user.email,
      phone: values.phone,
     });
    // setOwnerId("set")
    setOwnerData({ id: res.user.uid, name: values.name });
   });

  message.success('បញ្ចូលទិន្នន័យជោគជ័យ');

  console.log('', userRegister);

  form.resetFields();
  setOpen(false);
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 };

 return (
  <Modal
   title="បញ្ចូលម្ចាស់ដីថ្មី"
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
   >
    <Row>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="email"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="អ៊ីម៉ែល" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="password"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="លេខកូដសម្ងាត់" style={{ width: '100%' }} />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="name"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="ឈ្មោះ" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="phone"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="លេខទូរស័ព្ទ" style={{ width: '100%' }} />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="role"
       initialValue="LANDOWNER"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       {/* <Input placeholder="តួនាទី" /> */}
       <Select disabled placeholder="តួនាទី" style={{ width: '100%' }}>
        {/* <Option value="STAFF">STAFF</Option> */}
        <Option value="LANDOWNER">LANDOWNER</Option>
        {/* <Option value="CUSTOMER">CUSTOMER</Option> */}
        {/* <Option value="ADMIN">ADMIN</Option> */}
       </Select>
      </Form.Item>
     </Col>

     <Col xs={24}>
      <Button
       htmlType="submit"
       type="primary"
       style={{ width: '100%' }}
       // onClick={()=> }
      >
       បញ្ចូលទិន្នន័យ
      </Button>
     </Col>
    </Row>
   </Form>
  </Modal>
 );
}
