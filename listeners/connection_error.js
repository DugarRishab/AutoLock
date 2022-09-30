module.exports = (io) => {
    io.on('connect_error', (err) => {
        console.error(err.message);
    });
};
