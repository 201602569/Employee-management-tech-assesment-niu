const { sequelize } = require('../models');
const app = require('./app');

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected.');
    app.listen(PORT, () => console.log(`API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Unable to connect to database:', err);
    process.exit(1);
  });
