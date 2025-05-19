document.addEventListener('DOMContentLoaded', async function(event){
    //const BlogForm = document.getElementById('blog_form')
    // const list = document.getElementById('full_list')
    // const list = document.getElementsByClassName('list-group');
    // const list = document.querySelector('#full_list');
    const blogForm = document.querySelector('#blog_form');
    const list = document.querySelector('.list-group');
    try {
        const response = await axios.get('http://localhost:3000/blogs/fetch');
        const blogs = response.data;
        blogs.forEach(post => {
            addBlogToUI(post);  
        });
    } catch (error) {
            console.log('Error while fetching expenses:', error);
    }
    blogForm.addEventListener('submit', async function(event){
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;
        const blogDetailsObj = {
            title:title,
            author:author,
            content:content
        }
        try {
            const response = await axios.post('http://localhost:3000/blogs/add',blogDetailsObj);
            // addBlogToUI(blogDetailsObj);
            addBlogToUI(response.data.post);
            blogForm.reset();
        } catch (error) {
             console.log('Error while adding the post');
        }

    });
    list.addEventListener('click', async function(event) {
        const listItem = event.target.closest('.comment-item');
        if(!listItem) return;
        if (event.target.classList.contains('delete-comment')) {
            const id = listItem.dataset.id;
            try {
                await axios.delete(`http://localhost:3000/blogs/delete/${id}`);
                listItem.remove();
            } catch (error) {
                console.log('Error while deleting');
            }
        
        }
    });
        
})
function addBlogToUI(blogDetailsObj){
    const list = document.querySelector('.list-group');
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.dataset.id = blogDetailsObj.id;
    listItem.dataset.details = `${blogDetailsObj.title}|${blogDetailsObj.author}|${blogDetailsObj.content}`;

    const box = document.createElement('div');
    box.className = 'd-flex justify-content-between align-items-center';
    const title = document.createElement('strong');
    title.textContent = blogDetailsObj.title;
    const toggleButton = document.createElement('button');
    toggleButton.className = 'btn btn-sm btn-outline-secondary toggle-btn';
    toggleButton.textContent = '+';
    box.appendChild(title);
    box.appendChild(toggleButton);
    const contentSection = document.createElement('div');
    contentSection.className = 'collapse-content mt-2';
    contentSection.style.display = 'none';

    const author = document.createElement('small');
    author.textContent = `Author for this ${blogDetailsObj.title} is ${blogDetailsObj.author}`;
    const content = document.createElement('p');
    content.className = 'mb-2';
    content.textContent = blogDetailsObj.content;
 
    const commentForm = document.createElement('div');
    commentForm.className = 'mt-3';

    const commentLabel = document.createElement('label');
    commentLabel.textContent = 'Add a comment:';

    const commentInput = document.createElement('textarea');
    commentInput.className = 'form-control mb-2';
    commentInput.placeholder = 'Write your comment...';

    const submitCommentBtn = document.createElement('button');
    submitCommentBtn.className = 'btn btn-primary btn-sm';
    submitCommentBtn.textContent = 'Submit Comment';

    const commentsList = document.createElement('div');
    commentsList.className = 'comments-list mt-2';
    if (blogDetailsObj.comments && blogDetailsObj.comments.length > 0) {
    blogDetailsObj.comments.forEach(comment => {
        addCommentToUI(commentsList, comment);
    });
}
    submitCommentBtn.addEventListener('click', async function() {
        const commentText = commentInput.value;
        const postId = blogDetailsObj.id;
        if (!commentText) return;
        try {
            const response = await axios.post(`http://localhost:3000/blogs/${postId}/comments`, { content: commentText });
            // addBlogToUI(blogDetailsObj);
            addCommentToUI(commentsList, response.data.comment);
            
            commentInput.value = ''; 
        } catch (error) {
             console.log('Error while adding the post');
        }
        
    });
    // commentForm.append(commentLabel, commentInput, submitCommentBtn);
    commentForm.appendChild(commentLabel);
    commentForm.appendChild(commentInput);
    commentForm.appendChild(submitCommentBtn);
    contentSection.append(author, content, commentForm, commentsList);
    listItem.append(box,contentSection);
    list.appendChild(listItem);

    toggleButton.addEventListener('click', function() {
        const isVisible = contentSection.style.display === 'block';
        contentSection.style.display = isVisible ? 'none' : 'block';
        toggleButton.textContent = isVisible ? '+' : '-';
    });
}

function addCommentToUI(commentsList, comment) {
  const commentItem = document.createElement('div');
  commentItem.className = 'comment-item d-flex justify-content-between align-items-center mb-2 p-2 bg-light';
  commentItem.dataset.id = comment.id; 

  const commentTextEl = document.createElement('span');
  commentTextEl.textContent = comment.content;

  const deleteCommentBtn = document.createElement('button');
  deleteCommentBtn.className = 'btn btn-danger btn-sm delete-comment';
  deleteCommentBtn.textContent = 'Delete';

  commentItem.append(commentTextEl, deleteCommentBtn);
  commentsList.appendChild(commentItem);
}
