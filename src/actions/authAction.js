import db, { auth } from '../firebase/db';
import { message } from 'antd';
import {
 USER_LOGIN_REQUEST,
 USER_LOGIN_SUCCESS,
 USER_LOGIN_FAIL,
 USER_LOGOUT,
 USER_REGISTER_REQUEST,
 USER_REGISTER_SUCCESS,
 USER_REGISTER_FAIL,
 USER_LIST_REQUEST,
 USER_LIST_SUCCESS,
 USER_LIST_FAIL,
 USER_DELETE_REQUEST,
 USER_DELETE_SUCCESS,
 USER_DELETE_FAIL,
 USER_UPDATE_REQUEST,
 USER_UPDATE_SUCCESS,
 USER_UPDATE_FAIL,
 USER_CREATE_ACT_SUC,
 USER_CREATE_ACT_FAIL,
 CREATE_NEW_USER,
 GET_ACTION_REQ,
 GET_ACTION_SUC,
 GET_ACTION_FAI,
 USER_BY_ID_REQ,
 USER_BY_ID_SUC,
 USER_BY_ID_FAI,
 LANDOWNER_LIST_REQ,
 LANDOWNER_LIST_SUC,
 LANDOWNER_LIST_FAI,
 LANDOWNER_BY_ID_REQ,
 LANDOWNER_BY_ID_SUC,
 LANDOWNER_BY_ID_FAI,
 LOCK_REQ,
 LOCK_SUC,
 LOCK_FAI,
 USER_T_LIST_REQ,
 USER_T_LIST_SUC,
 USER_T_LIST_FAI,
 USER_T_CREATE_REQ,
 USER_T_CREATE_SUC,
 USER_T_CREATE_FAI,
 USER_T_DEL_REQ,
 USER_T_DEL_SUC,
 USER_T_DEL_FAI,
 USER_T_UPDATE_REQ,
 USER_T_UPDATE_SUC,
 USER_T_UPDATE_FAI,
 USER_T_BY_ID_REQ,
 USER_T_BY_ID_SUC,
 USER_T_BY_ID_FAI,
} from '../constants/auth';
import { hashPassword, matchPassword } from '../firebase/authConfig';

export const lockAccount = (password) => async (dispatch, getState) => {
 try {
  dispatch({ type: LOCK_REQ });

  const {
   userLogin: { userInformation },
  } = getState();

  const userExists = await db
   .collection('account')
   .doc(userInformation.name)
   .get();

  if (
   userExists.data() &&
   (await matchPassword(password, userExists.data().password))
  ) {
   localStorage.removeItem('lockAcc');
   dispatch({ type: LOCK_SUC, payload: false });
  } else {
   dispatch({ type: LOCK_FAI, payload: 'ពាក្យសម្ងាត់របស់អ្នកមិនត្រឹមត្រូវ' });
  }
 } catch (error) {}
};

export const login = (name, password) => async (dispatch) => {
 try {
  dispatch({ type: USER_LOGIN_REQUEST });

  const userExists = await db.collection('account').doc(name).get();

  if (
   userExists.data() &&
   (await matchPassword(password, userExists.data().password))
  ) {
   localStorage.removeItem('lockAcc');
   dispatch({ type: LOCK_SUC, payload: false });
   const now = new Date();
   const item = {
    value: { ...userExists.data(), password: null },
    expiry: now.getTime() + 24 * 60 * 60 * 1000,
   };
   localStorage.setItem('Informa', JSON.stringify(item));
   dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: { ...userExists.data(), password: null },
   });
  } else {
   dispatch({
    type: USER_LOGIN_FAIL,
    payload: 'ឈ្មោះអ្នកប្រើប្រាស់ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ',
   });
  }
 } catch (error) {
  dispatch({
   type: USER_LOGIN_FAIL,
   payload: 'ឈ្មោះអ្នកប្រើប្រាស់ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ',
  });
 }
};

export const signout = () => async (dispatch) => {
 localStorage.removeItem('Informa');
 dispatch({ type: USER_LOGOUT });
};

