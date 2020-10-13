import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from "../../firebase"

const useStyles = makeStyles({
  root: {
    width: "85%",
    marginTop: "1.3%",
    marginLeft: "7.5%",
    marginBottom: "3%",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 14,
  },
  cardContent: {
    flexDirection: "row",
    flexFlow: "row",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "1%",
    paddingLeft: "1%",
    paddingRight: "1%",
    paddingBottom: "1%",
  },
  imageHolder: {
    padding: "0.5%",
    marginRight: "1%",
    marginBottom: "0.1%",
    height: "400px",
  },
  contentHolder: {
    width: "80%",
    marginBottom: "0.1%",
    height: "403px",
    paddingLeft: "1%",
    paddingRight: "2%",
    paddingTop: "0.8%",
  },
  button: {
    marginTop: '2%'
  },
});

const LandingPage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleClick = ()=>{
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    let sendTo = `+${number}`
    firebase.auth().signInWithPhoneNumber(sendTo, recaptcha).then(function(e){
      let code = prompt('Enter the OTP', '');
      if(code == null) return;
      e.confirm(code).then(function(result){
        console.log(result.user, 'user');
        if(result && result.user)
       { document.querySelector("label")!.textContent +=
              result.user.phoneNumber + "Number verified";}
       }).catch((err)=>{
        console.log(err)
       })
    }).catch(function (error) {
      alert(error);
    });
  }

  const [number, setNumber] = useState('')

  const onInputNum = (event:any)=>{
    setNumber(event.target.value)
  }
  
 useEffect(()=>{
   console.log("+++++ ",number)
 }, [number])
  return (
    <div style={{ flexDirection: "column", flexFlow: "column", minHeight: '100vh', backgroundColor: '#F2F2F2' }}>
      <Header />
      <div className="main">
        <div className={classes.root} >
          <div className={classes.cardContent}>
            <Card className={classes.imageHolder} variant="outlined">
              <img
                height="300px"
                width="400px"
                alt="Train"
                src={
                  "https://fdn.gsmarena.com/imgroot/news/20/08/zte-axon-20-5g-camera-sample/-400/gsmarena_001.jpg"
                }
              />
            </Card>
            <Card className={classes.contentHolder} variant="outlined">
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Meet & Greet
              </span>
              <br />
              <span style={{ lineHeight: "35px", }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </span>
              <br />
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                You are looking for
              </span>
              <br />

              <FormControl component="fieldset">
                <RadioGroup row aria-label="anonymous" name="anonymous" value={value} onChange={handleChange}>
                  <FormControlLabel value="Arrival" control={<Radio />} label="Arrival" />
                  <FormControlLabel value="Departure" control={<Radio />} label="Departure" />
                </RadioGroup>
              </FormControl>

              <form style={{ marginTop: '3%' }} noValidate autoComplete="off">
                <TextField style={{ marginRight: '2%' }} id="outlined-basic" label="Name" variant="outlined" />
                <TextField type="number" style={{ marginRight: '2%' }} id="outlined-basic" value={number} label="Phone No." variant="outlined" onChange={onInputNum} />
                <TextField id="outlined-basic" label="PNR No." variant="outlined" />
              </form>

              <label></label>

              <div id="recaptcha"></div>
              <Button variant="contained" className={classes.button} onClick= {handleClick}>
                CONTINUE
               </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
