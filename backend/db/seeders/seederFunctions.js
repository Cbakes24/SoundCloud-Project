const { Album, Comment, Playlist, PlaylistSong, Song, User } = require('../models');

export const users = await User.findAll({
    where: {
      username: { [Sequelize.Op.in]: ['corybaker24', 'aylarey', 'LeonLegend'] },
    },
    raw: true,  // Return plain data instead of Sequelize instances
  });

  export const userMap = users.reduce((acc, user) => {
    acc[user.username] = user.id;  // Map usernames to their corresponding IDs
    return acc;
  }, {});
