const express = require('express');

const app = express();
const cors = require('cors');
const multer = require('multer');
const uniqid = require('uniqid');

let posts = require('./posts');

const getPostById = id => posts.find(post => post.id === id);

const PORT = 9000;

app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Setup File upload */
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // public/img 폴더에 파일을 저장한다. public/img 폴더가 존재해야 한다.
      cb(null, 'public/img/');
    },
    filename(req, file, cb) {
      // 전송된 파일 자신의 이름으로 파일을 저장한다.
      cb(null, file.originalname);
    },
  }),
});

// mainPage
app.get('/posts', (req, res) => {
  const { nation } = req.query;
  res.send(posts.filter(post => post.nation === nation));
});

app.patch('/post/liked/:id', (req, res) => {
  const { id } = req.params;
  const postById = getPostById(id);
  if (!postById) {
    res.status(404).send('해당 post가 존재하지 않습니다.');
    return;
  }

  posts = posts.map(post => (post.id === id ? { ...post, liked: !post.liked } : post));
  res.send();
});

// uploadPage
app.post('/upload', upload.single('img'), (req, res) => {
  console.log('UPLOAD SUCCESS!', req.file);
  res.json({ success: true, file: req.file });
});

app.post('/post', (req, res) => {
  posts = [
    ...posts,
    {
      ...req.body,
      id: uniqid(),
      userId: uniqid(),
      liked: false,
      comments: [],
    },
  ];
  res.sendStatus(201);
});

app.patch('/post/:id', (req, res) => {
  const { id } = req.params;
  const postById = getPostById(id);
  if (!postById) {
    res.status(404).send('해당 post가 존재하지 않습니다.');
    return;
  }

  posts = posts.map(post =>
    post.id === id
      ? {
          ...post,
          ...req.body,
        }
      : post
  );
  res.send();
});

// detailPage
app.get('/post/:id', (req, res) => {
  const { id } = req.params;
  const postById = getPostById(id);
  console.log(id, postById, posts);
  if (!postById) {
    res.status(404).send('해당 post가 존재하지 않습니다.');
    return;
  }
  res.send(postById);
});

app.post('/post/comment/:id', (req, res) => {
  const { id } = req.params;
  const postById = getPostById(id);
  if (!postById) {
    res.status(404).send('해당 post가 존재하지 않습니다.');
    return;
  }

  const newComment = {
    id: uniqid(),
    ...req.body,
  };

  const newComment = {
    id: uniqid(),
    ...req.body,
  };

  posts = posts.map(post =>
    post.id === id
      ? {
          ...post,
          comments: [...post.comment, newComment],
        }
      : post
  );
  res.send(newComment);
});

app.delete('/post/:id', (req, res) => {
  const { id } = req.params;
  const postById = getPostById(id);
  if (!postById) {
    res.status(404).send('해당 post가 존재하지 않습니다.');
    return;
  }

  posts = posts.filter(post => post.id !== id);
  res.send();
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
