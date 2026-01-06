const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const errorMiddleware = require('./middleware/errorMiddleware')

const AuthRoute = require('./routes/auth') 
dotenv.config()
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;



db.once('open', () => {
    console.log('Database Connected!');
})

db.on('error', (err) => {
    console.log(err); 
})


const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/auth', AuthRoute)
app.use(errorMiddleware)

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})