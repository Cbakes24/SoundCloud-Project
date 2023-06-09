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
        body: 'HOLY MOLY THIS SONG RULEZZZZ'
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
      {
        songId: 1,
        userId: 3,
        body: 'FANTASTIC'
      },
      {
        songId: 6,
        userId: 1,
        body: 'Yupppp like ittt'
      },
      {
        songId: 5,
        userId: 1,
        body: 'Got the FEELS with this one'
      },
      {
        songId: 4,
        userId: 3,
        body: 'What a throw back!!!'
      },
      {
        songId: 3,
        userId: 2,
        body: 'Really good song'
      },
      {
        songId: 2,
        userId: 2,
        body: 'LOVE ITTT'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments'
      await queryInterface.bulkDelete(options, null, {});

  }
};
