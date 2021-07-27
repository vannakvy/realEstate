import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../actions/authAction';

const TestCreateUser = () => {
 const dispatch = useDispatch();
 const [user, setUser] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAdmin: false,
  role: 'user',
 });

 const onChange = (e) => {
  setUser({ ...user, [e.target.name]: e.target.value });
 };
 const onSubmit = (e) => {
  e.preventDefault();
  dispatch(signUp(user));
 };

 return (
  <div>
   <form onSubmit={onSubmit}>
    <label>Name</label>
    <input type="text" name="name" onChange={onChange} />
    <br />
    <label>email</label>
    <input type="text" name="email" onChange={onChange} />
    <br />
    <label>pass</label>
    <input type="text" name="password" onChange={onChange} />
    <br />
    <label>confirmPass</label>
    <input type="text" name="confirmPassword" onChange={onChange} />
    <br />
    <button type="submit">create</button>
   </form>
  </div>
 );
};

export default TestCreateUser;
