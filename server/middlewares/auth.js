const User = require("../models/user_model");
const expressJwt = require('express-jwt');
const { errorHandler } = require('../utils/dbErrorHandler');

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256']
});


exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.user_type !== "ADMIN") {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }

        req.profile = user;
        next();
    });
};


exports.agentMiddleware = (req, res, next) => {
    const agentUserId = req.user._id;
    User.findById({ _id: agentUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.user_type !== "AGENT") {
            return res.status(400).json({
                error: 'Agent resource. Access denied'
            });
        }

        req.profile = user;
        next();
    });
};


exports.superAdminMiddleware = (req, res, next) => {
    const superAdminUserId = req.user._id;
    User.findById({ _id: superAdminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.user_type !== "SUPER_ADMIN") {
            return res.status(400).json({
                error: 'Super Admin resource. Access denied'
            });
        }

        req.profile = user;
        next();
    });
};
