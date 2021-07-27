import React, { useContext } from 'react'
import { Layout } from 'antd'
import {UserSwitchOutlined} from '@ant-design/icons'

const { Header } = Layout

export default function Navbar() {

    return (
        // background:'#0087c0'
        
        <Header className="site-layout-background" style={{ padding: 0, textAlign: "right", background: 'repeating-linear-gradient(-55deg,#005b3d,#005b3d 30px,#005438 30px,#005438 40px)'}}>
            <p style={{ color: "white", paddingRight: 20}}><UserSwitchOutlined style={{fontSize:25}} />Vannak Vy</p>
        </Header>
    )
}
