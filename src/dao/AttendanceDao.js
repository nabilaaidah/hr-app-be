/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const SuperDao = require('./SuperDao');
const models = require('../models');

const Attendance = models.attendance;

class AttendanceDao extends SuperDao {
    constructor() {
        super(Attendance);
    }

    async findByEmployeeID(employee_id) {
        return this.findOne({ where: { employee_id } });
    }

    async getAttendance(limit, offset, order, sort) {
        return this.Model.findAndCountAll({
            where: {},
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            order: [[order, sort]],
            include: [
                {
                    model: models.employee,
                    as: 'employee',
                    attributes: ['employee_name'],
                },
            ],
        });
    }
}

module.exports = AttendanceDao;
