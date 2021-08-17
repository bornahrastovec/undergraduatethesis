// Paketi o kojima je ovisan cijeli backend

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require('passport');


// Rute za API 

const admin = require('./routes/api/admin');
const users = require('./routes/api/users');
const diary = require('./routes/api/diary');
const goal = require('./routes/api/goal');
const mood = require('./routes/api/mood');

const PORT = process.env.PORT || 5000; 

// Inicijalizacija aplikacije
const app = express();

// Form Data Middleware
app.use(express.urlencoded({
    extended: true
}))

//JSON Body Middleware
app.use(express.json());

//Cors Middleware
app.use(cors());

// Static dir
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', users);
app.use('/api/diary', diary);
app.use('/api/goals', goal);
app.use('/api/mood', mood);
app.use('/api/admin', admin);

require("./scheduler");

app.use(passport.initialize());

require('./config/passport')(passport);

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`Connected to ${db}!`);
}).catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})