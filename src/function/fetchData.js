import { USER_LIST_SUCCESS } from '../constants/auth';
import db from '../firebase/db';

export const fetctUser = () => async (dispatch) => {
 let data = {};

 const ref = db.collection('account');

 let loading = true;
 ref.onSnapshot((queryS) => {
  const items = [];
  queryS.forEach((doc) => {
   items.push(doc.data());
  });
  loading = false;
  dispatch({ type: USER_LIST_SUCCESS, payload: items });
 });
};
