const jwt = require('jsonwebtoken');

export default async function VerifyJWT(req, res, next) {
    if(req.headers.authorization.split(' ')[0] !== 'Bearer') {
        res.status(401).json({
            status: "error",
            error: "Invalid token"
        });
    }
    else {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            res.status(401).json({
                status: "error",
                error: "Unauthorized"
            });
        }
        else {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                typeof next !== "undefined" ? next() : res.status(200).json({
                        status: "success",
                        data: "Token verified"
                    })

            }
            catch (e) {
                res.status(401).json({
                    status: "error",
                    error: "Unauthorized"
                });
            }
        }
    }
}

module.exports = VerifyJWT;