const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},

    text: { type: String, required: [true, 'Please add a text value']},

    createdAt: { type: Date, default: Date.now },

    updatedAt: { type: Date, default: Date.now }

}, {
    timeStamps: true
})

module.exports = mongoose.model('Goal',goalSchema)