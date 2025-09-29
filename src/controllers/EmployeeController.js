/* eslint-disable camelcase */
const EmployeeService = require('../service/EmployeeService');
const logger = require('../config/logger');

class EmployeeController {
    constructor() {
        this.employeeService = new EmployeeService();
    }

    getAllEmployees = async (req, res) => {
        try {
            const { limit = 10, offset = 0, order = 'created_at', sort = 'DESC' } = req.query;
            
            const result = await this.employeeService.getAllEmployees(
                parseInt(limit, 10),
                parseInt(offset, 10),
                order,
                sort
            );

            if (result.success) {
                return res.status(200).json({
                    success: true,
                    data: result.data,
                    total: result.total,
                });
            }

            return res.status(500).json({
                success: false,
                message: result.message,
            });
        } catch (error) {
            logger.error('Error in getAllEmployees controller:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    };

    createEmployee = async (req, res) => {
        try {
            const employeeData = req.body;
            const createdBy = req.user?.employee_id || req.user?.id || 'system'; // From auth middleware

            if (!employeeData.employee_nik || !employeeData.employee_name || !employeeData.employee_email) {
                return res.status(400).json({
                    success: false,
                    message: 'NIK, name, and email are required',
                });
            }

            const result = await this.employeeService.createEmployee(employeeData, createdBy);

            if (result.success) {
                return res.status(201).json({
                    success: true,
                    message: result.message,
                    data: result.data,
                });
            }

            return res.status(400).json({
                success: false,
                message: result.message,
            });
        } catch (error) {
            logger.error('Error in createEmployee controller:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    };

    updateEmployee = async (req, res) => {
        try {
            const { employee_id } = req.params;
            const employeeData = req.body;
            const updatedBy = req.user?.employee_id || req.user?.id || 'system'; // From auth middleware

            if (!employee_id) {
                return res.status(400).json({
                    success: false,
                    message: 'Employee ID is required',
                });
            }

            const result = await this.employeeService.updateEmployee(employee_id, employeeData, updatedBy);

            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: result.message,
                    data: result.data,
                });
            }

            return res.status(400).json({
                success: false,
                message: result.message,
            });
        } catch (error) {
            logger.error('Error in updateEmployee controller:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    };

    deleteEmployee = async (req, res) => {
        try {
            const { employee_id } = req.params;

            if (!employee_id) {
                return res.status(400).json({
                    success: false,
                    message: 'Employee ID is required',
                });
            }

            const result = await this.employeeService.deleteEmployee(employee_id);

            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: result.message,
                });
            }

            return res.status(404).json({
                success: false,
                message: result.message,
            });
        } catch (error) {
            logger.error('Error in deleteEmployee controller:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    };
}

module.exports = new EmployeeController();