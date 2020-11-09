const mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
const commentSchema = new  Schema({
    pnr_number:String,
    comment_by :String ,
    comment:String,
    facilityType:String,
    created_at:{type: Date, default: Date.now},
});
module.exports = mongoose.model('Comment', commentSchema);