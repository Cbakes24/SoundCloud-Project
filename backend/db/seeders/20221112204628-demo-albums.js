'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Albums'

    const users = await queryInterface.sequelize.query('SELECT id FROM Users', {
      type: Sequelize.QueryTypes.SELECT
    });
    // Map the user IDs to an array so its not hard coded and throwing an error if you reseed
    const userIds = users.map(user => user.id);


    await queryInterface.bulkInsert(options, [
      {
        title: 'Dookie',
        description: 'Best Green Day Album everrrr',
        userId: userIds[0],
        previewImage: 'img.com'
      },
      {
        title: 'Blood Sex Sugar magik',
        description: 'Come on Anthony gimmie some sugaa',
        userId: userIds[1],
        previewImage: 'img.com'
      },
      {
        title: 'Giving Kids to Candy',
        description: 'Forever changed the Rock and Roll World',
        userId: userIds[2],
        previewImage: 'img.com'
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
