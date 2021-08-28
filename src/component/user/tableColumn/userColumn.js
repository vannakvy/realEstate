import React from 'react';
import { Space, Popconfirm } from 'antd';
import {
 EditOutlined,
 DeleteOutlined,
 KeyOutlined,
 EyeOutlined,
} from '@ant-design/icons';
import { getRoles } from '../../../function/fn';
import { Link } from 'react-router-dom';
import TotipCom from '../../TotipCom';

export const userCol = ({
 handleDelete,
 handleUserEdit,
 handleAccountEdit,
 handleUserRole,
 setRoleUserID,
 limit,
 page,
 setOpen,
 setUserEdit,
}) => {
 let l = limit >= 20 ? limit / page : limit;
 let no = (page - 1) * l;

 var array = [
  {
   title: 'តួនាទី',
   dataIndex: 'role',
   key: 'role',
   width: 50,
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

  {
   key: 'action',
   dataIndex: 'action',
   fixed: 'right',
   width: 50,
   align: 'center',
   render: (text, record) => (
    <Space size="middle">
     <TotipCom title="watch">
      <Link className="link text-info" to={'/userdetail/' + record.id}>
       <EyeOutlined />
      </Link>
     </TotipCom>

     <TotipCom title="edit">
      <span
       className="link text-warning"
       onClick={() => {
        setUserEdit(record);
        setOpen(true);
       }}
      >
       <EditOutlined />
      </span>
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
