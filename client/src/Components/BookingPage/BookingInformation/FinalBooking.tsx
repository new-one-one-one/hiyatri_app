import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Divider,TextField, Grid, List, FormControl, ListItem,FormControlLabel, Checkbox, ListItemText} from '@material-ui/core';

import PersonOutline from '@material-ui/icons/PersonOutline';
import { ContactPhoneOutlined, CreateOutlined,  } from '@material-ui/icons';
import { ListItemAvatar, Avatar,Card,CardContent,CardHeader, Link} from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: '#000066',
    },
    personIcon: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },  
    iconWithButton:{
      marginRight:"4px", 
      marginTop:"8px"
    },
    buttonBar:{
      textTransform:"none"
    },
    belowAppBar : {
      paddingLeft:"8%",
      div : {
        fontSize:"22px"
      }, 
      p :{
        fontSize:"8px",
      },
      
    },
    table: {
      minWidth: 650,
      backgroundColor:"none"
    },

    showCard:{
    padding: theme.spacing(0),
      borderColor:"#000066", 
      borderWidth:"1.5px"
    },
    root2: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    newpaper: {
      padding: theme.spacing(0),
      color: theme.palette.text.secondary,
    },
    gridView:{
      marginLeft:"7%",
      overflow :"hidden"
     
    },
    StationInfo:{
      paddingBottom:"0px",
      marginLeft:"7%",
      margin: theme.spacing(1),
      color:"silver solid",
    },
    orders:{
      WebkitBoxShadow:"2px 2px 2px 2px #9E9E9E",
      MozBoxShadow :"2px 2px 2px 2px #9E9E9E",
      boxShadow:"2px 2px 2px 2px #9E9E9E"
    },
    contentHead:{
      paddingTop:"0px" , 
      paddingLeft:"0px", 
      paddingRight:"0px"
    },
    headerCardStyling:{
      backgroundColor:"#000066" , 
      color:"white",
      border:"3px"
    }

  }),
);

const cardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: "1000px",
      maxHeight:"200px",
      backgroundColor: theme.palette.background.paper,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    section1: {
      margin: theme.spacing(0, 2),
      color:"#000066"
    },
    section2: {
      paddingBottom:"0px",
      margin: theme.spacing(2),
      color:"grey",
      
    },
  }),
);

