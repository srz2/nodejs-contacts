const express = require('express');
const mongoose = require('mongoose')
const route = express.Router();

const Group = require('../modules/group');

route.get('/', (req, res, next) =>{
    Group.find()
    .select('_id name')
    .then(results => {
        res.status(200).json({
            message: "Successfully retrieved all groups",
            count: results.length,
            groups: results
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Failed to retrieve groups",
            error: err
        })
    });
});

route.get('/:groupId', (req, res, next) => {
    const groupId = req.params.groupId;
    Group.find({_id: groupId})
    .select('_id name contacts')
    .then(results => {
        if (results == 0){
            res.status(200).json({
                message: "No group found",
            });
        } else {
            res.status(200).json({
                message: "Successfully retrieved group",
                group: results[0]
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Failed to retrieved group",
            error: err
        });
    })
});

route.post('/add', (req, res, next) => {
    const groupName = req.body.name;
    console.log('Attempting to create group: ' + groupName);

    // Verify is string and is not null/empty
    if (typeof groupName === 'string' || groupName instanceof String) {
        if (groupName === undefined || groupName === "") {
            console.log('Group name is unknown');
            res.status(400).json({
                message: "Group name has not been given",
                givenName: groupName
            });
        }
    } else {
        console.log('Invalid class for group name');
        res.status(400).json({
            message: "Invalid, expecting string for name",
            given: groupName
        })
    }

    // Check if group already exists
    Group.find({name: groupName}).exec()
    .then(results => {
        if (results.length >= 1){
            console.log('Group already exists');
            res.status(400).json({
                message: "Group already exists",
                desiredName: groupName
            });
        } else {
            // Create new group
            const newGroup = new Group({ _id: mongoose.Types.ObjectId(), name: groupName })
            newGroup.save()
            .then(results => {
                res.status(200).json({
                    message: "Successfully create new group",
                    group: results
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed to create new group"
                });
            })
        }
    })
    .catch(err => {
        console.log('Unique Check failed: ' + err);
        res.status(500).json({
            message: "Unique Group Name Check Failed",
            error: err
        })
    })
});

route.put('/:groupId', (req, res, next) => {
    const groupId = req.params.groupId;
    const contactIds = req.body.contactIds;

    console.log('group id ' + groupId);
    console.log('ids ' + contactIds);

    Group.find({_id: groupId})
    .then(results => {
        if (results.length >= 0) {

            const myGroup = results[0];
            myGroup.contacts = contactIds;
            console.log(myGroup);
            Group.updateOne({_id: groupId}, myGroup)
            .then(results => {
                res.status(200).json({
                    message: "Successfully updated group",
                    groupId: groupId
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed to update group",
                    error: err
                })
            })
        } else {
            res.status(200).json({
                message: "No group found",
                groupId: groupId
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Unable to find group - Database error",
            error: err
        })
    })
})

route.delete('/:groupId', (req, res, next) => {
    const groupId = req.params.groupId;
    console.log('Deleting: ' + groupId);
    Group.find({_id: groupId})
    .then(results => {
        console.log(results);
        if (results.length > 0){
            Group.deleteOne({ _id: groupId })
            .then(results => {
                res.status(200).json({
                    message: "Successfully delete group",
                    results: results
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed to delete - internal error",
                    error: err
                })
            })
        } else {
            res.status(200).json({
                message: "No group to delete",
                groupId: groupId
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Deletion of group occured with error",
            error: err
        });
    })
});

module.exports = route;
