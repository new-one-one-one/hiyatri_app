import { useState, useEffect } from 'react';
import {Paper} from "@material-ui/core";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";
import {Grid,Input,Dialog, Select, InputLabel, DialogActions, DialogContent, FormControlLabel, Box,Button, TextField,Typography,Divider} from "@material-ui/core";
import {IconButton,AppBar, Toolbar, FormControl,DialogTitle, DialogContentText,Menu, MenuItem} from "@material-ui/core";
import TrainIcon from '@material-ui/icons/Train';
import FilterListIcon from '@material-ui/icons/FilterList';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useForm } from 'react-hook-form';
import { create_comment, comment_list } from '../../../actions/comments';
import { assign_agent, agent_list } from '../../../actions/order';
import { getCookie } from '../../../actions/auth';
import { isAuth } from '../../../actions/auth';
import { TextareaAutosize } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


const useStyles = makeStyles((theme) => ({

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
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    root: {
      flexGrow: 1,
      marginLeft:"5%",
      marginRight:"5%",
      marginTop:"5%",
      outline:"none"
    },
    paper: {
      padding: 20,
      textAlign: "center",
      color: theme.palette.text.secondary,
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
      paddingRight:"10px",
      paddingLeft:"10px",
      paddingBottom:"10px"

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
      // top right bottom left
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

    },
    porterDetails:{
      marginLeft:"20px",
      marginRight:"20px",
      marginTop:"10px"
    },
    comment:{
        paddingLeft:"25px",
        paddingRight:"25px",
      },
      comment_root: {
        width: '100%',
      },
      comment_heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
      },
      comment_secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      headFootAgent:{
        backgroundColor:"white"
      },
  }));



