const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/photobomb', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});


// Create a new item in the museum: takes a title and a path to an image.
app.post('/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  path: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.description = req.body.description;
    await item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//ticket 

const ticketSchema = new mongoose.Schema({
  name: String,
  problem: String,
});

// create a virtual paramter that turns the default _id field into id
ticketSchema.virtual('id')
  .get(function () {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
ticketSchema.set('toJSON', {
  virtuals: true
});

// create a model for tickets
const Ticket = mongoose.model('Ticket', ticketSchema);

app.get('/api/tickets', async (req, res) => {
  try {
    let tickets = await Ticket.find();
    res.send({
      tickets: tickets
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/tickets', async (req, res) => {
  const ticket = new Ticket({
    name: req.body.name,
    problem: req.body.problem
  });
  try {
    await ticket.save();
    res.send({
      ticket: ticket
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/tickets/:id', async (req, res) => {
  try {
    await Ticket.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



// cookie parts

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


// import parts

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);
// import the photos module and setup its API path
const photos = require("./photos.js");
app.use("/api/photos", photos.routes);
// import the comments module and setup its API path
const comments = require("./comments.js");
app.use("/api/comments", comments.routes);


//  listening 


app.listen(3002, () => console.log('Server listening on port 3002!'));
