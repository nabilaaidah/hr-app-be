const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class AttendanceValidator {
    async attendanceCreateValidator(req, res, next) {
        const schema = Joi.object({
            time: Joi.string().required(),
            date: Joi.string().required(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            user_id: Joi.string().required(),
        });

        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }

    async getAttendanceValidator(req, res, next) {
        const schema = Joi.object({
            limit: Joi.number(),
            offset: Joi.number(),
            order: Joi.string(),
            sort: Joi.string(),
        });

        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }
}

module.exports = AttendanceValidator;