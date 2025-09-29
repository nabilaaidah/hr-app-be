const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserDao = require('../dao/UserDao');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const TokenDao = require('../dao/TokenDao');
const RedisService = require('../service/RedisService');
const models = require('../models');

const User = models.user;
const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
};

const jwtVerify = async (req, payload, done) => {
    try {
        // if (payload.type !== tokenTypes.ACCESS) {
        //     return done(new Error('Invalid token type'), false);
        // }

        const userDao = new UserDao();
        const tokenDao = new TokenDao();

        const authorization =
            req.headers.authorization !== undefined ? req.headers.authorization.split(' ') : [];

        if (!authorization[1]) {
            return done(null, false);
        }

        const tokenDoc = await tokenDao.findOne({
            token: authorization[1],
            blacklisted: false,
        });

        if (!tokenDoc) {
            return done(null, false);
        }

        const user = await userDao.findOneByWhere({ user_uuid: payload.sub });

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        console.error('JWT verify error:', error);
        return done(error, false);
    }
};
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};
