import React from "react";
import {Paper} from "@material-ui/core";
import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";
import {Grid,Input,Dialog, Select, InputLabel, DialogActions, DialogContent, FormControlLabel, Box,Button, TextField,Typography,Divider} from "@material-ui/core";
import {IconButton,AppBar, Toolbar, FormControl,DialogTitle, DialogContentText,Menu, MenuItem} from "@material-ui/core";
import TrainIcon from '@material-ui/icons/Train';
import FilterListIcon from '@material-ui/icons/FilterList';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import useWindowSize from '../../helpers/windowDimension';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useForm} from 'react-hook-form';
import  {createComment} from './../../actions/comments';
import { TextareaAutosize } from '@material-ui/core';

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
        backgroundColor:"grey"
      },
  }));


  

const BookingDetail = ({requestedPnr}) => {

  const data = requestedPnr && requestedPnr.res[0];
  const passenger = data && data.passenger_details;
  const station = data && data.booking_information.reservation_upto;
  const sizeofwindow = useWindowSize();
  const width= 900;
  if(sizeofwindow){
    const width = sizeofwindow.width;
  }
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [commentBox, openCommentBox] = React.useState(false);

  const changeDropDown = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
 const {register,handleSubmit } = useForm();
  const commentSubmit = (result) =>{
    result.pnr_number= data && data.pnr_number;
    createComment(result);
    openCommentBox(false);

  }
  const getMyService = (needed, type)=>{
    switch(type) {
      case "wheel":
          if(needed){
            return (<div className={classes.innerDetails} >
                  <Grid container xs={12} justify="space-between">
                        <Typography  variant="body2"  align="left">Get wheel chari</Typography>
                        <Typography  variant="body2" align="right">Wheel Chair</Typography>
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
                      <Typography  variant="body2" align="right">Wheel Chair</Typography>
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
                      <Typography  variant="body2" align="right">Wheel Chair</Typography>
                </Grid>
              </div>
               )
               break
        }
    }
  }


  const comments = requestedPnr && requestedPnr.res[1];

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
                        BOOKING-ID : {data && data._id}
                      </Box >
                      <Box p={1}>
                        Pending
                      </Box>
            </Box>

             <Paper variant="outlined" className={classes.particularOrder}>
          <div style={{marginLeft:"4%"}}>
            <Grid style={{color:"grey"}}  container spacing={1}>
                <Grid container spacing={3}>
                    <Grid  item xs={4}>
                     <b> Meeting Station </b>
                    </Grid>
                    <Grid  item xs={4} >
                    <b> Time Of arrival  </b>
                    </Grid>
                    <Grid  item xs={4}>
                    <b> Number of passengers </b>
                    </Grid>
                </Grid>
            <Grid container spacing={1}>
              <Grid  item xs={4}>
                  {/* New Delhi  */}
                  {station && station.station_name} ({station && station.station_code})
              </Grid>
              <Grid  item xs={2} >
                <Typography align="center">{station && station.time}</Typography>
              </Grid>
              <Grid  item xs={4}>
              {/*<Typography align="right">{Object.keys(passenger).length}</Typography>*/}
              </Grid>
            </Grid>
          </Grid>
               {/* ---------------------------------------- */}
          </div>
              </Paper>

             {passenger && passenger.map(val => {
                if(val.wheel_chair || val.golf_cart || val.meet_and_greet ){
                return (
                    <Paper variant="outlined" className={classes.particularOrder}>
                      <div className={classes.outerDetails}>

                        <Grid container xs={12} justify="space-between">
                              <Typography  variant="body1" align="left">{val._id}</Typography>
                              <Typography  variant="body1" align="left">67 years, Male</Typography>
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
        <br></br>
         {/* Comments paragraph */}
         <div>Comments </div>

            {/* {(width >= 800) &&(
              <Paper className={classes.Services}>
            <div className={classes.comment}>
              <Grid spacing={4} xs={12}>
              <Grid container xs={12} justify="space-between">
                  <Typography  variant="body1" align="left">Wheel chair number - 9994333445</Typography>
              </Grid>
              <Grid container xs={12} justify="space-between">
                  <Box p={1}>
                    <Box width="30%">

                    </Box>

                  </Box>
                  <Typography variant="subtitle2"  align="left"></Typography>
                  <Typography variant="subtitle2" color="textSecondary"  align="center">Puneet Singhal, Admin</Typography>
                  <Typography variant="subtitle2"  align="right">Time</Typography>
              </Grid>

              </Grid>

              <Divider variant="middle"/>
              <Grid container style={{paddingTop:"8px"}} xs={12} justify="space-between">
                  <Typography variant="subtitle2"  align="left"></Typography>
                    <Button variant="contained" color="primary" onClick={()=>{openCommentBox(true)}}>
                        Add Comment
                    </Button>

              </Grid>
            </div>
                   </Paper>
            )}
             */}



              <div className={classes.comment_root}>
             {comments && comments.map((comment)=>{
              return (

              <Accordion expanded={expanded === comment.comment_by} onChange={changeDropDown(comment.comment_by)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header"
                >
                 <Grid container xs={12} justify="space-between">
                  <Typography className={classes.comment_heading}>{comment.created_at}</Typography>
              <Typography className={classes.comment_secondaryHeading}>{comment.comment_by}, For {comment.facilityType}</Typography>
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
        {/* This is for promocode part */}
        <Grid item xs={12} sm={3}>
          <Paper className={classes.promocode}>
                <Box p={1}>
                  <Button variant="outlined" size="large" fullWidth={true} color="primary">Cancel</Button>
                </Box>
                <Box p={1}>
                   <Button variant="contained" size="large" fullWidth={true} onClick={()=>setOpen(true)}  color="primary">Assign to agent</Button>
                </Box>

          </Paper>
        </Grid>
       </Grid>
    </div>
    {/* This is for adding a comment */}

    <Dialog
        fullWidth
        style={{minHeight:"600px"}}
        open={commentBox}
        onClose={()=>openCommentBox(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <form onSubmit={handleSubmit(commentSubmit)}>
        <DialogTitle className={classes.headFootAgent} id="scroll-dialog-title">Adding Comment</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={10}
          >
          <Typography>Admin or Agent</Typography>
          <FormControl>
          <TextField id="outlined-basic" inputRef={register} name="comment_by" label="Creator" variant="outlined" /> <br></br>
          <TextField id="outlined-basic" inputRef={register} name="facilityType" label="For Service" variant="outlined" />  <br></br>
          {/* <TextareaAutosize name="comment" cols={10}  ref={register}  rowsMin={3} placeholder="write your comment here" /> */}
          <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          style={{width:'40ch'}}
          rows={4}
          inputRef={register}
          name="comment"
          variant="outlined"
        />
          </FormControl>

         </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.headFootAgent}>
          <Button onClick={()=>{openCommentBox(false);window.location.reload(false)}} type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button onClick={()=>openCommentBox(false)} variant="contained" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
      </Dialog>


    {/*  THis is for adding agent  */}
    <Dialog
        fullWidth
        style={{minHeight:"600px"}}
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle className={classes.headFootAgent} id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={10}
          >
        <FormControl style={{minWidth:"80%"}} variant="outlined">
        <InputLabel  htmlFor="outlined-age-native-simple">Assignee</InputLabel>
        <Select native value=""
          label="Assignee"
          inputProps={{
            name: 'assignee',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={"joefjfojjfojfofje"}>joefjfojjfojfofje</option>
          <option value={"joefjfojjfojfofje"}>neognobneronobner</option>
          <option value={"joefjfojjfojfofje"}>ngioejgogjogjegogj</option>
        </Select>

          <br></br>
         <TextField id="outlined-multiline-static"  label="Comments"
          multiline  fullWidth  rowsMax={10}  rows={5} placeholder="write you comments here"
          variant="outlined"
        />
        <FormControlLabel
        control={
          <Checkbox
            checked={true}   // you can create a state or add to reducer for state change
            name="canView"
            color="primary"
          />
        }
        label="Viewable by all users"
      />

      </FormControl>


          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.headFootAgent}>
          <Button onClick={()=>setOpen(false)} variant="contained" color="primary">
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
