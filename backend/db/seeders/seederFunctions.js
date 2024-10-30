const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');
const Sequelize = require('sequelize');  // Add this if you use Sequelize operators like Sequelize.Op

// Fetch users
const users = await User.findAll({
  where: {
    username: { [Sequelize.Op.in]: ['corybaker24', 'aylarey', 'LeonLegend'] },
  },
  raw: true,  // Return plain data instead of Sequelize instances
});

// Map usernames to their IDs
const userMap = users.reduce((acc, user) => {
  acc[user.username] = user.id;
  return acc;
}, {});

// Export the values using CommonJS syntax
module.exports = { users, userMap };
