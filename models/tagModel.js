const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Every Tag must be given a name'],
        },
        token: {
            type: String,
            required: [true, 'Every Tag must be given a token'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

tagSchema.pre('save', async function (next) {
	this.token = await bcrypt.hash(this.token, 12);
	next;
});
tagSchema.methods.confirmToken = async function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.token);
};

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;