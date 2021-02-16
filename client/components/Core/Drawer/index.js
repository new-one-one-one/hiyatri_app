import React, { useState, useEffect } from 'react';
import LoginModal from '../Header/login_modal';
import clsx from 'clsx';
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles';
import {Button, ListItemAvatar, Avatar} from '@material-ui/core';
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
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import TrainOutlinedIcon from '@material-ui/icons/TrainOutlined';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const SwipeableDrawer = dynamic(() => import('@material-ui/core/Drawer'), {
  ssr: false,
})

const useStyles = makeStyles({
  list: {
    paddingTop:28,
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

         {/*!isAuth() && <ListItem button>
               <LoginModal />
              </ListItem>*/}
         {isAuth() && <ListItem>
           <ListItemAvatar>
             <Avatar>
               <PhoneRoundedIcon/>
             </Avatar>
           </ListItemAvatar>
                <ListItemText primary={isAuth() && <div>{"+91-"+ (isAuth() && isAuth().phone_number)}</div>} />
          </ListItem>}

           <Divider />
           {isAuth() && <Link href="/booking/profile">
              <a className={classes.menu}>
               <ListItem button style={currentTabStyle("/booking/profile", router.pathname)}>
                      <ListItemIcon><PermIdentityIcon/></ListItemIcon>
                      <ListItemText primary="My Profile" />
               </ListItem>
              <Divider />
             </a>
           </Link>}
           {isAuth() && <Link href="/">
              <a className={classes.menu}>
               <ListItem button style={currentTabStyle("/", router.pathname)}>
                      <ListItemIcon><TrainOutlinedIcon/></ListItemIcon>
                      <ListItemText primary="Book now" />
               </ListItem>
              <Divider />
             </a>
           </Link>}



           {isAuth() && <Link href="/booking/my_bookings">
              <a className={classes.menu}>
               <ListItem button style={currentTabStyle("/booking/my_bookings", router.pathname)}>
                    <ListItemIcon><FormatListBulletedIcon/></ListItemIcon>
                    <ListItemText primary="My Bookings" />
               </ListItem>
               <Divider />
             </a>
         </Link>}

          {isAuth() && isAuth().user_type ==="ADMIN" && <Link href="/admin/manage_user">
            <a className={classes.menu}>
              <ListItem button style={currentTabStyle("/admin/manage_user", router.pathname)}>
                     <ListItemIcon><PeopleOutlineIcon /></ListItemIcon>
                     <ListItemText primary="Manage User" />
              </ListItem>
              <Divider />
           </a>
          </Link>}
          {isAuth() && isAuth().user_type ==="ADMIN" && <Link href="/admin/booking">
            <a className={classes.menu}>
              <ListItem button style={currentTabStyle("/admin/booking", router.pathname)}>
                     <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
                     <ListItemText primary="Manage Booking" />
              </ListItem>
              <Divider />
           </a>
          </Link>}

          {/* {isAuth() && isAuth().user_type ==="ADMIN" && <Link href="/bulk_booking">
            <a className={classes.menu}>
              <ListItem button style={currentTabStyle("/bulk_booking", router.pathname)}>
                     <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
                     <ListItemText primary="Bulk Booking" />
              </ListItem>
              <Divider />
           </a>
          </Link>} */}
          <Divider/>

          {isAuth() && isAuth().user_type ==="ADMIN" && <Link href="/admin/bulk_booking_list">
            <a className={classes.menu}>
              <ListItem button style={currentTabStyle("/bulk_booking_list", router.pathname)}>
                     <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
                     <ListItemText primary="Bulk Booking" />
              </ListItem>
              <Divider />
           </a>
          </Link>}

          <Divider/>
          <div className={classes.grow} />
          {isAuth() && <ListItem button onClick={() => signout(() => Router.replace(`/`))}>
                 <ListItemIcon><PowerSettingsNewIcon/></ListItemIcon>
                 <ListItemText primary="Logout" />
          </ListItem>}
          <Divider/>








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
