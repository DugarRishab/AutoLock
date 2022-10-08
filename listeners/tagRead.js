const Tag = require("../models/tagModel");
const Lock = require('../models/lockModel');
const catchAsync = require("../utils/catchAsync");
const tagDenied = require("../events/tagDenied");
const tagAuthorized = require("../events/tagAuthorized");

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on(
            'tagRead',
            async (data) => {
                try {
                    const tag = await Tag.findById(data.tagUId);
                    const lock = await Lock.findById(data.lockId);
                    console.log(data);
                    if (!tag) tagDenied(socket);
                    else {
                        console.log(lock.tags.includes(tag.id)); 
                        if (lock.tags.includes(tag.id)) {
                            tagAuthorized(socket);
                        }
                        else tagDenied(socket);
                    }
                } catch (err) {
                    console.error(err.message);
                    tagDenied(socket);
                }
            }
        );

    });
};
