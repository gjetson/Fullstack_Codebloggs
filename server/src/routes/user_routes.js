const Controller = require('../controllers/user_controller')

const registerUserRoutes = (app) => {
    app.post('/user', Controller.createUser)
    app.get('/users', Controller.getUsers)
    app.get('/user/:id', Controller.getUser)
    app.post('/user/update/:id', Controller.updateUser)
    app.post('/user/login', Controller.loginUser)
    app.delete('/user/delete/:id', Controller.deleteUser)
}

module.exports = { registerUserRoutes }

