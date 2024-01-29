import Sequelize from 'sequelize';
require('dotenv').config(); // Load environment variables from .env file

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: true,
  define: {
    freezeTableName: true,
  },
});

export default sequelize;
