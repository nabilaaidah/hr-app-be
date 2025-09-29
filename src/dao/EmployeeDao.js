/* eslint-disable camelcase */
const SuperDao = require('./SuperDao');
const models = require('../models');

const Employee = models.Employee;

class EmployeeDao extends SuperDao {
    constructor() {
        super(Employee);
    }

    async findByEmail(employee_email) {
        return this.Model.findOne({ where: { employee_email } });
    }

    async findByNIK(employee_nik) {
        return this.Model.findOne({ where: { employee_nik } });
    }

    async findByEmployeeId(employee_id) {
        return this.Model.findOne({ where: { employee_id } });
    }

    async getEmployeeList(limit, offset, order, sort) {
        return this.getDataTableData({}, limit, offset, [[order, sort]]);
    }

    async getEmployeesWithDetails(limit, offset, order = 'updated_at', sort = 'DESC') {
        return this.Model.findAndCountAll({
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            order: [[order, sort]],
        });
    }
}

module.exports = EmployeeDao;