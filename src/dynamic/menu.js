import React, { Fragment, useState } from 'react';
import { Layout, Menu, Image, Divider } from 'antd';
import {
  SettingOutlined,
  ContainerOutlined,
  TeamOutlined,
  ExportOutlined,
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  BankOutlined,
  ReconciliationOutlined,
  AuditOutlined,
} from '@ant-design/icons';
import Logo from '../asset/srLogo.png';
import LogoCompany from '../asset/logo-company.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../actions/authAction';
import { keyMenu } from '../function/fn';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function MenuHeader() {
  const urlPath = useLocation().pathname;
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  // const token =()=>{
  //     let newToken =  JSON.parse(localStorage.getItem('user'))
  //     return newToken?.token
  //   }

  const handleLoggout = () => {
    dispatch(signout());
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{
        // backgroundColor: '#06385f'
        // backgroundColor: '#22252A'
        // backgroundColor:'#1e3b87'
        // backgroundColor:'#005438'
        background:
          'repeating-linear-gradient(-55deg,#005b3d,#005b3d 30px,#005438 30px,#005438 40px)',
      }}
    >
      <Link to="/">
        <div className="logo">
          <Image
            width={'100%'}
            className="img-logo"
            src={LogoCompany}
            preview={false}
          />
        </div>
      </Link>
      <Divider style={{ background: '#FFF', height: 2 }} />
      <Menu
        theme="dark"
        // defaultSelectedKeys={[urlPath]}
        selectedKeys={[keyMenu(urlPath)]}
        mode="inline"
        style={
          {
            // backgroundColor: '#06385f'
            // backgroundColor:'#1e3b87'
            // backgroundColor: '#22252A'
            // backgroundColor:'#005438'
            // background: 'repeating-linear-gradient(-55deg,#006745,#006745 10px,#005438 10px,#005438 20px)'
            // backgroundColor:"none"
            // background: repeating-linear-gradient(
            //     -55deg,
            //     #222,
            //     #222 10px,
            //     #333 10px,
            //     #333 20px
            //   );
          }
        }
      >
        <Menu.Item
          key="/"
          style={{ fontSize: 16 }}
          icon={<HomeOutlined />}
        >
          ទំព័រដើម
          <Link to="/" />
        </Menu.Item>

        <SubMenu
          key="sub2"
          style={{ fontSize: 16 }}
          icon={<ContainerOutlined />}
          title="ការគ្រប់គ្រងដី"
        >
          <Menu.Item
            key="/land"
            style={{ backgroundColor: '#009966' }}
            // icon={<HomeOutlined />}
          >
            តារាងដី
            <Link to="/land" />
          </Menu.Item>

          <Menu.Item
          key="/shareland"
          style={{ backgroundColor: '#009966' }}
        >
          តារាងដី Sharing
          <Link to="/shareland" />
        </Menu.Item>
        </SubMenu>

        

        <Menu.Item
          key="/action"
          style={{ fontSize: 16 }}
          icon={<HomeOutlined />}
        >
          សកម្មភាព
          <Link to="/action" />
        </Menu.Item>

        <Menu.Item
          key="/owner"
          style={{ fontSize: 16 }}
          icon={<HomeOutlined />}
        >
          ម្ចាស់ដី
          <Link to="/owner" />
        </Menu.Item>

        <SubMenu
          key="sub1"
          style={{ fontSize: 16 }}
          icon={<ContainerOutlined />}
          title="របាយការណ៍"
        >
          <Menu.Item style={{ backgroundColor: '#009966' }} key="/reportdaily">
            របាយការណ៍ប្រចាំថ្ងៃ
            <Link to="/reportdaily" />
          </Menu.Item>
          {/* <Menu.Item key="5">
                        របាយការណ៍ទាំងមូល
                        <Link to="/reportall" />
                    </Menu.Item> */}
        </SubMenu>
        {/* <Menu.Item key="/setting" icon={<SettingOutlined />}>
                    ការកំណត់
                    <Link to="/setting" />
                </Menu.Item> */}
        <SubMenu
          key="sub3"
          style={{ fontSize: 16 }}
          icon={<ContainerOutlined />}
          title="ការគ្រប់គ្រងបុគ្គលិក"
        >
           <Menu.Item
          key="/user"
          style={{ backgroundColor: '#009966' }}
        >
          អ្នកប្រើប្រាស់
          <Link to="/user" />
        </Menu.Item>
        </SubMenu>
       

        <Menu.Item
          // onClick={() => auth.signOut()}
          style={{ fontSize: 16 }}
          key="6"
          icon={<ExportOutlined />}
          onClick={() => handleLoggout()}
        >
          ចាកចេញ
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
