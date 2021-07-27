import React, { useContext } from 'react';
import { Modal, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { setEditUser } from '../../../function/set';
import { useDispatch, useSelector } from 'react-redux';
import {
 getUserAccount,
 login,
 signout,
 updateUserAccount,
} from '../../../actions/authAction';

const { Option } = Select;

export default function EditUser({ open, setOpen, data }) {
 const dispatch = useDispatch();
 let [form] = Form.useForm();

 const onFinish = (values) => {
  console.log(values);

  dispatch(updateUserAccount({ ...values, uid: data.uid }));

  setOpen(false);
  form.resetFields();
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 };

 return (
  <Modal
   title="កែប្រេអ្នកប្រើប្រាស់"
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
      name: ['phone'],
      value: data.phone,
     },
     {
      name: ['admin'],
      value: data.admin,
     },
     {
      name: ['email'],
      value: data.email,
     },
    ]}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
   >
    <Row>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="email"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input disabled placeholder="អ៊ីម៉ែល" />
      </Form.Item>
     </Col>

     {/* <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="password"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="លេខកូដសម្ងាត់" style={{ width: '100%' }} />
      </Form.Item>
     </Col> */}

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="name"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="ឈ្មោះ" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="phone"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="លេខទូរស័ព្ទ" style={{ width: '100%' }} />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="admin"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       {/* <Input placeholder="តួនាទី" /> */}
       <Select placeholder="តួនាទី" style={{ width: '100%' }}>
        <Option value={false}>USER</Option>
        <Option value={true}>ADMIN</Option>
       </Select>
      </Form.Item>
     </Col>

     <Col xs={24}>
      <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
       កែប្រែទិន្នន័យ
      </Button>
     </Col>
    </Row>
   </Form>
  </Modal>
 );
}
