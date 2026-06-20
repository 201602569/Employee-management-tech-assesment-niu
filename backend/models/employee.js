'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' });
      Employee.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' });
    }
  }

  Employee.init({
    first_name: { type: DataTypes.STRING(100), allowNull: false },
    last_name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(20) },
    status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' },
    department_id: { type: DataTypes.INTEGER },
    role_id: { type: DataTypes.INTEGER },
    hire_date: { type: DataTypes.DATEONLY },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at',
  });

  return Employee;
};
