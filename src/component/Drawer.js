import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../asset/logoo.png';
import Profile from '../asset/profile.png';
import { NavLink, useHistory } from 'react-router-dom';
import { BsGrid } from 'react-icons/bs';
import { IoScanCircleOutline } from 'react-icons/io5';
import { FiChevronDown } from 'react-icons/fi';
import { VscSmiley } from 'react-icons/vsc';
import { FiUser } from 'react-icons/fi';
import { FiUsers } from 'react-icons/fi';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { VscSignOut } from 'react-icons/vsc';
import { signout } from '../actions/authAction';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
 root: {
  display: 'flex',
 },
 appBar: {
  transition: theme.transitions.create(['margin', 'width'], {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.leavingScreen,
  }),
 },
 appBarShift: {
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: drawerWidth,
  transition: theme.transitions.create(['margin', 'width'], {
   easing: theme.transitions.easing.easeOut,
   duration: theme.transitions.duration.enteringScreen,
  }),
 },
 menuButton: {
  marginRight: theme.spacing(2),
 },
 hide: {
  display: 'none',
 },
 drawer: {
  width: drawerWidth,
  flexShrink: 0,
 },
 drawerPaper: {
  width: drawerWidth,
 },
 drawerHeader: {
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
 },
 content: {
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create('margin', {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: -drawerWidth,
 },
 contentShift: {
  transition: theme.transitions.create('margin', {
   easing: theme.transitions.easing.easeOut,
   duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: 0,
 },
}));

export default function DrawerLeft({ children }) {
 const classes = useStyles();
 const [open, setOpen] = React.useState(true);
 const { userInformation } = useSelector((state) => state.userLogin);

 const dispatch = useDispatch();
 const history = useHistory();

 return (
  <div className={classes.root}>
   <CssBaseline />
   <AppBar
    style={{ boxShadow: 'none' }}
    position="fixed"
    className={clsx(classes.appBar, {
     [classes.appBarShift]: open,
    })}
   >
    <Toolbar className="bg-light border-bottom">
     <IconButton
      aria-label="open drawer"
      edge="start"
      onClick={() => setOpen(!open)}
      className={classes.menuButton}
     >
      <MenuIcon />
     </IconButton>
     <select
      style={{ width: 300 }}
      class="form-select"
      aria-label="Default select example"
     >
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
     </select>
    </Toolbar>
   </AppBar>
   <Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="left"
    open={open}
    classes={{
     paper: classes.drawerPaper,
    }}
   >
    <img className="mx-auto my-4" src={Logo} width="120" alt="" />
    <Divider />
    <div className="px-3 py-3 row w-100">
     <div className="col-5">
      <img
       className="rounded-circle"
       style={{ objectFit: 'cover', width: 60, height: 60 }}
       src={Profile}
       alt=""
      />
     </div>
     <div className="col mt-2 d-flex flex-column">
      <h6 className="fw-bold">{userInformation && userInformation.name}</h6>
      <p className="">{userInformation && userInformation.role}</p>
     </div>
    </div>
    <Divider />
    <p className="text-center my-1">MENU</p>
    <NavLink
     exact
     to="/"
     className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
     activeClassName="border-info bg_Nav_active"
    >
     <BsGrid /> <span className="ms-2">ទំព័រដើម</span>
    </NavLink>
    <a
     role="button"
     aria-expanded="false"
     data-bs-toggle="collapse"
     aria-controls="collapseExample"
     href="#collapseExample"
     className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
     activeClassName="border-info bg_Nav_active"
    >
     <div className="d-flex justify-content-between w-100">
      <span>
       <IoScanCircleOutline /> <span className="ms-2">ការគ្រប់គ្រងដី</span>
      </span>
      <FiChevronDown />
     </div>
    </a>
    <div class="collapse" id="collapseExample">
     <div className="w-100 d-flex flex-column">
      <NavLink
       to="/land"
       className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
       activeClassName="border-info bg_Nav_active"
      >
       <span className="ms-4">តារាងដី</span>
      </NavLink>
      <NavLink
       to="/shareland"
       className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
       activeClassName="border-info bg_Nav_active"
      >
       <span className="ms-4">តារាងដី Sharing</span>
      </NavLink>
     </div>
    </div>
    <NavLink
     to="/action"
     className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
     activeClassName="border-info bg_Nav_active"
    >
     <VscSmiley /> <span className="ms-2">សកម្មភាព</span>
    </NavLink>
    <NavLink
     to="/owner"
     className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
     activeClassName="border-info bg_Nav_active"
    >
     <FiUser /> <span className="ms-2">ម្ចាស់ដី</span>
    </NavLink>
    <a
     role="button"
     aria-expanded="false"
     data-bs-toggle="collapse"
     aria-controls="collapseExample2"
     href="#collapseExample2"
     className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
     activeClassName="border-info bg_Nav_active"
    >
     <div className="d-flex justify-content-between w-100">
      <span>
       <HiOutlineDocumentReport /> <span className="ms-2">របាយការណ៍</span>
      </span>
      <FiChevronDown />
     </div>
    </a>
    <div class="collapse" id="collapseExample2">
     <div className="w-100 d-flex flex-column">
      <NavLink
       to="/reportdaily"
       className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
       activeClassName="border-info bg_Nav_active"
      >
       <span className="ms-4">របាយការណ៍ប្រចាំថ្ងៃ</span>
      </NavLink>
     </div>
    </div>
    <a
     role="button"
     aria-expanded="false"
     data-bs-toggle="collapse"
     aria-controls="collapseExample3"
     href="#collapseExample3"
     className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
     activeClassName="border-info bg_Nav_active"
    >
     <div className="d-flex justify-content-between w-100">
      <span>
       <FiUsers /> <span className="ms-2">ការគ្រប់គ្រងបុគ្គលិក</span>
      </span>
      <FiChevronDown />
     </div>
    </a>
    <div class="collapse" id="collapseExample3">
     <div className="w-100 d-flex flex-column">
      <NavLink
       to="/user"
       className="​nav-link text-dark border-start borderNotActive border-4 ps-3"
       activeClassName="border-info bg_Nav_active"
      >
       <span className="ms-4">អ្នកប្រើប្រាស់</span>
      </NavLink>
     </div>
    </div>
    <div
     onClick={() => {
      dispatch(signout());
      history.push('/login');
     }}
     style={{ cursor: 'pointer' }}
     className="​nav-link text-danger border-start borderNotActive border-4 ps-3"
    >
     <VscSignOut className="text-danger" />{' '}
     <span className="ms-2">ទំព័រដើម</span>
    </div>
   </Drawer>
   <main
    className={clsx(classes.content, {
     [classes.contentShift]: open,
    })}
   >
    <div className={classes.drawerHeader} />
    {children}
   </main>
  </div>
 );
}
