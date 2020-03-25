const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        name: { type: String, required: false },
        fx: { type: String, required: false },
        xl: { type: String, required: false },
        xr: { type: String, required: false },
        x: { type: String, required: false },
        a: { type: String, required: false },
        b: { type: String, required: false },
        n: { type: String, required: false },
        h: { type: String, required: false },
        d: { type: String, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('movies', Movie)