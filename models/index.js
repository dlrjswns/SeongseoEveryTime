const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Follow = require('./follow');
const Like = require('./like');
const Posting = require('./posting');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const db = {
    sequelize,
    User,
    Comment,
    Follow,
    Like,
    Posting
};

User.init(sequelize);
Comment.init(sequelize);
Follow.init(sequelize);
Like.init(sequelize);
Posting.init(sequelize);

User.associate(db);
Comment.associate(db);
Follow.associate(db);
Like.associate(db);
Posting.associate(db);

module.exports = db;
