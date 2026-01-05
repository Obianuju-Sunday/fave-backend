const user = require ('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
    
        let User = new user({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPass
        });
        await User.save();
        
        res.status(201).json({
            message: 'User Added Successfully!',
            userDetails: User
        });
    } catch (error) {
        // res.json({
        //     error: error.message
        // });
        console.log(error);
    }
};


module.exports = {
    register
}  