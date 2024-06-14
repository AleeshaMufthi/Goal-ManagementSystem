import axios from 'axios'

const API_URL = '/api/admin'

//Login Admin
const adminLogin = async (adminData) => {

    const response = await axios.post(API_URL, adminData)

    if(response.data) {
        localStorage.setItem('admin',JSON.stringify(response.data))
    }

    return response.data
}

// Admin Logout
const adminLogout = () => {
    localStorage.removeItem('admin')
}

// Get all users
const getAllUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + "/dashboard", config)
    return response.data
}

// Block user
const userBlock = async (token, userId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + "/block", { userId }, config)
    return response.data
}

// Edit user details
const editUserDetails = async (token, userId, name, email) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/${userId}`, { userId, name, email }, config)
    return response.data
}

// Add User
const addUser = async (userData, token) => {
    const config = {
          headers: {
            Authorization:`Bearer ${token}`
          }
    }
    const response = await axios.post(API_URL + "/adduser", { userData }, config)
    return response.data
}

// User Search
const searchUser = async (query, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + "/search", { query }, config)
    return response.data
}

const adminAuthService = {
    adminLogin,
    adminLogout,
    getAllUsers,
    userBlock,
    editUserDetails,
    searchUser,
    addUser
}

export default adminAuthService