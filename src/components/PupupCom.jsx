import React from 'react';

const PupupCom = ({ land }) => {
 return (
  <div className="kh" style={{ width: '150px' }}>
   <h6 className="text-center p-0 m-0">ក្បាលដីៈ{land.idLand}</h6>
   <p className="text-left">
    ទំហំៈ​​ {land.owner.size} <br />
    ភូមិ:{land.add.vil} <br />
    ឃុំ/សង្កាត់:{land.add.com} <br />
    ស្រុក/ខណ្ឌ:{land.add.dis} <br />
    ខេត្ដ/ក្រុង:{land.add.pro}
   </p>
  </div>
 );
};

export default PupupCom;
