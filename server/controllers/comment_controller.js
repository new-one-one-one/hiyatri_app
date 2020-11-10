const Comment_schema = require('../models/comment_model');
exports.create_comment = (req, res) =>{
    console.log("Create Comment called", req.body);
    const {
        pnr_number,
        comment_by,
        comment,
        facility_type
    }   =  req.body;
    const addComment = new Comment_schema({
        pnr_number,
        comment_by,
        comment,
        facility_type
    })
    addComment.save((err, result) => {
        if(err){
          return res.status(400).json({
          error: errorHandler(err)
          })
    }})

}