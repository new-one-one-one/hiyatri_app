const express = require("express");
const router = express.Router();
const {
  create_bulk_booking,
  get_all_excelFiles,
  download_particularExcelFile,
  deleteRecord,
  downloadtemplate,
  bulk_bookings_requests,
  
} = require("../controllers/bulkbooking_controller");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create_bulk_booking", upload.single("file"), create_bulk_booking);
router.get("/get_all_excelFiles", get_all_excelFiles);
router.get("/download_particularFile/:filename", download_particularExcelFile);
router.get("/downloadtemplate", downloadtemplate);
router.post("/deleteRecord/:bulk_booking_id", deleteRecord);
router.post("/bulk_bookings_requests",bulk_bookings_requests);

module.exports = router;
