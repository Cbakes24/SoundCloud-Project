"use strict";
const bcrypt = require("bcryptjs");
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  //instance method
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName, previewImage } = this; // context will be the User instance
      return { id, username, email, firstName, lastName, previewImage };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require("sequelize");
      const user = await User.scope("loginUser").findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope("currentUser").findByPk(user.id);
      }
    }

    static async signup({
      username,
      email,
      password,
      firstName,
      lastName,
      previewImage,
    }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName,
        previewImage,
      });
      return await User.scope("currentUser").findByPk(user.id);
    }

    //static association
    static associate(models) {
      User.hasMany(models.Playlist, {
        foreignKey: "userId",
        onDelete: "cascade",
        hooks: true,
      });

      User.hasMany(models.Album, { foreignKey: "userId" });

      User.hasMany(models.Song, { foreignKey: "userId" });

      User.hasMany(models.Comment, {
        foreignKey: "userId",
        onDelete: "cascade",
        hooks: true,
      });
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },

      previewImage: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: {
            exclude: ["hashedPassword"],
          },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
