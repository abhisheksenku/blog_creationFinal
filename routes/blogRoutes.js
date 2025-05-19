const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

router.get('/fetch', blogController.getPosts);       
router.post('/add', blogController.postPosts);      

router.post('/:postId/comments', blogController.postComments); 
router.delete('/delete/:id', blogController.deleteComments);



module.exports = router;
