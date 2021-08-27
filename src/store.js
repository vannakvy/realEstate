import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
 allActionListReducer,
 createUserTypesReducer,
 landOwnerByIdReducer,
 lockAccReducer,
 userAccountByIdReducer,
 userAccountDeleteReducer,
 userAccountListReducer,
 userAccountUpdateReducer,
 userByRoleReducer,
 userCreateActionReducer,
 userLoginReducer,
 userRegisterReducer,
 userTypesReducer,
} from './reducer/authReducer';
import {
 createLandReducer,
 landByIdReducer,
 landListByUserReducer,
 landListReducer,
 updateLandReducer,
} from './reducer/landReducer';
import { shareLandIdReducer, shareLandReducer } from './reducer/shareReducer';

const reducer = combineReducers({
 // user
 lockAcc: lockAccReducer,
 userLogin: userLoginReducer,
 userRegister: userRegisterReducer,
 userAccountList: userAccountListReducer,
 userAccountById: userAccountByIdReducer,
 userAccountDelete: userAccountDeleteReducer,
 userAccountUpdate: userAccountUpdateReducer,
 userCreateAction: userCreateActionReducer,
 allActionList: allActionListReducer,
 userTypes: userTypesReducer,
 createUserType: createUserTypesReducer,
 //  landOwner
 userByRole: userByRoleReducer,
 landOwnerById: landOwnerByIdReducer,
 //  land
 landList: landListReducer,
 landById: landByIdReducer,
 landListByUser: landListByUserReducer,
 createLand: createLandReducer,
 updateLand: updateLandReducer,
 //share
 shareLand: shareLandReducer,
 shareLandId: shareLandIdReducer,
});

function getWithExpiry(key) {
 const itemStr = localStorage.getItem(key);
 if (!itemStr) {
  return null;
 }
 const item = JSON.parse(itemStr);
 const now = new Date();

 if (now.getTime() > item.expiry) {
  localStorage.removeItem(key);
  localStorage.removeItem('lockAcc');
  return null;
 }
 return item.value;
}

const user = getWithExpiry('Informa');

const userInformationFromStorage = user ? user : null;

const lockAccFromStorage = localStorage.getItem('lockAcc')
 ? JSON.parse(localStorage.getItem('lockAcc'))
 : false;

const initialState = {
 userLogin: { userInformation: userInformationFromStorage },
 lockAcc: { lock: lockAccFromStorage },
};
const middleware = [thunk];
const store = createStore(
 reducer,
 initialState,
 composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
