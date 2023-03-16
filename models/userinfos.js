'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 1. 한 회원은 한 회원 상세 정보를 가진다.
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'userId',
      });
    }
  }

  UserInfos.init(
    {
      userInfoId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
        unique: true, // UNIQUE
      },
      name: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      age: {
        allowNull: false, // NOT NULL
        type: DataTypes.INTEGER,
      },
      gender: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false, // NOT NULL
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'UserInfos',
    }
  );
  return UserInfos;
};