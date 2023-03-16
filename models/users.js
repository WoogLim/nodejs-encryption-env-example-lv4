'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 1. Post를 여러개 가짐
      this.hasMany(models.Posts, { // 2. Posts 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'userId', // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });

      // 2. Comments 여러개 가짐
      this.hasMany(models.Comments, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });

      // 3. 여러 포스터에 Likes를 누를 수 있음.
      this.hasMany(models.Likes, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });

      // 4. 회원 상세 정보 1:1
      this.hasOne(models.UserInfos, {
        sourceKey: 'userId',
        foreignKey: 'userId',
      });
    }
  }

  Users.init(
    {
      userId: {
        allowNull: false, // NOT NULL
        primaryKey: true, // Primary Key (기본키)
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false, // NOT NULL
        type: DataTypes.STRING,
      },
      salt: {
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
      modelName: 'Users',
    }
  );
  return Users;
};