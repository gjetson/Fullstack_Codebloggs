// Initial dependencies and definitions
const Express = require('express')
const MongoMan = require('./src/db/mongo-man')
const cors = require("cors")

require('dotenv').config('./.')
// console.log(process.env)

const app = Express()
const port = process.env.PORT || 3004

const CommentRoutes = require('./src/routes/comment_routes')
const PostRoutes = require('./src/routes/post_routes')
const UserRoutes = require('./src/routes/user_routes')
const SessionRoutes = require('./src/routes/session_routes')


const { setAuth, isAuth } = require('./src/utils/auth')
setAuth(process.env)
app.use(isAuth)

app.use(cors())
app.use(Express.json())

const { initLogger } = require('./src/utils/logger')
initLogger(app, process.env)

CommentRoutes.registerCommentRoutes(app)
PostRoutes.registerPostRoutes(app)
UserRoutes.registerUserRoutes(app)
SessionRoutes.registerSessionRoutes(app)

MongoMan.openMongoConnection(process.env.MONGO_URI)

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})