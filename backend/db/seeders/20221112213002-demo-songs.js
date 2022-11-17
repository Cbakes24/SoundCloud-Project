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
        title: 'Capacity',
        description: 'Jampacked is back',
        url: 'url',
        userId: 3,
        albumId: 3,
        previewImage: 'image'
      },
      {
        title: '86d',
        description: 'you are outa here',
        url: 'url',
        userId: 3,
        albumId: 3,
        previewImage: 'image'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.bulkDelete('Songs', null, {});
     
  }
};
