'use strict';

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
        userId: 1,
        previewImage: 'image url'
      },
      {
        name: 'My chill jam sessions',
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
    options.tableName = 'Playlists'
      await queryInterface.bulkDelete(options, null, {});

  }
};
