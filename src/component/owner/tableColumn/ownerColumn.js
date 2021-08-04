import React from 'react';
import { Space, Popconfirm } from 'antd';
import {
 EditOutlined,
 DeleteOutlined,
 KeyOutlined,
 EyeOutlined,
 RotateRightOutlined,
} from '@ant-design/icons';
import { getRoles } from '../../../function/fn';
import { Link } from 'react-router-dom';

export const ownerCol = ({
 handleDelete,
 handleOwnerEdit,
 handleAccountEdit,
 handleUserRole,
 setRoleUserID,
 limit,
 page,
}) => {
 // let l = limit >= 20 ? limit/page : limit
 // let no = ((page-1) * l)
 let no = 100;
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
     <Link className="link" to={'/ownerdetail/' + record.id}>
      <EyeOutlined />
     </Link>
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
