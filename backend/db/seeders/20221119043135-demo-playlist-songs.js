'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PlaylistSongs', [
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

      await queryInterface.bulkDelete('PlaylistSongs', null, {});

  }
};