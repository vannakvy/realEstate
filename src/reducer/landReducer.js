import {
 LAND_BY_ID_FAI,
 LAND_BY_ID_REQ,
 LAND_BY_ID_SUC,
 LAND_LIST_FAI,
 LAND_LIST_REQ,
 LAND_LIST_SUC,
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

export const landByIdReducer = (state = { landById: [] }, action) => {
 switch (action.type) {
  case LAND_BY_ID_REQ:
   return { loading: true };
  case LAND_BY_ID_SUC:
   return { loading: false, landById: action.payload };
  case LAND_BY_ID_FAI:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};
