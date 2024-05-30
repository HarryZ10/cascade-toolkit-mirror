module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = [
      { email: 'hzhu20@georgefox.edu', username: 'hzhu20' },
    ];

    // Insert data into the 'users' table
    await queryInterface.bulkInsert('users', usersData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
