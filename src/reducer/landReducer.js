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
 LAND_CREATE_REQ,
 LAND_CREATE_SUC,
 LAND_CREATE_FAI,
 LAND_CREATE_RES,
 LAND_UPDATE_REQ,
 LAND_UPDATE_SUC,
 LAND_UPDATE_RES,
 LAND_UPDATE_FAI,
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

export const createLandReducer = (state = { landCreate: {} }, action) => {
 switch (action.type) {
  case LAND_CREATE_REQ:
   return { loading: true };
  case LAND_CREATE_SUC:
   return { loading: false, success: true };
  case LAND_CREATE_FAI:
   return { loading: false, error: action.payload };
  case LAND_CREATE_RES:
   return {};
  default:
   return state;
 }
};

export const updateLandReducer = (state = { landUpdate: {} }, action) => {
 switch (action.type) {
  case LAND_UPDATE_REQ:
   return { loading: true };
  case LAND_UPDATE_SUC:
   return { loading: false, success: true };
  case LAND_UPDATE_FAI:
   return { loading: false, error: action.payload };
  case LAND_UPDATE_RES:
   return {};
  default:
   return state;
 }
};
