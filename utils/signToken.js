const jwt = require('jsonwebtoken');

module.exports = (id, password) => {
    return jwt.sign({ id, password }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT,
    });
};


