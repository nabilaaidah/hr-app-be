/* eslint-disable prettier/prettier */
'use strict';
const bcrypt = require('bcryptjs');
const { v4:uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [
          {
            user_id: uuidv4(),
            user_username: "budiputera",
            user_password: bcrypt.hashSync('putera123'),
            user_role: 2,
            created_at: new Date(),
            created_by: "system",
            updated_at: new Date(),
            updated_by: "system",
            employee_id: "46c13df6-d1ba-4355-91f7-16ac69aeb500"
          },
          {
            user_id: uuidv4(),
            user_username: "riniadini",
            user_password: bcrypt.hashSync('adini123'),
            user_role: 2,
            created_at: new Date(),
            created_by: "system",
            updated_at: new Date(),
            updated_by: "system",
            employee_id: "f0c9ea2b-dfe2-4197-a06a-2293f1cf7117"
          },
          {
            user_id: uuidv4(),
            user_username: "admin",
            user_password: bcrypt.hashSync('admin123'),
            user_role: 1,
            created_at: new Date(),
            created_by: "system",
            updated_at: new Date(),
            updated_by: "system",
            employee_id: "c5ed996d-a41f-47d1-ac0c-e463672b7e22"
          },
        ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {})
  }
};
