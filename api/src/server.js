const config = require('./config')
const http = require('http');
const app = require('./app');

const PORT = config.PORT;

const server = http.createServer(app);

console.log('Listening on port ' + PORT);
server.listen(PORT);