import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Input, Table, message, Divider} from 'antd'
import { PlusOutlined,EditOutlined } from '@ant-design/icons';

function UserDetail() {
    return (
        <>
            <h2>ព័ត៌មានគណនីបុគ្គលិក</h2>
            <Row>
                <Col className="box-detail" xs={14} >
                    <span className="link"><EditOutlined /></span>
                    <table className="detail-table">
                        <tr >
                            <td style={{width:"40%"}}>ឈ្មោះសម្គល់</td>
                            <td style={{width:"60%"}}>៖ vichet</td>
                        </tr>
                        <tr>
                            <td>ឈ្មោះពេញ</td>
                            <td>៖ វិចិត្រ ចេនសិន</td>
                        </tr>
                        <tr>
                            <td>តួនាទី</td>
                            <td>៖ ADMIN</td>
                        </tr>
                        <tr>
                            <td>ទំនាក់ទំនង</td>
                            <td>៖ 01245788</td>
                        </tr>
                    </table>
                    <Divider />
                </Col>
                <Col xs={8} >

                    <div className="box-card box-detail" >
                        <h2>សកម្មភាព</h2>
                        <Divider />
                        <table style={{width:'100%'}} className="detail-table">
                        <tr style={{borderBottom:"1px solid #CCC"}}>
                            <td>ល.រ</td>
                            <td>សកម្មភាព</td>
                            <td>កាលបរិច្ឆេទ</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>សកម្មភាព១</td>
                            <td>01-Mar-2021</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>សកម្មភាព១</td>
                            <td>01-Mar-2021</td>
                        </tr>

                        <tr>
                            <td>1</td>
                            <td>សកម្មភាព១</td>
                            <td>01-Mar-2021</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>សកម្មភាព១</td>
                            <td>01-Mar-2021</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>សកម្មភាព១</td>
                            <td>01-Mar-2021</td>
                        </tr>
                       
                    </table>
                    </div>

                </Col>
            </Row>
        </>
    )
}

export default UserDetail
