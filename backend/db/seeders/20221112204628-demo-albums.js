'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Albums', [
      {
        title: 'Dookie',
        description: 'Best Green Day Album everrrr',
        userId: 1
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

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Albums', null, {
      title: ['Dookie', 'Blood Sex Sugar magik', 'Giving Kids to Candy']
    });
  }
};
