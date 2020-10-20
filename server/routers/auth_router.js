const express = require("express");
const router = express.Router();

const { authenticate } = require("../controllers/auth_controller");

const { authenticate_validator } = require("../validators/auth_validator");
const { run_validation } = require("../validators");

router.post("/authenticate", authenticate_validator, run_validation, authenticate);

module.exports = router;
