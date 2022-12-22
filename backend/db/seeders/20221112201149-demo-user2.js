'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Rymo',
        lastName: 'Stoopid',
        email: 'demov@user.io',
        username: 'Demo-lvition',
        hashedPassword: bcrypt.hashSync('password'),
        previewImage: 'image'
      },
      {
        firstName: 'Johnny',
        lastName: 'Boy',
        email: 'userf1@user.io',
        username: 'FakeUsevr1',
        hashedPassword: bcrypt.hashSync('password2'),
        previewImage: 'image'
      },
      {
        firstName: 'Bxfnxfgnxfgx',
        lastName: 'Bob',
        email: 'user2f@user.io',
        username: 'FakeUsevr2',
        hashedPassword: bcrypt.hashSync('password3'),
        previewImage: 'image'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
