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
        firstName: 'Cory',
        lastName: 'Baker',
        email: 'cory@gmail.com',
        username: 'corybaker24',
        hashedPassword: bcrypt.hashSync('corysoloman'),
        previewImage: 'url'
      },
      {
        firstName: 'Ayla',
        lastName: 'Baker',
        email: 'ayla@gmail.com',
        username: 'aylarey',
        hashedPassword: bcrypt.hashSync('aylarey'),
        previewImage: 'url'

      },
      {
        firstName: 'Leon',
        lastName: 'Baker',
        email: 'leon@gmail.com',
        username: 'LeonLegend',
        hashedPassword: bcrypt.hashSync('leonross'),
        previewImage: 'url'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    return queryInterface.bulkDelete(options, null, {});
  }
};
