import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, Col, Button, Select, message, DatePicker,List, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../../actions/authAction';
import profile from '../../../asset/profile.png';
import Message from '../../Message';
import { storageRef } from '../../../firebase/db';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import Progress from '../../Progress';
import { UserOutlined,DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import TotipCom from '../../TotipCom';

const { Option } = Select;

export default function AddUserType({ open, setOpen, fromUser = false }) {
 const [image, setImage] = useState({ url: '', name: '' });
 const [progress, setProgress] = useState(0);
 const dispatch = useDispatch();
 let [form] = Form.useForm();

 const { success, loading, error } = useSelector((state) => state.userRegister);

 useEffect(() => {
  if (success) {
   setOpen(false);
   form.resetFields();
  }
 }, [success]);

 const onFinish = (values) => {
//   dispatch(signUp({ ...values, imgUrl: image }));
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

 const data = [
    'ទំព័រដើម',
    'តារាងដី',
    'តារាងអ្នកប្រើប្រាស់',
  
  ];

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
    fields={
        [
            {
                name:"createdAt",
                value:moment()
            }
        ]
    }
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
      <Form.Item
       name="createdAt"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <DatePicker placeholder="បង្កើតថ្ងៃទី" style={{width:"100%"}} />
      </Form.Item>
     </Col>
     
     <Col xs={24} md={{ span: 11 }}>
      <Form.Item
       name="page"
       rules={[{ required: true, message: 'Field is required!' }]}
      >
       <Select
        placeholder="ផេក"
        style={{ width: '100%' }}
        disabled={fromUser}
       >
            <Option value="/">ទំព័រដើម</Option>
            <Option value="/land">តារាងដី</Option>
            <Option value="/shareland">តារាងដី Sharing</Option>
            <Option value="/action">សកម្មភាព</Option>
            <Option value="/owner">ម្ចាស់ដី</Option>
            <Option value="/reportdaily">របាយការណ៍</Option>
            <Option value="/usertype">តារាងប្រភេទអ្នកប្រើប្រាស់</Option>
            <Option value="/user">តារាងអ្នកប្រើប្រាស់</Option>
       </Select>
      </Form.Item>
     </Col>

     <Col xs={24} md={{ span: 11, offset: 2 }}>
      {/* <Form.Item
       name="com"
       rules={[{ required: true, message: 'Field is required!' }]}
      > */}
        <List
            size="small"
            header={null}
            footer={null}
            dataSource={data}
            renderItem={item => <List.Item><span>- {item}</span>
                <Popconfirm
                    title="តើអ្នកពិតចង់លុបមែនឬទេ?"
                    onConfirm={() => {
                    console.log("Delete")
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
            </List.Item>}
        />
      {/* </Form.Item> */}
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
