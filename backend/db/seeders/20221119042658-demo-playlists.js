'use strict';
const { userMap, users } = require('./seederFunctions.js');  // Use require instead of import
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Playlists'
    await queryInterface.bulkInsert(options, [
      {
        name: 'Gym Workout',
        userId: userMap["corybaker24"],
        previewImage: 'image url'
      },
      {
        name: 'My chill jam sessions',
        userId: userMap["aylarey"],
        previewImage: 'image url'
      },
      {
        name: 'BANGERSSSS',
        userId: userMap["corybaker24"],
        previewImage: 'image url'
      },
    ])

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Playlists'
      await queryInterface.bulkDelete(options, null, {});

  }
};
