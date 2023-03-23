const Controller = require('../controllers/comment_controller')

const registerCommentRoutes = (app) => {
    app.post('/comment', Controller.createComment)
    app.get('/comments', Controller.getComments)
    app.get('/comment/:id', Controller.getComment)
    app.post('/post/like/:id', Controller.addLike)
    app.post('/comment/update/:id', Controller.updateComment)
    app.delete('/comment/delete/:id', Controller.deleteComment)
}

module.exports = { registerCommentRoutes }

