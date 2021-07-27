import db, { auth } from '../firebase/db';
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
} from '../constants/auth';
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
 const {
  userLogin: { userInformation },
 } = getState();
 dispatch({ type: USER_REGISTER_REQUEST });
 auth
  .createUserWithEmailAndPassword(data.email, data.password)
  .then((res) => {
   db.collection('account').doc(res.user.uid).set({
    name: data.name,
    createAt: new Date(),
    imgUrl: '',
    uid: res.user.uid,
    admin: data.isAdmin,
    createdBy: userInformation.uid,
    role: data.role,
   });
   dispatch({ type: USER_REGISTER_SUCCESS });
  })
  .catch((error) => {
   dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
   console.log(error.message);
  });
};

export const getUserAccount = () => async (dispatch) => {
 try {
  dispatch({ type: USER_LIST_REQUEST });
  const data = await db.collection('account').get();
  dispatch({
   type: USER_LIST_SUCCESS,
   payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
  });
 } catch (error) {
  dispatch({ type: USER_LIST_FAIL, payload: error.message });
 }
};

export const deleteUserAccount = (id, uid) => async (dispatch) => {
 try {
  dispatch({ type: USER_DELETE_REQUEST });
  await db.collection('account').doc(id).delete();
  dispatch({ type: USER_DELETE_SUCCESS });
 } catch (error) {
  dispatch({ type: USER_DELETE_FAIL, payload: error.message });
 }
};
