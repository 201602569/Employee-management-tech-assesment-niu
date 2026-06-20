const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const { Role } = require('../../models');

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const roles = await Role.findAll({ order: [['name', 'ASC']] });
    res.json(roles);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
