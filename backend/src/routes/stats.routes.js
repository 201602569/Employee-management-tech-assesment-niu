const router = require('express').Router();
const { authenticate } = require('../middlewares/auth');
const statsService = require('../services/stats.service');

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const stats = await statsService.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
