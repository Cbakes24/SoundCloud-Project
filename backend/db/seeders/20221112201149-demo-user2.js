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
        hashedPassword: bcrypt.hashSync('https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/rosalina-pic.png'),
        previewImage: 'image'
      },
      {
        firstName: 'Johnny',
        lastName: 'Boy',
        email: 'userf1@user.io',
        username: 'FakeUsevr1',
        hashedPassword: bcrypt.hashSync('password2'),
        previewImage: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/toad-pic.png'
      },
      {
        firstName: 'Bxfnxfgnxfgx',
        lastName: 'Bob',
        email: 'user2f@user.io',
        username: 'FakeUsevr2',
        hashedPassword: bcrypt.hashSync('password3'),
        previewImage: 'imaghttps://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/yoshi+pic.jpege'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users'
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lvitionn', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
