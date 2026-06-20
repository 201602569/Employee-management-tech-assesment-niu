const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth');
const { Department } = require('../../models');

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const departments = await Department.findAll({ order: [['name', 'ASC']] });
    res.json(departments);
  } catch (err) { next(err); }
});

router.post('/', authorize('admin'), async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'El nombre es requerido' });
    const dept = await Department.create({ name: name.trim() });
    res.status(201).json(dept);
  } catch (err) { next(err); }
});

router.put('/:id', authorize('admin'), async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'El nombre es requerido' });
    const dept = await Department.findByPk(req.params.id);
    if (!dept) return res.status(404).json({ message: 'Departamento no encontrado' });
    await dept.update({ name: name.trim() });
    res.json(dept);
  } catch (err) { next(err); }
});

router.delete('/:id', authorize('admin'), async (req, res, next) => {
  try {
    const dept = await Department.findByPk(req.params.id);
    if (!dept) return res.status(404).json({ message: 'Departamento no encontrado' });
    await dept.destroy();
    res.status(204).end();
  } catch (err) { next(err); }
});

module.exports = router;
