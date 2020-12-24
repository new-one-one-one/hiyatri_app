import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Link from 'next/link';
import { isAuth,signout } from '../../../actions/auth';
import Router, {withRouter} from 'next/router';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ViewListIcon from '@material-ui/icons/ViewList';
import TrainIcon from '@material-ui/icons/Train';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TableChartIcon from '@material-ui/icons/TableChart';
import PeopleIcon from '@material-ui/icons/People';
const useStyles = makeStyles({
  list: {
    width: 220
  },
  fullList: {
    width: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  hamburger:{
    border:"0px solid white"
  },
  menu:{
    color: "black"
  },
  drawerBottom:{
    textAlign: "center",
    padding: "10px 0px 40px 0px",
    backgroundColor:"rgb(42,48,108)",
    position: "fixed",
    height: "40px",
    bottom: "0px",
    width: "220px",
  }
});

const SideDrawer = ({ close, status, router }) => {
  const classes = useStyles();
  const [state, setState] = useState(false);

  useEffect(() => {
     setState(close)
  },[close])

  const toggleDrawer = () => {
    if(state){
        setState(false)
       return status(false)
    }
    setState(true)
    status(true)
  };

  const currentTabStyle = (path, url) => {
    if(path === url){
      return { backgroundColor: "rgb(42,48,108)", color:"white" }
    }
  }

  const list = () => (
    <div className={classes.list}>
         <List>
          {isAuth() && <div className="pl-5 pt-3 pb-3 pr-4">{"+91-"+ (isAuth() && isAuth().phone_number)}</div>}
           {isAuth() && <Link href="/">
              <a className={classes.menu}>
               <ListItem button style={currentTabStyle("/", router.pathname)}>
                      <ListItemIcon><TrainIcon color="black" /></ListItemIcon>
                      <ListItemText primary="Book now" />
               </ListItem>
             </a>
           </Link>}
           {isAuth() && <Link href="/booking/my_bookings">
              <a className={classes.menu}>
               <ListItem button style={currentTabStyle("/booking/my_bookings", router.pathname)}>
                    <ListItemIcon><ViewListIcon color="black" /></ListItemIcon>
                    <ListItemText primary="My Bookings" />
               </ListItem>
             </a>
         </Link>}
           {/*!isAuth() && <Link href="/login">
             <a className={classes.menu}>
               <ListItem button style={currentTabStyle("/login", router.pathname)} className="mt-1">
                      <ListItemIcon><VpnKeyIcon color="black" /></ListItemIcon>
                      <ListItemText primary="Login" />
               </ListItem>
            </a>
           </Link>*/}

          {isAuth() && isAuth().user_type ==="ADMIN" && <Link href="/admin/manage_user">
            <a className={classes.menu}>
              <ListItem button style={currentTabStyle("/admin/manage_user", router.pathname)}>
                     <ListItemIcon><PeopleIcon color="black" /></ListItemIcon>
                     <ListItemText primary="Manage User" />
              </ListItem>
           </a>
          </Link>}
          {isAuth() && isAuth().user_type ==="ADMIN" && <Link href="/admin/booking">
            <a className={classes.menu}>
              <ListItem button style={currentTabStyle("/admin/booking", router.pathname)}>
                     <ListItemIcon><TableChartIcon color="black" /></ListItemIcon>
                     <ListItemText primary="Manage Booking" />
              </ListItem>
           </a>
          </Link>}
          <div className={classes.grow} />
          {isAuth() && <ListItem button onClick={() => signout(() => Router.replace(`/`))}>
                 <ListItemIcon><ExitToAppIcon color="black" /></ListItemIcon>
                 <ListItemText primary="Logout" />
          </ListItem>}

          {/*<div className={classes.drawerBottom} />*/}
         </List>
    </div>
  );

  return (
    <div>
        <Button onClick={toggleDrawer} className={classes.hamburger}>
           <img alt="hamburger-icon" src="/images/hamburger_icon.svg" />
        </Button>
        <SwipeableDrawer
          anchor={'right'}
          open={state}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}>
          {list()}
        </SwipeableDrawer>
    </div>
  );
}

export default withRouter(SideDrawer);
