const config = require('./config');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const app = express();

// Swagger Documentation Setup
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }' +
               '.try-out__btn {display: none}'
}
const swaggerDocs = require('../documentation/swagger/swagger.json');
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerOptions));
app.use("/help", swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerOptions));

// Connect to Database
mongoose.connect("mongodb+srv://" + config.MONGO.USER +":" + config.MONGO.PASSWORD + "@cluster0-5398r.mongodb.net/" + config.MONGO.DATABASE + "?retryWrites=true&w=majority", {
        useCreateIndex: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB Connected!');
    }).catch((err) => {
        console.log('MongoDB Failed to connect!');
        console.log(err);
    });

// Handle Cors
app.use(cors());
app.use(parser.json());

const routeContacts = require('./routes/contacts');
const routeGroups = require('./routes/groups');

app.use(express.static('public'));

app.use('/contacts', routeContacts);
app.use('/groups', routeGroups);

app.use((req, res, next) => {
    console.log('404 Page Not Found');
    
    const link = config.HOST + '/help';
    res.status(404).send('For help refer to the documenation <a target="_blank" href="' + link + '">View Documentation</a> ')
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
