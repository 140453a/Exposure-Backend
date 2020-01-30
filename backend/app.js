const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

//middleware
app.use(bodyParser.json());
app.use(cors());

//connect to db
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'));


//import routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);


//routes
app.get('/', (req,res) => {
  res.send('We are on home');
});

mongoose.connect('mongodb://mongo:27017/docker-node-mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true  },)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(3000, () => console.log('Server started'));
