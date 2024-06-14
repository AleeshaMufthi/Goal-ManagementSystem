const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require ('../model/userModel')

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
}

// Admin Login
const loginAdmin = asyncHandler (
    async (req, res) => {

        const { email, password } = req.body
        // Check for email
        const user = await User.findOne({ email })

        if(user && user.isAdmin && (await bcrypt.compare(password, user.password))) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Not authorized')
        }
    }
)

// Load Dashboard
const loadDashboard = asyncHandler(
    async (req, res) => {
        const users = await User.find({ isAdmin: 1 })

        if(users){
            res.status(200).json({ users })
        }else{
            res.status(404)
            throw new Error('Admin not found')
        }
    }
)

// Get Users
const getUsers = asyncHandler(
    async (req, res) => {
        const users = await User.find({ isAdmin: 0})

        if(users) {
            res.status(200).json({ users})
        } else {
            res.status(404)
            throw new Error('User not found')
        }
    }
)

// Block and Unblock users
const userBlock = asyncHandler (
    async (req, res) => {
        const userId = req.body.userId
        const user = await User.findById(userId)

        if(!user) {
            res.status(400)
            throw new Error('User not found')
        }

        user.is_blocked = !user.is_blocked
        await user.save()
        const users = await User.find({ isAdmin: 0})
        res.status(200).json({ users})
    }
)

// Edit User
const editUser = asyncHandler (
    async (req, res) => {
        const { userId, name, email } = req.body
        const updateUser = await User.findByIdAndUpdate(userId, {name, email}, {new: true})
        const users = await User.find({ isAdmin: 0})
        if(users) {
            res.status(200).json({ users})
        } else {
            res.status(404)
            throw new Error('User not found')
        }
    }
)

// Search User
const searchUser = asyncHandler (
    async (req, res) => {
        const { query } = req.body
        const regex = new RegExp(`^${query}`, "i")

        const users = await User.find({ name: { $regex: regex }})
        res.status(200).json({ users })
    }
)

// Register user
const registerUser = asyncHandler (
    async (req, res) => {

        const { name, email, password } = req.body.userData
        
        if(!name || !email || !password){
            req.status(400)
            throw new Error('Please fill all the fields')
        }

        const userExists = await User.findOne({ email })

        if(userExists){
            res.status(400)
            throw new Error('Email aldready registered')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            isAdmin: 0,
            is_blocked: 1,
            name,
            email,
            password: hashedPassword
        })

        const users = await User.find({ isAdmin: 0})

        if(user) {
            res.status(200).json({ users})
        }else{
            res.status(400)
            throw new Error('Invalid user data')
        }

    }
)

module.exports = {
    loginAdmin,
    getUsers,
    editUser,
    searchUser,
    userBlock,
    registerUser,
    loadDashboard
}