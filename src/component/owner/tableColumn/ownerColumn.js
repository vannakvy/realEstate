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

export const ownerCol = ({ handleDelete, handleOwnerEdit,handleAccountEdit,handleUserRole, setRoleUserID , limit, page }) => {
    // let l = limit >= 20 ? limit/page : limit
    // let no = ((page-1) * l)
    let no=100
    var array = [
        // {
        //     title: 'កាលបរិច្ឆេទ',
        //     dataIndex: 'date',
        //     key: 'date',
        //     width: 50,
        //     // render: (text, record) => (
        //     //     <Space size="middle">
        //     //         {no+=1}
        //     //     </Space>
        //     // ),
        // },
        {
            title: 'ឈ្មោះ',
            dataIndex: 'name',
            key: 'name',
            width: 100,
        },
        
        {
            title: 'លេខទូរស័ព្ទ',
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
                    
                    {/* <span className="link" onClick={() => handleOwnerEdit(record)}><EditOutlined /></span> */}
                    <Link className="link" to={"/ownerdetail/"+record.id}><EyeOutlined /></Link>

                    <Popconfirm
                        title="តើអ្នកពិតចង់លុបមែនឬទេ?"
                        onConfirm={() => { handleDelete(record.id) }}
                        okText="ចង់"
                        cancelText="មិនចង់"
                    >
                        <span className="link" style={{ color: "red" }}><DeleteOutlined /></span>
                    </Popconfirm>
                    {/* <Link className="link"><RotateRightOutlined /></Link> */}

                </Space>
            ),
        }
    ]
    return array
}