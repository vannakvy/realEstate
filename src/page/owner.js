import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Input, Table, message, Select } from 'antd'
import { PlusOutlined, RotateRightOutlined } from '@ant-design/icons';
import { ownerCol } from '../component/owner/tableColumn/ownerColumn';
import moment from 'moment';

// import AddUser from '../component/user/modal/addUser';
// import EditUser from '../component/user/modal/editUser';
// import AddRole from '../component/user/modal/addRole';
// import EditAccount from '../component/user/modal/editAccount';

const { Option } = Select

export default function Owner() {

    const fake = [
        {
            date: moment(new Date()).format("DD-MMM-YYYY"),
            staff: "ក្បាលដីមួយ",
            action: "សកម្មភាព ១",
            other: ".....",
            status: "completed"
        },
        {
            date: moment(new Date()).format("DD-MMM-YYYY"),
            staff: "thenan",
            action: "សកម្មភាព ២",
            other: ".....",
            status: "pending"
        },
        {
            date: moment(new Date()).format("DD-MMM-YYYY"),
            staff: "dora",
            action: "សកម្មភាព ៣",
            other: ".....",
            status: "pending"
        }
    ]

    const [landData, setLandData] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [keyword, setKeyword] = useState("")

    const [dataRoles, setDataRoles] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [userEdit, setUserEdit] = useState({});
    const [openRole, setOpenRole] = useState(false)
    const [roleUserID, setRoleUserID] = useState("")
    const [openEditAccount, setOpenEditAccount] = useState(false)

    useEffect(() => {
        if(fake) {
            setLandData(fake)
        }
    },[])

    const handleUserRole = (e) => {
        setOpenRole(true)
        setDataRoles(e)
    }

    const handleUserEdit = (e) => {
        setUserEdit(e)
        setOpenEdit(true)
    }

    const handleAccountEdit = (e) => {
        setUserEdit(e)
        setOpenEditAccount(true)
    }

    const handleDelete = (e) => {


    }

    return (
        <>
            <h2>តារាងម្ចាស់ដី</h2>
            <Row>
                {/* <AddUser open={openAdd} setOpen={setOpenAdd} /> */}
                {/* <EditUser open={openEdit} setOpen={setOpenEdit} data={userEdit} />
            <AddRole open={openRole} setOpen={setOpenRole} userID={roleUserID} dataRoles={dataRoles} />
            <EditAccount open={openEditAccount} setOpen={setOpenEditAccount} data={userEdit} /> */}
                
                <Col
                    xs={24}
                    style={{ marginTop: 20 }}
                >
                    <Table
                        className="table-go-list"
                        // caseCol({handleDelete})
                        columns={ownerCol({ handleDelete, handleUserEdit, handleAccountEdit, handleUserRole, setRoleUserID, limit, page })}
                        dataSource={landData}
                        rowKey={record => record.id}
                        pagination={true}
                        // pagination={{
                        //     total: 30,
                        //     //pageSizeOptions:["10", "20"],
                        //     // showSizeChanger: true,
                        //     current:1,
                        //     onChange:((page, pageSize) => {setPage(page);setLimit(pageSize)} )
                        // }}
                        scroll={{ x: 400 }}
                        sticky
                    />
                </Col>
            </Row>
        </>
    )
}
