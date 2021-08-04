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

 console.log(shareObj);
 return (
  <>
   <h2>តារាងដី Sharing</h2>
   <Row>
    <AddSharing open={openAdd} setOpen={setOpenAdd} />
    {/* <EditUser open={openEdit} setOpen={setOpenEdit} data={userEdit} />
            <AddRole open={openRole} setOpen={setOpenRole} userID={roleUserID} dataRoles={dataRoles} />
            <EditAccount open={openEditAccount} setOpen={setOpenEditAccount} data={userEdit} /> */}
    <Col xs={6} md={16}>
     <Button
      // type="primary"
      style={{ backgroundColor: '#FF5A87', color: '#FFF' }}
      onClick={() => setOpenAdd(true)}
     >
      បញ្ចូលដីថ្មី
      <PlusOutlined />
     </Button>
    </Col>
    <Col xs={18} md={8}>
     <Row>
      <Col xs={8}>
       <Input.Search
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="ស្វែងរក..."
        style={{ width: '100%' }}
       />
      </Col>
      <Col xs={8}>
       <Select
        placeholder="ស្ថានភាព"
        style={{ width: '100%' }}
        onChange={(e) => console.log(e)}
       >
        <Option value={true}>expired</Option>
        <Option value={false}>sharing</Option>
       </Select>
      </Col>
      {/* <Col xs={8}>
                            <Select placeholder="តាមខេត្ត" style={{ width:'100%'}} onChange={(e) => console.log(e.target.value)}>
                                <Option value="សៀមរាប">សៀមរាប</Option>
                                <Option value="ភ្នំពេញ">ភ្នំពេញ</Option>
                            </Select>
                        </Col> */}
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
   <h1>create Share</h1>
   <Row>
    <Col md={6}>
     <form onSubmit={createShareHandler}>
      <div className="mb-3">
       <input
        type="text"
        name="landID"
        className="form-control"
        placeholder="idLand"
        onChange={onChangeShare}
        required
       />
      </div>
      <div className="mb-3">
       <input
        type="text"
        name="customer"
        className="form-control"
        placeholder="customer"
        onChange={onChangeShare}
        required
       />
      </div>
      <div className="mb-3">
       <input
        type="number"
        name="duration"
        className="form-control"
        placeholder="duration(day)"
        min={1}
        onChange={onChangeShare}
        required
       />
      </div>
      <button type="submit" className="btn btn-primary">
       Submit
      </button>
     </form>
    </Col>
   </Row>
  </>
 );
}
