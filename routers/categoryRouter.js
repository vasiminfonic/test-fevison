const express = require('express');
const  router = express.Router();
const { CategoryModal } = require('../schema/Schema')
require('dotenv').config();
const mongoose = require('mongoose');
const multer  = require('multer')
const { json } = require('express');

router.get('/', async(req, res)=>{ 
    try{
     const findCat = await CategoryModal.find().select("categoryTitle description")
     res.status(200).json(findCat)
     
    }catch(err){
        res.status(200).json({message: 'something went wrong +'+ err})
    }
    // res.json({message: "rought is working"})

})
router.post('/add', async(req, res)=>{
    console.log(req.body)
    
    try{
     const newCat = new CategoryModal({
        _id: new mongoose.Types.ObjectId,
        categoryTitle: req.body.title,
        description: req.body.description
     })
      newCat.save().then(doc=>json(doc))
      .then(res.status(200).json({message: 'One Blog Inserted Successfully'}))
     
     
    }catch(err){
        res.status(200).json({message: 'something went wrong +'+ err})
    }
    res.json({message: "rought is working"})

})
router.delete('/del', async(req, res)=>{
    console.log(req.body)
    try{
   await CategoryModal.deleteOne({ _id: req.body.userId })
   .then(res.status(200).json({message:'One Category Has Been Deleted'}))
   }catch(err){
      res.status(400).json({message: "Got an error" + err })
   }
})

router.put('/upd', async(req, res)=>{
    console.log(req.body)
    
    try{
        await CategoryModal.updateOne({ _id: req.body.userId }, { $set: { 
            categoryTitle: req.body.title,
            description: req.body.description,
        }})
      .then(doc=>json(doc))
      res.status(200).json({message: 'One Category Has Been Update'})     
    }catch(err){
        res.status(200).json({message: 'something went wrong +'+ err})
    }
    res.json({message: "rought is working"})

})





module.exports = router
