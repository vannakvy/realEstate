import React from 'react'
import { Space, Popconfirm } from 'antd'
import {
    EditOutlined,
    DeleteOutlined,
    KeyOutlined,
    EyeOutlined,
    RotateRightOutlined
} from '@ant-design/icons';
import { getRoles } from '../../../function/fn';
import { Link } from 'react-router-dom';

export const landsidebarCol = ({ handleDelete, handleUserEdit,handleAccountEdit,handleUserRole, setRoleUserID , limit, page }) => {
    // let l = limit >= 20 ? limit/page : limit
    // let no = ((page-1) * l)
    let no=100
    var array = [
        {
            title: 'icon',
            dataIndex: 'icon',
            key: 'icon',
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
    ]
    return array
}