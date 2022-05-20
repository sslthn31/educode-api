const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const dummyRouter = require('./src/routes/dummyRoutes');
const courseJsRouter = require('./src/routes/courseJsRoutes');

const app = express();
const port = process.env.PORT || 5000
const database = process.env.MONGO_URI || 'mongodb://sslth31:Y3v8Bd6JKREKzs2Y@cluster0-shard-00-00.pwm9r.mongodb.net:27017,cluster0-shard-00-01.pwm9r.mongodb.net:27017,cluster0-shard-00-02.pwm9r.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-cx49qk-shard-0&authSource=admin&retryWrites=true&w=majority'

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //agar semua website bisa akses API kita
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Sup Dude');
});


app.use('/v1/dummy', dummyRouter);
app.use('/v1/course', courseJsRouter);



mongoose
  .connect(database)
  .then(() => {
    console.log('database connected');
    app.listen(port, () => {
      console.log('app listen in port 5000');
    });
  })
  .catch((err) => console.log('Error :', err));

//Y3v8Bd6JKREKzs2Y
