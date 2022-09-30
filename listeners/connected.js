module.exports = (io) => {
	io.on('connection', socket => {
		console.log("new lock connected -> ", socket.id);
		socket.on('error', (err) => {
			console.log("ERROR ->", err)
		})
	});
}