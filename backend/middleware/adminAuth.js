const jwt = require ('jsonwebtoken')
const asyncHandler = require ('express-async-handler')
const User = require('../model/userModel')

const protectAdmin = asyncHandler (
    async (req, res, next) => {

        let token

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            try{
                // Get token from header
                token = req.headers.authorization.split(" ")[1]

                // verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET)

                // Get admin from token
                req.admin = await User.findById(decoded.id).select("-password")
                next()

            }catch(error){
               console.log(error)
               res.status(401)
               throw new Error('Not Authorized')
            }        
        }

        if(!token){
            res.status(401)
            throw new Error('No token')
        }
    }
)
module.exports = { protectAdmin }