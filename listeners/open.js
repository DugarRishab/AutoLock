module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on("open", () => {
            console.log('lock ', socket.id, 'opened');
        })
    });
};
