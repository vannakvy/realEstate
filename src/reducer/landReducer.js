import {
 LAND_BY_ID_FAI,
 LAND_BY_ID_REQ,
 LAND_BY_ID_SUC,
 LAND_BY_USER_FAI,
 LAND_BY_USER_REQ,
 LAND_BY_USER_SUC,
 LAND_LIST_FAI,
 LAND_LIST_REQ,
 LAND_LIST_SUC,
 LAND_BY_ID_RES,
} from '../constants/land';

export const landListReducer = (state = { landList: [] }, action) => {
 switch (action.type) {
  case LAND_LIST_REQ:
   return { loading: true };
  case LAND_LIST_SUC:
   return { loading: false, landList: action.payload };
  case LAND_LIST_FAI:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

export const landByIdReducer = (state = { landById: {} }, action) => {
 switch (action.type) {
  case LAND_BY_ID_REQ:
   return { loading: true };
  case LAND_BY_ID_SUC:
   return { loading: false, landById: action.payload };
  case LAND_BY_ID_FAI:
   return { loading: false, error: action.payload };
  case LAND_BY_ID_RES:
   return {};
  default:
   return state;
 }
};

export const landListByUserReducer = (
 state = { landListByUser: [] },
 action
) => {
 switch (action.type) {
  case LAND_BY_USER_REQ:
   return { loading: true };
  case LAND_BY_USER_SUC:
   return { loading: false, landListByUser: action.payload };
  case LAND_BY_USER_FAI:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};
