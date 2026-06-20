'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('employees', [
      { first_name: 'Alice', last_name: 'Johnson', email: 'alice@demo.com', phone: '5551001001', status: 'active', department_id: 1, role_id: 1, hire_date: '2022-01-15', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Bob', last_name: 'Smith', email: 'bob@demo.com', phone: '5551001002', status: 'active', department_id: 1, role_id: 1, hire_date: '2021-06-01', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Carol', last_name: 'Williams', email: 'carol@demo.com', phone: '5551001003', status: 'active', department_id: 2, role_id: 3, hire_date: '2020-03-10', created_at: new Date(), updated_at: new Date() },
      { first_name: 'David', last_name: 'Brown', email: 'david@demo.com', phone: '5551001004', status: 'inactive', department_id: 3, role_id: 4, hire_date: '2019-11-20', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Eva', last_name: 'Martinez', email: 'eva@demo.com', phone: '5551001005', status: 'active', department_id: 4, role_id: 2, hire_date: '2023-02-28', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Frank', last_name: 'Garcia', email: 'frank@demo.com', phone: '5551001006', status: 'active', department_id: 5, role_id: 5, hire_date: '2022-07-14', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Grace', last_name: 'Lee', email: 'grace@demo.com', phone: '5551001007', status: 'active', department_id: 1, role_id: 1, hire_date: '2023-09-01', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Henry', last_name: 'Wilson', email: 'henry@demo.com', phone: '5551001008', status: 'inactive', department_id: 2, role_id: 3, hire_date: '2018-04-05', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Isla', last_name: 'Taylor', email: 'isla@demo.com', phone: '5551001009', status: 'active', department_id: 3, role_id: 4, hire_date: '2021-12-01', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Jack', last_name: 'Anderson', email: 'jack@demo.com', phone: '5551001010', status: 'active', department_id: 4, role_id: 2, hire_date: '2020-08-17', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('employees', null, {});
  },
};
