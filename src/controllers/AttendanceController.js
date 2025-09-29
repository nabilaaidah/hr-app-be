const AttendanceService = require('../service/AttendanceService');

class AttendanceController {
    constructor() {
        this.attendanceService = new AttendanceService();
    }

    create = async (req, res) => {
        try {
            const result = await this.attendanceService.createAttendance(req.body, req.file);
            return res.status(result.statusCode).json(result);
        } catch (e) {
            console.error('Error in attendance controller:', e);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    };

    getPhoto = async (req, res) => {
        try {
            const { attendanceId } = req.params;
            const baseUrl = `${req.protocol}://${req.get('host')}`;

            const result = await this.attendanceService.getAttendancePhoto(attendanceId, baseUrl);

            return res.status(result.statusCode).json(result);
        } catch (error) {
            console.error('Error getting attendance photo:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    };

    getAttendance = async (req, res) => {
        try {
            const { limit = 10, offset = 0, order = 'attendance_check_in_time', sort = 'DESC' } = req.query;

            const result = await this.attendanceService.getAttendance(
                parseInt(limit, 10),
                parseInt(offset, 10),
                order,
                sort,
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
            console.error('Error in getAttendance controller:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    };

    deleteAttendance = async (req, res) => {
        try {
            const { attendanceId } = req.params;

            const result = await this.attendanceService.deleteAttendance(attendanceId);

            return res.status(result.statusCode).json(result);
        } catch (error) {
            console.error('Error deleting attendance:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    };
}

module.exports = AttendanceController;
