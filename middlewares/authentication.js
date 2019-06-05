
const jwt = require('jsonwebtoken');


// ========================
//  Verify Token
// ========================
let verifyToken = (req, res, next) => {

    if (process.env.NODE_ENV === 'dev') {
        let token = req.get('Authorization');

        jwt.verify(token, process.env.SEED, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    success: false,
                    err: {
                        message: 'Invalid token'
                    }
                });
            }

            req.dataUser = decoded.dataUser;

            next();
        });
    }
    else {
        next();
    }
};


module.exports = {
    verifyToken
};