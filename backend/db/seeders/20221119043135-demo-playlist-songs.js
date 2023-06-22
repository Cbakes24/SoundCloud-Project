'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs'
    await queryInterface.bulkInsert(options, [
      {
        songId: 4,
        playlistId: 1,
      },
      {
        songId: 6,
        playlistId: 2,
      },
      {
        songId: 1,
        playlistId: 3,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'PlaylistSongs'
      await queryInterface.bulkDelete(options, null, {});

  }
};