export default function FinalBooking() {
  const classes = useStyles();
  
  const classes2=cardStyles();

  return (
    <div>
      <AppBar className={classes.root} position="static">
        
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            HIYATRI TRAIN
          </Typography>
          <Button className={classes.buttonBar} color="inherit">
            <i className={classes.iconWithButton}>
              <ContactPhoneOutlined className={classes.personIcon} />
            </i>
            Contact Us
          </Button>
          <Button className={classes.buttonBar} color="inherit">
            <i className={classes.iconWithButton}>
              <PersonOutline className={classes.personIcon} />
            </i>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.belowAppBar}>
        <div>ORDER DETAILS</div>
        <p>Summary</p>
      </div>
      
    <Grid className={classes.gridView} container
                spacing={4}
                direction="row"
              >
                
      <Grid item xs={6}>
        <div>
            <Card className={classes.orders}>
                <CardContent>
                  {/* iNITIAL HEADER */}
                  <Card variant="outlined" className={classes.showCard}>
                    <CardContent className={classes.contentHead}>
                    <CardHeader  
                      className={classes.headerCardStyling}
                      action={<CreateOutlined style={{paddingTop:"10px"}} aria-label="settings"/>}
                      title="Meet & Greet Service"
                    />
                    <div className={classes.gridView}>
                    <Grid spacing={0} container alignItems="center">
                        <Grid item xs={5}>
                            Station Type
                        </Grid>
                        <Grid item xs={3}>
                            Arrival Time
                        </Grid>
                        <Grid item >
                            Number of Passenger
                        </Grid>
                        
                      </Grid>
                      <Grid spacing={0} container alignItems="center">
                        <Grid item xs={5}>
                            New Delhi
                        </Grid>
                        <Grid item xs={4}>
                            15:35pm
                        </Grid>
                        <Grid item>
                            4
                        </Grid>
                      </Grid>
                    </div>
                                 
                    </CardContent>
                  </Card>
                
                  <br></br>
                  {/* 11111111111111111111 */}
                <Card variant="outlined" className={classes.showCard}>
                  <CardContent>
                  <div className={classes2.root}>
                    <div className={classes2.section1}>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Typography align="left" gutterBottom variant="h6">
                            Ram Sahara 
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography align="right" gutterBottom>
                            Rs.580
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Divider variant="middle" />
                    <div className={classes2.section2}>
                      <Grid container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Meet & Greet
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                              Rs.500
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Wheel Chair
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                              Rs.80
                            </Typography>
                          </Grid>
                        </Grid>
                    </div>
                  </div>
                  </CardContent>
               </Card>

                      {/* 22222222222222222222222 */}
                <br></br>
                <Card variant="outlined" className={classes.showCard}>
                  <CardContent>
                  <div className={classes2.root}>
                    <div className={classes2.section1}>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Typography align="left" gutterBottom variant="h6">
                            Darshana
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography align="right" gutterBottom>
                            Rs.500
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Divider variant="middle" />
                    <div className={classes2.section2}>
                      <Grid container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Meet & Greet
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                              Rs.500
                            </Typography>
                          </Grid>
                        </Grid>
                    </div>
      
                  </div>
                  </CardContent>
               </Card>


{/* 333333333333333333333333 */}
                <br></br>
                <Card variant="outlined" className={classes.showCard}>
                  <CardContent>
                  <div className={classes2.root}>
                    <div className={classes2.section1}>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Typography align="left" gutterBottom variant="h6">
                            Amit Arora
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography align="right" gutterBottom>
                            Rs.500
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Divider variant="middle" />
                    <div className={classes2.section2}>
                      <Grid container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Meet & Greet
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                              Rs.500
                            </Typography>
                          </Grid>
                        </Grid>
                        
                    </div>
      
                  </div>
                  </CardContent>
               </Card>
               <br></br>
               <Card variant="outlined" className={classes.showCard}>
                  <CardContent>
                  <div className={classes2.root}>
                    <div className={classes2.section1}>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Typography align="left" gutterBottom variant="h6">
                            Vanshaj Arora
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography align="right" gutterBottom>
                            Rs.500
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                    <Divider variant="middle" />
                    <div className={classes2.section2}>
                      <Grid container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Meet & Greet
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                              Rs.500
                            </Typography>
                          </Grid>
                        </Grid>
                        
                    </div>
      
                  </div>
                  </CardContent>
               </Card>
              </CardContent>
            </Card>
        </div>
    
        <br></br>
        <br></br>
    
        <div>
            <Card className={classes.orders}>
                <CardContent>
                  {/* iNITIAL HEADER */}
                  <Card variant="outlined" className={classes.showCard}>
                    <CardContent className={classes.contentHead}>
                    <CardHeader  
                      className={classes.headerCardStyling}
                      title="Other Services"
                    />                    
                  </CardContent>
                  <div className={classes2.root}>
                    <div className={classes2.section2}>
                      <Grid style={{height:"10px"}} container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Cab Service 
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                              Rs.2000
                            </Typography>
                          </Grid>
                        </Grid>
                      </div> 
                    </div>
                    <div className={classes2.root}>
                    
                    <Divider variant="middle" />
                    <div className={classes2.section2}>
                      <Grid style={{height:"10px"}} container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Porter Service
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                              Rs.500
                            </Typography>
                          </Grid>
                        </Grid>
                      </div> 
                      <Divider variant="middle" />
                    </div>
                    
                    <div className={classes2.root}>
                    <div className={classes2.section2}>
                      <Grid style={{height:"10px"}} container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Baggage Gaurantte
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                              Rs.200
                            </Typography>
                          </Grid>
                        </Grid>
                      </div> 
                    </div>
               </Card>
              </CardContent>
            </Card>
            <br></br>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  // onChange={handleChange}
                  name="checkit"
                  color="primary"
                />
              }
              label="I agree to the terms & conditions"
            />
            <br></br>
            <br></br>
            <br></br>
            <Card className={classes.orders}>
            <List >
              <ListItem>
                <ListItemAvatar>
                  <Avatar  style={{backgroundColor:"#000066"}}>
                    1
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="" secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{backgroundColor:"#000066"}}>
                   2
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="" secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar style={{backgroundColor:"#000066"}}>
                  3
                  </Avatar>
                </ListItemAvatar>
                <ListItemText secondary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer" />
              </ListItem>
            </List>
            </Card>
            <br></br>
    
        </div></Grid>
      <Grid item xs={3}>
          <Card variant="outlined" className={classes.orders}>
              <CardContent className={classes.orders}>
              
                  <Typography  >
                    Have any promo code ? 
                  
                  <FormControl >
                  <TextField id="standard-basic" label="Promo Code" variant="standard" />
                  <br>
                  </br>
                  <Button style={{width:"60%"}} variant="outlined" color="primary" href="#outlined-buttons">
                       Apply 
                  </Button>
                  </FormControl>
                  </Typography>
                  
              </CardContent>
            </Card>
            <br></br>
            Price Details
              <Card variant="outlined" className={classes.orders}>
              <div className={classes2.root}>
                      <div className={classes2.section2}>
                            <Grid style={{height:"10px"}} container alignItems="center">
                              <Grid item xs>
                                <Typography align="left" gutterBottom>
                                  Total
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography align="right" gutterBottom>
                                  Rs.4500
                                </Typography>
                              </Grid>
                            </Grid>
                      </div> 
                     <div className={classes2.section2}>
                      <Grid style={{height:"10px"}} container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Discount
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                              - Rs.500
                            </Typography>
                          </Grid>
                        </Grid>
                      </div> 
                      <div className={classes2.section2}>
                      <Grid style={{height:"10px"}} container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Coupon Discount
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                            <Link href="#" underline="none" color="primary">
                              Apply Coupon
                            </Link>
                            </Typography>
                          </Grid>
                        </Grid>
                      
                      </div> 
                      
                      <Divider variant="middle" />

                      <div className={classes2.section2}>
                      <Grid style={{height:"10px"}} container alignItems="center">
                          <Grid item xs>
                            <Typography align="left" gutterBottom>
                              Total Amount
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography align="right" gutterBottom>
                              Rs.3500
                            </Typography>
                          </Grid>
                        </Grid>
                        <br></br>
                            <Typography align="center" gutterBottom >
                                <Button style={{width:"100%"}} color="primary"  variant="contained">
                                  Book Now
                                  </Button>
                            </Typography>
                        
                      
                      </div> 
                    </div>  
                  
                                   
             </Card>
          </Grid>
       </Grid>
      </div>
  )
}