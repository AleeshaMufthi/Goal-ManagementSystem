const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')


// @desc Register new user
// @route POST/api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user aldready exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedpassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

// @desc Authenticate a user
// @route POST/api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {

    const { email, password} = req.body

    // check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data
// @route GET/api/users/me
// @access Private
const getUser = asyncHandler(async (req, res) => {
     res.status(200).json(req.user)
})

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}