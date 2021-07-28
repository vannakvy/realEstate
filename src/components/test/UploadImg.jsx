import React from 'react';
import db, { storageRef } from '../../firebase/db';

const UploadImg = () => {
 function uploadBlob(file) {
  const uploadTask = storageRef.child(`images/${file.name}`).put(file);
  uploadTask.on(
   'state_changed',
   (snapshot) => {
    // progrss function ....
    const progress = Math.round(
     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
   },
   (error) => {
    // error function ....
    console.log(error);
   },
   () => {
    // complete function ....
    storageRef
     .child(`images/${file.name}`)
     .getDownloadURL()
     .then((url) => {
      console.log(url);
     });
   }
  );
 }

 return (
  <div>
   <div className="input-group mb-3">
    <input
     type="file"
     onChange={(e) => uploadBlob(e.target.files[0])}
     className="form-control"
     id="inputGroupFile02"
    />
    <label className="input-group-text" htmlFor="inputGroupFile02">
     Upload
    </label>
   </div>
  </div>
 );
};

export default UploadImg;
