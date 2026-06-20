const router = require('express').Router();
const { authenticate, authorize } = require('../middlewares/auth');
const { Role } = require('../../models');

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const roles = await Role.findAll({ order: [['name', 'ASC']] });
    res.json(roles);
  } catch (err) { next(err); }
});

router.post('/', authorize('admin'), async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'El nombre es requerido' });
    const role = await Role.create({ name: name.trim() });
    res.status(201).json(role);
  } catch (err) { next(err); }
});

router.put('/:id', authorize('admin'), async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'El nombre es requerido' });
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Puesto no encontrado' });
    await role.update({ name: name.trim() });
    res.json(role);
  } catch (err) { next(err); }
});

router.delete('/:id', authorize('admin'), async (req, res, next) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Puesto no encontrado' });
    await role.destroy();
    res.status(204).end();
  } catch (err) { next(err); }
});

module.exports = router;
