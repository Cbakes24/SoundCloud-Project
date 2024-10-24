'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.hasMany(models.Song,
        { foreignKey: 'albumId', onDelete: 'cascade',  hooks: true })

        Album.belongsTo(models.User, 
          { as: 'Artist', foreignKey: 'userId', targetKey: 'id' });

      
    }
  }
  Album.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
