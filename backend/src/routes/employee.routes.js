const router = require('express').Router();
const { body } = require('express-validator');
const { authenticate } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const employeeService = require('../services/employee.service');

const employeeValidation = [
  body('first_name').notEmpty().withMessage('First name is required'),
  body('last_name').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').optional().matches(/^\d{7,15}$/).withMessage('Phone must be numeric (7-15 digits)'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
  body('department_id').optional().isInt().withMessage('department_id must be an integer'),
  body('role_id').optional().isInt().withMessage('role_id must be an integer'),
  body('hire_date').optional().isDate().withMessage('hire_date must be a valid date'),
];

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const result = await employeeService.getAll(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const employee = await employeeService.getById(req.params.id);
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

router.post('/', employeeValidation, validate, async (req, res, next) => {
  try {
    const employee = await employeeService.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', employeeValidation, validate, async (req, res, next) => {
  try {
    const employee = await employeeService.update(req.params.id, req.body);
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await employeeService.remove(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