export const signUp = (data) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();
 dispatch({ type: USER_REGISTER_REQUEST });

 const userExists = await db.collection('account').doc(data.name).get();

 if (userExists.data()) {
  dispatch({
   type: USER_REGISTER_FAIL,
   payload: 'ឈ្មោះសម្គាល់នេះមានម្ដងរួចហើយ',
  });
 } else {
  try {
   const pass = await hashPassword(data.password);
   await db
    .collection('account')
    .doc(data.name)
    .set({
     role: data.role,
     name: data.name || '',
     password: pass,
     imgUrl: data.imgUrl || {},
     gender: data.gender || '',
     age: data.age || '',
     uid: data.name || '',
     phone: data.phone || '',
     email: data.email || 'មិនមាន',
     facebook: data.facebook || '',
     telegram: data.telegram || '',
     pro: data.pro || '',
     dis: data.dis || '',
     com: data.com || '',
     vil: data.vil || '',
     createdBy: userInformation.uid || '',
     createAt: new Date().getTime(),
    });

   dispatch({
    type: USER_REGISTER_SUCCESS,
    payload: { id: data.name, name: data.name },
   });
   message.success('បង្កើតអ្នកប្រើប្រាស់បានជោគជ័យ');
  } catch (error) {
   console.log(error.message);
   dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
 }
};

export const getUserAccount = () => async (dispatch) => {
 try {
  dispatch({ type: USER_LIST_REQUEST });
  const ref = db.collection('account');

  ref.onSnapshot((queryS) => {
   const items = [];
   queryS.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id, password: null });
   });
   dispatch({ type: USER_LIST_SUCCESS, payload: items });
  });
 } catch (error) {
  dispatch({ type: USER_LIST_FAIL, payload: error.message });
 }
};

export const getUserById = (id) => async (dispatch) => {
 try {
  dispatch({ type: USER_BY_ID_REQ });
  let ref = db.collection('account').doc(id);
  ref.onSnapshot((queryS) => {
   dispatch({
    type: USER_BY_ID_SUC,
    payload: { ...queryS.data(), id: id, password: null },
   });
  });
 } catch (error) {
  dispatch({ type: USER_BY_ID_FAI, payload: error.message });
 }
};

export const deleteUserAccount = (uid) => async (dispatch) => {
 try {
  dispatch({ type: USER_DELETE_REQUEST });
  await db.collection('account').doc(uid).delete();
  message.success('លុបទិន្នន័យជោគជ័យ');
  dispatch({ type: USER_DELETE_SUCCESS });
 } catch (error) {
  dispatch({ type: USER_DELETE_FAIL, payload: error.message });
 }
};

export const updateUserAccount = (data) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();
 try {
  dispatch({ type: USER_UPDATE_REQUEST });
  const userExists = await db
   .collection('account')
   .doc(userInformation.name)
   .get();

  if (
   userExists.data() &&
   (await matchPassword(data.password, userExists.data().password))
  ) {
   await db
    .collection('account')
    .doc(data.name)
    .update({
     role: data.role,
     imgUrl: data.imgUrl || {},
     gender: data.gender || '',
     age: data.age || '',
     phone: data.phone || '',
     email: data.email || 'មិនមាន',
     facebook: data.facebook || '',
     telegram: data.telegram || '',
     pro: data.pro || '',
     dis: data.dis || '',
     com: data.com || '',
     vil: data.vil || '',
    });
   dispatch({ type: USER_UPDATE_SUCCESS });
   if (userInformation.name === data.name) {
    const userExists = await db
     .collection('account')
     .doc(userInformation.name)
     .get();
    const now = new Date();
    const item = {
     value: { ...userExists.data(), password: null },
     expiry: now.getTime() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem('Informa', JSON.stringify(item));
    dispatch({
     type: USER_LOGIN_SUCCESS,
     payload: { ...userExists.data(), password: null },
    });
   }
  } else {
   dispatch({ type: USER_UPDATE_FAIL, payload: 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវ' });
  }
 } catch (error) {
  dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
 }
};

export const userCreateAction = (action, id) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();

 try {
  await db.collection('userActions').add({
   uid: userInformation.uid,
   createAt: new Date(),
   action: action,
   contextId: id,
  });

  dispatch({ type: USER_CREATE_ACT_SUC });
 } catch (error) {
  dispatch({ type: USER_CREATE_ACT_FAIL, payload: error.message });
 }
};

export const getAllActions = () => async (dispatch) => {
 try {
  dispatch({ type: GET_ACTION_REQ });
  const ref = db.collection('userActions');

  ref.onSnapshot((queryS) => {
   const items = [];
   queryS.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
   });
   dispatch({ type: GET_ACTION_SUC, payload: items });
  });
 } catch (error) {
  dispatch({ type: GET_ACTION_FAI, payload: error.message });
 }
};

