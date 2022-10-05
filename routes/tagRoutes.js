const express = require('express');
const tagController = require('../controllers/tagController');

const Router = express.Router();

Router.route('/').post(tagController.createTag);

module.exports = Router;