import React from 'react';
import { Modal, Form, Input, Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';

import { createShareLand } from '../../../actions/SharingActions';

export default function AddSharingFromLand({ open, setOpen, land }) {
 const dispatch = useDispatch();

 let [form] = Form.useForm();

 const onFinish = (values) => {
  // console.log({ ...values, landID: land });
  dispatch(createShareLand({ ...values, landID: land }));

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
    name="addSharing"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
   >
    <Row>
     <input type="text" readOnly className="form-control mb-2" value={land} />
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="customer"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="អិតិថិជន" style={{ width: '100%' }} />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item
       name="duration"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input
        type="number"
        min={1}
        placeholder="duration"
        style={{ width: '100%' }}
       />
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
