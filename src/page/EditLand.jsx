import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import MapDrawCreate from '../components/MapDrawCreate';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByRole } from '../actions/authAction';
import { createLand, getLandById, updateLand } from '../actions/landActions';
import Message from '../component/Message';
import { LAND_CREATE_RES } from '../constants/land';
import Loader from '../component/Loader';
import { storageRef } from '../firebase/db';
import ViewImg from '../component/ViewImg';
import MapDraw from '../components/MapDraw';

const EditLand = () => {
 const { id } = useParams();
 const history = useHistory();
 const dispatch = useDispatch();
 const [coordinates, setCoordinates] = useState([]);
 const [imageLand, setImageLand] = useState([]);
 const [progress, setProgress] = useState(0);
 const [land, setLand] = useState({});
 const [posi, setPosi] = useState([12.5657, 104.991]);
 const [zoom, setZoom] = useState(8);
 const [landMap, setLandMap] = useState([]);

 const { userByRoles } = useSelector((state) => state.userByRole);
 const { success, error, loading } = useSelector((state) => state.updateLand);
 const { landById } = useSelector((state) => state.landById);

 useEffect(() => {
  dispatch(getUserByRole('LANDOWNER'));
 }, [dispatch]);

 useEffect(() => {
  if (!landById || landById.id !== id) {
   dispatch(getLandById(id));
  } else {
   setLand({
    id: landById.id,
    ownerId: landById.owner && landById.owner.ownerId,
    idLand: landById.idLand,
    landType: landById.landType,
    pro: landById.add && landById.add.pro,
    dis: landById.add && landById.add.dis,
    com: landById.add && landById.add.com,
    vil: landById.add && landById.add.vil,
    size: landById.owner && landById.owner.size,
   });

   setImageLand(landById.img || []);
   setCoordinates(landById.coordinates);
  }
 }, [dispatch, id, landById]);

 useEffect(() => {
  setLandMap([]);
  setZoom(8);
  if (
   landById !== undefined &&
   landById !== {} &&
   landById.id &&
   landById.coordinates &&
   landById.coordinates[0]
  ) {
   setLandMap([landById]);
   setPosi([landById.coordinates[0].lat, landById.coordinates[0].lng]);
   setZoom(19);
  }
 }, [landById]);

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

 const submitUpdate = (e) => {
  e.preventDefault();

  const data = {
   ...land,
   img: imageLand,
   coordinates: coordinates,
  };

  dispatch(updateLand(data));
 };

 const onChange = (e) => {
  setLand({ ...land, [e.target.name]: e.target.value });
 };

 return (
  <div>
   <h5>តារាងបញ្ចូលដីថ្មី</h5>
   <NavLink className="text-primary" to="/">
    <IoHome style={{ marginTop: -5 }} /> / ទំព័រដើម
   </NavLink>
   <div className="mt-2 w-100 row">
    <div className="col-lg-8">
     <MapDrawCreate
      pos={posi}
      zoom={zoom}
      landList={landMap}
      setCoordinates={setCoordinates}
     />
    </div>

    <div className="col-lg-4">
     <div className="">
      {error && (
       <Message variant="danger">
        <div className="fw-bold text-center w-100">{error}</div>
       </Message>
      )}
      <div className="bg-light rounded overflow-hidden shadow-sm">
       <div className="bg-dark text-light text-center p-2 fs-6 fw-bold">
        ព័ត៌មានបន្ថែម
       </div>
       <form onSubmit={submitUpdate} className="">
        <div className="row p-3">
         <h6 className="col-3 py-2 fw-bold">ក្បាលដី</h6>
         <div className="col-9">
          <input
           onChange={onChange}
           type="text"
           value={land && land.idLand}
           className="form-control"
           name="idLand"
           required
           readOnly
          />
         </div>
         <h6 className="col-3 py-2 fw-bold">ម្ចាស់ដី</h6>
         <div className="col-9">
          <select
           onChange={onChange}
           className="form-select"
           value={land && land.ownerId}
           name="ownerId"
           required
          >
           <option value="">ជ្រើសរើសម្ចាស់ដី...</option>
           {userByRoles &&
            userByRoles.map((owner) => (
             <option key={owner.id} value={owner.uid}>
              {owner.name}
             </option>
            ))}
          </select>
         </div>

         <h6 className="col-3 py-2 fw-bold">ស្ថានភាព</h6>
         <div className="col-9">
          <select
           onChange={onChange}
           value={land && land.landType}
           className="form-select"
           name="landType"
           required
          >
           <option value="">ស្ថានភាព...</option>
           <option value="ដាក់លក់">ដាក់លក់</option>
           <option value="មិនដាក់លក់">មិនដាក់លក់</option>
          </select>
         </div>
         <h6 className="col-3 py-2 fw-bold">ទំហំ</h6>
         <div className="col-9">
          <input
           onChange={onChange}
           type="text"
           value={land && land.size}
           className="form-control"
           name="size"
           required
          />
         </div>
         <h6 className="col-12 py-2 fw-bold text-center">អាស័យដ្ឋាន</h6>
         <h6 className="col-3 py-2 fw-bold">ភូមិ</h6>
         <div className="col-9">
          <input
           onChange={onChange}
           type="text"
           value={land && land.vil}
           className="form-control"
           name="vil"
           required
          />
         </div>
         <h6 className="col-3 py-2 fw-bold">ឃុំ/សង្កាត់</h6>
         <div className="col-9">
          <input
           onChange={onChange}
           type="text"
           value={land && land.com}
           className="form-control"
           name="com"
           required
          />
         </div>
         <h6 className="col-3 py-2 fw-bold">ស្រុក​/ខណ្ឌ</h6>
         <div className="col-9">
          <input
           onChange={onChange}
           type="text"
           value={land && land.dis}
           className="form-control"
           name="dis"
           required
          />
         </div>
         <h6 className="col-3 py-2 fw-bold">ខេត្ដ/ក្រុង</h6>
         <div className="col-9">
          <input
           onChange={onChange}
           type="text"
           value={land && land.pro}
           className="form-control"
           name="pro"
           required
          />
         </div>
         <div className="col-12 text-center mt-2">
          <button
           type="submit"
           className="btn btn_color px-5 fw-bold"
           disabled={loading ? true : false}
          >
           {loading ? <Loader /> : 'រក្សាទុក'}
          </button>
         </div>
        </div>
       </form>
      </div>
     </div>
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
 );
};

export default EditLand;
