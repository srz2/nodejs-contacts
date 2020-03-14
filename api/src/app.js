const config = require('./config');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const app = express();

// Connect to Database
mongoose.connect("mongodb+srv://" + config.MONGO.USER +":" + config.MONGO.PASSWORD + "@cluster0-5398r.mongodb.net/" + config.MONGO.DATABASE + "?retryWrites=true&w=majority", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB Connected!');
    }).catch(() => {
        console.log('MongoDB Failed to connect!');
        console.log(err);
    });

// Handle Cors
app.use(cors());
app.use(parser.json());

const routeContacts = require('./routes/contacts');

app.use(express.static('public'));

app.use('/contacts', routeContacts);

app.use((req, res, next) => {
    console.log('404 Page Not Found');
    res.status(404).send('404 Page Not Found!');
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send('500 Server Error');
});

function stop() {
    mongoose.connection.close();
}

module.exports = app;
module.exports.stop = stop;
