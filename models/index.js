const Posts = require('./posts');
const Comments = require('./comments');

Posts.hasMany(Comments, { foreignKey: 'postId', as: 'comments', onDelete: 'CASCADE' });
Comments.belongsTo(Posts, { foreignKey: 'postId', as: 'post' });

module.exports = {
  Posts,
  Comments
};
