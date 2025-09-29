const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const createUploadDirs = () => {
    const currentYear = moment().format('YYYY');
    const currentMonth = moment().format('MM');
    const uploadPath = path.join('uploads', 'attendance', currentYear, currentMonth);

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    return uploadPath;
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = createUploadDirs();
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const timestamp = moment().format('YYYYMMDDHHmmss');
        const userId = req.user?.id || 'unknown';
        const extension = path.extname(file.originalname);
        const filename = `attendance-${userId}-${timestamp}${extension}`;
        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

const uploadAttendancePhoto = upload.single('photo');

const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File too large. Maximum size if 5MB',
            });
        }
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    } else if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
};

module.exports = {
    uploadAttendancePhoto,
    handleUploadError,
    createUploadDirs
}