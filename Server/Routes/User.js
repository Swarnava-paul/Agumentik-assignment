const express = require('express');

const UserRouter = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel.js');

UserRouter.get('/userDetails',async(req,res)=>{
    try{
       const {token} = req.query;
       if(!token) return res.status(404).json({message:"Bad Request"});
       
       jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
           if(err) return res.status(400).json({message:"Invalid Token"});
           
           const user = await UserModel.findOne({_id:decoded.id});
           
           if(!user) return res.status(404).json({message:"Try Again"});

           return res.status(200).json({message:"User found",role:user.role,name:user.name})
       })
       
    }catch(e){
       res.status(500).json({message:"Server Error"})
    }
});

module.exports = UserRouter;