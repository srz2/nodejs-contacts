const chai = require('chai');

describe('Enviornment', function () {

    describe('.env', function () {
        const fs = require('fs');
        it('Check for .env file', function () {
            chai.assert.isTrue(fs.existsSync('.env'), '.env does not exist');
        })
    })

});