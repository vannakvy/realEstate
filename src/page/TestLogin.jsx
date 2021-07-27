import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signout } from '../actions/authAction';

const TestLogin = () => {
 const dispatch = useDispatch();
 const [user, setUser] = useState({
  email: '',
  password: '',
 });

 const userLogin = useSelector((state) => state.userLogin);
 const { userInformation } = userLogin;
 console.log(userInformation);

 const onChange = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value });
 };
 const onSubmit = (e) => {
  e.preventDefault();
  dispatch(login(user.email, user.password));
 };

 return (
  <div>
   <form onSubmit={onSubmit}>
    <label>email</label>
    <input type="text" name="email" onChange={onChange} />
    <br />
    <label>pass</label>
    <input type="text" name="password" onChange={onChange} />

    <button type="submit">create</button>
   </form>
   {userInformation ? 'dd' : 'gg'}
   <button onClick={() => dispatch(signout())}>signOut</button>
  </div>
 );
};

export default TestLogin;
