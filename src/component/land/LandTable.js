import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table, message, Select } from 'antd';
import { PlusOutlined, RotateRightOutlined } from '@ant-design/icons';
import { landCol } from './tableColumn/landColumn';
import { useDispatch, useSelector } from 'react-redux';
import { createLand, deleteLand, getLandList } from '../../actions/landActions';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import AddSharingFromLand from '../shareland/modal/addSharingFromLand';

// import EditUser from '../component/user/modal/editUser';
// import AddRole from '../component/user/modal/addRole';
// import EditAccount from '../component/user/modal/editAccount';

// const history = useHistory()

const { Option } = Select;

export default function LandTable({ landOwner, landListByUser }) {
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
 const [landAdd, setLandAdd] = useState();

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

 const handleShare = (e) => {
  setLandAdd(e);
 };

 return (
  <>
   {landAdd && (
    <AddSharingFromLand
     open={openAdd}
     setOpen={setOpenAdd}
     land={landAdd && landAdd}
    />
   )}
   <Table
    className="table-go-list"
    // caseCol({handleDelete})
    columns={landCol({
     handleDelete,
     handleUserEdit,
     handleAccountEdit,
     handleUserRole,
     setRoleUserID,
     limit,
     page,
     landOwner,
     setOpenAdd,
     handleShare,
    })}
    dataSource={landListByUser ? landListByUser : landList}
    rowKey={(record) => record.id}
    pagination={true}
    // pagination={{
    //     total: 30,
    //     //pageSizeOptions:["10", "20"],
    //     // showSizeChanger: true,
    //     current:1,
    //     onChange:((page, pageSize) => {setPage(page);setLimit(pageSize)} )
    // }}
    scroll={{ x: 400 }}
    sticky
   />
  </>
 );
}
