const mongoose = require('mongoose');
const Contact = require('./contact')

const groupSchema = mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, required: true},
    name: {type: String, required: true},
    contacts: [{ type: mongoose.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Group', groupSchema);
