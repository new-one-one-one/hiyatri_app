const User = require("../models/user_model");


module.exports.single_user = (req, res) => {
     User.findById(req.params.id)
      .exec((err, response) => {
        if(err){
          return res.status(400).json({
            error: err
          })
        }
        res.status(200).json({
          result: response
        })
      })
}
