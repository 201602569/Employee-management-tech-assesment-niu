const { Employee, Department } = require('../../models');
const { Op } = require('sequelize');

const getStats = async () => {
  const [total, active, inactive, byDepartment] = await Promise.all([
    Employee.count(),
    Employee.count({ where: { status: 'active' } }),
    Employee.count({ where: { status: 'inactive' } }),
    Department.findAll({
      attributes: ['id', 'name'],
      include: [{
        model: Employee,
        as: 'employees',
        attributes: [],
      }],
    }),
  ]);

  const departments = await Promise.all(
    byDepartment.map(async (dept) => ({
      id: dept.id,
      name: dept.name,
      count: await Employee.count({ where: { department_id: dept.id } }),
    }))
  );

  return { total, active, inactive, byDepartment: departments };
};

module.exports = { getStats };
