const chai = require('chai');

describe('Server', function () {

    describe('Check Server Can Start', function () {

        const server = require('../api/src/server')
        it('From Config File', function () {
            server.stop();
        })
    })

});