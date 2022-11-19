'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        songId: 4,
        userId: 1,
        body: 'HOLY SHIT THIS SONG RULEZZZZ'
      },
      {
        songId: 6,
        userId: 2,
        body: 'I heard this song was about when Anthony Kedis"s addiction basically got him booted from the band but LA never turned its back on him'
      },
      {
        songId: 1,
        userId: 3,
        body: 'Basket Case is such a livewire sone from the 90s, truly nostalgic'
      },
    ])
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Comments', null, {});

  }
};
