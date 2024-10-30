'use strict';
const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Songs'


    const users = await User.findAll({
      where: {
        username: { [Sequelize.Op.in]: ['corybaker24', 'aylarey', 'LeonLegend'] },
      },
      raw: true,  // Return plain data instead of Sequelize instances
    });
    const userMap = users.reduce((acc, user) => {
      acc[user.username] = user.id;  // Map usernames to their corresponding IDs
      return acc;
    }, {});
    

    await queryInterface.bulkInsert(options, [
      {
        // 1
        title: 'Basketcase',
        description: 'SUper great song',
        url: 'url',
        userId:  userMap[corybaker24],
        albumId: 1,
        previewImage: 'https://i.scdn.co/image/ab67616d0000b273db89b08034de626ebee6823d',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+Green+Day+-+Basket+Case+-+HQ+-wZ8eZRxFA-0-192k-1686778925.mp3'
      },
      {
        // 2
        title: 'F.O.D',
        description: 'Last song on the album',
        url: 'url',
        userId:  userMap[corybaker24],
        albumId: 1,
        previewImage: 'https://i.scdn.co/image/ab67616d0000b273db89b08034de626ebee6823d',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+F+O+D+-UKU-LZh6r2o-192k-1686806074.mp3'
      },
      {
        // 2
        title: 'Burnout',
        description: 'Im burrninnn outttt',
        url: 'url',
        userId: userMap[corybaker24],
        albumId: 1,
        previewImage: 'https://i.scdn.co/image/ab67616d0000b273db89b08034de626ebee6823d',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+Green+Day+-+Burnout+-+HQ+-XoJ6TPUG1Tk-192k-1686806016.mp3'
      },
      {
        // 3
        title: 'All Around The World',
        description: 'Oh them chili boyssss',
        url: 'url',
        userId: userMap[corybaker24],
        albumId: 2,
        previewImage: 'https://i.scdn.co/image/ab67616d00001e02e7957730bc48a85ee53657fd',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+Red+Hot+Chili+Peppers+-+Around+The+World+Official+Music+Video+-a9eNQZbjpJk-192k-1686806140.mp3'
      },
      {
        // 4
        title: 'Under the Bridge',
        description: 'You"re Never alone in LA',
        url: 'url',
        userId:  2,
        albumId: 2,
        previewImage: 'https://i.scdn.co/image/ab67616d00001e02e7957730bc48a85ee53657fd',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+Red+Hot+Chili+Peppers+-+Under+The+Bridge+Official+Music+Video+-GLvohMXgcBo-192k-1686806172.mp3'
      },
      {
        // 5
        title: 'Blood Sex Sugar magik',
        description: 'Come on Anthony gimmie some sugaa',
        userId: 3,
        albumId: 2,
        previewImage: 'https://i.scdn.co/image/ab67616d00001e02e7957730bc48a85ee53657fd',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+Blood+Sugar+Sex+Magik-Sl1QCusosNs-192k-1686806241.mp3'
      },
      {
        // 6
        title: '46 and 2',
        description: 'Woahh my shadow is shedding skin! I"ve been picking my scabs again',
        userId:  userMap[corybaker24],
        albumId: 4,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Aenima.jpg',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+TOOL+-+Forty+Six+2+Audio+-GIuZUCpm9hc-192k-1686801334.mp3'
      },
      {
        // 7
        title: 'H.',
        description: 'Lets spiral outtt',
        userId: userMap[corybaker24],
        albumId: 4,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Aenima.jpg',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+TOOL+-+H+Official+Audio+-bg8vTSyHFkQ-192k-1686805955.mp3'
      },
      {
        // 8
        title: 'Aenima',
        description: 'Yea LA sucks',
        userId: userMap[corybaker24],
        albumId: 4,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/2/2f/Aenima.jpg',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+TOOL+-+nema+Audio+-rHcmnowjfrQ-192k-1686805882.mp3'
      },
      {
        // 9
        title: 'Black Bird',
        description: 'Forever changed the Rock and Roll World',
        userId:  userMap[corybaker24],
        albumId: 5,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Tash_Sultana_Flow_State_Album_Artwork.png',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+Tash+Sultana+-+Blackbird+Official+Audio+-zYZeF26fO68-192k-1686806332.mp3'
      },
      {
        // 10
        title: 'Salvation',
        description: 'Im saved!.. By Tash"s dance moves',
        userId:  userMap[corybaker24],
        albumId: 5,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Tash_Sultana_Flow_State_Album_Artwork.png',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+Tash+Sultana+-+SALVATION+Official+Music+Video+-gqZUjnUgvhw-192k-1686806405.mp3'
      },
      {
        // 10
        title: 'Pink Moon',
        description: 'Trippin out on this one, beautiful',
        userId: userMap[corybaker24],
        albumId: 5,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Tash_Sultana_Flow_State_Album_Artwork.png',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+Tash+Sultana+-+Pink+Moon+Official+Audio+-VWlixpOloJo-192k-1686806456.mp3'
      },
      {
        // 10
        title: 'Pretty Lady',
        description: 'Trippin out on this one, beautiful',
        userId:  userMap[corybaker24],
        albumId: 5,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Tash_Sultana_Flow_State_Album_Artwork.png',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+TASH+SULTANA+-+PRETTY+LADY+Live+at+Lonely+Lands+Studio+-jVqiZ8GT8N0-192k-1686809031.mp3'
      },
      {
        // 11
        title: 'Capacity',
        description: 'Forever changed the Rock and Roll World',
        userId:  userMap[corybaker24],
        albumId: 3,
        previewImage: 'https://m.media-amazon.com/images/I/51qQRA-hjzL._UXNaN_FMjpg_QL85_.jpg',
        url: 'https://corysoundcloudawsbucket.s3.us-west-1.amazonaws.com/Song-mp3-files/onlymp3.to+-+Capacity+feat+Lissa+Dee+-q1wnUcmAZPQ-192k-1686808611.mp3'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Songs'
        await queryInterface.bulkDelete(options, null, {});

  }
};
