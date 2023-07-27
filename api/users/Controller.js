require('dotenv').config()
const User = require('./model')
const { connect } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const Dummy = (req, res) => {
   res.json({
       user: "BQ " + req.body.user
   })
}

const signup = async(req, res) => {
  const { username, password, email } = req.body;

   try {

    await  connect(process.env.MONGO_URL)
    //console.log ("DB Connected")

    const checkExist = await User.exists({ email: email })
    
    if (checkExist) {
        res.json({
            message: "User Already Exists"
        })
   }
   else {
     await User.create({ username, email, password : await hash(password, 12) })

     res.status(201).json({
         message: "Signup Successfully"
    })
 } 
}

catch (error) {
     res.json({
          message: "Error"
     })
  }
 
 
}

const login = async (req, res) => {

    const { email, password } = req.body;

  try {
     await connect(process.env.MONGO_URL)
     const checkExistUser = await User.findOne({ email: email })

     if (!checkExistUser) {
        res.status(404).json({
            message: "User not found"
        })
     }
     else {
         const decryptPassword = await compare(password, checkExistUser.password)
         console.log(decryptPassword)

         if (email == checkExistUser.email && decryptPassword) {

         const token = sign(
            {
                username : checkExistUser.username,
                id : checkExistUser._id,
                email : checkExistUser.email 
            }
            ,
              process.env.JWT_SECRET
         )


        res.json({
            message: "Successfully Signed In",
            token : token
       })
     }
    
     else {
        res.status(200).json({

         message: "Invalid Credentials"

        })
     }
  }

  }
  
  catch (error) {
     res.json({
        message: error.message
     })
  }
}

const allUsers = async (req, res) => {
    

   try {
       await connect(process.env.MONGO_URL)
       const Users = await User.find()
       res.json(
           {
               Users: Users
           }
       )

   }

   catch (error) {
       res.json(
           {
               message: error.message
           }
       )

   }
}


const getUserbyEmail = async (req, res) => {

   const { email } = req.params


   try {
       await connect(process.env.MONGO_URL)
       const Users = await User.findOne({ email: email })
       res.json(
           {
               Users: Users
           }
       )

   }

   catch (error) {
       res.json(
           {
               message: error.message
           }
       )

   }
}


const userbyEmail = async (req, res) => {

   const { email } = req.query


   try {
       await connect(process.env.MONGO_URL)
       const Users = await User.findOne({ email: email })
       res.json(
           {
               Users: Users
           }
       )

   }

   catch (error) {
       res.json(
           {
               message: error.message
           }
       )

   }
}

   
  

  module.exports = { Dummy, signup, login, allUsers, getUserbyEmail, userbyEmail }