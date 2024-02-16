'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/toBcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Project, {foreignKey: 'userId'})

    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg : 'Email already exists'
      },
      validate: {
        notEmpty : {
          msg : ' email cannot be empty'
        },
        notNull : {
          msg : 'email cannot be null'
        },
        isEmail : {
          msg : 'wrong format email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'password cannot be empty'
        },
        notNull : {
          msg : 'password cannot be null'
        },
        len: {
          args: 5,
          msg : 'The password length should be minimum 5 characters '
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hash(user.password)
      },
      beforeUpdate : (user, options) => {
        user.password = hash(user.password)
      }
    }
  });
  return User;
};