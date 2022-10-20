module.exports = (io, lockID, tagName, auth) => {
	io.sockets.emit('lockOpened', {
		lockID,
		tagName,
		auth,
		time: Date.now()
	})
}