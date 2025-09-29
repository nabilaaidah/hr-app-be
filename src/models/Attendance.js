const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Attendance extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Attendance.belongsTo(models.employee, {
                foreignKey: 'employee_id',
                as: 'employee',
            })
        }
    }

    Attendance.init(
        {
            attendance_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            attendance_check_in_time: DataTypes.STRING,
            attendance_check_in_date: DataTypes.STRING,
            attendance_photo_url: DataTypes.STRING,
            attendance_location_lat: DataTypes.STRING,
            attendance_location_lng: DataTypes.STRING,
            created_by: DataTypes.STRING,
            created_at: DataTypes.STRING,
            updated_by: DataTypes.STRING,
            updated_at: DataTypes.STRING,
            employee_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'attendance',
            tableName: 'attendance',
            underscored: true,
        },
    );
    return Attendance;
};
