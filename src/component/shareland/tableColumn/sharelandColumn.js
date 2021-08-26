import React from 'react';
import { Space, Popconfirm, message } from 'antd';
import { DeleteOutlined, EyeOutlined, CopyOutlined } from '@ant-design/icons';
import { getRoles } from '../../../function/fn';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import TotipCom from '../../TotipCom';

export const sharelandCol = ({
 handleDelete,
 handleUserEdit,
 handleAccountEdit,
 handleUserRole,
 setRoleUserID,
 limit,
 page,
 setCopy,
}) => {
 // let l = limit >= 20 ? limit/page : limit
 // let no = ((page-1) * l)
 let no = 100;
 var array = [
  {
   title: 'កាលបរិច្ឆេទ',
   dataIndex: 'createAt',
   key: 'createAt',
   width: 50,
   // render: (text, record) => (
   //     <Space size="middle">
   //         {no+=1}
   //     </Space>
   // ),
  },
  {
   title: 'ក្បាល់ដី',
   dataIndex: 'landID',
   key: 'landID',
   width: 100,
  },
  {
   title: 'អតិថិជន',
   dataIndex: 'customer',
   key: 'customer',
   width: 100,
  },

  {
   title: 'រយៈពេល',
   dataIndex: 'duration',
   key: 'duration',
   width: 50,
   render: (text, record) => <span>{record.duration + ' ថ្ងៃ'}</span>,
  },
  {
   title: 'ស្ថានភាព',
   dataIndex: 'status',
   key: 'status',
   width: 80,
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
     <TotipCom title="watch">
      <Link className="link" to={`/shareland/${record.id}/view`}>
       <EyeOutlined />
      </Link>
     </TotipCom>

     <Popconfirm
      title="តើអ្នកពិតចង់លុបមែនឬទេ?"
      onConfirm={() => {
       handleDelete(record.id);
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

     <TotipCom title="copy">
      <span
       className="link text-info"
       onClick={() => {
        copy('http://96.9.91.83:3000/shareland/' + record.id + '/view');
        message.success('Link Copied!');
       }}
      >
       <CopyOutlined />
      </span>
     </TotipCom>
    </Space>
   ),
  },
 ];
 return array;
};
