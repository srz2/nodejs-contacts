require('dotenv').config();

// Get IP Address
var addr;
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: ' + add);
})

module.exports = {
    PORT: process.env.PORT,
    IP_ADDRESS: addr,
    MONGO: {
        USER: process.env.MONGO_USER,
        PASSWORD: process.env.MONGO_PASSWORD,
        DATABASE: process.env.MONGO_DATABASE
    }
};