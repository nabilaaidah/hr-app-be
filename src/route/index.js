const express = require('express');
const authRoute = require('./authRoute');
const attendanceRoute = require('./attendanceRoute');
const employeeRoute = require('./employeeRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/attendance',
        route: attendanceRoute,
    },
    {
        path: '/employee',
        route: employeeRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
