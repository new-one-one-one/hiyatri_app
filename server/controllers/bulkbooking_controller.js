const fs = require("fs");
const AWS = require("aws-sdk");
const bulk_bookings_info = require("../models/bulk_booking_info_model");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports.create_bulk_booking = (req, res) => {
  if (fs.existsSync("./public/Records.xlsx")) {
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

// const xlsxHelper = () => {
//   return new Promise((resolve, reject) => {
//     let modifiedxldata = xldata;

// const passengerWithPnr = xldata.filter((eachPassenger) => {
//   return eachPassenger.pnr.length !== 0 && eachPassenger.pnr !== null;
// });

// if (passengerWithPnr !== undefined && passengerWithPnr !== null) {
//   axios
//     .post(
//       `${process.env.NEXT_PUBLIC_RAPID_API_BASE_URL}/pnr-status?pnr=${passengerWithPnr[0].pnr}`,
//       {},
//       {
//         headers: {
//           "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
//           "x-rapidapi-host": "indian-railway-pnr-status.p.rapidapi.com",
//         },
//       }
//     )
//     .then((response) => {
//       responsehandler(response).then((modifiedarr) => {
//         modifiedExcelSheetHandler(modifiedarr);
//       });
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

// const responsehandler = async (response) => {
//   return new Promise((resolve) => {
//     const railwayApidata = response.data;

//     if (response.data.length !== 0) {
//       modifiedxldata.map((eachPassenger) => {
//         eachPassenger.BoardingStationName =
//           railwayApidata.pnr_details.boarding_station.station_name;
//         eachPassenger.BoardingTime =
//           railwayApidata.pnr_details.boarding_station.time;
//         eachPassenger.BoardingDate =
//           railwayApidata.pnr_details.boarding_station.date;
//         eachPassenger.DestinationArrivalDate =
//           railwayApidata.pnr_details.reservation_upto.date;
//         eachPassenger.DestinationStationName =
//           railwayApidata.pnr_details.reservation_upto.station_name;
//         eachPassenger.DestinationArrivalTime =
//           railwayApidata.pnr_details.reservation_upto.time;
//         eachPassenger.GroupName = passengerWithPnr[0].pnr;
//         eachPassenger.pnr = passengerWithPnr[0].pnr;
//       });
//       resolve(modifiedxldata); // resolve of response handler for making dynamic fields
//     }
//   });
// };

// const modifiedExcelSheetHandler = (arr) => {
//   jsonexport(arr, function (err, csv) {
//     if (err) return console.error(err);

//     try {
//       //writing the modified excel to the server
//       fs.writeFileSync(`./public/${passengerWithPnr[0].pnr}.xlsx`, csv);
//       s3Uploader();
//     } catch (err) {
//       console.error(err);
//     }
//   });
// };

// const s3Uploader = () => {
//   fs.readFile(`./public/${passengerWithPnr[0].pnr}.xlsx`, (err, data) => {
//     if (err) throw err;

//     if (!err) {
//       const params = {
//         Bucket: "hiyatribulkbookingexcels",
//         Key: `${passengerWithPnr[0].pnr}.xlsx`,
//         Body: JSON.stringify(data, null, 2),
//       };

//       s3.upload(params, function (s3Err, data) {
//         if (s3Err) throw s3Err;

//         console.log(`File uploaded successfully at ${data.Location}`);
//       });
//     }
//   });
// };

//     resolve();
//   });
// };

module.exports.get_all_excelFiles = (req, res) => {
  // const params = {
  //   Bucket: process.env.AWS_S3Bucket,
  // };

  // let keys = [];
  // s3.listObjectsV2(params, (err, data) => {
  //   if (err) {
  //     console.log(err, err.stack);
  //     res.send("error -> " + err);
  //   } else {
  //     let contents = data.Contents;
  //     contents.forEach(function (content) {
  //       keys.push(content.Key);
  //     });
  //     res.send(keys);
  //   }
  // });

  //   AWS.config.update({
  //     accessKeyId: process.env.AWS_ACCESS_KEY,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   });

  // var s3 = new AWS.S3();
  // var params = {
  //   Bucket: "hiyatribulkbookingexcels",
  //   Key: 'Records.xlsx'
  // };

  // let readStream = s3.getObject(params).createReadStream();
  // let writeStream = fs.createWriteStream('./public/Records.xlsx');
  // readStream.pipe(writeStream);

  bulk_bookings_info.find({}).then((result) => {
    res.send(result);
  });
};

module.exports.download_particularExcelFile = (req, res) => {
  const writingtothefileystem = () => {
    return new Promise((resolve, reject) => {
      AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      const s3 = new AWS.S3();
      const params = {
        Bucket: "hiyatribulkbookingexcels",
        Key: `${req.params.filename}.xlsx`,
      };

      let readStream = s3.getObject(params).createReadStream();
      let writeStream = fs.createWriteStream(
        `./public/${req.params.filename}.xlsx`
      );
      readStream.pipe(writeStream).on("finish", () => {
        resolve();
      });
      readStream.pipe(writeStream).on("error", () => {
        reject();
      });
    });
  };

  writingtothefileystem().then(() => {
    if (fs.existsSync(`./public/${req.params.filename}.xlsx`)) {
      fs.readFile(`./public/${req.params.filename}.xlsx`, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
          res.send(data);
        }
      });
    }
  });
};

