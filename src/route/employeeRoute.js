const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/EmployeeController');
const employeeValidator = require('../validator/EmployeeValidator');
const authMiddleware = require('../middlewares/auth');
const auth = require('../middlewares/auth');

router.get(
    '/viewAll',
    auth,
    employeeController.getAllEmployees,
);

router.post(
    '/create',
    auth,
    employeeValidator.createEmployeeValidator,
    employeeController.createEmployee,
);

router.put(
    '/:employee_id',
    auth,
    employeeValidator.updateEmployeeValidator,
    employeeController.updateEmployee,
);

router.delete(
    '/:employee_id',
    auth,
    employeeValidator.deleteEmployeeValidator,
    employeeController.deleteEmployee,
);

module.exports = router;
