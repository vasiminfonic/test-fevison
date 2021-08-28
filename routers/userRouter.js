const express = require('express');
const  router = express.Router();
const { UserModal } = require('../schema/Schema')
require('dotenv').config();
const mongoose = require('mongoose');
const slugify = require('slugify')
const multer  = require('multer')
const { json } = require('express');
let path = require('path');
const config = process.env;
const auth = require("../middleware/auth");
var jwt = require('jsonwebtoken');

router.get('/',async(req,res)=>{
    res.status(200).json({
        message: "this is the message from user"
    })

})
router.post('/signup',async(req,res)=>{
    await new UserModal({
        _id: new mongoose.Types.ObjectId,
    })
    res.status(200).json({
        message: "this is from the signup side"
    })
})
// router.post('/login',async(req,res)=>{
//     res.status(200).json({
//         message: "this is from the login side"
//     })
// })
router.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && name)) {
        res.status(400).json({error:"All input is required"});
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await UserModal.findOne({email});
  
      if (oldUser) {
        return res.status(409).json({error:"User Already Exist. Please Login"});
      }
      
  
      //Encrypt user password
    //   encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await UserModal.create({
        _id: new mongoose.Types.ObjectId,
        name: name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: password,
      });
  
      // Create token
    //   const token = jwt.sign(
    //     { user_id: user._id, email },
    //     process.env.TOKEN_KEY,
    //     {
    //       expiresIn: "2h",
    //     }
    //   );
      // save user token
    //   user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

  router.post("/login", async (req, res) => {
      console.log(req.body)

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).json({error:"All input is required"});
      }
      // Validate if user exist in our database
      const user = await UserModal.findOne({ email });
  
      if (user && password) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).json({error:"Invalid Credentials"});
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });
  router.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });


module.exports = router;