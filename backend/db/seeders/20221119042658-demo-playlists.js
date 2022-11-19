'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [
      {
        name: 'Gym Workout',
        userId: 1,
        previewImage: 'image url'
      },
      {
        name: 'My jam sessions',
        userId: 2,
        previewImage: 'image url'
      },
      {
        name: 'BANGERSSSS',
        userId: 3,
        previewImage: 'image url'
      },
    ])

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Playlist', null, {});

  }
};
