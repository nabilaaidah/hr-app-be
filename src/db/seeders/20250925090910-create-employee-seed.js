/* eslint-disable prettier/prettier */
'use strict';

const { UUIDV4 } = require('sequelize');
const { v4:uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employee', [
      {
        employee_id: uuidv4(),
        employee_nik: "1234567890123456",
        employee_name: "Budi Putera",
        employee_email: "putera@mail.com",
        employee_phone: "08172612831",
        employee_address: "Jl. Cempaka no 1",
        created_at: new Date(),
        created_by: "system",
        updated_at: new Date(),
        updated_by: "system",
        position_id: "P002",
        department_id: "D001"
      },
      {
        employee_id: uuidv4(),
        employee_nik: "6543567890123456",
        employee_name: "Rini Adini",
        employee_email: "adini@mail.com",
        employee_phone: "08178976531",
        employee_address: "Jl. Cenderawasih no 1",
        created_at: new Date(),
        created_by: "system",
        updated_at: new Date(),
        updated_by: "system",
        position_id: "P001",
        department_id: "D001"
      },
      {
        employee_id: uuidv4(),
        employee_nik: "8907567890123456",
        employee_name: "Maura Melody",
        employee_email: "mauramelodyi@mail.com",
        employee_phone: "08199999531",
        employee_address: "Jl. Teratai no 1",
        created_at: new Date(),
        created_by: "system",
        updated_at: new Date(),
        updated_by: "system",
        position_id: "P001",
        department_id: "D002"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employee', null, {})
  }
};
