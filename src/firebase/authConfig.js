import React from 'react';
import bcrypt from 'bcryptjs';
import { NavLink, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const hashPassword = async (password) => {
 const salt = await bcrypt.genSalt(10);
 if (salt) {
  const pass = await bcrypt.hash(password, salt);
  return pass;
 } else {
  return null;
 }
};

export const matchPassword = async (enteredPassword, password) => {
 return await bcrypt.compare(enteredPassword, password);
};

export const RouteMenu = async ({ arr, path, title, icon = false }) => {
 const { userInformation } = useSelector((state) => state.userLogin);
 const type = arr.includes(title);
 if (type || userInformation?.role === 'ADMIN')
  return await (
   <NavLink
    to={path}
    className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
    activeClassName="border-info bg_Nav_active"
   >
    {icon ? (
     <>
      <icon /> <span className="ms-2 fw-bold">{title}</span>
     </>
    ) : (
     <>
      <span className="ms-4 fw-bold">{title}</span>
     </>
    )}
   </NavLink>
  );
};
