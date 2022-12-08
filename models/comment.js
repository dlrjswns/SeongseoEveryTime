const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        /* id 자동 생성 */
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,

        timestamps: true, // created_at, updated_at 자동생성위한 코드
        underscored: true, // created_at, updated_at으로 생성하기위한 코드
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,

        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    /* Comment : User = n : 1 */
    db.Comment.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });

    /* Comment : Posting = n : 1 */
    db.Comment.belongsTo(db.Posting, { foreignKey: "posting_id", targetKey: "id" });
  }
};
