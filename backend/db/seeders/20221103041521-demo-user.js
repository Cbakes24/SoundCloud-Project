'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
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
        previewImage: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/goomba-pic.jpeg'
      },
      {
        firstName: 'Ayla',
        lastName: 'Baker',
        email: 'ayla@gmail.com',
        username: 'aylarey',
        hashedPassword: bcrypt.hashSync('aylarey'),
        previewImage: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/luigi-pic.png'

      },
      {
        firstName: 'Leon',
        lastName: 'Baker',
        email: 'leon@gmail.com',
        username: 'LeonLegend',
        hashedPassword: bcrypt.hashSync('leonross'),
        previewImage: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/mario-pic.png'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    const Op = Sequelize.Op;
      await queryInterface.bulkDelete(options, 
        {
          username: {[Op.in]: ['corybaker24', 'aylarey', 'LeonLegend']}
         }, {});

  }
};
