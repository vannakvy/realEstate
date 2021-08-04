import React, { useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../../actions/authAction';
import { getLandList } from '../../../actions/landActions';
import { ListSelect } from '../../../static/own-comp';
import { createShareLand } from '../../../actions/SharingActions';

const { Option } = Select;

export default function AddSharing({ open, setOpen }) {
 const dispatch = useDispatch();

 let [form] = Form.useForm();

 const { landList } = useSelector((state) => state.landList);
 useEffect(() => {
  dispatch(getLandList());
 }, [dispatch]);

 console.log(landList);

 const onFinish = (values) => {
  console.log(values);
  dispatch(createShareLand(values));

  form.resetFields();
  setOpen(false);
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 };

 const setLandFn = (e) => {
  //   console.log(e);
  form.setFieldsValue({
   landID: e,
  });
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
     <Col xs={24} md={{ span: 24 }}>
      <Form.Item
       name="landID"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <ListSelect title="ដី" type={2} data={landList} setValue={setLandFn} />
      </Form.Item>
     </Col>

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
