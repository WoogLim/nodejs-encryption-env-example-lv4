'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 1. 한 유저는 여러개의 좋아요를 누를 수 있다.
      this.belongsTo(models.Users, { // 2. Users 모델에게 N:1 관계 설정을 합니다.
        targetKey: 'userId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'userId', // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });

      // 2. 하나의 포스트는 여러명의 유저가 좋아요를 누를 수 있다.
      this.belongsTo(models.Posts, { // 2. Users 모델에게 N:1 관계 설정을 합니다.
        targetKey: 'postId', // 3. Users 모델의 userId 컬럼을
        foreignKey: 'postId', // 4. Posts 모델의 UserId 컬럼과 연결합니다.
      });

    }
  }

  Likes.init(
    {
      postId: {
        allowNull: false, // NOT NULL
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false, // NOT NULL
        primaryKey: true,
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
      modelName: 'Likes',
    }
  );
  return Likes;
};