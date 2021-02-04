import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Drawer from '../Drawer'
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from 'next/link';
import { isAuth } from '../../../actions/auth'
import Router from "next/router";
import LoginModal from './login_modal';
import dynamic from 'next/dynamic'


const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      boxShadow: "0 0.1rem 0.5rem rgba(0, 0, 0, 0.15) !important",
      height:"85px",
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
      color: "#00C4FF",
    },
    loginBtn:{
      background:"transparent!important",
      color:"white"
    }
  })
);

const Header = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const [state, setState] = useState(false);


  const handleDrawer = () => {
      if(state){
        setState(!state)
      }
  }

  return  <>
            <AppBar position='fixed' className={classes.root} onClick={handleDrawer}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                      <Link href='/'>
                         <a>
                           <img className="icons" src="/images/logo.png" className="h-logo"/>
                        </a>
                      </Link>
                    </Typography>
                    {matches ? (
                    <>
                    <Typography />
                    <div className="header-menu row">
                       {!isAuth() && <Button className="login-btn mt-2 mr-3" variant="contained"> <i class="fas fa-envelope-open-text user-login-icon" />Contact us</Button>}
                       {!isAuth() && <span><LoginModal /></span>}
                       {isAuth() && <span className="mt-3">
                       { isAuth().user_type!=="ADMIN"&& <i className="fas fa-user-lock user-icon" />}
                       { isAuth().user_type==="ADMIN"&&  <i className="fas fa-user-lock user-icon"><small style={{fontSize:"0.6em"}}> Admin</small></i> }
                        <span className="user-phone">{`+91-` + isAuth().phone_number}</span>
                       </span>}
                       {isAuth() &&  <span className="mt-3 ml-2"><Drawer close={state} status={(status) => setState(status)} /></span>}
                     </div>
                    </>
                    ) : (
                      <>
                          <div className="header-menu row">
                      {!isAuth() && <Drawer close={state} status={(status) => setState(status)} />}
                       {/*isAuth() && <span>
                        <i className="fas fa-user-lock user-icon" />
                        <span className="user-phone">{`+91-` + isAuth().phone_number}</span>
                       </span>*/}
                       {isAuth() &&  <Drawer close={state} status={(status) => setState(status)} />}
                       </div>
                      </>
                    )}

                </Toolbar>
            </AppBar>
         </>
};
export default Header;
