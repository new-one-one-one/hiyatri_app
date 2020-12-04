import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useEffect, useState } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Drawer from '../Drawer'
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Link from 'next/link';


const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height:"70px",
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
      color: "#00C4FF",
    },
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
                    <Drawer close={state} status={(status) => setState(status)} />
                    </>
                    ) : (
                      <Drawer close={state} status={(status) => setState(status)} />
                    )}

                </Toolbar>
            </AppBar>
         </>
};
export default Header;
