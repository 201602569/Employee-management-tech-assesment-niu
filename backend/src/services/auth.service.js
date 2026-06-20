const { User } = require('../../models');
const { signToken } = require('../helpers/jwt');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw { status: 401, message: 'Invalid credentials' };

  const valid = await user.validatePassword(password);
  if (!valid) throw { status: 401, message: 'Invalid credentials' };

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { login };
