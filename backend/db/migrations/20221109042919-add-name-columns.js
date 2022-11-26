"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "firstName", {
      type: DataTypes.STRING(50),
      allowNull: false,
    });

    await queryInterface.addColumn("Users", "lastName", {
      type: DataTypes.STRING(50),
      allowNull: false,
    });

    await queryInterface.addColumn("Users", "previewImage", {
      type: DataTypes.STRING(50),
      allowNull: true,
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "firstName");
    await queryInterface.removeColumn("Users", "lastName");
    await queryInterface.removeColumn("Users", "previewImage");
    await queryInterface.removeColumn("Users", "token");
  },
};
