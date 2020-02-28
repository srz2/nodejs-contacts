require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    IP_ADDRESS: process.env.IP_ADDRESS,
    MONGO: {
        USER: process.env.MONGO_USER,
        PASSWORD: process.env.MONGO_PASSWORD,
        DATABASE: process.env.MONGO_DATABASE
    }
};