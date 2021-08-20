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

export const landCol = ({
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
}) => {
 // let l = limit >= 20 ? limit/page : limit
 // let no = ((page-1) * l)
 let no = 100;
 var array = [
  {
   title: 'ID',
   dataIndex: 'id',
   key: 'id',
   width: 50,
   // render: (text, record) => (
   //     <Space size="middle">
   //         {no+=1}
   //     </Space>
   // ),
  },

  {
   title: 'ក្បាល់ដី',
   dataIndex: 'idLand',
   key: 'idLand',
   width: 50,
  },
  {
   title: 'អាសយដ្ឋាន',
   dataIndex: 'address',
   key: 'address',
   width: 120,
   render: (text, record) => (
    <Space size="middle">
     {'ភូមិ' +
      record?.add?.vil +
      ' ឃុំ' +
      record?.add?.com +
      ' ស្រុក' +
      record?.add?.dis +
      ' ខេត្ត' +
      record?.add?.pro}
    </Space>
   ),
  },

  {
   title: 'ម្ចាស់ដី',
   dataIndex: 'owner',
   key: 'owner',
   width: 80,
   render: (text, record) => (
    <Space size="middle">{record?.owner?.ownerId}</Space>
   ),
  },
  {
   title: 'ស្ថានភាព',
   dataIndex: 'landType',
   key: 'landType',
   width: 50,
  },

  {
   key: 'action',
   dataIndex: 'action',
   fixed: 'right',
   width: 50,
   align: 'center',
   render: (text, record) => (
    <Space size="middle">
     {/* <span className="link" onClick={() => handleAccountEdit(record)}><KeyOutlined /></span> */}
     <Link
      to={'/ownerdetail/' + record?.owner?.ownerId + '?landId=' + record.id}
      className="link"
     >
      <EyeOutlined />
     </Link>

     <Popconfirm
      title="តើអ្នកពិតចង់លុបមែនឬទេ?"
      onConfirm={() => {
       handleDelete(record.id);
      }}
      okText="ចង់"
      cancelText="មិនចង់"
     >
      <span className="link" style={{ color: 'red' }}>
       <DeleteOutlined />
      </span>
     </Popconfirm>
     <span
      className="btn_text"
      onClick={() => {
       handleShare(record.id);
       setOpenAdd(true);
      }}
     >
      <RotateRightOutlined />
     </span>
    </Space>
   ),
  },
 ];

 let newArr = array.filter(
  (key) => key.key !== 'address' && key.key !== 'owner'
 );

 if (landOwner === true) {
  return newArr;
 }

 return array;
};
