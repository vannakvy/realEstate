import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import MapDrawCreate from '../components/MapDrawCreate';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByRole } from '../actions/authAction';
import { createLand } from '../actions/landActions';
import Message from '../component/Message';
import { LAND_CREATE_RES } from '../constants/land';
import Loader from '../component/Loader';
import { storageRef } from '../firebase/db';
import ViewImg from '../component/ViewImg';

const CreateLand = () => {
 const history = useHistory();
 const [coordinates, setCoordinates] = useState([]);
 const [imageLand, setImageLand] = useState([]);
 const [progress, setProgress] = useState(0);
 const dispatch = useDispatch();
 const { userByRoles } = useSelector((state) => state.userByRole);
 const { success, error, loading } = useSelector((state) => state.createLand);

 useEffect(() => {
  dispatch(getUserByRole('LANDOWNER'));
 }, [dispatch]);

 useEffect(() => {
  if (success) {
   history.push('/land');
  }
  dispatch({ type: LAND_CREATE_RES });
 }, [dispatch, success]);

 async function uploadImg(e, img) {
  e.preventDefault();
  const date = new Date().getTime();
  const file = e.target.files[0];
  const uploadTask = storageRef.child(`images/${date}-${file.name}`).put(file);
  uploadTask.on(
   'state_changed',
   (snapshot) => {
    // progrss function ....
    const progress = Math.round(
     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    setProgress(progress);
   },
   (error) => {
    // error function ....
    console.log(error);
   },
   () => {
    // complete function ....
    storageRef
     .child(`images/${date}-${file.name}`)
     .getDownloadURL()
     .then((url) => {
      const dd = [];
      img.forEach((i) => {
       dd.push({ url: i.url, name: i.name });
      });
      dd.push({ url: url, name: `${date}-${file.name}` });
      setImageLand(dd);
     });
   }
  );
 }

 const submitCreate = (e) => {
  e.preventDefault();

  const data = {
   idLand: e.target.idLand.value,
   landType: e.target.landType.value,
   ownerId: e.target.ownerId.value,
   size: e.target.size.value,
   pro: e.target.pro.value,
   dis: e.target.dis.value,
   com: e.target.com.value,
   vil: e.target.vil.value,
   img: imageLand,
   coordinates: coordinates,
  };
  dispatch(createLand(data));
 };

 return (
  <div>
   <h5>តារាងបញ្ចូលដីថ្មី</h5>
   <NavLink className="text-primary" to="/">
    <IoHome style={{ marginTop: -5 }} /> / ទំព័រដើម
   </NavLink>
   <div className="mt-2 w-100 row">
    <br />
    <div className="col-lg-8">
     <MapDrawCreate setCoordinates={setCoordinates} />
    </div>
    <div className="col-lg-4">
     {error && (
      <Message variant="danger">
       <div className="fw-bold text-center w-100">{error}</div>
      </Message>
     )}
     <div className="w-100">
      <div>
       <div className="bg-light rounded overflow-hidden shadow-sm">
        <div className="bg-dark text-light text-center p-2 fs-6 fw-bold">
         ព័ត៌មានបន្ថែម
        </div>
        <form onSubmit={submitCreate} className="">
         <div className="row p-3">
          <h6 className="col-3 py-2 fw-bold">ម្ចាស់ដី</h6>
          <div className="col-9">
           <select className="form-select" name="ownerId" required>
            <option value="">ជ្រើសរើសម្ចាស់ដី...</option>
            {userByRoles &&
             userByRoles.map((owner) => (
              <option key={owner.id} value={owner.uid}>
               {owner.name}
              </option>
             ))}
           </select>
          </div>
          <h6 className="col-3 py-2 fw-bold">ក្បាលដី</h6>
          <div className="col-9">
           <input type="text" className="form-control" name="idLand" required />
          </div>
          <h6 className="col-3 py-2 fw-bold">ស្ថានភាព</h6>
          <div className="col-9">
           <select className="form-select" name="landType" required>
            <option value="">ស្ថានភាព...</option>
            <option value="ដាក់លក់">ដាក់លក់</option>
            <option value="មិនដាក់លក់">មិនដាក់លក់</option>
           </select>
          </div>
          <h6 className="col-3 py-2 fw-bold">ទំហំ</h6>
          <div className="col-9">
           <input type="text" className="form-control" name="size" required />
          </div>
          <h6 className="col-12 py-2 fw-bold text-center">អាស័យដ្ឋាន</h6>
          <h6 className="col-3 py-2 fw-bold">ភូមិ</h6>
          <div className="col-9">
           <input type="text" className="form-control" name="vil" required />
          </div>
          <h6 className="col-3 py-2 fw-bold">ឃុំ/សង្កាត់</h6>
          <div className="col-9">
           <input type="text" className="form-control" name="com" required />
          </div>
          <h6 className="col-3 py-2 fw-bold">ស្រុក​/ខណ្ឌ</h6>
          <div className="col-9">
           <input type="text" className="form-control" name="dis" required />
          </div>
          <h6 className="col-3 py-2 fw-bold">ខេត្ដ/ក្រុង</h6>
          <div className="col-9">
           <input type="text" className="form-control" name="pro" required />
          </div>
          <div className="col-12 text-center mt-2">
           <button
            type="submit"
            className="btn btn_color px-5"
            disabled={loading ? true : false}
           >
            {loading ? <Loader /> : 'បង្កើតដី'}
           </button>
          </div>
         </div>
        </form>
       </div>
       <div className="mt-2">
        <ViewImg
         setImageLand={setImageLand}
         uploadImg={uploadImg}
         imageLand={imageLand}
         progress={progress}
        />
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default CreateLand;
