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

router.get('/:contactId', (req, res, next) => {
    Contact.find({_id: req.params.contactId})
    .select('_id name')
    .then(results => {
        if (results.length > 0) {
            res.status(200).json({
                message: "Contact Found",
                contacts: results[0]
            });
        }
        else {
            res.status(200).json({
                message: "Unable to find contact with given id"
            })
        }
    })
    .catch(err => {
        console.log('Error: ' + err);
    });
});

router.post('/add', (req, res, next) => {
    console.log(req.body);
    const newContact = new Contact({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        birthday: req.body.birthday
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
                    contact: newContact._id
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

    // Check for valid ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(500).json({
            message: "Invalid contact id",
            GivenId: id
        })
    }

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
