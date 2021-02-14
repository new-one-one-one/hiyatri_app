import { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Typography,
  Select,
  FormControl,
  Button,
  makeStyles,
  Divider,
} from "@material-ui/core";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useRouter } from "next/router";
import FilterListIcon from "@material-ui/icons/FilterList";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: "10%",
    paddingRight: "12%",
    marginTop: "50px",
  },
  tabStyle: {
    color: "#000066",
    fontWeight: "bold",
  },
  disableStyle: {
    color: "red",
    fontWeight: "bold",
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  table: {
    minWidth: 500,
  },
  tr: {
    height: 10,
  },
}));

const BulkBookingsList = () => {
  const router = useRouter();
  const classes = useStyles();
  const [content, setcontent] = useState();
  const [open, setOpen] = useState(false);
  const [excelId, setexcelId] = useState();
  const [bookingType, setBooking] = useState();

  const latestinfogetter = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/get_all_excelFiles`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    if (bookingType === "Departure") {
      latestinfogetter().then((res) => {
        let list_departure = res.filter(
          (eachbooking) => eachbooking.booking_type === "Departure"
        );
        setcontent(list_departure);
      });
    }
    if (bookingType === "Arrival") {
      latestinfogetter().then((res) => {
        let list_arrival = res.filter(
          (eachbooking) => eachbooking.booking_type === "Arrival"
        );
        setcontent(list_arrival);
      });
    }

    if (bookingType === "All") {
      latestinfogetter().then((res) => {
        setcontent(res);
      });
    }
  }, [bookingType]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/get_all_excelFiles`)
      .then((res) => {
        setcontent(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const clickHandler = (record) => {
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_API}/download_particularFile/${record}`
  //   ).then((response) => {
  //     response.blob().then((blob) => {
  //       let url = window.URL.createObjectURL(blob);
  //       let a = document.createElement("a");
  //       a.href = url;
  //       a.download = `${record}.xlsx`;
  //       a.click();
  //     });
  //   });
  // };

  const deleteHandler = (id) => {
    const updatedRecord = () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/get_all_excelFiles`)
        .then((res) => {
          setcontent(res.data);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API}/deleteRecord/${id}`)
      .then((res) => {
        if (res.status === 200) {
          updatedRecord();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FilterBooking = () => {
    return (
      <div style={{ width: "100%" }}>
        <Box display="flex" p={1} bgcolor="background.paper">
          <Box p={1} width="20%">
            <Typography variant="body2">
              <FilterListIcon />
              Filter
            </Typography>
          </Box>
          <Box p={1} width="80%">
            <FormControl className={classes.formControl}>
              <Typography variant="body2">
                <span style={{ color: "grey", fontSize: "15px" }}>
                  Booking Type:
                </span>
                <Select
                  displayEmpty
                  style={{ width: "100px" }}
                  disableUnderline
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value="All">
                    <button
                      className="filter-option"
                      onClick={() => setBooking("All")}
                    >
                      All
                    </button>
                  </MenuItem>
                  <MenuItem value="Arrival">
                    <button
                      className="filter-option"
                      onClick={() => setBooking("Arrival")}
                    >
                      Arrival
                    </button>
                  </MenuItem>
                  <MenuItem value="Departure">
                    <button
                      className="filter-option"
                      onClick={() => setBooking("Departure")}
                    >
                      Departure
                    </button>
                  </MenuItem>
                </Select>
              </Typography>
            </FormControl>
          </Box>

         
        </Box>
      </div>
    );
  };

  return (
    <>
      {content !== undefined && (
        <div className="BulkBookingListing">
          <div className="BulkBookingListing_heading">
            <h3>Bulk Booking</h3>
            <Button
              onClick={() => router.push("/bulk_booking")}
              variant="contained"
              className="export-btn"
            >
              Bulk Upload Menu
            </Button>
          </div>
          <Divider />
          {FilterBooking()}
          <Divider />
          <table>
            <thead>
              <tr>
                <th>BookingId </th>
                <th> Client Name</th>
                <th>Excel File Name</th>
                <th> Date of Arr/Dep</th>
                <th>Time of Arr/Dep</th>
                <th>Booking Type</th>
                <th>Download Records</th>
                <th>Delete Records</th>
              </tr>
            </thead>

            <tbody>
              {content.map((EachContent, index) => {
                return (
                  <tr key={EachContent._id}>
                    <td>{EachContent.bulk_booking_id}</td>
                    <td>{EachContent.client_name}</td>
                    <td>{EachContent.excel_file_name}.xlsx</td>
                    <td>
                      {moment(EachContent.date_of_arrival_or_departure).format(
                        "DD-MM-YYYY"
                      )}
                    </td>
                    <td>
                      {moment(
                        EachContent.time_of_arrival_or_departure,
                        "hh:mm"
                      ).format("LT")}
                    </td>
                    <td>{EachContent.booking_type}</td>
                    <td>
                    
                       {/* <Button type="Submit"  onClick={() =>
                          clickHandler(EachContent.bulk_booking_id)
                        }  className="buttonUserAdd" variant="contained" size="large">
                                Download Record
                          </Button> */}
                          <a style={{textDecoration:'none'}} href={EachContent.excelawslink}>
                               <Button type="Submit"className="buttonUserAdd" variant="contained" size="large">
                                      Download Record
                                </Button>
                          </a>
                    </td>
                    <td>
                      <Button type="Submit" onClick={() => {
                          setexcelId(EachContent.bulk_booking_id);
                          handleClickOpen();
                        }}  className="buttonUserAdd" variant="contained" size="large">
                                Delete Record
                          </Button>
                    </td>
                    {/* <td>{index + 1}</td>

                    <td>{EachContent}</td>
                    <td>
                      <Button
                        variant="contained"
                        className="btn"
                        onClick={() => clickHandler(EachContent)}
                      >
                        Download Record
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        className="btn"
                        onClick={() => {
                          setexcelId(EachContent);
                          handleClickOpen();
                        }}
                      >
                        Delete Record
                      </Button>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Delete modal */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <DialogContentText>
                Do you really want to delete the record ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button size="small" className="buttonUserdialogbtn" variant="contained" onClick={handleClose}>
                No
              </Button>
              <Button size="small"
                className="buttonUserdialogbtn" variant="contained"
                onClick={() => deleteHandler(excelId)}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default BulkBookingsList;
