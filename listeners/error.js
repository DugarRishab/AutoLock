module.exports = (io) => {
    io.on('error', (socket) => {
        console.log('ERROR -> ');
        socket.on('error', (err) => {
            console.log("ERROR IN SOCKET ->", err)
        })
    });
};
