import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
 userAccountDeleteReducer,
 userAccountListReducer,
 userLoginReducer,
 userRegisterReducer,
} from './reducer/authReducer';

const reducer = combineReducers({
 // user
 userLogin: userLoginReducer,
 userRegister: userRegisterReducer,
 userAccountList: userAccountListReducer,
 userAccountDelete: userAccountDeleteReducer,
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
