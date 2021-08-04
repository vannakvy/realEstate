import { message } from 'antd';
import {
 GET_SHARE_FAI,
 GET_SHARE_REQ,
 GET_SHARE_SUC,
} from '../constants/share';
import db from '../firebase/db';

export const getShareLand = () => async (dispatch, getState) => {
 try {
  dispatch({ type: GET_SHARE_REQ });
  const ref = db.collection('shareLand').orderBy('createAt', 'desc');
  ref.onSnapshot((queryS) => {
   const items = [];
   queryS.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
   });
   dispatch({ type: GET_SHARE_SUC, payload: items });
  });
 } catch (error) {
  dispatch({ type: GET_SHARE_FAI });
  message.error(error.message);
 }
};

export const createShareLand = (data) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();

 try {
  await db.collection('shareLand').add({
   landID: data.landID,
   duration: data.duration,
   customer: data.customer,
   createAt: new Date().getTime(),
   expireAt:
    new Date().getTime() + (data.duration > 0 ? data.duration : 0) * 86400000,
   createBy: userInformation.uid,
  });
  message.success('បង្កើត Sharing ជោគជ័យ');
 } catch (error) {
  message.error(error.message);
 }
};

export const deleteShareLand = (id) => async (dispatch, getState) => {
 try {
  await db.collection('shareLand').doc(id).delete();
  message.success('លុប Sharing ជោគជ័យ');
 } catch (error) {
  message.error(error.message);
 }
};
