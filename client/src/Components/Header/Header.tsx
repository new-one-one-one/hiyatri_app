import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";


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
            color: '#00C4FF'
        }
    })
);

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar style={{ backgroundColor: "white", height: '14vh' }} position="static">
                <Toolbar style={{ marginTop: '1%' }}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    ></IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Hi Yatri
          </Typography>
                    <Typography style={{ width: '20%', flexDirection: 'row' }} >
                        <span onClick={() => alert('working')} style={{ color: '#00C4FF', cursor: 'pointer' }}>CONTACT US</span>
                        <span onClick={() => alert('working')} style={{ color: '#00C4FF', marginLeft: '20%', cursor: 'pointer' }}> LOGIN</span>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};
export default Header;
