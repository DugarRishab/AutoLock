module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('close', (data) => {
            console.log('lock ', socket.id, 'closed');
        });
    });
};
