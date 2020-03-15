require('dotenv').config();

// Get IP Address
const production = 'https://srz2-contacts.herokuapp.com';
const development = 'http://localhost:' + process.env.PORT;
const addr = (process.env.NODE_ENV ? production : development);

module.exports = {
    PORT: process.env.PORT,
    HOST: addr,
    MONGO: {
        USER: process.env.MONGO_USER,
        PASSWORD: process.env.MONGO_PASSWORD,
        DATABASE: process.env.MONGO_DATABASE
    }
};