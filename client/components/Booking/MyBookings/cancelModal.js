import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button ,Box} from '@material-ui/core';
import { cancel_order } from '../../../actions/order';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius:"10px",
    height:"243px",
    width:"653px",
    padding: theme.spacing(5, 8, 9),
  },
}));

const CancelModal = ({ id, duration })  => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cancellation, setCancellation] = useState({
       hoursLeft:null,
       msg:""
  })

  const handleCancelBooking = (orderId) => {
    cancel_order(orderId)
       .then((response) => {
         if(response.error){
           return console.log(response.error.error.description)
         }
          if(typeof window !== undefined){
            window.location.reload()
          }
       })
       .catch((err) => {
         console.log(err)
       })
    handleClose();
  }


  const handleOpen = () => {
    cancellationCharge()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cancellationCharge = () => {
        if(duration<0){
          return setCancellation({ timeLeft: duration, msg:"no refund"})
        }
        if(duration>=24){
          return setCancellation({ timeLeft: duration, msg:"full refund"})
        }
        if(duration>12 && duration< 24){
          return setCancellation({ timeLeft: duration, msg:"50% refund"})
        }
          return setCancellation({ timeLeft: duration, msg:"no refund"})
  }

  return (
    <div>
      <Button  variant="outlined" color="secondary" id="btns-text" onClick={handleOpen}>Cancel This</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="text-center">
              <font className="cm-title"><h4><b>Are you sure to cancel this booking ?</b></h4></font>
              <small><h6 className="on-cancellation">*on cancellation you will get the {cancellation.msg} </h6></small>
                <Box display="flex" p={2}>
                 <Box width="60%" p={1}>
                  <Button variant="outlined" id="no-btn" onClick={handleClose}>No</Button>
                 </Box>
                 <Box p={1}>
                  <Button variant="contained" id="yes-btn"  onClick={()=>handleCancelBooking(id)}>Yes</Button>
                 </Box>
                  
                     
                </Box>
                  
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default CancelModal;
