import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pro } from './Api';

const FormProvice = (props) => {
 const { posi, setPosi, addr, setAddr } = props;
 const [dis, setDis] = useState([]);
 const [com, setCom] = useState([]);

 const onChangePro = (e) => {
  const data = e.target.value;
  if (data !== '') {
   var pro = Pro.find((p) => {
    return p.name === data;
   });
   setAddr({ ...addr, pro: data, dis: '', com: '' });
   setDis(pro.dis);
   setCom([]);
   setPosi({ ...posi, posi: pro.coordinates, zoom: 10 });
  } else {
   setDis([]);
   setCom([]);
   setPosi({ ...posi, posi: [12.5657, 104.991], zoom: 8 });
  }
 };

 const onChangeDis = (e) => {
  const data = e.target.value;
  if (data !== '') {
   var di = dis.find((d) => {
    return d.name === data;
   });
   setAddr({ ...addr, dis: data, com: '' });
   setPosi({ ...posi, posi: di.coordinates, zoom: 12 });
   setCom(di.com);
  } else {
   setCom([]);
   setPosi({ ...posi, posi: posi.posi, zoom: 10 });
  }
 };

 const onChangeCom = (e) => {
  const data = e.target.value;
  if (data !== '') {
   var co = com.find((c) => {
    return c.name === data;
   });
   setAddr({ ...addr, com: data });
   setPosi({ ...posi, posi: co.coordinates, zoom: 16 });
  } else {
   setPosi({ ...posi, posi: posi.posi, zoom: 12 });
  }
 };
 return (
  <div className="mt-4">
   <div className="mb-3 row">
    <label className="col-sm-3 col-form-label">ខេត្ដ/ក្រុង</label>
    <div className="col-sm-9">
     <select
      className="form-select"
      aria-label="Default select example"
      onChange={onChangePro}
     >
      <option value=""></option>
      {Pro &&
       Pro.map((pro) => (
        <option key={pro.name} value={pro.name}>
         {pro.name}
        </option>
       ))}
     </select>
    </div>
   </div>

   <div className="mb-3 row">
    <label className="col-sm-3 col-form-label">ស្រុក/ខណ្ឌ</label>
    <div className="col-sm-9">
     <select
      className="form-select"
      aria-label="Default select example"
      onChange={onChangeDis}
     >
      <option value=""></option>
      {dis &&
       dis.map((d) => (
        <option key={d.name} value={d.name}>
         {d.name}
        </option>
       ))}
     </select>
    </div>
   </div>

   <div className="mb-3 row">
    <label className="col-sm-3 col-form-label">ឃុំ/សង្កាត់</label>
    <div className="col-sm-9">
     <select
      className="form-select"
      aria-label="Default select example"
      onChange={onChangeCom}
     >
      <option value=""></option>
      {com &&
       com.map((c) => (
        <option key={c.name} value={c.name}>
         {c.name}
        </option>
       ))}
     </select>
    </div>
   </div>
  </div>
 );
};

export default FormProvice;
