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
} from '../constants/auth';
import { CodeSharp } from '@material-ui/icons';
export const login = (email, password) => async (dispatch) => {
 try {
  dispatch({ type: USER_LOGIN_REQUEST });
  auth
   .signInWithEmailAndPassword(email, password)
   .then(async (res) => {
    const user = await db.collection('account').doc(res.user.uid).get();
    localStorage.setItem('userInformation', JSON.stringify(user.data()));
    console.log(user.data());
    dispatch({
     type: USER_LOGIN_SUCCESS,
     payload: user.data(),
    });
   })
   .catch((error) => {
    dispatch({
     type: USER_LOGIN_FAIL,
     payload: error,
    });
   });
 } catch (error) {
  dispatch({
   type: USER_LOGIN_FAIL,
   payload: error,
  });
 }
};

export const signout = () => async (dispatch) => {
 auth.signOut().then(() => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem('userInformation');
 });
};

export const signUp = (data) => async (dispatch, getState) => {
 console.log(data);
 const {
  userLogin: { userInformation },
 } = getState();
 dispatch({ type: USER_REGISTER_REQUEST });
 auth
  .createUserWithEmailAndPassword(data.email, data.password)
  .then(async (res) => {
   await db
    .collection('account')
    .doc(res.user.uid)
    .set({
     name: data.name,
     createAt: new Date().getTime(),
     imgUrl: '',
     uid: res.user.uid,
     role: data.role,
     createdBy: userInformation.uid || '',
     email: res.user.email,
     phone: '123456789',
    });

   dispatch({
    type: USER_REGISTER_SUCCESS,
    payload: { id: res.user.uid, name: data.name },
   });

   //  dispatch(userCreateAction(CREATE_NEW_USER, res.user.uid));
  })
  .catch((error) => {
   dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
   console.log(error.message);
  });
};

export const getUserAccount = () => async (dispatch) => {
 try {
  dispatch({ type: USER_LIST_REQUEST });
  const ref = db.collection('account');

  ref.onSnapshot((queryS) => {
   const items = [];
   queryS.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
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
   dispatch({ type: USER_BY_ID_SUC, payload: { ...queryS.data(), id: id } });
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

export const updateUserAccount = (user) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();
 try {
  dispatch({ type: USER_UPDATE_REQUEST });
  await db.collection('account').doc(user.uid).update({
   role: user.role,
   phone: user.phone,
   name: user.name,
   imgUrl: user.imgUrl,
  });
  dispatch({ type: USER_UPDATE_SUCCESS });
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

export const getAllLandOwner = () => async (dispatch, getState) => {
 try {
  dispatch({ type: LANDOWNER_LIST_REQ });
  const ref = db.collection('landOwner');

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
