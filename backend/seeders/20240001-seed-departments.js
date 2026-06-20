'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('departments', [
      { name: 'Engineering', created_at: new Date(), updated_at: new Date() },
      { name: 'Human Resources', created_at: new Date(), updated_at: new Date() },
      { name: 'Sales', created_at: new Date(), updated_at: new Date() },
      { name: 'Marketing', created_at: new Date(), updated_at: new Date() },
      { name: 'Finance', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('departments', null, {});
  },
};
