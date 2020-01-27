require('dotenv').config()

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5000

const routes = require('./routes/index')

app.set('view engine', 'ejs')
app.use(session({
    secret: 'thatsecretthinggoeshere',
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)
require('./config/passport')(passport)

var configDB = require('./config/database');
mongoose.set('useCreateIndex', true);
mongoose.connect(configDB.url, { useNewUrlParser: true })
    .then(() => {
        console.log(`MongoDB connected.`);
    });
mongoose.connection.on('error', err => console.error(`MongoDB connection error: ${err}`));

app.listen(PORT, () => {
    console.log(`Application server started on port: ${PORT}`)
})