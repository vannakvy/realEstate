import React from 'react';
import { Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, KeyOutlined,EyeOutlined } from '@ant-design/icons';
import { getRoles } from '../../../function/fn';
import { Link } from 'react-router-dom';

export const userCol = ({
 handleDelete,
 handleUserEdit,
 handleAccountEdit,
 handleUserRole,
 setRoleUserID,
 limit,
 page,
}) => {
 let l = limit >= 20 ? limit / page : limit;
 let no = (page - 1) * l;

 //  admin: false
 // createAt: t {seconds: 1627365944, nanoseconds: 205000000}
 // createdBy: "y8V7R5nwsecxL1l4ZcluK4EMOxx1"
 // email: "test@gmail.com"
 // imgUrl: ""
 // name: "test servertttt"
 // phone: "0123dsfsdfdsf"
 // uid: "2EdB2x6wvPZUGLcwfuyiecZtQME3"

 var array = [
  {
   title: 'តួនាទី',
   dataIndex: 'admin',
   key: 'admin',
   width: 50,
   render: (text, record) => (
    <Space size="middle">{record?.admin ? 'ADMIN' : 'USER'}</Space>
   ),
  },
  {
   title: 'ឈ្មោះ',
   dataIndex: 'name',
   key: 'name',
   width: 100,
  },
  {
   title: 'អ៊ីម៉ែល',
   dataIndex: 'email',
   key: 'email',
   width: 100,
  },
  {
   title: 'ទូរស័ព្ទ',
   dataIndex: 'phone',
   key: 'phone',
   width: 100,
  },
  //   {
  //    title: 'តួនាទី',
  //    dataIndex: 'roles',
  //    key: 'roles',
  //    width: 50,
  //    render: (text, record) => (
  //     <span
  //      onClick={() => {
  //       handleUserRole(record.roles);
  //       setRoleUserID(record.id);
  //      }}
  //      className="link"
  //      size="middle"
  //     >
  //      {getRoles(record.roles)}
  //     </span>
  //    ),
  //   },

  {
   key: 'action',
   dataIndex: 'action',
   fixed: 'right',
   width: 50,
   align: 'center',
   render: (text, record) => (
    <Space size="middle">
     {/* <span className="link" onClick={() => handleAccountEdit(record)}>
      <KeyOutlined />
     </span> */}
     {/* <span className="link" onClick={() => handleUserEdit(record)}>
      <EditOutlined />
     </span> */}
     <Link className="link" to={"/userdetail/"+ record.id}><EyeOutlined /></Link>
     <Popconfirm
      title="តើអ្នកពិតចង់លុបមែនឬទេ?"
      onConfirm={() => {
       handleDelete(record.uid);
      }}
      okText="ចង់"
      cancelText="មិនចង់"
     >
      <span className="link" style={{ color: 'red' }}>
       <DeleteOutlined />
      </span>
     </Popconfirm>
    </Space>
   ),
  },
 ];
 return array;
};
