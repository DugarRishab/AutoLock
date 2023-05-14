const statusOk = require('../events/statusOk');
const statusIntruder = require('../events/statusIntruder');
const statusGas = require('../events/statusOk');
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('status', (data) => {
			const status = data[1].status;

			console.log(data);
			if (status == 0) {
				statusOk(socket);
			}
			if (status == 1) {
                statusIntruder(socket);
			}
			if (status == 2) {
                statusGas(socket);
            }
			
        });
    });
};
