const Sequelize = require("sequelize");

module.exports = class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        /* id 자동 생성 */
      },
      {
        sequelize,

        timestamps: false,
        modelName: "Like",
        tableName: "likes",
        paranoid: false,

        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    /* Like : User = n : 1 */
    db.Like.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });

    /* Like : Posting = n : 1 */
    db.Like.belongsTo(db.Posting, { foreignKey: "posting_id", targetKey: "id" });
  }
};
