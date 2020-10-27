require("dotenv").config
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Razorpay = require('razorpay');
const shortId = require('shortid');
const Mongoose = require('mongoose');
// const { json } = require('body-parser');

Mongoose.connect('mongodb://localhost:27017/hiYatriDB', {useNewUrlParser:true, useUnifiedTopology:true});
const mainSchema = Mongoose.Schema({
    receipt: String,
    order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    amount: Number,
    currency: String,
    created_at: Number,
    status: String
});

const hiYatri = Mongoose.model('hiYatri', mainSchema);

const app = express();

app.use(cors());
app.use(bodyParser.json());

const instance = new Razorpay({  
    key_id: 'rzp_test_Lzs5ccDPvViPtN',  
    key_secret: process.env.KEY_SECRET
})


app.post('/razorpay', async (req, res) => {

    const amount = 5;
    const response = await instance.orders.create({
        amount: amount * 100, 
        currency: 'INR', 
        receipt: shortId.generate(), 
        payment_capture: 1,
    });
    console.log(response);

    const newPayment = new hiYatri({
        receipt: response.receipt,
        order_id: response.id,
        amount: response.amount,
        currency: response.currency,
        status: response.status,
        created_at: response.created_at,
        razorpay_payment_id: null
    });

    newPayment.save((err) => {
        if(err){
            console.log(err);
            return
        } else {
            res.json({
                id: response.id,
                currency: response.currency,
                amount: response.amount/100
            })
        }
    }) 
});

app.post('/verification', (req, res) => {
    console.log(req.body);

    const crypto = require('crypto');
    const halfSig = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    const generated_signature = crypto.createHmac('sha256', instance.key_secret)
                                  .update(halfSig.toString())
                                  .digest('hex')

    console.log('generatedSig: ' + generated_signature);
    console.log('givenSig: ' + req.body.razorpay_signature);

    let isSignatureValid = generated_signature == req.body.razorpay_signature;
    if(isSignatureValid){
        hiYatri.collection.updateOne(
            {razorpay_order_id: req.body.razorpay_order_id},
            {  razorpay_payment_id : req.body.razorpay_payment_id, status : 'captured/verified' },
            { upsert: true }
        )
        console.log('done');
        return res.status(200).json({
          message: 'Payment verification SUCCESS'
        })
    } else {
        return res.status(400).json({
          message: 'Payment verification failed'
        })
    }
});

app.listen(8000, () => {
    console.log("server on 8000");
})
