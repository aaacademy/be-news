const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if(token) {
            const decoded = jwt.verify(token, 'secreet');
            req.user = decoded
            next()
        } else {
            res.status(404).json({
                data: null,
                message: 'Token not found!'
            })
        }
    } else {
        res.status(403).json({
            data: null,
            message: 'Please login for access!'
        })
    }
}

module.exports = {
    checkToken,
}