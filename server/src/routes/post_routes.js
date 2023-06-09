const Controller = require('../controllers/post_controller')

const registerPostRoutes = (app) => {
    app.post('/post', Controller.createPost)
    app.get('/posts', Controller.getPosts)
    app.get('/posts/:userId', Controller.getPostsByUserId)
    app.get('/post/:id', Controller.getPost)
    app.get('/post/latest/:userId', Controller.getLatestPostByUserId)
    app.post('/post/like/:id', Controller.incrementLike)
    app.post('/post/update/:id', Controller.updatePost)
    app.delete('/post/delete/:id', Controller.deletePost)
}

module.exports = { registerPostRoutes }

