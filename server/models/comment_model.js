
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const commentSchema = mongoose.Schema({
   order: {
     type: ObjectId,
     ref:"Order"
   },
   comment_by:{
     type: ObjectId,
     ref:"User"
   },
   comment: {
     type:String
   }
}, { timestamp:true })

module.exports = mongoose.model("Comment", commentSchema);
