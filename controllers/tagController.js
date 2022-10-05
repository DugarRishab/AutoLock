const AppError = require('./../utils/appError');
const Tag = require('../models/tagModel');
const Lock = require('../models/lockModel');
const catchAsync = require('../utils/catchAsync');

exports.createTag = catchAsync(async (req, res, next) => {
	const tag = await Tag.create({
		name: req.body.name,
		token: req.body.token
	});

	res.status(200).json({
		message: "success",
		data: {
			tag
		}
	})
});