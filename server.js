// server.js


// IMPORTS
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
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
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// REQUEST LOGGER FOR DEBUGGING
// app.use((req, res, next) => {
//     console.log('=================================');
//     console.log('📨 Incoming Request:');
//     console.log('Method:', req.method);
//     console.log('URL:', req.url);
//     console.log('Headers:', req.headers);
//     console.log('Body:', req.body);
//     console.log('=================================');
//     next();
// });

// ROUTES
app.use('/api/auth', AuthRoute)
 
// HANDLE UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    next(new AppError('AppError', 404, `Can't find ${req.originalUrl} on this server!`));
})

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use(errorHandler)


// SERVER
app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})