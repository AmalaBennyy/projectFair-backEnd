//logic to resolve the request

//import model
const { response } = require('express');
const users = require('../Model/userSchema')

//import jwt
const jwt=require('jsonwebtoken')

exports.register =async(req,res)=>{
    //logic
    console.log('inside the controller - register function');
    
     //extracts
   
     const {username,email,password}=req.body
     try{ 
     const existUser= await users.findOne({email})
     if(existUser){
        //if document is present
        res.status(406).json("Account already exist  please login")
     }
     else{
        //need to register
        //1)create a object for model
        const newUser = new users({
            username,
            email,
            password,
            github:"",
            linkedin:"",
            profile:""
        })
 
        //add to mongodb -use save method in mongoose
        await newUser.save()


        
    //response
    res.status(200).json("Registration request recived")
   
     }

}//run time errors are resloved using try-catch block
catch(err){
    res.status(401).json(`register request failed due to `,err)
}
}

//login request
exports.login=async(req,res)=>{
    const {email,password}= req.body

   try {const existingUser = await users.findOne({email,password})
    console.log(existingUser);

    if(existingUser){
        //jwt token
        //payload-information that is secretely transmitted
        //secret or private key-key based on which token is genereted
     const token=  jwt.sign({userId:existingUser._id},"superkey")

     // sending as object because we are sending more than one data 

        res.status(200).json({
            existingUser,
            token
        })

    }
   
    else{
        res.status(404).json('Invalid emailId or password')
    }}catch(err){
        res.status(401).json(`login request failed due to  :${err}`);
    }

}


//edit profile
exports.editUser=async(req,res)=>{
    const userId= req.payload
    const{username,email,password,github,linkedin,profile}=req.body

    // const profileImage=req.file?req.filename:profile
    const profileImage = req.file ? req.file.filename : profile;
    try
    {
      const updateUser=await users.findByIdAndUpdate({_id:userId},
        {username,email,password,github,linkedin,profile:profileImage},{new:true})

        await updateUser.save()
        res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)
    }

}