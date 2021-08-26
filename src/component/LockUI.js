import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Logo from '../asset/logoo.png';
import {
 Modal as ModalAnt,
 Form,
 Input,
 Row,
 Col,
 Button,
 Select,
 message,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import { lockAccount, signout } from '../actions/authAction';
import { LOCK_SUC } from '../constants/auth';

const useStyles = makeStyles((theme) => ({
 modal: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgb(237,237,237)',
 },
 paper: {
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  borderRadius: '10px',
  textAlign: 'center',
  marginBottom: '10%',
 },
}));

export default function LockUI() {
 const classes = useStyles();
 let [form] = Form.useForm();
 const dispatch = useDispatch();

 const { lock, loading, error, success } = useSelector(
  (state) => state.lockAcc
 );
 const { userInformation } = useSelector((state) => state.userLogin);

 useEffect(() => {
  if (success) {
   form.resetFields();
  }
 }, [success]);

 const onFinish = (values) => {
  console.log(values);
  dispatch(lockAccount(values.password));
 };

 const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
 };

 return (
  <div>
   <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={lock}
    // onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
     timeout: 500,
    }}
   >
    <Fade in={lock}>
     <div className={classes.paper} style={{ width: '400px' }}>
      <img src={Logo} style={{ width: '150px' }} className="mx-auto" />
      <Col xs={24} md={{ span: 22, offset: 1 }}>
       {error && (
        <Message variant="danger">
         <p className="text-center fw-bold m-0 p-0">{error}</p>
        </Message>
       )}
      </Col>

      <h6 className="fw-bold text-center mb-3">
       គណនីត្រូវបានចាក់សោរបណ្ដោះអាសន្ន
      </h6>
      <h5 className="fw-bold text-center mb-3">{userInformation?.name}</h5>

      <Form
       form={form}
       name="addUser"
       onFinish={onFinish}
       onFinishFailed={onFinishFailed}
      >
       <Col xs={24} md={{ span: 22, offset: 1 }}>
        <Form.Item
         name="password"
         rules={[{ required: true, message: 'Field is required!' }]}
        >
         <Input.Password
          placeholder="លេខកូដសម្ងាត់"
          style={{ width: '100%' }}
         />
        </Form.Item>
       </Col>
       <Col xs={24} md={{ span: 22, offset: 1 }}>
        <Button
         loading={loading}
         htmlType="submit"
         type="primary"
         style={{ width: '100%' }}
        >
         ចូលទៅកាន់គណនីរបស់អ្នក
        </Button>
       </Col>
      </Form>

      <p className="fw-bold m-1">ឬ</p>
      <Col xs={24} md={{ span: 22, offset: 1 }}>
       <Button
        // loading={loading}
        htmlType="button"
        type="danger"
        style={{ width: '100%' }}
        className="mb-5"
        onClick={() => {
         dispatch(signout());
         localStorage.removeItem('lockAcc');
         dispatch({ type: LOCK_SUC, payload: false });
        }}
       >
        ចាកចេញ
       </Button>
      </Col>
     </div>
    </Fade>
   </Modal>
  </div>
 );
}
