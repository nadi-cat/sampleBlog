const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));


let nextPostId = 1; // To assign unique IDs to posts
let posts = [];
let images = ['beach', 'flower-field', 'mountain','buildings','butterflyf','coast','couple','house','mallard','ocean','sea','sunset','trees','water','winter']

app.get('/', (req, res) => {
    randomNumImg = Math.floor(Math.random()* images.length);

    res.render('home', { posts, randomNumImg, images
});
  
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/create', (req, res) => {
  const { postContent } = req.body;
  const { postDesc} = req.body;
  const newPost = { id: nextPostId++, content: postContent, desc: postDesc };
  posts.push(newPost);
  res.redirect('/');
});

app.post('/delete/:postId', (req, res) => {
  const postId = req.params.postId;
  posts = posts.filter(post => post.id !== parseInt(postId));
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});