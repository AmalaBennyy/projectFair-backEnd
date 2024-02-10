//import mongoose
const mongoose =require('mongoose')

//create schema
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'must be atleast 3 charcter but got {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new ERROR('invalid email')
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String

    },
    profile:{
        type:String
    }

})

//create model
const users= mongoose.model("users",userSchema)

//export
module.exports = users