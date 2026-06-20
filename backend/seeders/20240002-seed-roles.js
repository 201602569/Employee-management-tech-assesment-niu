'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('roles', [
      { name: 'Software Engineer', created_at: new Date(), updated_at: new Date() },
      { name: 'Product Manager', created_at: new Date(), updated_at: new Date() },
      { name: 'HR Specialist', created_at: new Date(), updated_at: new Date() },
      { name: 'Sales Representative', created_at: new Date(), updated_at: new Date() },
      { name: 'Financial Analyst', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
