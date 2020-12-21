const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const transactionSchema = mongoose.Schema({
       user:{
          type:ObjectId,
          required:true
        },
       order_id: {
         type: ObjectId,
         required:true
       },
       transaction_amount: {
        type: Number,
        required: true
       },
       status:{
         type: String,
         enum:["SUCCESS", "FAIL"],
         default:"FAIL"
       },
       del_flag:{
          type:Boolean,
          default:false
        }
}, { timestamps:true })

module.exports = mongoose.model("Transaction", transactionSchema);
