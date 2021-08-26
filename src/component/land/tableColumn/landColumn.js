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
import { makeStyles, Tooltip } from '@material-ui/core';

const useStylesBootstrap = makeStyles((theme) => ({
 arrow: {
  color: theme.palette.common.black,
 },
 tooltip: {
  backgroundColor: theme.palette.common.black,
 },
}));

function BootstrapTooltip(props) {
 const classes = useStylesBootstrap();

 return <Tooltip arrow classes={classes} {...props}></Tooltip>;
}

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
 const gotoLand = (id) => {
  const win = window.open(`/land/${id}`, '_blank');
  win.focus();
 };
 // let l = limit >= 20 ? limit/page : limit
 // let no = ((page-1) * l)
 let no = 100;
 var array = [
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

     <BootstrapTooltip title="watch">
      <div onClick={() => gotoLand(record?.id)} className="link text-info">
       <EyeOutlined />
      </div>
     </BootstrapTooltip>

     <BootstrapTooltip title="edit">
      <Link to={'/land/' + record?.id + '/edit'} className="text-warning">
       <EditOutlined />
      </Link>
     </BootstrapTooltip>

     <Popconfirm
      title="តើអ្នកពិតចង់លុបមែនឬទេ?"
      onConfirm={() => {
       handleDelete(record.id);
      }}
      okText="ចង់"
      cancelText="មិនចង់"
     >
      <BootstrapTooltip title="delete">
       <span className="link" style={{ color: 'red' }}>
        <DeleteOutlined />
       </span>
      </BootstrapTooltip>
     </Popconfirm>
     <BootstrapTooltip title="share">
      <span
       className="btn_text"
       onClick={() => {
        handleShare(record.id);
        setOpenAdd(true);
       }}
      >
       <RotateRightOutlined />
      </span>
     </BootstrapTooltip>
    </Space>
   ),
  },
 ];

 let newArr = array.filter((key) => key.key !== 'owner');

 if (landOwner === true) {
  return newArr;
 }

 return array;
};
