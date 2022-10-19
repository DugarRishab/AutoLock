const Tag = require("../models/tagModel");
const Lock = require('../models/lockModel');
const catchAsync = require("../utils/catchAsync");
const tagDenied = require("../events/tagDenied");
const tagAuthorized = require("../events/tagAuthorized");
const lockOpen = require("../events/lockOpen");

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on(
            'tagRead',
            async (data) => {
                console.log(data);
                try {
                    const tag = await Tag.findOne({uid: data.tagUID});
                    const lock = await Lock.findById(data.lockID);
                    console.log(typeof data);
                    console.log(data.tagUID);
                    if (!tag) tagDenied(socket);
                    else if (!lock) tagDenied(socket)
                    else {
                        console.log(tag);
                        console.log(lock.tags.includes(tag.id)); 
                        if (lock.tags.includes(tag.id)) {
                            tagAuthorized(socket);
                            lockOpen(io, lock.id, tag.uid);
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
