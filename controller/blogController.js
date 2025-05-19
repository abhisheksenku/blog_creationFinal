const { Posts, Comments } = require('../models');

async function getPosts(req, res) {
  try {
    const posts = await Posts.findAll({
        include: [{ model: Comments, as: 'comments' }]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error while retrieving posts:', error);
    res.status(500).send('Error while retrieving posts');
  }
}
async function postPosts(req,res) {
    try {
        const{title,author,content}= req.body;
        if (!title || !author || !content) {
            return res.status(400).json({ error: 'title, author, and content are required' });
        }
        const newPost = await Posts.create({
            title,
            author,
            content
        });
        res.status(201).json({
            message:`${newPost.title},${newPost.author},${newPost.content}`,
            post:newPost
        })
    } catch (error) {
        console.error('Error while adding post:', error);
        res.status(500).send('Unable to add post');
    }
};
async function postComments(req,res) {
    try {
        const { content } = req.body;        
        const { postId } = req.params; 
        if (!content) {
            return res.status(400).json({ error: 'content is required' });
        }
        const newComment = await Comments.create({
            content,
            postId
        });
        res.status(201).json({
            message:`${newComment.content}`,
            comment:newComment
        })
    } catch (error) {
        console.error('Error while adding comment:', error);
        res.status(500).send('Unable to add comment');
    }
};
const deleteComments = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedComment = await Comments.destroy({
            where: { id }
        });

        if (deletedComment === 0) {
            return res.status(404).send('Comment not found');
        }

        res.status(200).send('Comment deleted successfully');
    } catch (error) {
        console.error('Error while deleting comment:', error);
        res.status(500).send('Error deleting comment');
    }
};
module.exports={
    getPosts,
    postPosts,
    postComments,
    deleteComments
}
