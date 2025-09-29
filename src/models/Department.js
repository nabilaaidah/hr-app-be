const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Department extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate() {
            // define association here
            //  User.belongsTo(models.agency, { foreignKey: 'agency_id', targetKey: 'id' });
        }
    }

    Department.init(
        {
            department_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            department_name: DataTypes.STRING,
            department_desc: DataTypes.STRING,
            created_by: DataTypes.STRING,
            created_at: DataTypes.STRING,
            updated_by: DataTypes.STRING,
            updated_at: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'department',
            tableName: 'department',
            underscored: true,
        },
    );
    return Department;
};
