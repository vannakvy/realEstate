import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Input, Table, message, Select } from 'antd';
import { PlusOutlined, RotateRightOutlined } from '@ant-design/icons';
import { sharelandCol } from '../component/shareland/tableColumn/sharelandColumn';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
 createShareLand,
 getShareLand,
 deleteShareLand,
} from '../actions/SharingActions';
import copy from 'copy-to-clipboard';

import AddSharing from '../component/shareland/modal/addSharing';
// import EditUser from '../component/user/modal/editUser';
// import AddRole from '../component/user/modal/addRole';
// import EditAccount from '../component/user/modal/editAccount';

const { Option } = Select;

export default function ShareLand() {
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
 const [shareObj, setShareObj] = useState({
  landID: '',
  duration: 1,
  customer: '',
 });

 const { shareLand } = useSelector((state) => state.shareLand);
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getShareLand());
 }, []);

 useEffect(() => {
  if (shareLand) {
   const items = [];
   shareLand.forEach((land) => {
    items.push({
     ...land,
     status: land.expireAt >= new Date().getTime() ? 'sharing' : 'expired',
     createAt: moment(land.createAt).format('DD-MMM-YYYY'),
    });
   });
   setLandData(items);
  }
 }, [shareLand]);
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
  dispatch(deleteShareLand(e));
 };

 const onChangeShare = (e) => {
  setShareObj({ ...shareObj, [e.target.name]: e.target.value });
 };

 const createShareHandler = (e) => {
  e.preventDefault();
  dispatch(
   createShareLand({
    ...shareObj,
    duration: Number(shareObj.duration),
   })
  );
 };

 return (
  <>
   <h2>????????????????????? Sharing</h2>
   <Row>
    <AddSharing open={openAdd} setOpen={setOpenAdd} />

    <Col xs={18} md={8}>
     <Row>
      <Col xs={8}>
       <Input.Search
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="?????????????????????..."
        style={{ width: '100%' }}
       />
      </Col>
      <Col xs={8}>
       <Select
        placeholder="????????????????????????"
        style={{ width: '100%' }}
        onChange={(e) => console.log(e)}
       >
        <Option value={true}>expired</Option>
        <Option value={false}>sharing</Option>
       </Select>
      </Col>
     </Row>
    </Col>
    <Col xs={24} style={{ marginTop: 20 }}>
     <Table
      className="table-go-list"
      // caseCol({handleDelete})
      columns={sharelandCol({
       handleDelete,
       handleUserEdit,
       handleAccountEdit,
       handleUserRole,
       setRoleUserID,
       limit,
       page,
      })}
      dataSource={landData}
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
