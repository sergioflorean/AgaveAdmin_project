const jwt = require("jsonwebtoken");


module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if(err){
            res.status(401).json({
                msg: "Unauthorized attempt, please login or register. This is a message from jwt.config.js",
            });
        } else{
            next();
        }
    })
}