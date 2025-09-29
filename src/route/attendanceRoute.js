const express = require('express');
const AttendanceController = require('../controllers/AttendanceController');
const AttendanceValidator = require('../validator/AttendanceValidator');
const { uploadAttendancePhoto, handleUploadError } = require('../middlewares/upload');
const auth = require('../middlewares/auth');

const router = express.Router();

const attendanceController = new AttendanceController();
const attendanceValidator = new AttendanceValidator();

router.post(
    '/user/create',
    auth,
    uploadAttendancePhoto,
    handleUploadError,
    attendanceValidator.attendanceCreateValidator,
    attendanceController.create,
);

router.get(
    '/admin/viewAll',
    auth,
    attendanceValidator.getAttendanceValidator,
    attendanceController.getAttendance,
);

module.exports = router;
