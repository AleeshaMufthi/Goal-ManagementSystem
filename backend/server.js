const express = require ('express')
const bodyParser = require ('body-parser')
const cors = require ('cors')
const colors = require('colors')
const dotenv = require ('dotenv').config()
const {errorHandler} = require ('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`));