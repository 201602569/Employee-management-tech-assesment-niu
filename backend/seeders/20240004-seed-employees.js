'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('employees', [
      { first_name: 'Carlos', last_name: 'Mendoza', email: 'carlos.mendoza@demo.com', phone: '50240001001', status: 'active', department_id: 1, role_id: 1, hire_date: '2022-01-15', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Valeria', last_name: 'Ramírez', email: 'valeria.ramirez@demo.com', phone: '50240001002', status: 'active', department_id: 1, role_id: 1, hire_date: '2021-06-01', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Diego', last_name: 'Herrera', email: 'diego.herrera@demo.com', phone: '50240001003', status: 'active', department_id: 2, role_id: 3, hire_date: '2020-03-10', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Sofía', last_name: 'Castro', email: 'sofia.castro@demo.com', phone: '50240001004', status: 'inactive', department_id: 3, role_id: 4, hire_date: '2019-11-20', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Andrés', last_name: 'Morales', email: 'andres.morales@demo.com', phone: '50240001005', status: 'active', department_id: 4, role_id: 2, hire_date: '2023-02-28', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Gabriela', last_name: 'López', email: 'gabriela.lopez@demo.com', phone: '50240001006', status: 'active', department_id: 5, role_id: 5, hire_date: '2022-07-14', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Luis', last_name: 'Pérez', email: 'luis.perez@demo.com', phone: '50240001007', status: 'active', department_id: 1, role_id: 1, hire_date: '2023-09-01', created_at: new Date(), updated_at: new Date() },
      { first_name: 'María', last_name: 'González', email: 'maria.gonzalez@demo.com', phone: '50240001008', status: 'inactive', department_id: 2, role_id: 3, hire_date: '2018-04-05', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Roberto', last_name: 'Jiménez', email: 'roberto.jimenez@demo.com', phone: '50240001009', status: 'active', department_id: 3, role_id: 4, hire_date: '2021-12-01', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Paola', last_name: 'Vásquez', email: 'paola.vasquez@demo.com', phone: '50240001010', status: 'active', department_id: 4, role_id: 2, hire_date: '2020-08-17', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('employees', null, {});
  },
};
