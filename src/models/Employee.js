const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Employee.hasMany(models.attendance, {
                foreignKey: 'employee_id',
                as: 'attendances',
            });
        }
    }

    Employee.init(
        {
            employee_id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            employee_nik: DataTypes.STRING,
            employee_name: DataTypes.STRING,
            employee_email: DataTypes.STRING,
            employee_phone: DataTypes.STRING,
            employee_address: DataTypes.STRING,
            created_by: DataTypes.STRING,
            created_at: DataTypes.STRING,
            updated_by: DataTypes.STRING,
            updated_at: DataTypes.STRING,
            department_id: DataTypes.STRING,
            position_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'employee',
            tableName: 'employee',
            underscored: true,
        },
    );
    return Employee;
};
