/* eslint-disable prettier/prettier */
'use strict';

const { UUID } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('position', [
      {
        position_id: "P001",
        position_name: 'Manager',
        position_desc: '',
        created_at: new Date(),
        created_by: 'system',
        updated_at: new Date(),
        updated_by: 'system',
      },
      {
        position_id: "P002",
        position_name: 'Staff',
        position_desc: '',
        created_at: new Date(),
        created_by: 'system',
        updated_at: new Date(),
        updated_by: 'system',
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('position', null, {})
  }
};
