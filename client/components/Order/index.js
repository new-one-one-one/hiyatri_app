import {Paper} from "@material-ui/core";
import TrainIcon from '@material-ui/icons/Train';
import FilterListIcon from '@material-ui/icons/FilterList';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import useWindowSize from './windowDimension';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { Height } from "@material-ui/icons";
import { getCookie, isAuth } from "../../actions/auth";
import {Theme,
        makeStyles,
        withStyles,
        createStyles} from "@material-ui/core/styles";
import {Grid,
        FormControlLabel,
        Box,Button,
        TextField,
        List,
        Avatar,
        ListItemText,
        ListItemAvatar,
        ListItem,
        CardContent,
        Typography,
        Divider} from "@material-ui/core";
import {IconButton,
        AppBar,
        Toolbar,
        Menu,
        MenuItem} from "@material-ui/core";



const AquaBlueCheckBox = withStyles({
  root: {
    '&$checked': {
      color: "aqua",
    },
  },
  checked: {},
})(CheckboxProps => <Checkbox color="default" />);


const useStyles = makeStyles(Theme =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    AppBarColor:{
      background:"#000066"
    },
    inputRoot: {
      color: 'inherit',
    },
    sectionDesktop: {
      display: 'none',
      [Theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [Theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    root: {
      flexGrow: 1,
      marginLeft:"5%",
      marginRight:"5%",
      marginTop:"5%",
    },
    paper: {
      padding: 20,
      textAlign: "center",
      color: Theme.palette.text.secondary,
      fontFamily: "Roboto",

    },
    allOrders:{
      overflow:"none",
      flexGrow: 1,
      borderRadius:"10px",
      width:"600px",
      minWidth:"400px",
      maxWidth:"1000px",
      WebkitBoxShadow:"2px 2px 2px 2px #9E9E9E",
      MozBoxShadow :"2px 2px 2px 2px #9E9E9E",
      boxShadow:"2px 2px 2px 2px #9E9E9E"
    },
    particularOrder: {
      flex:1,
      marginLeft:"2%",
      marginRight:"2%",
      marginBottom:"3%",
      paddingLeft:"5px",
      paddingRight:"5px",
      borderColor:"#000066",
      borderWidth:"1.5px",
      paddingBottom:"10px",
      paddingTop:"10px"
    },
    innerDetails:{
      padding:"4px 8px 1px 5px",
      color:"grey",
    },
    promocode:{
      WebkitBoxShadow:"2px 2px 2px 2px #9E9E9E",
      MozBoxShadow :"2px 2px 2px 2px #9E9E9E",
      boxShadow:"2px 2px 2px 2px #9E9E9E",
      paddingTop:"10px",
      // maxHeight:"50px",
      minHeight:"50px",
      paddingLeft:"2px",

    },

    orderFull:{
      WebkitBoxShadow:"2px 2px 2px 2px #9E9E9E",
      MozBoxShadow :"2px 2px 2px 2px #9E9E9E",
      boxShadow:"2px 2px 2px 2px #9E9E9E",
      borderRadius:"10px"

    },
    Services :{
      WebkitBoxShadow:"2px 2px 2px 2px #9E9E9E",
      MozBoxShadow :"2px 2px 2px 2px #9E9E9E",
      boxShadow:"2px 2px 2px 2px #9E9E9E",
      paddingTop:"10px",
      paddingBottom:"5px",
      borderRadius:"10px",
    },

    outerDetails:{
      padding:"10px 8px 2px 5px",
      color:"#000066",
    },
    headingPart:{
      borderRadius:"4px 4px 0px 0px",
      marginLeft:"2%",
      marginRight:"2%",
      backgroundColor:"#000066",
      color:"white"
    },
    wholeList:{
      paddingBottom:"5px",
      borderColor:"#000066",
      borderWidth:"1.5px",
    },
    mobileButton:{
    maringBottom:"0%",
    width:"100%",
    backgroundColor:"#00FFFF",
    color:"white",
    fontWeight:"bold",
    marginTop:"10px",
    height:"40px"
    },
    buttonMobile:{
      background:"#00FFFF",
      top:'auto',
      bottom:0
    }
  }));


const FinalORder = ({ data }) => {
const token = getCookie('token');
const { width } = useWindowSize();
const classes = useStyles();
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState();
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
const handleMobileMenuClose = () => {setMobileMoreAnchorEl(null);};
const handleMobileMenuOpen = (event) => { setMobileMoreAnchorEl(event.currentTarget) };


return  <>
   <div className={classes.root}>
      <h5>Summary</h5>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
               <Paper className={classes.orderFull}>
                        <br />
                        <Box className={classes.headingPart} p={2}>
                            <Typography>
                              Meeting Services
                            </Typography>
                        </Box>
                        <Paper variant="outlined" className={classes.particularOrder}>
                            <Grid container spacing={1}>
                                   <Grid container spacing={3}>
                                        <Grid  item xs={4}>
                                           <b> Meeting Station </b>
                                        </Grid>
                                        <Grid  item xs={4}>
                                           <b> Time Of arrival  </b>
                                        </Grid>
                                        <Grid  item xs={4}>
                                           <b> Number of passengers </b>
                                       </Grid>
                                   </Grid>
                                   <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                         New Delhi
                                        </Grid>
                                        <Grid  item xs={2}>
                                           <Typography align="center">
                                              12:35
                                           </Typography>
                                        </Grid>
                                        <Grid  item xs={4}>
                                          <Typography align="right">
                                            4
                                          </Typography>
                                        </Grid>
                                  </Grid>
                            </Grid>
                        </Paper>
                        <Paper variant="outlined" className={classes.particularOrder}>
                              <div className={classes.outerDetails}>
                              <Grid container xs={12} justify="space-between">
                              <Typography  variant="body1" align="left">
                                 Ram Sahara
                              </Typography>
                              <Typography  variant="body1" align="right">Rs.580</Typography>
                              </Grid>
                              </div>
                              <Divider/>
                              <div className={classes.innerDetails} >
                                <Grid container xs={12} justify="space-between">
                                    <Typography  variant="body2"  align="left">
                                        Meet & Greet
                                    </Typography>
                                    <Typography  variant="body2" align="right">
                                    Rs.500
                                    </Typography>
                                </Grid>
                              </div>
                              </Paper>
                              <br />
                        </Paper>
                        <br/>
                        <Paper className={classes.Services}>
                                <Box className={classes.headingPart} p={1}>
                                  <Typography>
                                    Other Services
                                  </Typography>
                                </Box>
                                <Paper className={classes.particularOrder} variant="outlined">
                                      <Box display="flex" p={0} bgcolor="background.paper">
                                            <Box p={1} width="100%">
                                              Baggage Service
                                            </Box>
                                            <Box p={1}>
                                              2000
                                            </Box>
                                      </Box>
                                      <Divider />
                                      <Box display="flex" p={0}>
                                            <Box p={1} width="100%">
                                              Cab serivice
                                            </Box>
                                            <Box p={1} flexShrink={1}>
                                              500
                                            </Box>
                                      </Box>
                                </Paper>
                        </Paper>
                        <FormControlLabel
                        control={
                        <AquaBlueCheckBox
                        checked={true}
                        name="checkedF"
                        color="primary"
                        size="small"
                        />
                        }
                        label={<span style={{fontSize:"15px"}}>I agree to <span style={{color:"#00FFFF"}}> terms & conditions</span></span>}
                        />
                       <div> What's Next ? </div>
                      <Paper className={classes.Services}>
                          <List>
                              <ListItem>
                              <ListItemAvatar>
                                <Avatar  style={{backgroundColor:"#000066"}}>
                                  1
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="" secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" />
                              </ListItem>
                          </List>
                      </Paper>
                      <br></br>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                        <Paper className={classes.promocode}>
                              <Box display="flex" p={1} bgcolor="background.paper">
                                  <Box p={1} width="100%">
                                     Have any promoCode?
                                  </Box>
                                  <Box p={0} flexShrink={0}>
                                      <Button size="small" variant="outlined" color="primary" href="#outlined-buttons">
                                        Apply
                                      </Button>
                                  </Box>
                                </Box>
                        </Paper>
                        <br></br>
                        <Paper className={classes.promocode}>
                              <Box display="flex" p={0} bgcolor="background.paper">
                                  <Box p={1} width="100%">
                                     Total Cost
                                  </Box>
                                  <Box p={1} flexShrink={0}>
                                     Rs. 2000
                                  </Box>
                              </Box>
                              <Box display="flex" p={0} bgcolor="background.paper">
                                  <Box p={1} width="100%">
                                     Discount
                                     <br />
                                     <p style={{color:"blue"}}>
                                       Apply Coupon ?
                                     </p>
                                  </Box>
                                  <Box p={1} flexShrink={0}>
                                    - Rs. 500
                                  </Box>
                              </Box>
                              <Divider variant="middle"/>
                                  <Box display="flex" p={0} bgcolor="background.paper">
                                      <Box p={1} width="100%">
                                        Final Cost
                                      </Box>
                                      <Box p={1} flexShrink={0}>
                                         Rs. 1500
                                      </Box>
                                  </Box>
                            {width>500 && (
                            <Button className={classes.mobileButton} size="large" variant="contained">
                              Book Now
                            </Button>)}
                  </Paper>
           </Grid>
      </Grid>
</div>
{(width <500) && (
  <AppBar className={classes.buttonMobile} position="fixed">
    <Button>
      Book Now
    </Button>
  </AppBar>
)}
    </>
}
export default FinalORder;
