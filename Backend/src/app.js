const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route') 
const userRouter = require('./routes/user.route') 

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'https://instaclone-egeh.onrender.com'
}))

app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/api/users', userRouter)

module.exports = app