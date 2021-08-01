import React, { useContext } from 'react';
import { Modal, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../actions/authAction';
const { Option } = Select;

export default function AddUser({ open, setOpen }) {
 const dispatch = useDispatch();

 let [form] = Form.useForm();

 const onFinish = (values) => {
  dispatch(signUp(values));
  message.success('បញ្ចូលទិន្នន័យជោគជ័យ');

  form.resetFields();
  setOpen(false);
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 };

 return (
  <Modal
   title="បញ្ចូលអ្នកប្រើប្រាស់ថ្មី"
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
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       {/* <Input placeholder="តួនាទី" /> */}
       <Select placeholder="តួនាទី" style={{ width: '100%' }}>
        <Option value="STAFF">STAFF</Option>
        <Option value="LANDOWNER">LANDOWNER</Option>
        <Option value="CUSTOMER">CUSTOMER</Option>
        <Option value="ADMIN">ADMIN</Option>
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
