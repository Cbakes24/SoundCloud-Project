'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Rymo',
        lastName: 'Stoopid',
        email: 'demov@user.io',
        username: 'Demo-lvition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Johnny',
        lastName: 'Boy',
        email: 'userf1@user.io',
        username: 'FakeUsevr1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Bxfnxfgnxfgx',
        lastName: 'Bob',
        email: 'user2f@user.io',
        username: 'FakeUsevr2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
