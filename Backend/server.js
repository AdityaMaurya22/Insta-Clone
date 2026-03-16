require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/config/database')

connectDB()


app.listen("https://insta-clone-5kpf.onrender.com", ()=>{
    console.log('Server is running on port 3000')
})