const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(100),
          allowNull: false,
          primaryKey: true,
        },
        passwd: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: true, // NULL 허용
        },
      },
      {
        sequelize,

        timestamps: false, //createdAt과 updatedAt 속성 자동 생성 여부
        underscored: false, // 자동으로 생성되는 속성의 명칭을 snake_case 형식으로 사용할지 여부
        modelName: "User", // 모델 명칭
        tableName: "users", // 테이블 명칭
        paranoid: false, // 복구 관련 옵션

        /* 한글 설정 관련 옵션 */
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    /* User : Comment = 1 : n */
    db.User.hasMany(db.Comment, { foreignKey: "userId", sourceKey: "id", onDelete: "cascade" });
  }
};
