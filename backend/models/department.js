'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      Department.hasMany(models.Employee, { foreignKey: 'department_id', as: 'employees' });
    }
  }

  Department.init({
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'departments',
    underscored: true,
  });

  return Department;
};
