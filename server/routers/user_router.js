const express = require("express");
const router = express.Router();

const { single_user } = require("../controllers/user_controller");
// const { run_validation } = require("../validators");

router.get("/user/:id", single_user);

module.exports = router;
