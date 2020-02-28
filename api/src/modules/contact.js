const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        first: {type: String, require: true},
        last: {type: String, require: true}
    }
});

module.exports = mongoose.model('Contact', contactSchema);