export const deleteAction = (id) => async () => {
 try {
  await db.collection('userActions').doc(id).delete();
 } catch (error) {
  alert(error.message);
 }
};

// Land Owner
export const createLandOwner = (data) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();

 try {
  db.collection('landOwner').add({
   name: data.name,
   imgUrl: '',
   phone: data.phone,
   createdBy: userInformation.uid,
   createAt: new Date().getTime(),
  });
 } catch (error) {
  message.error(error.message);
 }
};

export const updateLandOwner = (data) => async (dispatch, getState) => {
 try {
  await db
   .collection('landOwner')
   .doc(data.id)
   .update({
    name: data.name,
    phone: data.phone,
    imgUrl: data.imgUrl || '',
   });
 } catch (error) {
  message.error(error.message);
 }
};

export const deleteLandOwner = (id) => async (dispatch, getState) => {
 try {
  await db.collection('landOwner').doc(id).delete();
 } catch (error) {
  message.error(error.message);
 }
};

export const getUserByRole = (role) => async (dispatch, getState) => {
 try {
  dispatch({ type: LANDOWNER_LIST_REQ });
  const ref = db.collection('account').where('role', '==', role);

  ref.onSnapshot((queryS) => {
   const items = [];
   queryS.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
   });
   dispatch({ type: LANDOWNER_LIST_SUC, payload: items });
  });
 } catch (error) {
  dispatch({ type: LANDOWNER_LIST_FAI, payload: error.message });
 }
};

export const getLandOwnerById = (id) => async (dispatch, getState) => {
 try {
  dispatch({ type: LANDOWNER_BY_ID_REQ });
  let ref = db.collection('landOwner').doc(id);
  ref.onSnapshot((queryS) => {
   dispatch({ type: LANDOWNER_BY_ID_SUC, payload: queryS.data() });
  });
 } catch (error) {
  dispatch({ type: LANDOWNER_BY_ID_FAI, payload: error.message });
 }
};

export const getUserType = () => async (dispatch) => {
 try {
  dispatch({ type: USER_T_LIST_REQ });
  let ref = db.collection('userType');
  ref.onSnapshot((queryS) => {
   const items = [];
   queryS.forEach((doc) => {
    items.push({ ...doc.data() });
   });
   dispatch({ type: USER_T_LIST_SUC, payload: items });
  });
 } catch (error) {
  dispatch({ type: USER_T_LIST_FAI, payload: error.message });
 }
};

export const createUserType = (data) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();

 try {
  dispatch({ type: USER_T_CREATE_REQ });

  const userTypeExists = await db.collection('userType').doc(data.name).get();
  if (userTypeExists.data() && userTypeExists.data().name === data.name) {
   dispatch({
    type: USER_T_CREATE_FAI,
    payload: 'ប្រភេទអ្នកប្រើប្រាស់មានរួចហើយ',
   });
  } else {
   await db
    .collection('userType')
    .doc(data.name)
    .set({
     name: data.name,
     id: data.name,
     createBy: userInformation.uid,
     createAt: new Date().getTime(),
     pages: data.pages || [],
    });

   dispatch({ type: USER_T_CREATE_SUC, payload: {} });
  }
 } catch (error) {
  console.log(error.message);
  dispatch({ type: USER_T_CREATE_FAI, payload: error.message });
 }
};

export const deleteUserType = (id) => async (dispatch, getState) => {
 try {
  dispatch({ type: USER_T_DEL_REQ });
  await db.collection('userType').doc(id).delete();
  dispatch({ type: USER_T_DEL_SUC });
 } catch (error) {
  dispatch({ type: USER_T_DEL_FAI, payload: error.message });
 }
};

export const addUserTypePage = (data) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();

 try {
  dispatch({ type: USER_T_UPDATE_REQ });

  await db.collection('userType').doc(data.name).update({
   createBy: userInformation.uid,
   pages: data,
  });

  dispatch({ type: USER_T_UPDATE_SUC });
 } catch (error) {
  dispatch({ type: USER_T_UPDATE_FAI, payload: error.message });
 }
};

export const getUserTypeById = (id) => async (dispatch) => {
 try {
  dispatch({ type: USER_T_BY_ID_REQ });
  let ref = db.collection('userType').doc(id);
  ref.onSnapshot((queryS) => {
   dispatch({
    type: USER_T_BY_ID_SUC,
    payload: { ...queryS.data() },
   });
  });
 } catch (error) {
  dispatch({ type: USER_T_BY_ID_FAI, payload: error.message });
 }
};
