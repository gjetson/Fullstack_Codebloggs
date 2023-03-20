const UserController = require('../controllers/user_controller')

const registerUserRoutes = (app) => {
    app.post('/user', UserController.createUser)
    app.get('/users', UserController.getUsers)
    app.get('/user/:id', UserController.getUser)
    app.post('/user/update/:id', UserController.updateUser)
    app.post('/user/login', UserController.loginUser)
    app.delete('/user/delete/:id', UserController.deleteUser)
}

module.exports = { registerUserRoutes }

