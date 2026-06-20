'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.Employee, { foreignKey: 'role_id', as: 'employees' });
    }
  }

  Role.init({
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    underscored: true,
  });

  return Role;
};
