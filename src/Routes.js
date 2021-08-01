import React, { useState, Fragment } from 'react';
import MenuHeader from './dynamic/menu';
import Navbar from './dynamic/navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
} from 'react-router-dom';
import { Image } from 'antd';
import GoGlobalLogo from './asset/goglobalschool.png';

import User from './page/user';
import Login from './page/login';
import { Layout } from 'antd';

import MapScreen from './page/mapScreen';
import Report from './page/report';
import TestCreateUser from './page/TestCreateUser';
import TestLogin from './page/TestLogin';
import { useSelector } from 'react-redux';
import Land from './page/land';
import ShareLand from './page/shareland';
import Action from './page/action';
import LandDetail from './page/landdetail';
import Owner from './page/owner';
import UserDetail from './component/user/userdetail';
import OwnerDetail from './component/owner/ownerdetail';

const { Footer, Content } = Layout;
const Routes = () => {
    const { userInformation: login } = useSelector((state) => state.userLogin);
    return (
        <Router>
            <div className="App">
                <Layout style={{ minHeight: '100vh' }}>
                    {login ? (
                        <Fragment>
                            <MenuHeader />
                            <Layout className="site-layout">
                                <Navbar />
                                <Content style={{ margin: '20px' }}>
                                    <Switch>
                                        <Route exact path="/">
                                            <MapScreen />
                                        </Route>
                                        <Route path="/user">
                                            <User />
                                        </Route>
                                        <Route path="/userdetail/:id">
                                            <UserDetail />
                                        </Route>
                                        <Route path="/land">
                                            <Land />
                                        </Route>
                                        <Route path="/landdetail/:id">
                                            <LandDetail />
                                        </Route>
                                        <Route path="/reportdaily">
                                            <Report />
                                        </Route>
                                        <Route path="/shareland">
                                            <ShareLand />
                                        </Route>
                                        <Route path="/action">
                                            <Action />
                                        </Route>

                                        <Route path="/owner">
                                            <Owner />
                                        </Route>

                                        <Route path="/ownerdetail/:id">
                                            <OwnerDetail />
                                        </Route>

                                        <Route path="/signup">
                                            <TestCreateUser />
                                        </Route>
                                        <Route path="/test">
                                            <TestLogin />
                                        </Route>
                                    </Switch>
                                </Content>
                                <Footer style={{ textAlign: 'center', color: 'red', fontSize: 17 }}>
                                    <marquee>
                                        <span style={{}}>
                                            <span style={{ marginRight: 15 }}>
                                                <Image
                                                    height="25px"
                                                    width="25px"
                                                    src={GoGlobalLogo}
                                                    preview={false}
                                                />
                                            </span>
                                            <span style={{ position: 'absolute', top: 2 }}>
                                                Real Estate Company&copy;2021
                                            </span>
                                        </span>
                                    </marquee>
                                </Footer>
                            </Layout>
                        </Fragment>
                    ) : (
                        <Switch>
                            <Route>
                                <Login />
                            </Route>
                        </Switch>
                    )}
                </Layout>
            </div>
        </Router>
    );
};

export default Routes;
