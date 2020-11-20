import React from 'react';
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
import { isAuth } from '../../../actions/auth';


const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: 'auto',
  },
  grow: {
    flexGrow: 1,
  }
});

const SideDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
 <List>
  {isAuth() && <div className="pl-4 pt-3 pb-3">{"+91-"+ (isAuth() && isAuth().phone_number)}</div>}
   <Link href="/">
      <a>
       <ListItem button>
              <ListItemIcon> </ListItemIcon>
              <ListItemText primary="Book now" />
       </ListItem>
     </a>
   </Link>
   <ListItem button>
          <ListItemIcon> </ListItemIcon>
          <ListItemText primary="Orders" />
   </ListItem>
   {!isAuth() && <Link href="/login">
     <a>
       <ListItem button>
              <ListItemIcon> </ListItemIcon>
              <ListItemText primary="Login" />
       </ListItem>
    </a>
   </Link>}

   <Divider />
   <ListItem button>
          <ListItemIcon> </ListItemIcon>
          <ListItemText primary="About us" />
   </ListItem>


    <ListItem button>
           <ListItemIcon> </ListItemIcon>
           <ListItemText primary="Contact us" />
    </ListItem>

    <ListItem button>
           <ListItemIcon> </ListItemIcon>
           <ListItemText primary="Policy privacy" />
    </ListItem>
  <div className={classes.grow} />
  {isAuth() && <ListItem button>
         <ListItemIcon> </ListItemIcon>
         <ListItemText primary="Logout" />
  </ListItem>}

 </List>
    </div>
  );

  return (
    <div>

        <Button onClick={toggleDrawer('right', true)}>
          <img alt="hamburger-icon" src="/images/hamburger_icon.svg" />
        </Button>
        <SwipeableDrawer
          anchor={'right'}
          open={state['right']}
          onClose={toggleDrawer('right', false)}
          onOpen={toggleDrawer('right', true)}>
          {list('right')}
        </SwipeableDrawer>
    </div>
  );
}

export default SideDrawer;
