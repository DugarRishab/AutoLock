module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('close', () => {
            console.log('lock ', socket.id, 'closed');
        });
    });
};
