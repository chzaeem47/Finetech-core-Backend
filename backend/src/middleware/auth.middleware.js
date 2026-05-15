const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const tokenBlackListModel = require('../models/blackList.model')


async function authMiddleWare(req,res,next){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1] 

    if(!token){
       return res.status(401).json({
        message : "Unauthorized Access!"
       })
    }

    const isBlacListed = await tokenBlackListModel.findOne({token})

    if(isBlacListed){
        return res.status(401).json({
            message : "Unauthorized Access Token is Invalid!"
        })
    }

    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId)
        req.user = user

        return next()
        
    } catch (err) {
        return res.status(401).json({
        message : "Unauthorized Access Token is Invalid"

        })
    }
}

async function authSystemUserMiddleWare(req,res,next){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(401).json({
            message : "Unauthorized Access!"
        })
    }

    const isBlacListed = await tokenBlackListModel.findOne({token})

    if(isBlacListed){
        return res.status(401).json({
            message : "Unauthorized Access Token is Invalid!"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId).select("+systemUser")

        if(!user.systemUser){
            return res.status(403).json({
                message : "Only System User are Allowed!"
            })
        }

        req.user = user
        next()

    }
    catch(err){
        return res.status(401).json({
            message : "Untauthorized Access Token is Invalid!"
        })
    }
}

module.exports = { authMiddleWare , authSystemUserMiddleWare }