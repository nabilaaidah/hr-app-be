/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('department', [
      {
        department_id: "D001",
        department_name: 'IT',
        department_desc: '',
        created_at: new Date(),
        created_by: 'system',
        updated_at: new Date(),
        updated_by: 'system',
      },
      {
        department_id: "D002",
        department_name: 'HR',
        department_desc: '',
        created_at: new Date(),
        created_by: 'system',
        updated_at: new Date(),
        updated_by: 'system',
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('department', null, {})
  }
};
