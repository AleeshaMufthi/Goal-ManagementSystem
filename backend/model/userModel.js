const mongoose = require ('mongoose')

const userSchema = mongoose.Schema({

    name: {type: String, required: true},

    email: {type: String, required: true, unique: true},

    password: {type: String, required: true},

    isAdmin: {type: Number, default: 0},

    image: {type: String},

    is_blocked: {type: Number, default: 0}
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)