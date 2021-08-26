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
 LAND_UPDATE_FAI,
 LAND_UPDATE_REQ,
 LAND_UPDATE_SUC,
} from '../constants/land';
import db, { auth } from '../firebase/db';

export const test = () => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();

 try {
  const idLandHave = await db
   .collection('landList')
   .doc('c78GQflXSzJ6Thvr34zV')
   .get();
  if (idLandHave.data()) {
   console.log(idLandHave.data());
  }
 } catch (error) {
  message.error(error.message);
 }
};

export const createLand = (land) => async (dispatch, getState) => {
 const {
  userLogin: { userInformation },
 } = getState();

 try {
  const idLandHave = await db.collection('landList').doc(land.idLand).get();

  if (idLandHave.data()) {
   dispatch({
    type: LAND_CREATE_FAI,
    payload: 'ក្បាលដីនេះមានម្ដងរួចហើយ​ សូបបញ្ចូលក្បាលដីថ្មី',
   });
  } else {
   if (land.coordinates !== [] && land.coordinates.length !== 0) {
    dispatch({ type: LAND_CREATE_REQ });
    await db
     .collection('landList')
     .doc(land.idLand)
     .set({
      idLand: land.idLand,
      landType: land.landType,
      owner: {
       ownerId: land.ownerId,
       size: land.size,
       detail: land.detail || '',
      },
      add: {
       pro: land.pro,
       dis: land.dis,
       com: land.com,
       vil: land.vil,
      },
      img: land.img || [],
      coordinates: land.coordinates,
      createBy: userInformation.uid,
      createAt: new Date().getTime(),
     });
    dispatch({ type: LAND_CREATE_SUC });
   } else {
    dispatch({
     type: LAND_CREATE_FAI,
     payload: 'សូមគូសផ្លង់នៅលើ Map បញ្ជាក់េពីទីតាំងដី',
    });
   }
  }
 } catch (error) {
  message.error(error.message);
  dispatch({ type: LAND_CREATE_FAI, payload: error.message });
 }
};

export const getLandList =
 (search = '') =>
 async (dispatch) => {
  try {
   dispatch({ type: LAND_LIST_REQ });

   const land = db.collection('landList');

   if (search) {
    async function getSearch() {
     const pro = land.where('add.pro', '==', search).get();
     const dis = land.where('add.dis', '==', search).get();
     const com = land.where('add.com', '==', search).get();
     const vil = land.where('add.vil', '==', search).get();
     const id = land.where('idLand', '==', search).get();
     const owner = land.where('owner.ownerId', '==', search).get();
     const landType = land.where('landType', '==', search).get();

     const [proS, disS, comS, vilS, idS, ownerS, landTypeS] = await Promise.all(
      [pro, dis, com, vil, id, owner, landType]
     );

     const proArray = proS.docs;
     const disArray = disS.docs;
     const comArray = comS.docs;
     const vilArray = vilS.docs;
     const idArray = idS.docs;
     const ownerArray = ownerS.docs;
     const landTypeArray = landTypeS.docs;

     let searchArray = proArray.concat(
      disArray,
      comArray,
      vilArray,
      idArray,
      ownerArray,
      landTypeArray
     );

     return searchArray;
    }

    getSearch().then((res) => {
     let items = [];
     res.forEach((doc) => {
      let p = false;
      items.forEach((c, index) => {
       if (c.id == doc.id) {
        p = true;
       }
      });

      if (!p) {
       items.push({ ...doc.data(), id: doc.id });
      }
     });

     dispatch({ type: LAND_LIST_SUC, payload: items });
    });
   } else {
    let ref = db.collection('landList').orderBy('createAt', 'desc');
    ref.onSnapshot((queryS) => {
     const items = [];
     queryS.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
     });

     dispatch({ type: LAND_LIST_SUC, payload: items });
    });
   }
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
  dispatch({ type: LAND_UPDATE_REQ });

  await db
   .collection('landList')
   .doc(land.id)
   .update({
    idLand: land.idLand,
    landType: land.landType,
    owner: {
     ownerId: land.ownerId,
     size: land.size,
    },
    add: {
     pro: land.pro,
     dis: land.dis,
     com: land.com,
     vil: land.vil,
    },
    coordinates: land.coordinates,
    img: land.img,
   });

  dispatch({ type: LAND_UPDATE_SUC });
  message.success('កែប្រែទិន្នន័យបានជោគជ័យ');
 } catch (error) {
  message.error(error.message);
  dispatch({ type: LAND_UPDATE_FAI, payload: error.message });
 }
};

export const getLandById = (id) => async (dispatch) => {
 try {
  dispatch({ type: LAND_BY_ID_REQ });
  let ref = db.collection('landList').doc(id);
  ref.onSnapshot((queryS) => {
   dispatch({
    type: LAND_BY_ID_SUC,
    payload: { ...queryS.data(), id: id },
   });
  });
 } catch (error) {
  dispatch({ type: LAND_BY_ID_FAI, payload: error.message });
 }
};

export const getLandByUser = (uid) => async (dispatch) => {
 try {
  dispatch({ type: LAND_BY_USER_REQ });
  let ref = db.collection('landList').where('owner.ownerId', '==', uid);

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
