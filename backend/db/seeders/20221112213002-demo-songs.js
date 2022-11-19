'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', [
      {
        title: 'Basketcase',
        description: 'SUper great song',
        url: 'url',
        userId: 1,
        albumId: 1,
        previewImage: 'image'
      },
      {
        title: 'F.O.D',
        description: 'Last song on the album',
        url: 'url',
        userId: 1,
        albumId: 1,
        previewImage: 'image'
      },
      {
        title: 'Suck my Kiss',
        description: 'Oh them chili boyssss',
        url: 'url',
        userId: 2,
        albumId: 2,
        previewImage: 'image'
      },
      {
        title: 'Under the Bridge',
        description: 'ONever alone in LA',
        url: 'url',
        userId: 2,
        albumId: 2,
        previewImage: 'image'
      },
      {
        title: 'Blood Sex Sugar magik',
        description: 'Come on Anthony gimmie some sugaa',
        userId: 2
      },
      {
        title: 'Giving Kids to Candy',
        description: 'Forever changed the Rock and Roll World',
        userId: 3
      },
    ]);
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Songs', null, {});

  }
};