const BookingDetail = ({ data }) => {
  console.log(data, "fata got")
  const width= 900;
  const classes = useStyles();
  const [agents, setAgents] = useState([]);
  const [assignee, setAssignee] = useState();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [commentText, setCommentText] = useState();
  const [commentBox, openCommentBox] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const token = getCookie("token");

  const changeDropDown = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
 const {register,handleSubmit } = useForm();


  const assignToAgent = (e) => {
    let orderId = data.response._id;
     assign_agent(orderId, assignee, token)
        .then(response => {
          if(response.error){
            return console.log(response.error)
          }
          setOpen(false)
        })
        .catch((err) => {
          console.log(err)
        })
      addComment(e)
  }

  const addComment = (e) => {
    e.preventDefault()
    create_comment({ order: data.response._id, comment_by: isAuth() && isAuth()._id, comment: commentText}, token)
      .then(response => {
        if(response.error){
          return console.log(response.error)
        }
        openCommentBox(false)
      })
      .catch((err) => {
        console.log(err)
      })
      window.location.reload(false)
    }


  const getMyService = (needed, type)=>{
    switch(type) {
      case "wheel":
          if(needed){
            return (<div className={classes.innerDetails} >
                  <Grid container xs={12} justify="space-between">
                        <Typography  variant="body2"  align="left">Get wheel chari</Typography>
                        <Typography  variant="body2" align="right">500</Typography>
                  </Grid>
                </div>
                 )
                 break
          }
      case "golf":
        if(needed){
          return (<div className={classes.innerDetails} >
                <Grid container xs={12} justify="space-between">
                      <Typography  variant="body2"  align="left">Golf cart</Typography>
                      <Typography  variant="body2" align="right">400</Typography>
                </Grid>
              </div>
               )
               break
        }
      case "meet":
        if(needed){
          return (<div className={classes.innerDetails} >
                <Grid container xs={12} justify="space-between">
                      <Typography  variant="body2"  align="left">Meet & Greet</Typography>
                      <Typography  variant="body2" align="right">300</Typography>
                </Grid>
              </div>
               )
               break
        }
    }
  }

useEffect(() => {
  agent_list(token)
    .then(response => {
      if(response.error){
         return console.log(response.error)
      }
      setAgents(response.agents)
    })
    .catch((err) => {
      console.log(err)
    })

    comment_list(token, data.response._id)
      .then(response => {
        if(response.error){
           return console.log(response.error)
        }
          setCommentList(response.comments)
      })
      .catch((err) => {
        console.log(err)
      })
},[])

const displayPorterServiceDetails = (porter) =>{
  if(porter.porter_service_opted!==null)
    return (
      <div>
        <Grid container spacing={2}>
                  <Grid container>
                      <Grid  item sm={3} className="pl-4">
                        <b>Large Bags</b>
                      </Grid>
                      <Grid  item sm={3}>
                        <b>Medium Bags</b>
                      </Grid>
                      <Grid  item sm={3}>
                          <b>Small Bags</b>
                      </Grid>
                      <Grid  item sm={3}>
                          <b>Total Cost</b>
                      </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                      <Grid item sm={3} className="pl-4">
                          {porter.number_of_large_bags}
                      </Grid>
                      <Grid  item sm={3}>
                          {porter.number_of_medium_bags}
                      </Grid>
                      <Grid  item sm={3}>
                            {porter.number_of_small_bags}
                      </Grid>
                      <Grid  item sm={3}>
                            300
                      </Grid>
                </Grid>
          </Grid>
      </div>

    )
}

  return (
  <div>
    {/* Creating heading bar */}
    <div className={classes.root}>
      <h5>Summary</h5>
      <Grid container spacing={3}>
        {/* This one is for All orders list for booking */}
        <Grid item xs={12} sm={8}>
            <Paper className={classes.orderFull}>
              <br></br>
            <Box className={classes.headingPart} display="flex" p={1} bgcolor="#000066">
                      <Box p={1} width="100%">
                        BOOKING-ID : {data.response.booking.booking_id}
                      </Box >
            </Box>

             <Paper variant="outlined" className={classes.particularOrder}>
          <div style={{marginLeft:"4%"}}>
            <Grid style={{color:"grey"}}  container spacing={1}>
                <Grid container spacing={3}>
                    <Grid  item xs={4}>
                     <b> Meeting Station:</b>
                      <br />
                     {data.response.booking.booking_information.is_arrival?data.response.booking.booking_information.boarding_station.station_name:data.response.booking.booking_information.reservation_upto.station_name}
                    </Grid>
                    <Grid  item xs={4}>
                    <b> Time Of {data.response.booking.booking_information.is_arrival?"Arrival":"Departure"}</b>
                    <br />
                    {data.response.booking.booking_information.is_arrival?data.response.booking.booking_information.boarding_station.time:data.response.booking.booking_information.reservation_upto.time}
                    </Grid>
                    <Grid  item xs={4}>
                    <b>Number of passengers:</b>
                      <br />
                      {data.response.booking.passenger_details.length}
                    </Grid>
                </Grid>
            <Grid container spacing={1}>
              <Grid  item xs={4}>
                  {/* New Delhi  */}

              </Grid>
              <Grid  item xs={2} >
                <Typography align="center"> </Typography>
              </Grid>
              <Grid  item xs={4}>
              <Typography align="right"> </Typography>
              </Grid>
            </Grid>
          </Grid>
               {/* ---------------------------------------- */}
          </div>
              </Paper>

             {data.response.booking.passenger_details.map(val => {
                if(val.wheel_chair || val.golf_cart || val.meet_and_greet ){
                return (
                    <Paper variant="outlined" className={classes.particularOrder}>
                      <div className={classes.outerDetails}>
                        <Grid container xs={12} justify="space-between">
                              <Typography  variant="body1" align="left">{val.passenger_name}</Typography>
                <Typography  variant="body1" align="left">{val.age_group}</Typography>
                        </Grid>
                      </div>
                      <Divider/>
                      {getMyService(val.wheel_chair, "wheel")}
                      {getMyService(val.golf_cart, "golf")}
                      {getMyService(val.meet_and_greet, "meet")}
                  </Paper>
                        )}
               })
             }


              <br></br>
          </Paper>
        <br></br>
        <Paper className={classes.Services}>
        <Box className={classes.headingPart} p={1} bgcolor="#000066">
                      <Typography>Other Services</Typography>
          </Box>

          <Paper className={classes.particularOrder} variant="outlined">
          <Grid container style={{color:"#000066"}} spacing={10}>
                    <Grid  item xs={4}>
                     <b> Baggage Service </b>
                    </Grid>
                    <Grid  item xs={4} >
                    <b> Porter Service  </b>
                    </Grid>
                    <Grid  item xs={4}>
                    <b> Cab service </b>
                    </Grid>
                </Grid>
         </Paper>
        </Paper>
        <br></br>
        <Paper className={classes.Services}>
            <Box className={classes.headingPart} p={1} bgcolor="#000066">
                      <Typography>Porter Services</Typography>
            </Box>
            <Paper className={classes.particularOrder} variant="outlined">
              {displayPorterServiceDetails(data.response.booking.porter_service.porter_service_detail)}
            </Paper>
        </Paper>

        <br></br>

        {/* Comments paragraph */}
         <div>Comments </div>
              <div className={classes.comment_root}>
             {commentList.map((comment)=>{
                  const temp_date =new Date(comment.createdAt);
                  const date = {
                      keyTime : temp_date.getTime(),
                      hours   : temp_date.getHours(),
                      mins    : temp_date.getMinutes(),
                      day     : temp_date.getDate(),
                      month   : temp_date.getMonth(),
                      fullYear: temp_date.getFullYear()
                  }

                  return (
                    <Accordion expanded={expanded === date.keyTime} onChange={changeDropDown(date.keyTime)}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Grid container xs={12} justify="space-between">
                          <Typography className={classes.comment_heading}>{date.hours}:{date.mins} {date.hours>12 ? "PM" : "AM"} , {date.day}-{date.month}-{date.fullYear}</Typography>
                          <Typography className={classes.comment_secondaryHeading}>{comment.comment_by.name}</Typography>
                      </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                            {comment.comment}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  )
             })}

              <Divider/>
              <Grid container style={{paddingTop:"8px"}} xs={12} justify="space-between">
                  <Typography variant="subtitle2"  align="left"></Typography>
                  <Typography variant="body1"  align="right">
                  <Button variant="contained" color="primary" onClick={()=>{openCommentBox(true)}}>
                        Add Comment
                    </Button>
                  </Typography>
              </Grid>
            </div>


            <br></br>
        </Grid>


        {(data.response.order_status!=='COMPLETED') && (
            <Grid item xs={12} sm={3}>
              {(data.response.order_status!=='ASSIGN_TO_AGENT') &&
                ( <div>
                    <Paper className={classes.promocode}>
                      <Box p={1}>
                        <Button variant="outlined" size="large" fullWidth={true} className="bd-btn-cancel">Cancel</Button>
                      </Box>
                      <Box p={1}>
                        <Button variant="contained" size="large" fullWidth={true} onClick={()=>setOpen(true)} className="bd-btn-agent">Assign to agent</Button>
                      </Box>
                    </Paper>
                    <br></br>
                  </div>
              )}
              <Paper className={classes.promocode}>
              <div style={{padding:"10px"}}>
                <Grid container xs={12} justify="space-between">
                  <Typography  variant="body2" align="left">Current Status : </Typography>
                  <Typography  variant="subtitle" align="right">{data.response.order_status}</Typography>
                </Grid>
                <Grid container xs={12} justify="space-between">
                  <Typography  variant="body2" align="left">Assigned To: </Typography>
                  <Typography  variant="subtitle" align="right">{ data.response.agent?data.response.agent.name:"None"} </Typography>
                </Grid>
              </div>
            {(data.response.order_status!=='ASSIGN_TO_AGENT')}
              <div>
              </div>

              {(data.response.order_status!=='ASSIGN_TO_ADMIN')&&(<div>
                  <Box p={1}>
                     <Button variant="contained" color="secondary" size="large" fullWidth={true} onClick={()=>setOpen(true)} >Re-Assign to agent</Button>
                  </Box>
              </div>)}

          </Paper>
            </Grid>
        )}

       </Grid>
    </div>


    <Dialog
        fullWidth
        style={{minHeight:"600px"}}
        open={commentBox}
        onClose={()=>openCommentBox(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <form>
        <DialogTitle className={classes.headFootAgent} id="scroll-dialog-title">Adding Comment</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={10}
          >
           <FormControl>
           <TextField
          id="outlined-multiline-static"
          label="Comment"
          onChange={(e) => setCommentText(e.target.value)}
          multiline
          style={{width:'40ch'}}
          rows={4}
          variant="outlined"
        />
          </FormControl>

         </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.headFootAgent}>
          <Button onClick={addComment} type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button onClick={()=>openCommentBox(false)} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
      </Dialog>

{/* Comments got agent doing  :::; ;::: ;:: ;: :: */}
    <Dialog
        fullWidth
        style={{minHeight:"600px"}}
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
         <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={10}
          >
        <FormControl style={{minWidth:"80%"}} variant="outlined">
        <Autocomplete
          onChange={(event, newValue) => {
            if(newValue){
                setAssignee(newValue._id)
            }
          }}
          options={agents}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
           <TextField
             {...params}
             className=""
             variant="outlined"
             label="Assignee"
           />
          )}
          />
          <br></br>
          <TextField
          id="outlined-multiline-static"
          label="Comment"
          onChange={(e) => setCommentText(e.target.value)}
          multiline
          style={{width:'40ch'}}
          rows={4}
          variant="outlined"
        />

      </FormControl>


          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.headFootAgent}>
          <Button onClick={assignToAgent} variant="contained" color="primary">
            Assign
          </Button>
          <Button onClick={()=>setOpen(false)} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default BookingDetail;
