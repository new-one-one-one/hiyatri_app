const Comment = require('../models/comment_model');

module.exports.create_comment = (req, res) => {
   const { order, comment, comment_by } = req.body;
   const newComment = Comment({ order, comment, comment_by})
         newComment.save((err, result) => {
           if(err){
             return res.status(400).json({
               error: err
             })
           }
           res.status(200).json({
             message: "comment successfuly"
           })
     })
}

module.exports.comment_list = (req, res) => {
  Comment.find()
   .sort({ createdAt: -1})
   .populate("comment_by", "name phone_number user_type")
   .exec((err, response) => {
     if(err){
       return  res.status(400),json({
         error: err
       })
     }
   res.status(200).json({
      comments: response
    })
  })
}
