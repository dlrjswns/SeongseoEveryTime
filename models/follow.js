const Sequelize = require("sequelize");

module.exports = class Follow extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        /* id 자동 생성 */
      },
      {
        sequelize,

        timestamps: false,
        modelName: "Follow",
        tableName: "follows",
        paranoid: false,

        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    /* Follower : User = n : 1 */
    db.Follow.belongsTo(db.User, { foreignKey: "follower", targetKey: "id" });
    db.Follow.belongsTo(db.User, { foreignKey: "followee", targetKey: "id" });
  }
};
