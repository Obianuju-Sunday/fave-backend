
// IMPORTS
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const errorHandler = require('./middleware/errorHandler')
const AuthRoute = require('./routes/auth') 

// CONFIGURATION
dotenv.config()


// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection;

db.once('open', () => {
    console.log('Database Connected!');
})
// DATABASE ERROR HANDLING
db.on('error', (err) => {
    console.log(err); 
})

// MIDDLEWARES
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(errorHandler)

// ROUTES
app.use('/api/auth', AuthRoute)

// HANDLE UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    const AppError = require('./util/AppError');
    next(new AppError('AppError', 404, `Can't find ${req.originalUrl} on this server!`));
})

// SERVER
app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})