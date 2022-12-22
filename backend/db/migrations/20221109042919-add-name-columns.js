"use strict";

let options = {};
options.tableName = 'Users';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(options, "firstName", {
      type: DataTypes.STRING(50),
      allowNull: false,
    });

    await queryInterface.addColumn(options, "lastName", {
      type: DataTypes.STRING(50),
      allowNull: false,
    });

    await queryInterface.addColumn(options, "previewImage", {
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
