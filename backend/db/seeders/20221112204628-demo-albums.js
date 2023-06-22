'use strict';
const { User } = require('../models'); // Import the User model
 
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Albums'

    
    await queryInterface.bulkInsert(options, [
      {
        title: 'Dookie',
        description: 'Best Green Day Album everrrr',
        userId: 1,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Green_Day_-_Dookie_cover.jpg',
        artist: 'Green Day'
      },
      {
        title: 'Blood Sex Sugar magik',
        description: 'Come on Anthony gimmie some sugaa',
        userId: 2,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/5/5e/RHCP-BSSM.jpg',
        artist: 'Red Hot Chili Peppers'
      },
      {
        title: 'Giving Kids to Candy',
        description: 'Forever changed the Rock and Roll World',
        userId: 3,
        previewImage: 'https://m.media-amazon.com/images/I/51qQRA-hjzL._UXNaN_FMjpg_QL85_.jpg',
        artist: 'Jam Packed'
      },
      {
        title: 'Aenima',
        description: 'This whole allbum is such a vibe. Close your eye and FEEL!',
        userId: 3,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Aenima.jpg',
        artist: 'Tool'
      },
      {
        title: 'Flow State',
        description: 'The instrumentals on this are unbelievable, nobody does it like ya girl TASHHHHH',
        userId: 1,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Tash_Sultana_Flow_State_Album_Artwork.png',
        artist: 'Tash Sultana'
      },
      {
        title: 'Inbetween Dreams',
        description: 'The instrumentals on this are unbelievable, nobody does it like ya girl TASHHHHH',
        userId: 2,
        previewImage: 'https://e.snmc.io/i/600/s/35e6aed697966958afb3467184e2fc3c/2488293/jack-johnson-in-between-dreams-Cover-Art.jpg',
        artist: 'Jack Johnson'
      },
      {
        title: 'Silent Steeples',
        description: 'The homies from New England created some of the most chill awesome music ever on this album',
        userId: 1,
        previewImage: 'https://f4.bcbits.com/img/a1562865730_10.jpg',
        artist: 'Dispatch'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Albums'
      await queryInterface.bulkDelete(options, null, {});

  }
};
