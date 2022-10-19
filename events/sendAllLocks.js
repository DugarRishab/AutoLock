module.exports = (socket, locks) => {
	socket.emit("sendAllLocks", locks);
}