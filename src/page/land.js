import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Input, Table, message, Select } from 'antd'
import { PlusOutlined, RotateRightOutlined } from '@ant-design/icons';
import { landCol } from '../component/land/tableColumn/landColumn';


import AddUser from '../component/user/modal/addUser';
// import EditUser from '../component/user/modal/editUser';
// import AddRole from '../component/user/modal/addRole';
// import EditAccount from '../component/user/modal/editAccount';

const { Option } = Select

export default function Land() {

    const fake = [
        {
            id: 320,
            landID: "ក្បាលដីមួយ",
            address: "ភូមិ... ឃុំ... ស្រុក... ខេត្ត...",
            owner: "Dany",
            status: "ដាក់លក់"
        },
        {
            id: 323,
            landID: "thenan",
            address: "ភូមិ... ឃុំ... ស្រុក... ខេត្ត...",
            owner: "James",
            status: "ដាក់លក់"
        },
        {
            id: 326,
            landID: "dora",
            address: "ភូមិ... ឃុំ... ស្រុក... ខេត្ត...",
            owner: "Logan",
            status: "មិនដាក់លក់"
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
        if (fake) {
            setLandData(fake)
        }
    }, [])

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
            <h2>តារាងដីនីមួយៗ</h2>
            <Row>
                <AddUser open={openAdd} setOpen={setOpenAdd} />
                {/* <EditUser open={openEdit} setOpen={setOpenEdit} data={userEdit} />
            <AddRole open={openRole} setOpen={setOpenRole} userID={roleUserID} dataRoles={dataRoles} />
            <EditAccount open={openEditAccount} setOpen={setOpenEditAccount} data={userEdit} /> */}
                <Col
                    xs={6}
                    md={12}
                >
                    <Button
                        // type="primary"
                        style={{ backgroundColor: "#FF5A87", color: '#FFF' }}
                        onClick={() => setOpenAdd(true)}
                    >
                        បញ្ចូលដីថ្មី
                        <PlusOutlined />
                    </Button>
                </Col>
                <Col
                   xs={20 }
                   md={12}
                >
                    <Row>
                        <Col xs={8}>
                            <Input.Search
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="ស្វែងរក..."
                                style={{width:'100%'}}
                            />
                        </Col>
                        <Col xs={8}>
                            <Select placeholder="ស្ថានភាព" style={{ width:'100%' }} onChange={(e) => console.log(e.target.value)}>
                                <Option value={true}>ដាក់លក់</Option>
                                <Option value={false}>មិនដាក់លក់</Option>
                            </Select>
                        </Col>
                        <Col xs={8}>
                            <Select placeholder="តាមខេត្ត" style={{ width:'100%'}} onChange={(e) => console.log(e.target.value)}>
                                <Option value="សៀមរាប">សៀមរាប</Option>
                                <Option value="ភ្នំពេញ">ភ្នំពេញ</Option>
                            </Select>
                        </Col>
                    </Row>



                </Col>
                <Col
                    xs={24}
                    style={{ marginTop: 20 }}
                >
                    <Table
                        className="table-go-list"
                        // caseCol({handleDelete})
                        columns={landCol({ handleDelete, handleUserEdit, handleAccountEdit, handleUserRole, setRoleUserID, limit, page })}
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
