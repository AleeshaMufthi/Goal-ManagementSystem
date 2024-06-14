const express = require ('express')
const router = express.Router()

// Import the middleware and controller fnctns
const { protectAdmin } = require ('../middleware/adminAuth')
const { loginAdmin, loadDashboard, getUsers, searchUser, userBlock, editUser, registerUser } = require('../controllers/adminController')

router.post('/', loginAdmin)

router.get('/', loadDashboard)

router.get('/dashboard', protectAdmin, getUsers)

router.post('/search', protectAdmin, searchUser)

router.post('/block', protectAdmin, userBlock)

router.put('/:userId', protectAdmin, editUser)

router.post('/addUser', protectAdmin, registerUser)

module.exports = router