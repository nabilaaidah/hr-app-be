const httpStatus = require('http-status');
const {v4:uuidv4} = require('uuid');
const moment = require('moment');
const AttendanceDao = require('../dao/AttendanceDao');
const responseHandler = require('../helper/responseHandler');
const UserDao = require('../dao/UserDao');
const logger = require('../config/logger');
const FileHelper = require('../utils/fileHelper');

class AttendanceService {
    constructor() {
        this.attendanceDao = new AttendanceDao();
        this.userDao = new UserDao();
    }

    createAttendance = async (payload, file) => {
        let photoUrl = null;

        try {
            const uuid = uuidv4();

            const employee = await this.userDao.findEmployeeIdByUserId(payload.user_id);
            if (!employee) {
                if (file) {
                    FileHelper.deleteFile(file.path);
                }
                return responseHandler.returnError(httpStatus.NOT_FOUND, 'Employee not found');
            }

            if (file) {
                photoUrl = FileHelper.getRelativePath(file.path);
            } else if (payload.photoBase64) {
                photoUrl = payload.photoBase64;
            }

            if (!photoUrl) {
                return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Photo is required');
            }

            const newAttendance = {
                attendance_id: uuid,
                attendance_check_in_time: payload.time,
                attendance_check_in_date: payload.date,
                attendance_photo_url: photoUrl,
                attendance_location_lat: payload.latitude,
                attendance_location_lng: payload.longitude,
                created_by: payload.user_id,
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                updated_by: payload.user_id,
                updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                employee_id: employee.employee_id,

            };

            const attendanceData = await this.attendanceDao.create(newAttendance);
            if (!attendanceData) {
                if (file) {
                    FileHelper.deleteFile(file.path);
                }
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Failed to submit attendance',
                );
            }

            const message = 'Attendance submitted successfully';
            return responseHandler.returnSuccess(httpStatus.CREATED, message, {
                ...attendanceData,
                photo_url: photoUrl,
            });
        } catch (e) {
            logger.error('Error in createAttendance:', e);

            if (file) {
                FileHelper.deleteFile(file.path);
            }

            return responseHandler.returnError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Something went wrong',
            );
        }
    };

    getAttendancePhoto = async (attendanceId, baseUrl) => {
        try {
            const attendance = await this.attendanceDao.findById(attendanceId);

            if (!attendance) {
                return responseHandler.returnError(
                    httpStatus.NOT_FOUND,
                    'Attendance record not found',
                );
            }

            const photoUrl = FileHelper.getFileUrl(attendance.attendance_photo_url, baseUrl);

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Photo URL retrieved successfully',
                { photo_url: photoUrl },
            );
        } catch (error) {
            logger.error('Error in getAttendancePhoto:', error);
            return responseHandler.returnError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Something went wrong',
            );
        }
    };

    getAttendance = async (limit = 10, offset = 0, order = 'attendance_check_in_time', sort = 'DESC') => {
        try {
            const attendance = await this.attendanceDao.getAttendance(limit, offset, order, sort);
            return {
                success: true,
                data: attendance.rows || attendance,
                total: attendance.count || 0,
            }
        } catch (err) {
            console.error('Error in getAttendance service:', err);
            return {
                success: false,
                message: 'Failed to fetch attendance records',
                error: err.message,
            };
        }
    }

    deleteAttendance = async (attendanceId) => {
        try {
            const attendance = await this.attendanceDao.findById(attendanceId);

            if (!attendance) {
                return responseHandler.returnError(
                    httpStatus.NOT_FOUND,
                    'Attendance record not found',
                );
            }

            const deleted = await this.attendanceDao.delete(attendanceId);

            if (deleted) {
                if (
                    attendance.attendance_photo_url &&
                    !attendance.attendance_photo_url.startsWith('data:')) {
                    FileHelper.deleteFile(attendance.attendance_photo_url);
                }

                return responseHandler.returnSuccess(
                    httpStatus.OK,
                    'Attendance record deleted successfully',
                );
            }

            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Failed to delete attendance record',
            );
        } catch (error) {
            logger.error('Error in deleteAttendance:', error);
            return responseHandler.returnError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Something went wrong',
            );
        }
    };
}

module.exports = AttendanceService;