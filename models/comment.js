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
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
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
