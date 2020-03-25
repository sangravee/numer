const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://ppimper:30604@cluster0-drxuw.azure.mongodb.net/cinema?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection
db.once('open', () => console.log('connected to the database'));
module.exports = db
