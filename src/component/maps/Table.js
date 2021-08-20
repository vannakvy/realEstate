import React, { useEffect, useState } from 'react';
import './Table.css';
import numeral from 'numeral';
import db from '../../firebase/db';
import CircularProgress from '@material-ui/core/CircularProgress';

function Table() {
 const [landByProvince, setLandByProvince] = useState([]);
 const [loading, setLoading] = useState(false);
 useEffect(() => {
  setLoading(true);
  let ref = db.collection('landList').orderBy('createAt', 'desc');
  ref.onSnapshot((queryS) => {
   const pro = [];

   const items = [];

   queryS.forEach((doc) => {
    items.push({ ...doc.data(), id: doc.id });
    let p = false;
    pro.forEach((c, index) => {
     console.log(index, c);
     if (c == doc.data().add.pro) {
      p = true;
     }
    });

    if (!p) {
     pro.push(doc.data().add.pro);
    }
    console.log(pro);
   });

   const landByPro = [];

   pro.forEach(async (p) => {
    const byPro = items.filter((item) => {
     return item.add.pro == p;
    });
    landByPro.push({ pro: p, total: byPro.length });
   });
   setLandByProvince(landByPro);
   setLoading(false);
  });
 }, []);

 return (
  <div
   className="covid_tables w-100"
   style={{ maxHeight: '500px', overflowY: 'auto' }}
  >
   {loading ? (
    <div className="w-100 text-center my-5">
     <CircularProgress />
    </div>
   ) : (
    landByProvince &&
    landByProvince
     .sort((a, b) => (a.total < b.total ? 1 : -1))
     .map((p) => (
      <tr className="tr" key={p.pro}>
       <td className="td">{p.pro}</td>
       <td className="td">
        <strong>{numeral(p.total).format('0,0')} </strong>
        ក្បលដី
       </td>
      </tr>
     ))
   )}
  </div>
 );
}

export default Table;
