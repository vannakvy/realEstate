import {
 GET_SHARE_FAI,
 GET_SHARE_ID_FAI,
 GET_SHARE_ID_REQ,
 GET_SHARE_ID_SUC,
 GET_SHARE_REQ,
 GET_SHARE_SUC,
} from '../constants/share';

export const shareLandReducer = (state = { shareLand: [] }, action) => {
 switch (action.type) {
  case GET_SHARE_REQ:
   return { loading: true };
  case GET_SHARE_SUC:
   return { loading: false, shareLand: action.payload };
  case GET_SHARE_FAI:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

export const shareLandIdReducer = (state = { shareLandId: {} }, action) => {
 switch (action.type) {
  case GET_SHARE_ID_REQ:
   return { loading: true };
  case GET_SHARE_ID_SUC:
   return { loading: false, shareLandId: action.payload };
  case GET_SHARE_ID_FAI:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};
