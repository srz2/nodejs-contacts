const chai = require('chai');
const expect = chai.expect;

describe("Contact Logic", function() {
    const Contact = require('../modules/contact');

    describe("Creation Logic", function() {
        it("Create New Contact - Not Nulled", function () {
            const newContact = new Contact();
            chai.assert.isNotNull(newContact);
        })
    });
});

