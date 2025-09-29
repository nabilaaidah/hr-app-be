const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
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

    User.init(
        {
            user_id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },
            user_username: DataTypes.STRING,
            user_password: DataTypes.STRING,
            user_role: DataTypes.INTEGER,
            created_by: DataTypes.STRING,
            created_at: DataTypes.STRING,
            updated_by: DataTypes.STRING,
            updated_at: DataTypes.STRING,
            employee_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'user',
            tableName: 'user',
            underscored: true,
        },
    );
    return User;
};
