import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
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
import Router from 'next/router';
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

const SideDrawer = ({ close, status }) => {
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

  const list = () => (
    <div className={classes.list}>
         <List>
          {isAuth() && <div className="pl-4 pt-3 pb-3">{"+91-"+ (isAuth() && isAuth().phone_number)}</div>}
           {isAuth() && <Link href="/">
              <a>
               <ListItem button>
                      <ListItemIcon><TrainIcon color="black" /></ListItemIcon>
                      <ListItemText primary="Book now" />
               </ListItem>
             </a>
           </Link>}
           {isAuth() && <Link href="/booking/user/myBookings">
              <a>
               <ListItem button>
                    <ListItemIcon><ViewListIcon color="black"/></ListItemIcon>
                    <ListItemText primary="My Bookings" />
               </ListItem>
             </a>
         </Link>}
           {!isAuth() && <Link href="/login">
             <a>
               <ListItem button>
                      <ListItemIcon><VpnKeyIcon color="black" /></ListItemIcon>
                      <ListItemText primary="Login" />
               </ListItem>
            </a>
           </Link>}
          <br />
          <Divider />
          {isAuth() && isAuth().user_type ==="ADMIN" && <Link href="/admin/userCRUD">
            <a>
              <ListItem button>
                     <ListItemIcon><PeopleIcon color="black" /></ListItemIcon>
                     <ListItemText primary="Manage User" />
              </ListItem>
           </a>
          </Link>}
          {isAuth() && isAuth().user_type ==="ADMIN" && <Link href="/admin/booking">
            <a>
              <ListItem button>
                     <ListItemIcon><TableChartIcon color="black" /></ListItemIcon>
                     <ListItemText primary="Booking List" />
              </ListItem>
           </a>
          </Link>}
          <div className={classes.grow} />
          {isAuth() && <ListItem button onClick={() => signout(() => Router.replace(`/`))}>
                 <ListItemIcon><ExitToAppIcon color="black" /></ListItemIcon>
                 <ListItemText primary="Logout" />
          </ListItem>}
          <hr />
          <div className={classes.drawerBottom} />
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

export default SideDrawer;
