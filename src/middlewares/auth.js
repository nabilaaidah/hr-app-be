const httpStatus = require('http-status');
const TokenService = require('../service/TokenService');
const tokenService = new TokenService();

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Please authenticate' });
        }

        const token = authHeader.split(' ')[1];
        const payload = await tokenService.verifyToken(token, 'ACCESS');

        req.user = { id: payload.sub };
        next();
    } catch (err) {
        console.error(err);
        res.status(httpStatus.UNAUTHORIZED).json({ message: 'Please authenticate' });
    }
};

module.exports = auth;
