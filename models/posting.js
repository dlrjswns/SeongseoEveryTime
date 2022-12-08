const Sequelize = require("sequelize");

module.exports = class Posting extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        /* id 자동 생성 */
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,

        timestamps: true, // created_at, updated_at 자동생성위한 코드
        underscored: true, // created_at, updated_at으로 생성하기위한 코드
        modelName: "Posting",
        tableName: "postings",
        paranoid: false,

        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    /* Posting : Like = 1 : n */
    db.Posting.hasMany(db.Like, { foreignKey: "posting_id", sourceKey: "id", onDelete: "cascade" });

    /* Posting : Comment = 1 : n */
    db.Posting.hasMany(db.Comment, { foreignKey: "posting_id", sourceKey: "id", onDelete: "cascade" });

    /* Posting : User = n : 1 */
    db.Posting.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
  }
};
