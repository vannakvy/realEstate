import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
 const top = 30;
 const left = 40;

 return {
  top: `${top}%`,
  left: `${left}%`,
  transform: `translate(-${top}%, -${left}%)`,
 };
}

const useStyles = makeStyles((theme) => ({
 paper: {
  position: 'absolute',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 4, 3),
  borderRadius: '5px',
 },
}));

export default function SimpleModal(props) {
 const { onCreateL, setOnCreateL } = props;
 const classes = useStyles();
 // getModalStyle is not a pure function, we roll the style only on the first render
 const [modalStyle] = React.useState(getModalStyle);

 const handleOpen = () => {
  setOnCreateL(true);
 };

 const handleClose = () => {
  setOnCreateL(false);
 };

 const body = (
  <div style={modalStyle} className={classes.paper}>
   <h4 className="text-center kh">បង្កើតទីតាំងដី</h4>
   <form>
    <div className="mb-3">
     <label className="form-label">ឈ្មោះម្ចាស់ដី</label>
     <input type="text" className="form-control" />
    </div>
    <div className="mb-3">
     <label className="form-label">ទូរស័ព្ទ</label>
     <input type="text" className="form-control" />
    </div>
    <div className="mb-3">
     <label className="form-label">ទីតាំងដី</label>
     <select className="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
     </select>
    </div>
    <div className="mb-3">
     <label className="form-label">ក្បាល់ដី</label>
     <input type="text" className="form-control" />
    </div>
    <button type="submit" className="btn btn-success kh">
     បង្កើត
    </button>
   </form>
  </div>
 );

 return (
  <div>
   <button type="button" onClick={handleOpen}>
    Open Modal
   </button>
   <Modal
    open={onCreateL}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
   >
    {body}
   </Modal>
  </div>
 );
}
