const Controller = require('../controllers/comment_controller')

const registerCommentRoutes = (app) => {
    app.post('/comment', Controller.createComment)
    app.get('/comments', Controller.getComments)
    app.get('/comments/:postId', Controller.getCommentsByPostId)
    app.post('/comment/like/:id', Controller.addLike)
    app.post('/comment/update/:id', Controller.updateComment)
    app.delete('/comment/delete/:id', Controller.deleteComment)
}

module.exports = { registerCommentRoutes }

