module.exports = (io, lockID, tagName) => {
	io.sockets.emit('lockOpened', {
		lockID,
		tagName
	})
}