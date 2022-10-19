const sendAllLocks = require('../events/sendAllLocks');
const Lock = require('../models/lockModel');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('getAllLocks', async () => {
            // console.log('lock ', socket.id, 'closed');/
			try {
				const locks = await Lock.find();
				sendAllLocks(socket, locks);
			}
			catch (err) {
				console.log(err);
			}
			

        });
    });
};
