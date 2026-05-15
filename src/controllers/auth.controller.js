const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const {sendRegistrationEmail} = require('../services/email.service')
const tokenBlackListModel = require('../models/blackList.model')

async function userRegister(req,res){
    
    const {email,name,password} = req.body

    const isExists = await userModel.findOne({
        email : email
    })

    if(isExists){
        return res.status(422).json({
            message : "Email already in Use",
            status : "Failed"
        })
    }

    const user = await userModel.create({
        email,password,name
    })

    const token = jwt.sign({userId : user._id},process.env.JWT_SECRET,{expiresIn : "3d"})

    res.cookie("token" , token)

    res.status(201).json({
        message : "User Created Successfully",
        user:{
            id : user._id,
            email : user.email,  
            name : user.name,
            
        },
        token
    })

    await sendRegistrationEmail(user.email , user.name)
}

async function loginUser(req,res){

    const {email,password} = req.body
    
    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({message : "Singup or Login First"})
    }

    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(401).json({message : "Password is Incorrect"})
    }

    const token = jwt.sign({userId : user._id},process.env.JWT_SECRET,{expiresIn : "3d"})

    res.cookie("token" , token)
    res.status(200).json({
        message : "User Login Successfully",
        user:{
            id : user._id,
            email : user.email,
            name : user.name
        },
        
    })

}

async function logoutUser(req,res){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(200).json({
            message : "User Already Logout"
        })
    }

    await tokenBlackListModel.create({
        token : token
    })

    res.clearCookie("token")

    return res.status(200).json({
        message : "User logout Successfully"
    })
}

module.exports = {userRegister , loginUser , logoutUser}