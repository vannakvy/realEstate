import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { userCol } from '../component/user/tableColumn/userColumn';

// import AddUser from '../component/user/modal/addUser';
// import EditUser from '../component/user/modal/editUser';
// import AddRole from '../component/user/modal/addRole';
// import EditAccount from '../component/user/modal/editAccount';

export default function User() {
 const [userData, setUserData] = useState([]);
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

 const handleDelete = (e) => {};

 return (
  <Row>
   {/* <AddUser open={openAdd} setOpen={setOpenAdd} /> */}
   {/* <EditUser open={openEdit} setOpen={setOpenEdit} data={userEdit} />
            <AddRole open={openRole} setOpen={setOpenRole} userID={roleUserID} dataRoles={dataRoles} />
            <EditAccount open={openEditAccount} setOpen={setOpenEditAccount} data={userEdit} /> */}
   <Col xs={8} md={18}>
    <Button type="primary" onClick={() => setOpenAdd(true)}>
     បញ្ចូលអ្នកប្រើប្រាស់
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
     // caseCol({handleDelete})
     columns={userCol({
      handleDelete,
      handleUserEdit,
      handleAccountEdit,
      handleUserRole,
      setRoleUserID,
      limit,
      page,
     })}
     dataSource={userData.users}
     rowKey={(record) => record.id}
     pagination={{
      total: 30,
      //pageSizeOptions:["10", "20"],
      // showSizeChanger: true,
      current: 1,
      onChange: (page, pageSize) => {
       setPage(page);
       setLimit(pageSize);
      },
     }}
     scroll={{ x: 400 }}
     sticky
    />
   </Col>
  </Row>
 );
}
