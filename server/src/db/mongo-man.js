const mongoose = require('mongoose')


const openMongoConnection = (uri) => {
    console.log(`uri: ${uri}`)
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
        console.log("connected to MongoDB")
    })
    mongoose.connect(uri)
}

mongoose.set('strictQuery', true)

module.exports = { openMongoConnection }