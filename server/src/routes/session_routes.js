const Controller = require('../controllers/session_controller')

const registerSessionRoutes = (app) => {
    app.post('/session', Controller.createSession)
    app.get('/sessions', Controller.getSessions)
    app.get('/session/:id', Controller.getSession)
    app.post('/session/authenticate/:token', Controller.authenticateSession)
    app.delete('/session/delete/:id', Controller.deleteSession)
}

module.exports = { registerSessionRoutes }