module.exports.downloadtemplate = (req, res) => {
  fs.readFile(`./public/SampleTemplate/Records.xlsx`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.send(data);
    }
  });
};

module.exports.deleteRecord = (req, res) => {
  const deletefroms3 = () => {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: process.env.AWS_S3Bucket,
        Key: `${req.params.bulk_booking_id}.xlsx`,
      };

      s3.deleteObject(params, function (err, data) {
        if (!err) {
          resolve();
        }
      });
    });
  };

  deletefroms3().then(() => {
    bulk_bookings_info.findOneAndDelete(
      { bulk_booking_id: req.params.bulk_booking_id },
      function (error, data) {
        console.log;
        bulk_bookings_info.remove();
        if (!error) {
          console.log("deleted from db");
          res.sendStatus(200);
        }
      }
    );

    if (fs.existsSync(`./public/${req.params.bulk_booking_id}.xlsx`)) {
      fs.unlink(`./public/${req.params.bulk_booking_id}.xlsx`, (err) => {
        if (err) {
          throw err;
        } else {
          console.log("File Removed from the file system");
        }
      });
    }
  });
};

module.exports.bulk_bookings_requests = async (req, res) => {
  const pad = (number, length) => {
    var str = "" + number;
    while (str.length < length) {
      str = "0" + str;
    }
    return str;
  };

  let unique_keys = pad((await bulk_bookings_info.countDocuments()) + 1, 5);

  const bulk_booking_id = "Blk_" + unique_keys;

  const s3uploader = () => {
    return new Promise((resolve, reject) => {
      if (fs.existsSync("./public/Records.xlsx")) {
        fs.rename(
          `./public/Records.xlsx`,
          `./public/${bulk_booking_id}.xlsx`,
          () => {
            console.log("excel file name changed for s3 upload!");
            resolve();
          }
        );
      } else {
        reject();
      }
    });
  };

  s3uploader()
    .then(() => {
      if (fs.existsSync(`./public/${bulk_booking_id}.xlsx`)) {
        fs.readFile(`./public/${bulk_booking_id}.xlsx`, (err, data) => {
          if (err) throw err;

          if (!err) {
            const params = {
              Bucket: "hiyatribulkbookingexcels",
              Key: `${bulk_booking_id}.xlsx`,
              Body: data,
              ContentType: "application/vnd.ms-excel",
            };

            s3.upload(params, function (s3Err, data) {
              if (s3Err) throw s3Err;
              if (!s3Err) {
                console.log(`File uploaded successfully at ${data.Location}`);
                fs.unlink(`./public/${bulk_booking_id}.xlsx`, (err) => {
                  if (err) {
                    throw err;
                  } else {
                    console.log(
                      `removed file from the server ${bulk_booking_id}`
                    );
                  }
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log("err", err);
    });

  const {
    client_name,
    date_of_arrival_or_departure,
    time_of_arrival_or_departure,
    booking_type,
  } = req.body;
  const bulk_booking = bulk_bookings_info({
    bulk_booking_id,
    client_name,
    date_of_arrival_or_departure,
    time_of_arrival_or_departure,
    booking_type,
    excel_file_name: bulk_booking_id,
  });
  await bulk_booking.save((err, result) => {
    if (!err) {
      res.status(200).json({
        message: "Bulk Booking requests created successfuly !",
      });
    } else {
      return res.status(400).json({
        error: err.errors,
      });
    }
  });
};
