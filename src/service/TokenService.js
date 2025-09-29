const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { token: Token } = require('../models'); // Sequelize model

class TokenService {
    async generateAuthTokens(user) {
        const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
        const accessToken = this.generateToken(user.user_id, accessTokenExpires, 'ACCESS');

        const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
        const refreshToken = this.generateToken(user.user_id, refreshTokenExpires, 'REFRESH');

        // save to DB
        await this.saveToken(accessToken, user.user_id, accessTokenExpires.toDate(), 'ACCESS');
        await this.saveToken(refreshToken, user.user_id, refreshTokenExpires.toDate(), 'REFRESH');

        return {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate(),
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate(),
            },
        };
    }

    generateToken(userId, expires, type) {
        return jwt.sign(
            {
                sub: userId,
                type,
                exp: Math.floor(expires.valueOf() / 1000),
            },
            config.jwt.secret
        );
    }

    // eslint-disable-next-line class-methods-use-this
    async saveToken(token, userId, expires, type) {
        console.log('Saving token:', { token, userId, type, expires });
        await Token.create({
            token,
            user_uuid: userId,
            type,
            blacklisted: false,
            expires,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async verifyToken(token, type) {
        const payload = jwt.verify(token, config.jwt.secret);

        const dbToken = await Token.findOne({
            where: { token, type, blacklisted: false },
        });

        console.log('Verifying token:', { token, type, found: !!dbToken });

        if (!dbToken) {
            throw new Error('Token not found or blacklisted');
        }

        return payload;
    }

}

module.exports = TokenService;
