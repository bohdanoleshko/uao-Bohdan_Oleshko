const {Schema, model} = require('mongoose')

const schema = new Schema({
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const DateModel = model('DateModel', schema)

module.exports = DateModel
