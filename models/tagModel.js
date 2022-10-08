const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Every Tag must be given a name'],
        },
        uid: {
            type: String,
            required: [true, 'Every Tag must be given a uid'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;