const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token tidak terdeteksi'
            });
        }

        const accessToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!apiToken) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
        
        req.user = accessToken; 
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    verifyToken
}