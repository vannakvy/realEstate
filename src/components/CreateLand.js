import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
import { Modal, Form, Col, Row, Button, Select, message, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createLand } from '../actions/landActions';
import { getAllLandOwner, getUserAccount } from '../actions/authAction';
import AddOwnerLand from '../component/land/modal/addOwnerLand';
import { ListSelect } from '../static/own-comp';

const { Option } = Select;
function getModalStyle() {
 const top = 30;
 const left = 40;

 return {
  top: `${top}%`,
  left: `${left}%`,
  transform: `translate(-${top}%, -${left}%)`,
 };
}

const useStyles = makeStyles((theme) => ({
 paper: {
  position: 'absolute',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 4, 3),
  borderRadius: '5px',
 },
}));

export default function SimpleModal({ open, setOpen, latLng }) {
 //  const { onCreateL, setOnCreateL } = props;
 const classes = useStyles();
 // getModalStyle is not a pure function, we roll the style only on the first render
 const [modalStyle] = React.useState(getModalStyle);
 let [form] = Form.useForm();

 const [openAddOwner, setOpenAddOwner] = useState(false);
 const [ownerId, setOwnerId] = useState('');
 const [ownerData, setOwnerData] = useState({});

 const dispatch = useDispatch();

 //  const { landOwnerList } = useSelector((state) => state.landOwnerList);
 const { userAccounts, loading: userListLoading } = useSelector(
  (state) => state.userAccountList
 );
 useEffect(() => {
  dispatch(getUserAccount());
 }, [dispatch]);

 const onFinish = (values) => {
  dispatch(createLand({ ...values, coordinates: latLng }));
  setOpen(false);
  form.resetFields();
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 };

 const body = (
  <div style={modalStyle} className={classes.paper}>
   <h4 className="text-center kh">បង្កើតទីតាំងដី</h4>
   <form>
    <div className="mb-3">
     <label className="form-label">ឈ្មោះម្ចាស់ដី</label>
     <input type="text" className="form-control" />
    </div>
    <div className="mb-3">
     <label className="form-label">ទូរស័ព្ទ</label>
     <input type="text" className="form-control" />
    </div>
    <div className="mb-3">
     <label className="form-label">ទីតាំងដី</label>
     <select className="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
     </select>
    </div>
    <div className="mb-3">
     <label className="form-label">ក្បាល់ដី</label>
     <input type="text" className="form-control" />
    </div>
    <button type="submit" className="btn btn-success kh">
     បង្កើត
    </button>
   </form>
  </div>
 );

 const setLandOwnerFn = (e) => {
  //   console.log(e, 'id');
  if (e === 'new') {
   setOpenAddOwner(true);
  }
  form.setFieldsValue({
   ownerId: e,
  });
  // setOwnerId(e)
 };

 const callbackOwner = (e) => {
  if (e === '') {
   setOwnerId(e);
   form.setFieldsValue({
    ownerId: null,
   });
  } else {
   setOwnerData(e);
   form.setFieldsValue({
    ownerId: e.id,
   });
  }
 };

 return (
  <div>
   <AddOwnerLand
    open={openAddOwner}
    setOpen={setOpenAddOwner}
    setOwnerId={setOwnerId}
    setOwnerData={callbackOwner}
   />
   {/* <button type="button" onClick={handleOpen}>
    Open Modal
   </button> */}
   <Modal
    title="បញ្ចូលដី"
    visible={open}
    onOk={() => setOpen(false)}
    onCancel={() => setOpen(false)}
    footer={null}
   >
    <Form
     form={form}
     name="addLand"
     onFinish={onFinish}
     onFinishFailed={onFinishFailed}
    >
     <Row>
      <Col xs={24} md={{ span: 11 }}>
       <Form.Item
        name="idLand"
        rules={[{ required: true, message: 'Field is required!' }]}
       >
        <Input placeholder="ក្បាលដី" style={{ width: '100%' }} />
       </Form.Item>
      </Col>

      <Col xs={24} md={{ span: 11, offset: 2 }}>
       <Form.Item
        name="landType"
        rules={[{ required: true, message: 'Field is required!' }]}
       >
        <Select placeholder="ស្ថានភាព" style={{ width: '100%' }}>
         <Option value="ដាក់លក់">ដាក់លក់</Option>
         <Option value="មិនដាក់លក់">មិនដាក់លក់</Option>
        </Select>
       </Form.Item>
      </Col>

      <Col xs={24} md={{ span: 11 }}>
       <Form.Item
        name="size"
        rules={[{ required: true, message: 'Field is required!' }]}
       >
        <Input placeholder="ទំហំដី" style={{ width: '100%' }} />
       </Form.Item>
      </Col>
      {ownerId !== 'new' ? (
       <Col xs={24} md={{ span: 11, offset: 2 }}>
        <Form.Item
         name="ownerId"
         rules={[{ required: true, message: 'Field is required!' }]}
        >
         <ListSelect
          title="ម្ចាស់ដី"
          type={1}
          data={userAccounts}
          setValue={setLandOwnerFn}
         />
        </Form.Item>
       </Col>
      ) : (
       <Col xs={24} md={{ span: 11, offset: 2 }}>
        <Form.Item name="ownerId">
         <Input
          disabled={true}
          style={{ backgroundColor: 'white', color: 'black' }}
         />
        </Form.Item>
       </Col>
      )}

      <Col xs={24} md={{ span: 11, offset: 0 }}>
       <Form.Item
        name="vil"
        rules={[{ required: true, message: 'Field is required!' }]}
       >
        <Input placeholder="ភូមិ" style={{ width: '100%' }} />
       </Form.Item>
      </Col>

      <Col xs={24} md={{ span: 11, offset: 2 }}>
       <Form.Item
        name="com"
        rules={[{ required: true, message: 'Field is required!' }]}
       >
        <Input placeholder="ឃុំ" style={{ width: '100%' }} />
       </Form.Item>
      </Col>

      <Col xs={24} md={{ span: 11 }}>
       <Form.Item
        name="dis"
        rules={[{ required: true, message: 'Field is required!' }]}
       >
        <Input placeholder="ស្រុក" style={{ width: '100%' }} />
       </Form.Item>
      </Col>

      <Col xs={24} md={{ span: 11, offset: 2 }}>
       <Form.Item
        name="pro"
        rules={[{ required: true, message: 'Field is required!' }]}
       >
        <Input placeholder="ខេត្ត" style={{ width: '100%' }} />
       </Form.Item>
      </Col>

      {/* <Col xs={24} md={{ span: 11, offset:2 }}>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Field is required!' }]}
                            >
                                <Input placeholder="ទីតាំងដី" />
                            </Form.Item>
                        </Col> */}

      <Col xs={24} md={{ span: 24 }}>
       <Form.Item
        name="detail"
        // rules={[{ required: true, message: 'Field is required!' }]}
       >
        <Input placeholder="ផ្សេងៗ" style={{ width: '100%' }} />
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
  </div>
 );
}
