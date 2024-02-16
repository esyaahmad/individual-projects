'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Project.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'Title cannot be empty'
        },
        notNull : {
          msg : 'Title cannot be null'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'description cannot be empty'
        },
        notNull : {
          msg : 'description cannot be null'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'image Url cannot be empty'
        },
        notNull : {
          msg : 'image Url cannot be null'
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'category Id cannot be empty'
        },
        notNull : {
          msg : 'category Id cannot be null'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty : {
          msg : 'user Id cannot be empty'
        },
        notNull : {
          msg : 'user Id cannot be null'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};