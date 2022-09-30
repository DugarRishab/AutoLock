const mongoose = require('mongoose');

const lockSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Lock must be given a name'],
        },
        tags: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Tag',
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Lock = mongoose.model('Lock', lockSchema);

lockSchema.methods.confirmTag = function (candidateTag) {
	return Boolean(this.tags.find(tag => tag === candidateTag));
}

module.exports = Lock;