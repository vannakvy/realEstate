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
 USER_UPDATE_RESET,
 USER_CREATE_ACT_REQ,
 USER_CREATE_ACT_SUC,
 USER_CREATE_ACT_FAIL,
 USER_CREATE_ACT_RES,
 GET_ACTION_REQ,
 GET_ACTION_SUC,
 GET_ACTION_FAI,
 GET_ACTION_RES,
 USER_BY_ID_FAI,
 USER_BY_ID_SUC,
 USER_BY_ID_REQ,
 LANDOWNER_LIST_REQ,
 LANDOWNER_LIST_SUC,
 LANDOWNER_LIST_FAI,
 LANDOWNER_LIST_RES,
 LANDOWNER_BY_ID_RES,
 LANDOWNER_BY_ID_FAI,
 LANDOWNER_BY_ID_SUC,
 LANDOWNER_BY_ID_REQ,
} from '../constants/auth';

export const userLoginReducer = (state = { userInformation: {} }, action) => {
 switch (action.type) {
  case USER_LOGIN_REQUEST:
   return { loading: true };
  case USER_LOGIN_SUCCESS:
   return { loading: false, userInformation: action.payload };
  case USER_LOGIN_FAIL:
   return { loading: false, error: action.payload };
  case USER_LOGOUT:
   return { userInformation: null };
  default:
   return state;
 }
};

export const userRegisterReducer = (state = { userRegister: {} }, action) => {
 switch (action.type) {
  case USER_REGISTER_REQUEST:
   return { loading: true };
  case USER_REGISTER_SUCCESS:
   return { loading: false };
  case USER_REGISTER_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

export const userAccountListReducer = (
 state = { userAccounts: [] },
 action
) => {
 switch (action.type) {
  case USER_LIST_REQUEST:
   return { loading: true };
  case USER_LIST_SUCCESS:
   return { loading: false, userAccounts: action.payload };
  case USER_LIST_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

export const userAccountByIdReducer = (state = { userAccount: {} }, action) => {
 switch (action.type) {
  case USER_BY_ID_REQ:
   return { loading: true };
  case USER_BY_ID_SUC:
   return { loading: false, userAccount: action.payload };
  case USER_BY_ID_FAI:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

// reducer for deleting user account

export const userAccountDeleteReducer = (
 state = { userAccountDelete: {} },
 action
) => {
 switch (action.type) {
  case USER_DELETE_REQUEST:
   return { loading: true };
  case USER_DELETE_SUCCESS:
   return { loading: false };
  case USER_DELETE_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

export const userAccountUpdateReducer = (state = {}, action) => {
 switch (action.type) {
  case USER_UPDATE_REQUEST:
   return { loading: true };
  case USER_UPDATE_SUCCESS:
   return { loading: false, success: true };
  case USER_UPDATE_FAIL:
   return { loading: false, error: action.payload };
  case USER_UPDATE_RESET:
   return {};
  default:
   return state;
 }
};

export const userCreateActionReducer = (state = {}, action) => {
 switch (action.type) {
  case USER_CREATE_ACT_REQ:
   return { loading: true };
  case USER_CREATE_ACT_SUC:
   return { loading: false, success: true };
  case USER_CREATE_ACT_FAIL:
   return { loading: false, error: action.payload };
  case USER_CREATE_ACT_RES:
   return {};
  default:
   return state;
 }
};

export const allActionListReducer = (state = {}, action) => {
 switch (action.type) {
  case GET_ACTION_REQ:
   return { loading: true };
  case GET_ACTION_SUC:
   return { loading: false, ActionList: action.payload, success: true };
  case GET_ACTION_FAI:
   return { loading: false, error: action.payload };
  case GET_ACTION_RES:
   return {};
  default:
   return state;
 }
};

// land Owner
export const landOwerListReducer = (state = { landOwerList: [] }, action) => {
 switch (action.type) {
  case LANDOWNER_LIST_REQ:
   return { loading: true };
  case LANDOWNER_LIST_SUC:
   return { loading: false, landOwerList: action.payload };
  case LANDOWNER_LIST_FAI:
   return { loading: false, error: action.payload };
  case LANDOWNER_LIST_RES:
   return {};
  default:
   return state;
 }
};

export const landOwerByIdReducer = (state = { landOwerById: {} }, action) => {
 switch (action.type) {
  case LANDOWNER_BY_ID_REQ:
   return { loading: true };
  case LANDOWNER_BY_ID_SUC:
   return { loading: false, landOwerById: action.payload };
  case LANDOWNER_BY_ID_FAI:
   return { loading: false, error: action.payload };
  case LANDOWNER_BY_ID_RES:
   return {};
  default:
   return state;
 }
};
