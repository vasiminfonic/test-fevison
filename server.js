const express = require('express');
const app = express();
const cors = require('cors')
const blogRouter = require('./routers/blogRouter');
const postRouter = require('./routers/postRouter');
const categoryRouter = require('./routers/categoryRouter');
const userRouter = require('./routers/userRouter');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs')
require('dotenv').config()
const { PostModal } = require('./schema/Schema')
const PORT = process.env.PORT || 4000


mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('database is conneted'));
const conn =mongoose.connection;

app.use(express.json())
app.use(cors())

app.use('/images',express.static('images'));
app.use('/contact',blogRouter);
app.use('/posts', postRouter);
app.use('/category',categoryRouter);
app.use('/user',userRouter);





const filePath = path.resolve(__dirname, '../fevison/build', 'index.html')

app.get('/', function(request, response) {
  console.log('Home page visited!');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Home Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
    response.send(result);
  });
});

app.get('/about', function(request, response) {
  console.log('About page visited!');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'About Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "About page description");
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
    response.send(result);
  });
});

app.get('/contact', function(request, response) {
  console.log('Contact page visited!');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Contact Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "Contact page description");
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
    response.send(result);
  });
});

app.get('/blogs/', function(request, response) {
  console.log('Blog page visited!');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'Blog Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "Blog page description");
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
    response.send(result);
  });
});

app.get('/blogs/blog/:blogId/',async function(request, response) {
  const param = request.params.blogId
  console.log(param)

  const seoData = await PostModal.findOne({slug:param})
  console.log(seoData)

  console.log('Blog page '+ param +' visited!' );
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, seoData.seo_title);
    data = data.replace(/\$OG_DESCRIPTION/g, seoData.seo_description);
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
    response.send(result);
  });
});

app.use(express.static(path.resolve(__dirname, '../fevison/build')));


app.listen(PORT, () => console.log('Server is Running on port' + PORT));
