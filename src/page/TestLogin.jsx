import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 getAllActions,
 getUserAccount,
 login,
 signout,
 updateUserAccount,
} from '../actions/authAction';
import LandTable from '../components/test/landTable.jsx';
import UploadImg from '../components/test/UploadImg';

const TestLogin = () => {
 const [loading, setLoading] = useState(false);
 const dispatch = useDispatch();
 const [user, setUser] = useState({
  email: '',
  password: '',
  uid: '',
  isAdmin: false,
  name: '',
  phone: '',
  imgUrl: '',
 });

 const { userInformation } = useSelector((state) => state.userLogin);
 const { userAccounts } = useSelector((state) => state.userAccountList);
 const { ActionList } = useSelector((state) => state.allActionList);

 useEffect(() => {
  dispatch(getAllActions());
  dispatch(getUserAccount());
 }, [dispatch]);

 const onChange = (e) => {
  e.preventDefault();
  setUser({ ...user, [e.target.name]: e.target.value });
 };
 const onSubmit = (e) => {
  e.preventDefault();
  dispatch(login(user.email, user.password));
 };

 const updateHandler = (e) => {
  e.preventDefault();
  dispatch(updateUserAccount(user));
 };

 return (
  <div>
   <form onSubmit={onSubmit}>
    <label>email</label>
    <input type="text" name="email" onChange={onChange} />
    <br />
    <label>pass</label>
    <input type="password" name="password" onChange={onChange} />

    <button type="submit">create</button>
   </form>
   {userInformation && userInformation.email}
   <button onClick={() => dispatch(signout())}>signOut</button>
   <br />
   <h1>All USER</h1>
   <table className="table">
    <thead>
     <tr className="bg-dark text-light">
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">@Email</th>
      <th scope="col">Role</th>
      <th scope="col">Phone</th>
      <th scope="col">Action</th>
     </tr>
    </thead>
    <tbody>
     {userAccounts &&
      userAccounts.map((u) => (
       <tr key={u.uid}>
        <th scope="row">{u.uid}</th>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>{u.admin ? 'admin' : 'user'}</td>
        <td>{u.phone}</td>
        <td>
         <button
          onClick={() =>
           setUser({
            ...user,
            uid: u.uid,
            name: u.name,
            isAdmin: u.admin,
            phone: u.phone,
            imgUrl: u.imgUrl,
           })
          }
         >
          edit
         </button>
         <button>del</button>
        </td>
       </tr>
      ))}
    </tbody>
   </table>

   <h4>updateUser</h4>
   <form onSubmit={updateHandler}>
    <label>uid</label>
    <input type="text" value={user.uid} name="uid" onChange={onChange} />
    <label>isAdmin</label>
    <select value={user.isAdmin} name="isAdmin" onChange={onChange} id="">
     <option value="false">false</option>
     <option value="true">true</option>
    </select>
    <label>name</label>
    <input type="text" value={user.name} name="name" onChange={onChange} />
    <label>phone</label>
    <input type="text" value={user.phone} name="phone" onChange={onChange} />
    <button type="submit">UpdateUSer</button>
   </form>
   <br />
   <LandTable />
   <UploadImg />
  </div>
 );
};

export default TestLogin;
