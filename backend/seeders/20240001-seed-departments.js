'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('departments', [
      { name: 'Tecnología', created_at: new Date(), updated_at: new Date() },
      { name: 'Recursos Humanos', created_at: new Date(), updated_at: new Date() },
      { name: 'Ventas', created_at: new Date(), updated_at: new Date() },
      { name: 'Marketing', created_at: new Date(), updated_at: new Date() },
      { name: 'Finanzas', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('departments', null, {});
  },
};
