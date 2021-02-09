import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Modal from "@material-ui/core/Modal";
import { makeStyles, Button } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField, InputAdornment, Select, MenuItem } from "@material-ui/core";
import { useForm } from "react-hook-form";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  modalBoxSuccess: {
    "overflow-y": "scroll",
    "overflow-x": "hidden",
    position: "absolute",
    width: "60%",
    height: "75%",
    backgroundColor: "white",
    color: "black",
    border: "0 solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const BulkBookings = () => {
  const [showSpinner, setshowSpinner] = useState(false);
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const { register, errors, handleSubmit } = useForm();

  const [uploadInformation, setuploadInformation] = useState({
    booking_type: "",
    client_name: "",
    date_of_arrival_or_departure: new Date(),
    time_of_arrival_or_departure: "",
  });

  const handleModalClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (event) => {
    const files = event.target.files[0];
    setSelectedFile(files);
  };

  const onClickHandler = () => {
    const data = new FormData();
    let errorFlag = false;

    const vals = Object.values(uploadInformation);

    for (let i = 0; i < vals.length; i++) {
      if (vals[i] === "" || vals[i] === undefined) {
        errorFlag = true;
      }
    }

    if (selectedFile === null && errorFlag === true) {
      toast.error("Please provide  the required information !!");
    } 
    
    else if (selectedFile === null && errorFlag === false) {
      toast.error("Please provide the excel file");
    } 
    
    else if(selectedFile!==null && errorFlag ===true){
        toast.error('Please fill the details')
    }

    if (selectedFile !== null && errorFlag === false) {
      setshowSpinner(true);
      data.append("file", selectedFile);
      data.append("name", selectedFile.name);

      axios
        .post(`${process.env.NEXT_PUBLIC_API}/create_bulk_booking`, data)
        .then((res) => {
          setshowSpinner(false);
          toast.success("Upload successfull !! ");
        })
        .catch((err) => {
          toast.error("upload fail");
        });

      axios
        .post(
          `${process.env.NEXT_PUBLIC_API}/bulk_bookings_requests`,
          uploadInformation
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const downloadTemplate = () => {
    fetch(`${process.env.NEXT_PUBLIC_API}/downloadtemplate`).then(
      (response) => {
        response.blob().then((blob) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "Records.xlsx";
          a.click();
        });
      }
    );
  };

  const handledatechange = (date) => {
    setuploadInformation({
      ...uploadInformation,
      date_of_arrival_or_departure: date,
    });
  };
  return (
    <>
      <Backdrop className={classes.backdrop} open={showSpinner}>
        <CircularProgress color="inherit" />
        <p style={{ marginLeft: "20px" }}> Uploading Records Please wait !!</p>
      </Backdrop>

      <div
        style={{ textAlign: "center", justifyContent: "center", padding: 50 }}
        className="container"
      >
        <div style={{ alignItems: "center" }}>
          <p style={{ fontSize: 40, fontWeight: "bold", marginBottom: "10px" }}>
            Bulk Booking Upload
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginBottom: "10px",
              flexDirection: "column",
            }}
            onClick={() => setOpen(true)}
            title="Instructions for Bulk Upload"
          >
            <span
              style={{
                marginRight: "10px",
                fontSize: "18px",
                color: "#26A69A",
                fontWeight: "bold",
              }}
            >
              Instructions for Bulk Booking
            </span>
            {/* <img src={questionIcon} height={25} /> */}
            <div className="contact-Information shadow">
              <table>
                <thead>
                  <tr>
                    <th>Client Name*</th>
                    <th>Date of Arrival or Departure*</th>
                    <th>Time of Arrival or Departure*</th>
                    <th>Booking Type*</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <TextField
                        variant="outlined"
                        type="text"
                        name="client_name"
                        onChange={(e) =>
                          setuploadInformation({
                            ...uploadInformation,
                            client_name: e.target.value,
                          })
                        }
                        inputRef={register({ required: true, minLength: 1 })}
                        error={errors.clientName ? true : false}
                        helperText={
                          errors.clientName
                            ? "Please Enter the Client Name"
                            : ""
                        }
                        // value={data.passenger_contact_information.name}
                        // onChange={handleChange("passenger_name")}
                        // inputRef={register({required: true, minLength:2})}
                        // error={errors.passenger_name ?true:false}
                        // helperText={errors.passenger_name? "Passenger name is required":""}
                        fullWidth
                      />
                    </td>
                    <td>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                          <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            format="dd/MM/yyyy"
                            value={
                              uploadInformation.date_of_arrival_or_departure
                            }
                            onChange={(date) => handledatechange(date)}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </td>
                    <td>
                      <TextField
                        style={{marginTop:'3%'}}
                        id="time"
                        type="time"
                        className={classes.textField}
                        onChange={(e) =>
                          setuploadInformation({
                            ...uploadInformation,
                            time_of_arrival_or_departure: e.target.value,
                          })
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </td>
                    <td>
                      <Select
                        value={uploadInformation.booking_type}
                        displayEmpty
                        style={{ width: "100px" }}
                        disableUnderline
                        className={classes.selectEmpty}
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        <MenuItem value="Arrival">
                          <button
                            className="filter-option"
                            onClick={() =>
                              setuploadInformation({
                                ...uploadInformation,
                                booking_type: "Arrival",
                              })
                            }
                          >
                            Arrival
                          </button>
                        </MenuItem>
                        <MenuItem value="Departure">
                          <button
                            className="filter-option"
                            onClick={() =>
                              setuploadInformation({
                                ...uploadInformation,
                                booking_type: "Departure",
                              })
                            }
                          >
                            Departure
                          </button>
                        </MenuItem>
                      </Select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="form-group">
            <ToastContainer />
          </div>

          <div>
            <form encType="multipart/form-data" method="post">
              <div
                style={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="form-group files"
              >
                <input
                  name="file"
                  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  className="form-control"
                  onChange={onChangeHandler}
                  type="file"
                />
              </div>
            </form>

            <Button
              variant="contained"
              className="btn"
              onClick={onClickHandler}
            >
              Upload File
            </Button>

            <Button
              variant="contained"
              className="btn"
              onClick={downloadTemplate}
            >
              Download Template
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BulkBookings;
