const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const { Department } = require('../../models');

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const departments = await Department.findAll({ order: [['name', 'ASC']] });
    res.json(departments);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
