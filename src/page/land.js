import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table, message, Select } from 'antd';
import { PlusOutlined, RotateRightOutlined } from '@ant-design/icons';
import { landCol } from '../component/land/tableColumn/landColumn';
import { useDispatch, useSelector } from 'react-redux';
import { createLand, deleteLand, getLandList } from '../actions/landActions';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import LandTable from '../component/land/LandTable';
import { RiSearchLine } from 'react-icons/ri';

import AddUser from '../component/user/modal/addUser';
// import EditUser from '../component/user/modal/editUser';
// import AddRole from '../component/user/modal/addRole';
// import EditAccount from '../component/user/modal/editAccount';

// const history = useHistory()

const { Option } = Select;

export default function Land() {
 const fake = [
  {
   id: 320,
   landID: 'ក្បាលដីមួយ',
   address: 'ភូមិ... ឃុំ... ស្រុក... ខេត្ត...',
   owner: 'Dany',
   status: 'ដាក់លក់',
  },
  {
   id: 323,
   landID: 'thenan',
   address: 'ភូមិ... ឃុំ... ស្រុក... ខេត្ត...',
   owner: 'James',
   status: 'ដាក់លក់',
  },
  {
   id: 326,
   landID: 'dora',
   address: 'ភូមិ... ឃុំ... ស្រុក... ខេត្ត...',
   owner: 'Logan',
   status: 'មិនដាក់លក់',
  },
 ];

 const { landList } = useSelector((state) => state.landList);
 const dispatch = useDispatch();
 useEffect(() => {
  dispatch(getLandList());
 }, [dispatch]);

 const [landData, setLandData] = useState([]);
 const [page, setPage] = useState(1);
 const [limit, setLimit] = useState(10);
 const [keyword, setKeyword] = useState('');

 const [dataRoles, setDataRoles] = useState([]);
 const [openAdd, setOpenAdd] = useState(false);
 const [openEdit, setOpenEdit] = useState(false);
 const [userEdit, setUserEdit] = useState({});
 const [openRole, setOpenRole] = useState(false);
 const [roleUserID, setRoleUserID] = useState('');
 const [openEditAccount, setOpenEditAccount] = useState(false);

 useEffect(() => {
  if (fake) {
   setLandData(fake);
  }
 }, []);

 const handleUserRole = (e) => {
  setOpenRole(true);
  setDataRoles(e);
 };

 const handleUserEdit = (e) => {
  setUserEdit(e);
  setOpenEdit(true);
 };

 const handleAccountEdit = (e) => {
  setUserEdit(e);
  setOpenEditAccount(true);
 };

 const handleDelete = (e) => {
  dispatch(deleteLand(e));
 };

 return (
  <div className="w-100">
   <h4>តារាងដីនីមួយៗ</h4>
   <Row className="w-100">
    <Col xs={20} md={12}>
     <Row>
      <Col xs={10}>
       <div class="input-group pe-2">
        <select class="form-select" style={{ maxWidth: '100px' }}>
         <option selected>ខេត្ត</option>
         <option value="ដាក់លក់">ដាក់លក់</option>
         <option value="មិនដាក់លក់">មិនដាក់លក់</option>
        </select>
        <input type="text" class="form-control" placeholder="ស្វែងរកទីនេះ..." />
        <span class="input-group-text">
         <RiSearchLine />
        </span>
       </div>
      </Col>
      <Col xs={7}>
       <div className="pe-2">
        <select class="form-select">
         <option selected>ស្ថានភាព</option>
         <option value="ដាក់លក់">ដាក់លក់</option>
         <option value="មិនដាក់លក់">មិនដាក់លក់</option>
        </select>
       </div>
      </Col>
      <Col xs={7}>
       <div className="pe-2">
        <select class="form-select">
         <option selected>តាមខេត្ត</option>
         <option value="ដាក់លក់">ដាក់លក់</option>
         <option value="មិនដាក់លក់">មិនដាក់លក់</option>
        </select>
       </div>
      </Col>
     </Row>
    </Col>
    <Col xs={6} md={12} className="text-end">
     <NavLink to="/land/create">
      <button
       className="btn"
       style={{ backgroundColor: '#25A9E0', color: '#FFF', fontSize: 14 }}
      >
       បញ្ចូលដីថ្មី
       <PlusOutlined />
      </button>
     </NavLink>
    </Col>
    <Row>
     <Col xs={24} className="w-100" style={{ marginTop: 20 }}>
      <LandTable />
     </Col>
    </Row>
   </Row>
  </div>
 );
}
