const Sequelize = require("sequelize");

module.exports = class Posting extends Sequelize.Model {
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
        underscored: false,
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
