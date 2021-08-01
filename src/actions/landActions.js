import { message } from 'antd';
import {
 LAND_BY_ID_FAI,
 LAND_BY_ID_REQ,
 LAND_BY_ID_SUC,
 LAND_BY_USER_FAI,
 LAND_BY_USER_REQ,
 LAND_BY_USER_SUC,
 LAND_CREATE_FAI,
 LAND_CREATE_REQ,
 LAND_CREATE_SUC,
 LAND_LIST_FAI,
 LAND_LIST_REQ,
 LAND_LIST_SUC,
} from '../constants/land';
import db, { auth } from '../firebase/db';

export const createLand = (land) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();

 try {
  dispatch({ type: LAND_CREATE_REQ });
  await db.collection('landList').add({
   idLand: land.idLand,
   landType: land.landType,
   owner: {
    name: land.name || '',
    ownerId: land.ownerId || '',
    img: [],
    phone: land.phone || '',
    size: land.size,
    detail: land.detail || '',
   },

   add: {
    pro: land.pro,
    dis: land.dis,
    com: land.com,
    vil: land.vil,
   },
   coordinates: land.coordinates,
   createBy: userInformation.uid,
   createAt: new Date(),
  });

  dispatch({ type: LAND_CREATE_SUC });
 } catch (error) {
  message.error(error.message);
  dispatch({ type: LAND_CREATE_FAI, payload: error.message });
 }
};

export const getLandList =
 (pro = '', dis = '') =>
 async (dispatch) => {
  try {
   dispatch({ type: LAND_LIST_REQ });
   let ref = db.collection('landList').orderBy('createAt', 'desc');

   if (pro) {
    ref = db.collection('landList').where('add.pro', '==', pro);
   } else if (pro && dis) {
    ref = db
     .collection('landList')
     .where('add.pro', '==', pro)
     .where('add.dis', '==', dis);
   }

   ref.onSnapshot((queryS) => {
    const items = [];
    queryS.forEach((doc) => {
     items.push({ ...doc.data(), id: doc.id });
    });

    dispatch({ type: LAND_LIST_SUC, payload: items });
   });
  } catch (error) {
   console.log(error.message);
   dispatch({ type: LAND_LIST_FAI, payload: error.message });
  }
 };

export const deleteLand = (id) => async (dispatch) => {
 try {
  await db.collection('landList').doc(id).delete();
  message.success('លុបទិន្នន័យជោគជ័យ');
 } catch (error) {
  console.log(error.message);
 }
};

export const updateLand = (land) => async (dispatch, getState) => {
 try {
  await db
   .collection('landList')
   .doc(land.id)
   .update({
    idLand: land.idLand,
    landType: land.landType,
    owner: {
     name: land.owner.name,
     img: land.owner.img,
     phone: land.owner.phone,
     size: land.owner.size,
     detail: land.owner.detail,
    },
    add: {
     pro: land.add.pro,
     dis: land.add.dis,
     com: land.add.com,
     vil: land.add.vil,
    },
    coordinates: land.coordinates,
   });
 } catch (error) {
  alert(error.message);
 }
};

export const getLandById = (id) => async (dispatch) => {
 try {
  dispatch({ type: LAND_BY_ID_REQ });
  let ref = db.collection('landList').doc(id);
  ref.onSnapshot((queryS) => {
   dispatch({ type: LAND_BY_ID_SUC, payload: queryS.data() });
  });
 } catch (error) {
  dispatch({ type: LAND_BY_ID_FAI, payload: error.message });
 }
};

export const getLandByUser = (uid) => async (dispatch) => {
 try {
  dispatch({ type: LAND_BY_USER_REQ });
  let ref = db.collection('landList').where('uid', '==', uid);

  ref.onSnapshot((queryS) => {
   const items = [];
   queryS.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
   });
   dispatch({ type: LAND_BY_USER_SUC, payload: items });
  });
 } catch (error) {
  dispatch({ type: LAND_BY_USER_FAI, payload: error.message });
 }
};
