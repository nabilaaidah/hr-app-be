/* eslint-disable camelcase */
const EmployeeDao = require('../dao/EmployeeDao');
const logger = require('../config/logger');
const { v4: uuidv4 } = require('uuid');

class EmployeeService {
    constructor() {
        this.employeeDao = new EmployeeDao();
    }

    async getAllEmployees(limit = 10, offset = 0, order = 'updated_at', sort = 'DESC') {
        try {
            const result = await this.employeeDao.getEmployeeList(limit, offset, order, sort);
            return {
                success: true,
                data: result.rows || [],
                total: result.count || 0,
            };
        } catch (error) {
            logger.error('Error in getAllEmployees service:', error);
            return {
                success: false,
                message: 'Failed to fetch employees',
                error: error.message,
            };
        }
    }

    async getEmployeeById(employee_id) {
        try {
            const employee = await this.employeeDao.findByEmployeeId(employee_id);
            
            if (!employee) {
                return {
                    success: false,
                    message: 'Employee not found',
                };
            }

            return {
                success: true,
                data: employee,
            };
        } catch (error) {
            logger.error('Error in getEmployeeById service:', error);
            return {
                success: false,
                message: 'Failed to fetch employee',
                error: error.message,
            };
        }
    }

    async createEmployee(employeeData, createdBy) {
        try {
            if (!employeeData.employee_nik || !employeeData.employee_name || !employeeData.employee_email) {
                return {
                    success: false,
                    message: 'NIK, name, and email are required',
                };
            }

            const existingEmail = await this.employeeDao.findByEmail(employeeData.employee_email);
            if (existingEmail) {
                return {
                    success: false,
                    message: 'Email already exists',
                };
            }
            const existingNIK = await this.employeeDao.findByNIK(employeeData.employee_nik);
            if (existingNIK) {
                return {
                    success: false,
                    message: 'NIK already exists',
                };
            }

            const newEmployeeData = {
                employee_id: uuidv4(),
                employee_nik: employeeData.employee_nik,
                employee_name: employeeData.employee_name,
                employee_email: employeeData.employee_email,
                employee_phone: employeeData.employee_phone || null,
                employee_address: employeeData.employee_address || null,
                department_id: employeeData.department_id || null,
                position_id: employeeData.position_id || null,
                created_by: createdBy || 'system',
                updated_by: createdBy || 'system',
            };

            const newEmployee = await this.employeeDao.create(newEmployeeData);
            
            return {
                success: true,
                message: 'Employee created successfully',
                data: newEmployee,
            };
        } catch (error) {
            logger.error('Error in createEmployee service:', error);
            return {
                success: false,
                message: 'Failed to create employee',
                error: error.message,
            };
        }
    }

    async updateEmployee(employee_id, employeeData, updatedBy) {
        try {
            const employee = await this.employeeDao.findByEmployeeId(employee_id);
            if (!employee) {
                return {
                    success: false,
                    message: 'Employee not found',
                };
            }

            if (employeeData.employee_email && employeeData.employee_email !== employee.employee_email) {
                const existingEmail = await this.employeeDao.findByEmail(employeeData.employee_email);
                if (existingEmail) {
                    return {
                        success: false,
                        message: 'Email already exists',
                    };
                }
            }

            if (employeeData.employee_nik && employeeData.employee_nik !== employee.employee_nik) {
                const existingNIK = await this.employeeDao.findByNIK(employeeData.employee_nik);
                if (existingNIK) {
                    return {
                        success: false,
                        message: 'NIK already exists',
                    };
                }
            }

            const updateData = {
                ...employeeData,
                updated_by: updatedBy || 'system',
            };

            delete updateData.employee_id;
            delete updateData.created_at;
            delete updateData.created_by;

            await this.employeeDao.updateWhere(updateData, { employee_id });
            const updatedEmployee = await this.employeeDao.findByEmployeeId(employee_id);

            return {
                success: true,
                message: 'Employee updated successfully',
                data: updatedEmployee,
            };
        } catch (error) {
            logger.error('Error in updateEmployee service:', error);
            return {
                success: false,
                message: 'Failed to update employee',
                error: error.message,
            };
        }
    }

    async deleteEmployee(employee_id) {
        try {
            const employee = await this.employeeDao.findByEmployeeId(employee_id);
            if (!employee) {
                return {
                    success: false,
                    message: 'Employee not found',
                };
            }

            await this.employeeDao.deleteByWhere({ employee_id });

            return {
                success: true,
                message: 'Employee deleted successfully',
            };
        } catch (error) {
            logger.error('Error in deleteEmployee service:', error);
            return {
                success: false,
                message: 'Failed to delete employee',
                error: error.message,
            };
        }
    }

    async getEmployeeByNIK(employee_nik) {
        try {
            const employee = await this.employeeDao.findByNIK(employee_nik);
            
            if (!employee) {
                return {
                    success: false,
                    message: 'Employee not found',
                };
            }

            return {
                success: true,
                data: employee,
            };
        } catch (error) {
            logger.error('Error in getEmployeeByNIK service:', error);
            return {
                success: false,
                message: 'Failed to fetch employee',
                error: error.message,
            };
        }
    }

    async getEmployeeByEmail(employee_email) {
        try {
            const employee = await this.employeeDao.findByEmail(employee_email);
            
            if (!employee) {
                return {
                    success: false,
                    message: 'Employee not found',
                };
            }

            return {
                success: true,
                data: employee,
            };
        } catch (error) {
            logger.error('Error in getEmployeeByEmail service:', error);
            return {
                success: false,
                message: 'Failed to fetch employee',
                error: error.message,
            };
        }
    }
}

module.exports = EmployeeService;