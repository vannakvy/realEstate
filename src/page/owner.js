import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table, message, Select } from 'antd';
import { PlusOutlined, RotateRightOutlined } from '@ant-design/icons';
import { ownerCol } from '../component/owner/tableColumn/ownerColumn';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import AddOwner from '../component/owner/modal/addOwner';
// import EditUser from '../component/user/modal/editUser';
// import AddRole from '../component/user/modal/addRole';
// import EditAccount from '../component/user/modal/editAccount';

import { useDispatch, useSelector } from 'react-redux';
import {
 getAllLandOwner,
 deleteLandOwner,
 getUserAccount,
 getUserByRole,
} from '../actions/authAction';
import EditOwner from '../component/owner/modal/editOwner';
import AddUser from '../component/user/modal/addUser';
import EditUser from '../component/user/modal/editUser';

const { Option } = Select;

export default function Owner() {
 // const dispatch = useDispatch()
 // const {landOwnerList} = useSelector(state => state.landOwnerList)

 const [landData, setLandData] = useState([]);
 const [page, setPage] = useState(1);
 const [limit, setLimit] = useState(10);
 const [keyword, setKeyword] = useState('');

 const [dataRoles, setDataRoles] = useState([]);
 const [openAdd, setOpenAdd] = useState(false);
 const [openEdit, setOpenEdit] = useState(false);
 const [ownerEdit, setOwnerEdit] = useState({});
 const [openRole, setOpenRole] = useState(false);
 const [roleUserID, setRoleUserID] = useState('');
 const [openEditAccount, setOpenEditAccount] = useState(false);

 const dispatch = useDispatch();
 const { userByRoles, loading } = useSelector((state) => state.userByRole);

 useEffect(() => {
  // dispatch({ type: USER_UPDATE_RESET });
  // dispatch(getUserAccount());
  dispatch(getUserByRole('LANDOWNER'));
 }, [dispatch]);

 const handleUserRole = (e) => {
  setOpenRole(true);
  setDataRoles(e);
 };

 const handleOwnerEdit = (e) => {
  setOwnerEdit(e);
  setOpenEdit(true);
 };

 const handleDelete = (e) => {
  console.log(e);
  dispatch(deleteLandOwner(e));
 };

 return (
  <>
   <h5>???????????????????????????????????????</h5>
   <Row>
    <AddUser open={openAdd} setOpen={setOpenAdd} fromUser={true} />
    <EditUser
     open={openEdit}
     setOpen={setOpenEdit}
     data={ownerEdit}
     fromUser={true}
    />

    <Col xs={6} md={12}>
     <Button
      // type="primary"
      style={{ backgroundColor: '#FF5A87', color: '#FFF' }}
      onClick={() => setOpenAdd(true)}
     >
      ??????????????????????????????????????????????????????
      <PlusOutlined />
     </Button>
    </Col>
    <Col xs={24} style={{ marginTop: 20 }}>
     <Table
      className="table-go-list"
      // caseCol({handleDelete})
      columns={ownerCol({
       handleDelete,
       handleOwnerEdit,
       handleUserRole,
       setRoleUserID,
       limit,
       page,
       setOpen: setOpenEdit,
       setOwnerEdit,
      })}
      loading={loading}
      dataSource={userByRoles}
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
    </Col>
   </Row>
  </>
 );
}
