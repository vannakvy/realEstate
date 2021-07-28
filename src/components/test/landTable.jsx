import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLand, deleteLand, getLandList } from '../../actions/landActions';

const LandTable = () => {
 const dispatch = useDispatch();
 const [landCreate, setLandCreate] = useState({
  idLand: 'SR0003',
  landType: 'មិនដាក់លក់',
  owner: {
   name: 'សុខ',
   img: [],
   phone: '012 333 444',
   size: '200m x 300m',
   detail: 'តើមានប៉ុន្មាននាក់ស្គាល់ Blog Supporter ?',
  },
  add: {
   pro: 'siem reap',
   dis: 'banteay srei',
   com: 'preah dak',
   vil: 'thnalbandouy',
  },
  coordinates: [
   {
    lat: 13.444223570813993,
    lng: 103.92613834057204,
   },
   {
    lat: 13.443982360331349,
    lng: 103.92614236501781,
   },
   {
    lat: 13.443981056490234,
    lng: 103.92628858654659,
   },
   {
    lat: 13.444227482333332,
    lng: 103.92629126951039,
   },
  ],
 });
 const { landList } = useSelector((state) => state.landList);

 useEffect(() => {
  dispatch(getLandList());
 }, [dispatch]);

 const testt = (e) => {
  console.log(e.target.checked);
 };

 return (
  <div>
   <h4>LandList</h4>
   <table className="table">
    <thead>
     <tr className="bg-dark text-light">
      <th scope="col">#</th>
      <th scope="col">Address</th>
      <th scope="col">NameOwner</th>
      <th scope="col">Phone</th>
      <th scope="col">Size</th>
      <th scope="col">LandType</th>
      <th scope="col">Action</th>
     </tr>
    </thead>
    <tbody>
     {landList &&
      landList.map((land) => (
       <tr key={land.id}>
        <td>{land.idLand}</td>
        <td>
         ភូមិ{land.add.vil} ឃុំ{land.add.com} ស្រុក{land.add.dis} ខេត្ដ
         {land.add.pro}
        </td>
        <td>{land.owner.name}</td>
        <td>{land.owner.phone}</td>
        <td>{land.owner.size}</td>
        <td>{land.landType}</td>
        <td>
         <button
          onClick={() => {
           setLandCreate({
            ...landCreate,
            idLand: land.idLand,
            landType: land.landType,
            owner: {
             name: land.owner.name,
             phone: land.owner.phone,
             size: land.owner.size,
             detail: land.owner.detail,
             img: land.owner.img,
            },

            add: {
             pro: land.add.pro,
             dis: land.add.dis,
             com: land.add.com,
             vil: land.add.vil,
            },
           });
          }}
         >
          edit
         </button>
         <button onClick={() => dispatch(deleteLand(land.id))}>del</button>
        </td>
       </tr>
      ))}
    </tbody>
   </table>
   <h4>CreateLand</h4>
   <button onClick={() => dispatch(createLand(landCreate))}>createLand</button>
   <br />
   <br />
   <h4>UpdateLand</h4>

   <form>
    <div className="row row-cols-4">
     <div className="col">
      <input
       type="text"
       className="form-control"
       placeholder="idLand"
       value={landCreate.idLand}
      />
     </div>
     <div className="col">
      <input
       type="text"
       className="form-control"
       placeholder="nameOwner"
       value={landCreate.owner.name}
      />
     </div>
     <div className="col">
      <input
       type="text"
       className="form-control"
       placeholder="pro"
       value={landCreate.add.pro}
      />
     </div>
     <div className="col">
      <input
       type="text"
       className="form-control"
       placeholder="dis"
       value={landCreate.add.dis}
      />
     </div>
     <div className="col">
      <input
       type="text"
       className="form-control"
       placeholder="com"
       value={landCreate.add.com}
      />
     </div>
     <div className="col">
      <input
       type="text"
       className="form-control"
       placeholder="vil"
       value={landCreate.add.vil}
      />
     </div>
     <div className="col">
      <input
       type="text"
       className="form-control"
       placeholder="phone"
       value={landCreate.owner.phone}
      />
     </div>
     <div className="col">
      <input
       type="text"
       className="form-control"
       placeholder="landType"
       value={landCreate.landType}
      />
     </div>
     <div className="col">
      <input
       type="text"
       className="form-control"
       placeholder="size"
       value={landCreate.owner.size}
      />
     </div>
     <div className="col">
      <input
       type="text"
       className="form-control"
       placeholder="detail"
       value={landCreate.owner.detail}
      />
     </div>
    </div>
   </form>
   <button type="button" className="btn btn-primary">
    Submit
   </button>
  </div>
 );
};

export default LandTable;
