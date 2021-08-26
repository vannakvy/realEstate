import React, { useEffect } from 'react';
import MenuHeader from './dynamic/menu';
import {
 BrowserRouter as Router,
 Switch,
 Route,
 Redirect,
} from 'react-router-dom';

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
import Drawer from './component/Drawer';
import ViewShareLand from './page/ViewShareLand';
import CreateLand from './page/CreateLand';
import EditLand from './page/EditLand';
import LockUI from './component/LockUI';

const { Footer, Content } = Layout;
const Routes = () => {
 const { userInformation: login } = useSelector((state) => state.userLogin);

 return (
  <Router>
   <LockUI />
   <div style={{ width: '100%' }}>
    <Layout className="">
     <Content>
      <div className="App bg_color">
       <Layout style={{ minHeight: '100vh' }}>
        {login ? (
         <Drawer>
          <div>
           <Switch>
            <Route exact path="/">
             <MapScreen />
            </Route>
            <Route path="/login" render={() => <Redirect to="/" />} />
            <Route path="/user">
             <User />
            </Route>
            <Route path="/userdetail/:id">
             <UserDetail />
            </Route>
            <Route path="/land" exact>
             <Land />
            </Route>
            <Route path="/land/create/newland">
             <CreateLand />
            </Route>
            <Route path="/land/:id/edit">
             <EditLand />
            </Route>
            <Route path="/land/:id">
             <LandDetail />
            </Route>
            <Route path="/reportdaily">
             <Report />
            </Route>
            <Route path="/shareland" exact>
             <ShareLand />
            </Route>
            <Route path="/shareland/:id/view">
             <ViewShareLand />
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
          </div>
         </Drawer>
        ) : (
         <Switch>
          <Route path="/login">
           <Login />
          </Route>
          <Route path="/shareland/:id/view">
           <ViewShareLand />
          </Route>
          <Route path="/" render={() => <Redirect to="/login" />} />
          <Route render={() => <h1>Opps! Something went wrong</h1>} />
         </Switch>
        )}
        {/* {login && <Redirect to="/" />} */}
       </Layout>
      </div>
     </Content>
    </Layout>
   </div>
  </Router>
 );
};

export default Routes;
