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
import TotipCom from '../../TotipCom';

export const ownerCol = ({
 handleDelete,
 handleOwnerEdit,
 handleAccountEdit,
 handleUserRole,
 setRoleUserID,
 limit,
 page,
 setOpen,
 setOwnerEdit,
}) => {
 // let l = limit >= 20 ? limit/page : limit
 // let no = ((page-1) * l)
 let no = 100;
 var array = [
  {
   title: 'តួនាទី',
   dataIndex: 'role',
   key: 'role',
   width: 50,
   render: (text, record) => <Space size="middle">{record?.role}</Space>,
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
     <TotipCom title="watch">
      <Link className="link text-info" to={'/ownerdetail/' + record.id}>
       <EyeOutlined />
      </Link>
     </TotipCom>
     <TotipCom title="edit">
      <div
       className="link text-warning"
       onClick={() => {
        setOwnerEdit(record);
        setOpen(true);
       }}
      >
       <EditOutlined />
      </div>
     </TotipCom>
     <Popconfirm
      title="តើអ្នកពិតចង់លុបមែនឬទេ?"
      onConfirm={() => {
       handleDelete(record.uid);
      }}
      okText="ចង់"
      cancelText="មិនចង់"
     >
      <span className="link" style={{ color: 'red' }}>
       <TotipCom title="delete">
        <DeleteOutlined />
       </TotipCom>
      </span>
     </Popconfirm>
    </Space>
   ),
  },
 ];
 return array;
};
