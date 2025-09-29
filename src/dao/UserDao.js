/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const SuperDao = require('./SuperDao');
const models = require('../models');

const User = models.user;

class UserDao extends SuperDao {
    constructor() {
        super(User);
    }

    async findByUsername(user_username) {
        return User.findOne({ where: { user_username } });
    }

    async isEmailExists(email) {
        return User.count({ where: { email } }).then((count) => {
            if (count != 0) {
                return true;
            }
            return false;
        });
    }

    async findEmployeeIdByUserId(user_id) {
        return User.findOne({ where: { user_id }, attributes: ['employee_id'] });
    }

    async createWithTransaction(user, transaction) {
        return User.create(user, { transaction });
    }
}

module.exports = UserDao;
