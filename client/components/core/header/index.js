import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import { Button as AntButton } from 'antd';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  margin: "5px"
}));

 const Header = () => {
 const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.grow} />
          <div>
            <AntButton ghost className="h-btn">CONTACT US</AntButton>
            <AntButton ghost className="h-btn">LOGIN</AntButton>
          </div>
        </Toolbar>
      </AppBar>

    </>
  );
}

export default Header;
