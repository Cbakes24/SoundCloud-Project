'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Comments'
    await queryInterface.bulkInsert(options, [
      {
        songId: 4,
        userId: 1,
        username: 'corybaker24',
        body: 'HOLY SHIT THIS SONG RULEZZZZ'
      },
      {
        songId: 6,
        userId: 2,
        username: 'aylarey',
        body: 'I heard this song was about when Anthony Kedis"s addiction basically got him booted from the band but LA never turned its back on him'
      },
      {
        songId: 1,
        userId: 3,
        username: 'LeonLegend',
        body: 'Basket Case is such a livewire sone from the 90s, truly nostalgic'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments'
      await queryInterface.bulkDelete(options, null, {});

  }
};
