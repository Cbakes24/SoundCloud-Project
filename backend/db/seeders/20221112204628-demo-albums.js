'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Albums'
    await queryInterface.bulkInsert(options, [
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
    options.tableName = 'Albums'
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {
      title: ['Dookie', 'Blood Sex Sugar magik', 'Giving Kids to Candy']
    });
  }
};
