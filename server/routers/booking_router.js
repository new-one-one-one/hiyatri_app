const express=require('express');

const router=express.Router();

const{ booking }=require("../controllers/booking_controller");

router.post('/bookingPage',booking);

module.exports=router;