const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:[true, "Email Required for creating a Account!"],
        trim : true,
        lowercase : true,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "Enter a Valid Email!"],
        unique : [true, "Email Already in Use"]

    },

    name:{
        type : String,
        required : [true, "Name Required for creating a Account!"],
    },

    systemUser:{
        type : Boolean,
        deafult : false,
        immutable : true,
    },

    password:{
        type : String,
        required : [true, "Password Required for Creating a Account!"],
        minlength : [6, "Password should contain more than 6 characters"],
        select : false
    }
},
    {
    timestamps : true

})

userSchema.pre("save" , async function(next){

    if(!this.isModified("password")){
        return;
    }

    const hash = await bcrypt.hash(this.password,10)
    this.password = hash

})

userSchema.methods.comparePassword = async function (password){

    return await bcrypt.compare(password , this.password)
}

const userModel = mongoose.model("user" , userSchema)
module.exports = userModel