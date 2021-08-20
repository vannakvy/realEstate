import React from 'react';
import { BsImages } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import Progress from './Progress';

const ViewImg = ({ uploadImg, imageLand, progress, setImageLand }) => {
 const deleteImg = (name) => {
  const arr = [];
  imageLand.forEach((u) => {
   arr.push(u);
  });

  const d = arr.filter((u) => u.name !== name);

  setImageLand(d);
 };

 return (
  <div>
   <div className="bg-light rounded overflow-hidden shadow-sm">
    <div className="bg-dark text-light text-center p-2 fs-6 fw-bold">
     រូបភាពដី
    </div>
    <div className="w-100 text-center">
     <div className="py-2" style={{ minHeight: '200px' }}>
      {imageLand?.length > 0 ? (
       imageLand.map((img, n) => (
        <span key={img.name} className="position-relative">
         <img width="200px" className="mx-2" src={img.url} alt="" />
         <button
          className="btn btn-danger position-absolute"
          style={{ top: '-50%', left: '40%' }}
          onClick={() => deleteImg(img.name)}
         >
          <AiFillDelete />
         </button>
        </span>
       ))
      ) : (
       <h6 className="mt-5 pt-5 fw-bold">មិនទាន់មានរូបភាពនៅឡើយ</h6>
      )}
     </div>
     <div>
      <div className="text-center w-100 mb-2">
       <h6 className="fw-bold">
        <BsImages /> បញ្ចូលរូបភាពដី
       </h6>

       <div
        className="input-group mb-2 mx-auto px-1"
        style={{ maxWidth: '400px' }}
       >
        <input
         onChange={(e) => uploadImg(e, imageLand)}
         type="file"
         class="form-control"
         id="inputGroupFile02"
        />
        <label className="input-group-text" htmlFor="inputGroupFile02">
         រូបភាពដី
        </label>
       </div>
       <div className="mb-2 mx-auto px-1" style={{ maxWidth: '400px' }}>
        <Progress progress={progress} />
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ViewImg;
