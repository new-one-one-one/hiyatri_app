import React, {useState} from 'react';
import {Button, TextField, Dialog, DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm } from 'react-hook-form';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  time:{
    width:"180px",
    height:"40px"
  },
  passengers:{
      width:"100px",
      height:"40px"
  }
}));




export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [fields, setFields] = useState([{ coach: null, seat:null }]);
  const { register, handleSubmit, errors } = useForm();

  const handleChangeCoach= (i, event)=> {
    const values = [...fields];
    values[i].coach = event.target.value;
    setFields(values);
  }

  const handleChangeSeat= (i,event)=>{
    const values = [...fields];
    values[i].seat = event.target.value;
    setFields(values);
  }

  const handleAdd = () => {
    const values = [...fields];
    values.push({ coach: null , seat:null});
    setFields(values);
  }

  const handleRemove=(i)=> {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // On submission of form
  const onSubmit = (data) => {
      alert("seubmited")
    console.log(data);  // form details
    console.log(fields) // list of passengers 
  };


  var date = new Date();

  const stations=[
        {   
            name:"Adra Jn" , 
            code: "ADRAA",
        },
        {
            name:"disaptagram" ,
            code:"ADST"
        },
        {
            name:"korkama",
            code:"kra"
        },
        {
            name:"kartala",
            code:"krt"
        },
        {
            name:"kurukshetra",
            code:"kuru"
        },
        {
            name:"karnool",
            code:"knl"
        },
        {
            name:"bilaspur",
            code:"bsp"
        }
  ]
  return (
    <div>

      <Button className="reEnter-action" style={{marginTop:"200px", marginLeft:"40%"}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} style={{width:"800px"}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Please Fill Details</DialogTitle>
        <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
         
              <TextField name="train_number" inputRef={register} label="Train Number" variant="outlined" type="number"/>
                <div style={{marginTop:"20px"}}>
                    <Autocomplete name="arrival_station"
                        inputRef={register}
                        id="combo-box-demo"
                        options={stations}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Arrival station" variant="outlined" />}
                        classes={{
                            option:classes.time
                    }}/>
                    <br></br>
                
                    <TextField variant="outlined"
                        id="date"
                        name="arrival_date" 
                        inputRef={register} 
                        label="Arrival Date"
                        type="date"
                        defaultValue={date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()}
                        
                        InputLabelProps={{
                        shrink: true,
                        }}
                        InputProps={{
                            className:classes.time
                        }}/>
                <TextField
                    label="Arrival Time"
                    type="time"
                    name="arrival_time" 
                    inputRef={register} 
                    variant="outlined"
                    defaultValue={date.getHours()+":"+date.getMinutes()}
                    InputLabelProps={{shrink: true}}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    InputProps={{
                        className:classes.time
                    }}
                />
                </div>
                
                <div style={{marginTop:"20px"}}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={stations}
                        name="dep_station" 
                        inputRef={register} 
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="departure station" variant="outlined" />}
                        classes={{
                            option:classes.time
                        }}
                        />
                        <br></br>
                <TextField
                    variant="outlined"
                    id="date"
                    label="Departure Date"
                    type="date"
                    name="dep_date" 
                    inputRef={register} 
                    defaultValue={date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()}
                    className={classes.textField}
                    InputLabelProps={{shrink: true}}
                    InputProps={{className:classes.time}}
                />
                <TextField 
                    label="Departure Time"
                    type="time"
                    name="dep_time" 
                    inputRef={register} 
                    variant="outlined"
                    classname={classes.time}
                    defaultValue={date.getHours()+":"+date.getMinutes()}
                    className={classes.textField}
                    InputLabelProps={{shrink: true}}
                    inputProps={{step: 300}}
                    InputProps={{className:classes.time}}
                />
                </div>

                <br/>
                <br/>
                <div>

                {fields.map((field, idx) => {
                    return (
                    <div key={`${field}-${idx}`}>
                        <TextField

                            type="number"
                            name={"seat_no_"+idx}
                            inputRef={register} 
                            label="Seat No."
                            variant="outlined"
                            style={{width:"70px"}} 
                            value={field.coach || ""}
                            onChange={e => handleChangeCoach(idx, e)}
                            InputProps={{
                                className:classes.passengers
                            }}
                        />
                        <TextField
                            type="text"
                            label="Coach No."
                            name={"coach_num_"+idx}
                            inputRef={register} 
                            variant="outlined"
                            style={{marginLeft:"40px"}}
                            InputProps={{
                                className:classes.passengers
                            }} 
                            value={field.seat || ""}
                            onChange={e => handleChangeSeat(idx, e)}
                        />
                        
                        <Button type="button"color="secondary" style={{marginLeft:"20px"}} variant="contained" onClick={() => handleRemove(idx)}>
                            Remove 
                        </Button>
                        <div style={{marginTop:"20px"}}></div>
                    </div>
                    );
                })}
                <Button type="button" style={{marginLeft:"50%"}} variant="contained" onClick={() => handleAdd()}>
                        Add passenger
                </Button>
                                
                </div>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button type="Submit" color="primary" variant="contained">
            Submit
          </Button>
        
        </DialogActions>
        </form>
      </Dialog>
     
    </div>
  );
}


