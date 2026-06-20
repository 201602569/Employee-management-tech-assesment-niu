const { Op } = require('sequelize');
const { Employee, Department, Role } = require('../../models');
const { getPagination, getPaginatedResponse } = require('../helpers/pagination');

const include = [
  { model: Department, as: 'department', attributes: ['id', 'name'] },
  { model: Role, as: 'role', attributes: ['id', 'name'] },
];

const getAll = async (query) => {
  const { page, limit, offset } = getPagination(query);
  const where = {};

  if (query.search) {
    where[Op.or] = [
      { first_name: { [Op.like]: `%${query.search}%` } },
      { last_name: { [Op.like]: `%${query.search}%` } },
      { email: { [Op.like]: `%${query.search}%` } },
    ];
  }
  if (query.department_id) where.department_id = query.department_id;
  if (query.status) where.status = query.status;

  const { count, rows } = await Employee.findAndCountAll({ where, include, limit, offset, order: [['created_at', 'DESC']] });
  return getPaginatedResponse(rows, count, page, limit);
};

const getById = async (id) => {
  const employee = await Employee.findByPk(id, { include });
  if (!employee) throw { status: 404, message: 'Employee not found' };
  return employee;
};

const create = async (data) => {
  const exists = await Employee.findOne({ where: { email: data.email } });
  if (exists) throw { status: 409, message: 'Email already in use' };
  return Employee.create(data);
};

const update = async (id, data) => {
  const employee = await Employee.findByPk(id);
  if (!employee) throw { status: 404, message: 'Employee not found' };

  if (data.email && data.email !== employee.email) {
    const exists = await Employee.findOne({ where: { email: data.email } });
    if (exists) throw { status: 409, message: 'Email already in use' };
  }

  await employee.update(data);
  return getById(id);
};

const remove = async (id) => {
  const employee = await Employee.findByPk(id);
  if (!employee) throw { status: 404, message: 'Employee not found' };
  await employee.destroy();
};

module.exports = { getAll, getById, create, update, remove };
