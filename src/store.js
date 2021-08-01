import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
 allActionListReducer,
 landOwnerByIdReducer,
 landOwnerListReducer,
 userAccountByIdReducer,
 userAccountDeleteReducer,
 userAccountListReducer,
 userAccountUpdateReducer,
 userCreateActionReducer,
 userLoginReducer,
 userRegisterReducer,
} from './reducer/authReducer';
import {
 landByIdReducer,
 landListByUserReducer,
 landListReducer,
} from './reducer/landReducer';

const reducer = combineReducers({
 // user
 userLogin: userLoginReducer,
 userRegister: userRegisterReducer,
 userAccountList: userAccountListReducer,
 userAccountById: userAccountByIdReducer,
 userAccountDelete: userAccountDeleteReducer,
 userAccountUpdate: userAccountUpdateReducer,
 userCreateAction: userCreateActionReducer,
 allActionList: allActionListReducer,
 //  landOwner
 landOwnerList: landOwnerListReducer,
 landOwnerById: landOwnerByIdReducer,
 //  land
 landList: landListReducer,
 landById: landByIdReducer,
 landListByUser: landListByUserReducer,
});

const userInformationFromStorage = localStorage.getItem('userInformation')
 ? JSON.parse(localStorage.getItem('userInformation'))
 : null;
const initialState = {
 userLogin: { userInformation: userInformationFromStorage },
};
const middleware = [thunk];
const store = createStore(
 reducer,
 initialState,
 composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
