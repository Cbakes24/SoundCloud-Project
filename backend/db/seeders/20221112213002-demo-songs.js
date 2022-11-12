'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Songs', [
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        url: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        albumId: DataTypes.INTEGER,
        previewImage: DataTypes.STRING
      },
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        url: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        albumId: DataTypes.INTEGER,
        previewImage: DataTypes.STRING
      },
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        url: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        albumId: DataTypes.INTEGER,
        previewImage: DataTypes.STRING
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
