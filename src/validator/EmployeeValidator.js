const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');

class EmployeeValidator {
    async createEmployeeValidator(req, res, next) {
        const schema = Joi.object({
            employee_nik: Joi.string().required(),
            employee_name: Joi.string().required(),
            employee_email: Joi.string().email().required(),
            employee_phone: Joi.string().required(),
            employee_address: Joi.string().required(),
            department_id: Joi.string().optional().allow(null, ''),
            position_id: Joi.string().optional().allow(null, ''),
        });

        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            const errorMessage = error.details.map((details) => details.message).join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.body = value;
            return next();
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async updateEmployeeValidator(req, res, next) {
        const paramsSchema = Joi.object({
            employee_id: Joi.string().required(),
        });

        const { error: paramsError } = paramsSchema.validate(req.params);

        if (paramsError) {
            const errorMessage = paramsError.details
                .map((details) => details.message)
                .join(', ');
            return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        }

        const bodySchema = Joi.object({
            employee_nik: Joi.string().optional(),
            employee_name: Joi.string().optional(),
            employee_email: Joi.string().email().optional(),
            employee_phone: Joi.string().optional(),
            employee_address: Joi.string().optional(),
            department_id: Joi.string().optional().allow(null, ''),
            position_id: Joi.string().optional().allow(null, ''),
        });

        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        const { error: bodyError, value } = bodySchema.validate(req.body, options);

        if (bodyError) {
            const errorMessage = bodyError.details
                .map((details) => details.message)
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.body = value;
            return next();
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async deleteEmployeeValidator(req, res, next) {
        const schema = Joi.object({
            employee_id: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.params);

        if (error) {
            const errorMessage = error.details
                .map((details) => details.message)
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            req.params = value;
            return next();
        }
    }
}

module.exports = new EmployeeValidator();