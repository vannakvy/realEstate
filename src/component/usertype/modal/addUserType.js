import React, { useEffect, useState } from 'react';
import {
 Modal,
 Form,
 Input,
 Row,
 Col,
 Button,
 Select,
 message,
 DatePicker,
 List,
 Popconfirm,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createUserType, signUp } from '../../../actions/authAction';
import profile from '../../../asset/profile.png';
import Message from '../../Message';
import { storageRef } from '../../../firebase/db';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import Progress from '../../Progress';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import TotipCom from '../../TotipCom';

const { Option } = Select;

export default function AddUserType({ open, setOpen, fromUser = false }) {
 const [image, setImage] = useState({ url: '', name: '' });
 const [progress, setProgress] = useState(0);
 const dispatch = useDispatch();
 const [pages, setPages] = useState([]);

 let [form] = Form.useForm();

 const { success, loading, error } = useSelector(
  (state) => state.createUserType
 );

 useEffect(() => {
  if (success) {
   setOpen(false);
   form.resetFields();
   setPages([]);
  }
 }, [success]);

 const onFinish = (values) => {
  console.log(values);
  dispatch(createUserType({ name: values.type, pages: pages }));
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 };

 const addPages = (pages) => {
  let paggg = [];

  pages.forEach((p) => {
   paggg.push(p);
  });

  if (form.getFieldValue('page')) {
   const g = pages.find((p) => {
    return p === form.getFieldValue('page');
   });

   if (g) {
    console.log('gg');
   } else {
    paggg.push(form.getFieldValue('page'));
    setPages(paggg);
   }
  }
 };

 const removePage = (pages, item) => {
  let paggg = [];

  pages.forEach((p) => {
   paggg.push(p);
  });

  const gg = paggg.filter((p) => {
   return p != item;
  });

  console.log(gg);
  setPages(gg);
 };

 return (
  <Modal
   title="បញ្ចូលប្រភេទអ្នកប្រើប្រាស់ថ្មី"
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
    fields={[
     {
      name: 'createdAt',
      value: moment(),
     },
    ]}
   >
    <Row>
     <Col xs={24}>
      {/* <h6 className="text-center fw-bold">ទិន្នន័យផ្ទាល់ខ្លួន</h6> */}
      {error && (
       <Message variant="danger">
        <p className="text-center fw-bold p-0 m-0">{error}</p>
       </Message>
      )}
     </Col>
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="type"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Input placeholder="ប្រភេទ" />
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Form.Item name="page">
       <Select placeholder="ផេក" style={{ width: '100%' }} disabled={fromUser}>
        <Option value="ទំព័រដើម">ទំព័រដើម</Option>
        <Option value="តារាងដី">តារាងដី</Option>
        <Option value="តារាងដី Sharing">តារាងដី Sharing</Option>
        <Option value="សកម្មភាព">សកម្មភាព</Option>
        <Option value="ម្ចាស់ដី">ម្ចាស់ដី</Option>
        <Option value="របាយការណ៍">របាយការណ៍</Option>
        <Option value="តារាងប្រភេទអ្នកប្រើប្រាស់">
         តារាងប្រភេទអ្នកប្រើប្រាស់
        </Option>
        <Option value="តារាងអ្នកប្រើប្រាស់">តារាងអ្នកប្រើប្រាស់</Option>
       </Select>
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11 }}>
      {/* <Form.Item
       name="com"
       rules={[{ required: true, message: 'Field is required!' }]}
      > */}
      <List
       size="small"
       header={null}
       footer={null}
       dataSource={pages}
       renderItem={(item) => (
        <List.Item>
         <span>{item}</span>
         <Popconfirm
          title="តើអ្នកពិតចង់លុបមែនឬទេ?"
          onConfirm={() => {
           removePage(pages, item);
          }}
          okText="ចង់"
          cancelText="មិនចង់"
         >
          <span className="link" style={{ color: 'red' }}>
           <TotipCom title="delete">
            <DeleteOutlined />
           </TotipCom>
          </span>
         </Popconfirm>
        </List.Item>
       )}
      />
      {/* </Form.Item> */}
     </Col>
     <Col xs={24} md={{ span: 11, offset: 2 }}>
      <Button
       type="primary"
       htmlType="button"
       style={{ width: '100%' }}
       onClick={() => addPages(pages)}
      >
       បញ្ចូលផេក
      </Button>
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
