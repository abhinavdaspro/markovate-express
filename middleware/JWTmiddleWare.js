const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    console.log(req.header);
    let authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(403).json({
            success: false,
            message: "Authorization Token missing in Headers"
        })
    }
    if (authorization.split(" ")[0] !== "Bearer") {
        return res.status(403).json({
            success: false,
            message: "Invalid Authorization Token"
        })
    }

    try {
        var decoded = jwt.verify(authorization.split(" ")[1], 'privatekey');
        // console.log("jwt decoded---", decoded)
        next();
    } catch (err) {
        console.error("err----", err)
        return res.status(403).json({
            success: false,
            message: "Invalid Authorization Token"
        })
    }
}