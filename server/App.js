// Initial dependencies and definitions
const Express = require('express')
const MongoMan = require('./src/db/mongo-man')
const cors = require("cors")

require('dotenv').config('./.')
// console.log(process.env)

const app = Express()
const port = process.env.PORT || 3004

// import routes
// const HealthRoutes = require('./src/routes/health.routes')
// const AgentRoutes = require('./src/routes/agent-routes')
// const RegionRoutes = require('./src/routes/region-routes')
// const TransactionRoutes = require('./src/routes/transaction-routes')
const UserRoutes = require('./src/routes/user_routes')
const SessionRoutes = require('./src/routes/session_routes')


const { setAuth, isAuth } = require('./src/utils/auth')
setAuth(process.env)
app.use(isAuth)

app.use(cors())
app.use(Express.json())

const { initLogger } = require('./src/utils/logger')
initLogger(app, process.env)

// HealthRoutes.registerHealthRoutes(app)
// AgentRoutes.registerAgentRoutes(app)
// RegionRoutes.registerRegionRoutes(app)
// TransactionRoutes.registerTransactionRoutes(app)
UserRoutes.registerUserRoutes(app)
SessionRoutes.registerSessionRoutes(app)

MongoMan.openMongoConnection(process.env.MONGO_URI)

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})