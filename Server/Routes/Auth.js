const express = require('express');

const AuthRouter = express.Router();
const UserModel = require('../models/userModel.js')
const jwt = require('jsonwebtoken');

AuthRouter.post('/login', async(req, res) => {
   try{

    if(!req.body.email || !req.body.password) {
        return res.status(400).json({message: 'Email and password required'});
    }

    const {email,password} = req.body;
    
    const user = await UserModel.findOne({email : email});
    if(!user) return res.status(400).json({message: 'User not found'});

    const checkPass = await UserModel.findOne({email:email , password : password});
    if(!checkPass) return res.status(400).json({message: 'Password incorrect'});
    
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '10h'});

    return res.status(200).json({message: 'Login successful',token});

   }catch(error) {
     res.status(500).json({message: 'Server error'});
   }


}); 

module.exports = AuthRouter;