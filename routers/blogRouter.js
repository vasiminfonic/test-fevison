const express = require('express');
const  router = express.Router();
const { BlogModal } = require('../schema/Schema')
require('dotenv').config();
const mongoose = require('mongoose');
const multer  = require('multer')
const { json } = require('express');
let path = require('path');
const { appendFile } = require('fs');
const { get } = require('http');
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images/blog');
  },
  filename: function(req, file, cb) {   
     const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
      cb(null,file.fieldname + '_' + uniqueSuffix +'_' + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
let upload = multer({ storage:storage });

router.post('/send/image',upload.array('image',10),async function(req, res){
  let images=[]; 
  console.log(req.files)
  req.files.forEach(ele => {
    images.push(ele.filename);
  });
    const newBlog = new BlogModal({
      _id: new mongoose.Types.ObjectId,
      name: req.body.name,
      message: req.body.message,
      email: req.body.email,
      subject: req.body.subject,
      image: images 
    })
    
    await newBlog.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })
    res.status(200).json({success: 1, profile_url: `http://localhost:4000/contact/`})
 });










router.get('/a', async function(req, res){
    res.send('GET route on things.');
    try {
		const post = await BlogModal.findOne({  })
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
     
    
 });
 router.get('/',async function(req, res){
  try {
		const Blog = await BlogModal.find({status: 'active'}, ['_id', 'name', 'email', 'subject', 'message'])
		res.status(200).json(Blog);
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
  res.status(200).json({message: 'you got to your destination'})
});

 
router.post('/send',upload.array('image',10),async function(req, res){
  let images=[]; 
  req.files.forEach(ele => {
    images.push(ele.filename);
  });
  console.log(req.files)
    const newBlog = new BlogModal({
      _id: new mongoose.Types.ObjectId,
      name: req.body.name,
      message: req.body.message,
      email: req.body.email,
      subject: req.body.subject,
      image: images
    })
    
    await newBlog.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })
    res.status(200).json({messege: 'data has been inserted'})
 });
 router.post('/update',async function(req, res){
  mongoose.set('useFindAndModify', false);
  console.log(req.body._id);
  
  BlogModal
  .findOneAndUpdate(
    
    {
      _id: req.body._id  // search query
    }, 
    {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      subject: req.body.subject

      // field:values to update
    },
    {
      new: true,  
      upsert: true                     // return updated doc
      // runValidators: true              // validate before update
    })
  .then(doc => {
    console.log(doc)
    res.status(200).json({message : 'data has been updated'})
  })
  .catch(err => {
    console.error(err)
  })
});


router.post('/delete',async function(req, res){
  console.log(req.body)
  BlogModal.deleteOne({ _id: req.body._id })
 .then(doc => {
   console.log(doc)
 })
 .catch(err => {
   console.error(err)
 })
  res.status(200).json({messege: 'data has been deleted'})

});


router.get('/trash',async function(req, res){
  try {
		const Blog = await BlogModal.find({ status: 'deActive'}).select('_id name email message subject')
		res.status(200).json(Blog);
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
  res.status(200).json({message: 'you got to your destination'})
});


router.post('/movetrash',async function(req, res){
  mongoose.set('useFindAndModify', false);
  console.log(req.body._id);
  
  BlogModal
  .findOneAndUpdate(
    {
      _id: req.body._id  // search query
    }, 
    {
      status: req.body.status
      // field:values to update
    },
    {
      new: true,  
      upsert: true                     // return updated doc
      // runValidators: true              // validate before update
    })
  .then(doc => {
    console.log(doc)
    res.status(200).json({message : 'data has been moved to trash'})
  })
  .catch(err => {
    console.error(err)
  })
});

router.post('/restore',async function(req, res){
  mongoose.set('useFindAndModify', false);
  console.log(req.body._id);
  
  BlogModal
  .findOneAndUpdate(
    {
      _id: req.body._id  // search query
    }, 
    {
      status: req.body.status
      // field:values to update
    },
    {
      new: true,  
      upsert: true                     // return updated doc
      // runValidators: true              // validate before update
    })
  .then(doc => {
    console.log(doc)
    res.status(200).json({message : 'data has been moved to trash'})
  })
  .catch(err => {
    console.error(err)
  })
});


router.get('/posts/', async (req,res) => {
  
	  await postModal.find()
		.then(doc=>{
      res.json({message: 'data has been fatc>d' +doc})
      if(doc.length > 0){
        console.log({message: "the is a single data" })
      }else{
        console.log ( 'therer is none' )
      }


    })
    .catch(err=>res.json({message:err}))
	
		
		res.send({ error: "Post doesn't exist!" })
	});
  router.post('/posts/insert', async (req,res) => {
    console.log(req.body)
  
	 const newPost = new postModal({
     title: req.body.title,
     paragraph: req.body.paragraph,
     category: req.body.category,
   })
    newPost.save()
		.then(doc=>res.json({message: 'data has been insertedcl' + doc}))
    .catch(err=>res.json({err}))
	
		
		res.send({ error: "Post doesn't exist!" })
	});

  router.post('test/posts/insert', async (req,res) => {
    console.log(req.body)
  
	 const newPost = new postModal({
     title: req.body.title,
     paragraph: req.body.paragraph,
     category: req.body.category,
   })
    newPost.save()
		.then(doc=>res.json({message: 'data has been insertedcl' + doc}))
    .catch(err=>res.json({err}))
	
		
		res.send({ error: "Post doesn't exist!" })
	});




 module.exports = router;
