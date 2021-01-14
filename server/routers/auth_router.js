const express = require("express");
const router = express.Router();

const { send_otp, verify_otp, admin_agent_authentication, } = require("../controllers/auth_controller");

const { authenticate_validator } = require("../validators/auth_validator");
const { run_validation } = require("../validators");

router.post('/send/otp', send_otp);
router.post('/verify/otp', verify_otp);
router.post('/authentication', admin_agent_authentication);

module.exports = router;
