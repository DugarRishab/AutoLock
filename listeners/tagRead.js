const Tag = require("../models/tagModel");
const Lock = require('../models/lockModel');
const catchAsync = require("../utils/catchAsync");
const tagDenied = require("../events/tagDenied");

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on(
            'tagRead',
            async (data) => {
                try {
                    const tag = await Tag.findById(data.tagId);
                    if (!tag) tagDenied(socket);
                    else {
                        console.log(tag.confirmToken(data.tagToken)); 
                    }
                } catch (err) {
                    console.error(err.message);
                    tagDenied(socket);
                }
            }
        );

    });
};
