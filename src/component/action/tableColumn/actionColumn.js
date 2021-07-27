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

export const actionCol = ({ handleDelete, handleUserEdit,handleAccountEdit,handleUserRole, setRoleUserID , limit, page }) => {
    // let l = limit >= 20 ? limit/page : limit
    // let no = ((page-1) * l)
    let no=100
    var array = [
        {
            title: 'កាលបរិច្ឆេទ',
            dataIndex: 'date',
            key: 'date',
            width: 50,
            // render: (text, record) => (
            //     <Space size="middle">
            //         {no+=1}
            //     </Space>
            // ),
        },
        {
            title: 'ឈ្មោះ',
            dataIndex: 'staff',
            key: 'staff',
            width: 100,
        },
        {
            title: 'សកម្មភាព',
            dataIndex: 'action',
            key: 'action',
            width: 100,
        },

        {
            title: 'ស្ថានភាព',
            dataIndex: 'status',
            key: 'status',
            width: 80,
        },
        
        {
            title: 'other',
            dataIndex: 'other',
            key: 'other',
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
                    {/* <Link className="link"><EyeOutlined /></Link> */}

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