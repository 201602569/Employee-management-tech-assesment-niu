'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const hash = await bcrypt.hash('Admin1234!', 10);
    const viewerHash = await bcrypt.hash('Viewer1234!', 10);
    await queryInterface.bulkInsert('users', [
      { name: 'Admin User', email: 'admin@demo.com', password: hash, role: 'admin', created_at: new Date(), updated_at: new Date() },
      { name: 'Viewer User', email: 'viewer@demo.com', password: viewerHash, role: 'viewer', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
