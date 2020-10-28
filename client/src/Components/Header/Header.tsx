import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import * as ICONS from "../../assets/Images/index";
import "../../index.css";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: "#00C4FF",
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div className={classes.root}>
      <AppBar
        style={{ backgroundColor: "#2A306C", height: "14vh" }}
        position="static"
      >
        <Toolbar style={{ marginTop: "1%" }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            HI-YATRI
          </Typography>
          {matches ? (
            <Typography style={{ width: "20%", flexDirection: "row" }}>
              <span
                onClick={() => alert("working")}
                style={{ color: "#00C4FF", cursor: "pointer" }}
              >
                <img className="icons" alt="contact" src={ICONS.CONTACT_ICON} />
                CONTACT US
              </span>
              <span
                onClick={() => alert("working")}
                style={{
                  color: "#00C4FF",
                  marginLeft: "20%",
                  cursor: "pointer",
                }}
              >
                <img className="icons" src={ICONS.LOGIN_ICON} alt="login" />
                LOGIN
              </span>
            </Typography>
          ) : (
            <img alt="hamburger-icon" src={ICONS.HAMBURGER_ICON}/>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
