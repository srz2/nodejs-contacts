const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true},
    },
    birthday : {type: Date, required: true}
});

module.exports = mongoose.model('Contact', contactSchema);
