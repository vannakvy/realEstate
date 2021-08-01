import React, { useContext,useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { updateLandOwner } from '../../../actions/authAction';

export default function EditOwner({ open, setOpen, data }) {
 const dispatch = useDispatch();

 let [form] = Form.useForm();

  useEffect(() => {
      if(data){
          form.setFieldsValue(data)
      }
  }, [data])

  console.log(data)

 const onFinish = (values) => {
    // console.log({...data,name: values.name,phone: values.phone})
    dispatch(updateLandOwner({...data,name:values.name, phone:values.phone}));
    // message.success('កែប្រែទិន្នន័យជោគជ័យ');

    form.resetFields();
    setOpen(false);
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 };

 return (
  <Modal
   title="កែប្រែម្ចាស់ដី"
   visible={open}
   onOk={() => setOpen(false)}
   onCancel={() => setOpen(false)}
   footer={null}
  >
   <Form
    form={form}
    name="editOwner"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
   >
    <Row>
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

     <Col xs={24}>
      <Button
       htmlType="submit"
       type="primary"
       style={{ width: '100%' }}
       // onClick={()=> }
      >
       កែប្រែទិន្នន័យ
      </Button>
     </Col>
    </Row>
   </Form>
  </Modal>
 );
}
