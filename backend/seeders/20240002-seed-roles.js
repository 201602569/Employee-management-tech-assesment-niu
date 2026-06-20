'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('roles', [
      { name: 'Desarrollador de Software', created_at: new Date(), updated_at: new Date() },
      { name: 'Gerente de Producto', created_at: new Date(), updated_at: new Date() },
      { name: 'Especialista en RRHH', created_at: new Date(), updated_at: new Date() },
      { name: 'Ejecutivo de Ventas', created_at: new Date(), updated_at: new Date() },
      { name: 'Analista Financiero', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
