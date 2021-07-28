import {
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
    name: land.owner.name,
    img: [],
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
   createBy: userInformation.uid,
   createAt: new Date(),
  });

  dispatch({ type: LAND_CREATE_SUC });
 } catch (error) {
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
 } catch (error) {
  console.log(error.message);
 }
};

export const updateLand = (land) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();
 try {
  await db
   .collection('landList')
   .doc(land.id)
   .update({
    idLand: land.idLand,
    landType: land.landType,
    owner: {
     name: land.owner.name,
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
    createBy: userInformation.uid,
   });
 } catch (error) {
  alert(error.message);
 }
};
