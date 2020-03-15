const config = require('./config')
const http = require('http');
const app = require('./app');

const PORT = config.PORT;

const server = http.createServer(app);

function stop() {
    app.stop();
    server.close();
}

console.log('Starting Server...');
server.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

module.exports = server;
module.exports.stop = stop;
