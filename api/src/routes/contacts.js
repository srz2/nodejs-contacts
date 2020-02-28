const config = require('../config');
const mongoose = require('mongoose');
const express = require('express');

const Contact = require('../modules/contact');

const router = express.Router();

router.get('/', (req, res, next) => {
    Contact.find()
    .select('_id name')
    .then(results => {
        res.status(200).json(results);
    })
    .catch(err => {
        res.status(200).send(err);
    });
});

router.post('/add', (req, res, next) => {
    const newContact = new Contact({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name
    });

    Contact.find({name: req.body.name}).exec()
    .then(results => {
        if (results.length > 0){
            res.status(302).json({
                message: "Contact already exists",
                _id: results[0]._id
            });
        } else {
            newContact.save()
            .then(result => {
                res.status(201).json({
                    message: "Successfully added new contact",
                    contact: newContact
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Error",
                    error: err
                });
            });   
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Unable to query database',
            error: err
        })
    });
});

router.delete('/:contactId', (req, res, next) => {
    const id = req.params.contactId;
    Contact.find({_id: id}).exec()
    .then(results => {
        if (results.length > 0) {
            Contact.deleteOne({_id: id}).exec()
            .then(result => {
                res.status(200).json({
                    message: "Contact deleted",
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed to delete contact",
                    error: err
                })
            });
        } else {
            res.status(200).json({
                message: 'Contact Not Found'
            });
        }
    })
    .catch(err => {
        console.log('Error: ' + err);
    });
});

module.exports = router;