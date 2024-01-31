'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      email: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        defaultValue: false,
        allowNull: false
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: false,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users'); 
  }
};
