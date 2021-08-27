import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { userCol } from '../component/user/tableColumn/userColumn';
import { useDispatch, useSelector } from 'react-redux';
import AddUser from '../component/user/modal/addUser';
import EditUser from '../component/user/modal/editUser';
// import AddRole from '../component/user/modal/addRole';
// import EditAccount from '../component/user/modal/editAccount';
import { fetctUser } from '../function/fetchData';
import { deleteUserAccount, getUserAccount } from '../actions/authAction';
import { userTypeCol } from '../component/usertype/tableColumn/userTypeColumn';
import AddUserType from '../component/usertype/modal/addUserType';
import EditUserType from '../component/usertype/modal/editUserType';

export default function UserType() {
 const [userData, setUserData] = useState([]);
 const [page, setPage] = useState(1);
 const [limit, setLimit] = useState(2);
 const [keyword, setKeyword] = useState('');

 const [dataRoles, setDataRoles] = useState([]);
 const [openAdd, setOpenAdd] = useState(false);
 const [openEdit, setOpenEdit] = useState(false);
 const [userEdit, setUserEdit] = useState({});
 const [openRole, setOpenRole] = useState(false);
 const [roleUserID, setRoleUserID] = useState('');
 const [openEditAccount, setOpenEditAccount] = useState(false);

 const dispatch = useDispatch();
 const { userAccounts, loading: userListLoading } = useSelector(
  (state) => state.userAccountList
 );

 useEffect(() => {
  dispatch(getUserAccount());
 }, [dispatch]);

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
  console.log(e);
  dispatch(deleteUserAccount(e));
 };

 return (
  <>
   <h5>តារាងប្រភេទអ្នកប្រើប្រាស់</h5>
   <Row>
    <AddUserType open={openAdd} setOpen={setOpenAdd} />
    <EditUserType open={openEdit} setOpen={setOpenEdit} data={userEdit} />
    {/* <AddRole open={openRole} setOpen={setOpenRole} userID={roleUserID} dataRoles={dataRoles} />
            <EditAccount open={openEditAccount} setOpen={setOpenEditAccount} data={userEdit} /> */}
    <Col xs={8} md={18}>
     <Button
      // type="primary"
      style={{ backgroundColor: '#FF5A87', color: '#FFF' }}
      onClick={() => setOpenAdd(true)}
     >
      បញ្ចូលប្រភេទអ្នកប្រើប្រាស់
      <PlusOutlined />
     </Button>
    </Col>
    <Col xs={16} md={6}>
     <Input.Search
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="ស្វែងរក..."
     />
    </Col>
    <Col xs={24} style={{ marginTop: 20 }}>
     <Table
      className="table-go-list"
      columns={userTypeCol({
       handleDelete,
       handleUserEdit,
       handleAccountEdit,
       handleUserRole,
       setRoleUserID,
       limit,
       page,
       setOpen: setOpenEdit,
       setUserEdit: setUserEdit,
      })}
      loading={userListLoading}
      dataSource={userAccounts}
      rowKey={(record) => record.uid}
      pagination={true}
      //       pagination={{
      //        total: 30,
      //        current: 1,
      //        onChange: (page, pageSize) => {
      //         setPage(page);
      //         setLimit(pageSize);
      //        },
      //       }}
      scroll={{ x: 400 }}
      sticky
     />
    </Col>
   </Row>
  </>
 );
}
